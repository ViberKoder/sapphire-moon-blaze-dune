import {
  CAP_BY_ID,
  type CapSpec,
  type Tool,
  type WallId,
  resolvePaint,
} from "@/lib/alley-data";

export type HistoryState = { canUndo: boolean; canRedo: boolean };

export type AimState = {
  x: number;
  y: number;
  d: number;
  hex: string;
  visible: boolean;
};

type Drip = {
  x: number;
  y: number;
  vy: number;
  width: number;
  volume: number;
  r: number;
  g: number;
  b: number;
  seed: number;
  acc: number;
  maxVy: number;
};

const HISTORY_LIMIT = 6;
const BRICK_ALPHA = 0.38;
const DB_NAME = "pereulok";
const DB_STORE = "walls";

export class SprayEngine {
  private view: HTMLCanvasElement;
  private vctx: CanvasRenderingContext2D;
  private getTool: () => Tool;
  private onHistory: (state: HistoryState) => void;
  private onAim: (aim: AimState) => void;
  private onFirstStroke: () => void;

  private spark: HTMLCanvasElement | null = null;

  private wallId: WallId | "" = "";
  private wallImg: HTMLImageElement | null = null;
  private ww = 0;
  private hh = 0;
  private layers = new Map<string, HTMLCanvasElement>();
  private layerLoads = new Map<string, Promise<void>>();
  private shades = new Map<string, HTMLCanvasElement>();
  private lums = new Map<string, Uint8Array>();
  private images = new Map<string, HTMLImageElement>();
  private paint: HTMLCanvasElement | null = null;
  private pctx: CanvasRenderingContext2D | null = null;
  private shade: HTMLCanvasElement | null = null;
  private lum: Uint8Array | null = null;
  private detail: HTMLCanvasElement | null = null;
  private dctx: CanvasRenderingContext2D | null = null;

  private past = new Map<string, HTMLCanvasElement[]>();
  private future = new Map<string, HTMLCanvasElement[]>();
  private painted = new Set<string>();
  private drips: Drip[] = [];
  private pool = 0;

  private ready = false;
  private dead = false;
  private dirty = false;
  private dirtySave = false;
  private told = false;
  private down = false;
  private moved = false;
  private pointerId: number | null = null;
  private pressure = 0.9;
  private x = 0;
  private y = 0;
  private lastT = 0;
  private dwell = 0;
  private lastClientX: number | null = null;
  private lastClientY: number | null = null;
  private token = 0;
  private raf = 0;
  private lastFrame = 0;
  private saveTimer = 0;
  private ac = new AbortController();
  private ro: ResizeObserver | null = null;
  private audio = new SprayAudio();

  constructor(
    view: HTMLCanvasElement,
    getTool: () => Tool,
    onHistory: (state: HistoryState) => void,
    onAim: (aim: AimState) => void,
    onFirstStroke: () => void,
  ) {
    const ctx = view.getContext("2d");
    if (!ctx) throw new Error("canvas");
    this.view = view;
    this.vctx = ctx;
    this.getTool = getTool;
    this.onHistory = onHistory;
    this.onAim = onAim;
    this.onFirstStroke = onFirstStroke;
  }

  start() {
    this.spark = makeSpark();
    this.bind();
    this.resize();
    this.lastFrame = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  destroy() {
    this.dead = true;
    this.ac.abort();
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
    window.clearTimeout(this.saveTimer);
    if (this.dirtySave) void this.flushSave();
    this.audio.close();
  }

  async setWall(id: WallId, url: string) {
    const token = ++this.token;
    this.ready = false;
    this.down = false;
    this.drips = [];
    try {
      let img = this.images.get(id);
      if (!img) {
        img = await loadImage(url);
        if (this.dead || token !== this.token) return;
        this.images.set(id, img);
      }
      if (!this.shades.has(id)) {
        const analyzed = analyze(img);
        this.shades.set(id, analyzed.shade);
        this.lums.set(id, analyzed.lum);
      }
      if (!this.layers.has(id)) {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        this.layers.set(id, canvas);
        this.layerLoads.set(id, this.restore(id, canvas));
      }
      await this.layerLoads.get(id);
      if (this.dead || token !== this.token) return;

      this.wallId = id;
      this.wallImg = img;
      this.ww = img.naturalWidth;
      this.hh = img.naturalHeight;
      this.paint = this.layers.get(id)!;
      const pctx = this.paint.getContext("2d");
      if (!pctx) return;
      this.pctx = pctx;
      this.shade = this.shades.get(id)!;
      this.lum = this.lums.get(id)!;
      if (!this.detail || this.detail.width !== this.ww || this.detail.height !== this.hh) {
        this.detail = document.createElement("canvas");
        this.detail.width = this.ww;
        this.detail.height = this.hh;
        const dctx = this.detail.getContext("2d");
        if (!dctx) return;
        this.dctx = dctx;
      }
      this.ready = true;
      this.dirty = true;
      this.emitHistory();
      document.documentElement.dataset.alley = "ready";
      this.refreshAim();
    } catch {
      if (token === this.token) this.ready = false;
    }
  }

  undo() {
    if (!this.paint || !this.pctx || !this.wallId) return;
    const stack = this.past.get(this.wallId);
    const snap = stack?.pop();
    if (!snap) return;
    this.futureStack().push(cloneCanvas(this.paint));
    this.pctx.clearRect(0, 0, this.ww, this.hh);
    this.pctx.drawImage(snap, 0, 0);
    this.drips = [];
    this.dirty = true;
    this.scheduleSave();
    this.emitHistory();
  }

  redo() {
    if (!this.paint || !this.pctx || !this.wallId) return;
    const stack = this.future.get(this.wallId);
    const snap = stack?.pop();
    if (!snap) return;
    this.pastStack().push(cloneCanvas(this.paint));
    this.pctx.clearRect(0, 0, this.ww, this.hh);
    this.pctx.drawImage(snap, 0, 0);
    this.drips = [];
    this.dirty = true;
    this.scheduleSave();
    this.emitHistory();
  }

  clear() {
    if (!this.ready || !this.pctx || !this.wallId) return;
    this.pushHistory();
    this.pctx.clearRect(0, 0, this.ww, this.hh);
    this.drips = [];
    this.painted.add(this.wallId);
    this.dirty = true;
    this.scheduleSave();
  }

  download() {
    if (!this.wallImg) return;
    this.render();
    const link = document.createElement("a");
    link.href = this.view.toDataURL("image/png");
    link.download = "pereulok.png";
    link.click();
  }

  refreshAim() {
    if (this.lastClientX == null || this.lastClientY == null) return;
    const target = document.elementFromPoint(this.lastClientX, this.lastClientY);
    this.emitAim(this.lastClientX, this.lastClientY, target, false);
  }

  private bind() {
    const signal = this.ac.signal;
    this.view.addEventListener("pointerdown", this.onDown, { signal, passive: false });
    this.view.addEventListener("contextmenu", (event) => event.preventDefault(), { signal });
    window.addEventListener("pointermove", this.onMove, { signal, passive: false });
    window.addEventListener("pointerup", this.onUp, { signal });
    window.addEventListener("pointercancel", this.onUp, { signal });
    document.addEventListener("visibilitychange", this.onHide, { signal });
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.view);
  }

  private resize = () => {
    const rect = this.view.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (this.view.width !== w || this.view.height !== h) {
      this.view.width = w;
      this.view.height = h;
      this.dirty = true;
    }
  };

  private loop = (now: number) => {
    if (this.dead) return;
    const dt = Math.min(0.05, Math.max(0, (now - this.lastFrame) / 1000));
    this.lastFrame = now;
    if (this.down && this.ready) {
      if (!this.moved) this.hold(dt);
      const tool = this.getTool();
      this.audio.setSpraying(true, CAP_BY_ID[tool.cap].hz, tool.sound);
    } else {
      this.audio.setSpraying(false, 1200, false);
    }
    this.moved = false;
    if (this.drips.length) this.stepDrips(dt);
    if (this.dirty) {
      this.render();
      this.dirty = this.drips.length > 0;
    }
    this.raf = requestAnimationFrame(this.loop);
  };

  private onDown = (event: PointerEvent) => {
    if (!this.ready || !this.wallId || !this.pctx) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    try {
      this.view.setPointerCapture(event.pointerId);
    } catch {
      /* pointer already gone */
    }
    this.pointerId = event.pointerId;
    this.down = true;
    this.moved = true;
    this.pressure = readPressure(event);
    const point = this.toWall(event.clientX, event.clientY);
    this.x = point.x;
    this.y = point.y;
    this.lastT = performance.now();
    this.dwell = 0;
    this.pushHistory();
    const tool = this.getTool();
    const cap = CAP_BY_ID[tool.cap];
    const diameter = cap.diameter * tool.distance;
    const strength = (0.62 + 0.38 * tool.flow) * this.pressure;
    this.stamp(point.x, point.y, diameter, strength, tool);
    this.painted.add(this.wallId);
    this.dirty = true;
    if (!this.told) {
      this.told = true;
      this.onFirstStroke();
    }
    this.emitAim(event.clientX, event.clientY, event.target, true);
  };

  private onMove = (event: PointerEvent) => {
    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;
    const drawing = this.down && event.pointerId === this.pointerId;
    this.emitAim(event.clientX, event.clientY, event.target, drawing);
    if (!drawing || !this.ready) return;
    event.preventDefault();
    this.pressure = readPressure(event);
    const events = event.getCoalescedEvents?.() ?? [event];
    for (const sample of events) this.strokeTo(sample.clientX, sample.clientY);
    this.moved = true;
  };

  private onUp = (event: PointerEvent) => {
    if (this.pointerId !== null && event.pointerId !== this.pointerId) return;
    const wasDown = this.down;
    this.down = false;
    this.pointerId = null;
    this.audio.setSpraying(false, 1200, false);
    if (wasDown) this.scheduleSave();
  };

  private onHide = () => {
    if (document.hidden && this.dirtySave) void this.flushSave();
  };

  private strokeTo(clientX: number, clientY: number) {
    const point = this.toWall(clientX, clientY);
    const now = performance.now();
    let dt = (now - this.lastT) / 1000;
    const dist = Math.hypot(point.x - this.x, point.y - this.y);
    if (dt < 0.001) {
      if (dist < 0.35) return;
      dt = dist / 2800;
    }
    dt = Math.min(0.05, dt);
    this.paintSegment(this.x, this.y, point.x, point.y, dt);
    this.x = point.x;
    this.y = point.y;
    this.lastT = now;
    this.dirty = true;
    if (this.wallId) this.painted.add(this.wallId);
  }

  private hold(dt: number) {
    if (!this.pctx) return;
    const tool = this.getTool();
    const cap = CAP_BY_ID[tool.cap];
    const diameter = cap.diameter * tool.distance;
    this.dwell += dt;
    let stamped = false;
    while (this.dwell >= 0.028) {
      this.dwell -= 0.028;
      const strength = (0.72 + 0.28 * tool.flow) * this.pressure;
      this.stamp(this.x, this.y, diameter, strength, tool);
      this.addPool(0.028, 0, diameter, tool, cap);
      stamped = true;
    }
    if (stamped) {
      this.dirty = true;
      if (this.wallId) this.painted.add(this.wallId);
    }
  }

  private paintSegment(x0: number, y0: number, x1: number, y1: number, dt: number) {
    const tool = this.getTool();
    const cap = CAP_BY_ID[tool.cap];
    const diameter = cap.diameter * tool.distance;
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const speed = dist / Math.max(dt, 0.001);
    const coverage = 1 / (1 + speed / (diameter * 14));
    const spacing = Math.max(
      1.25,
      diameter * (0.12 + 0.68 * (1 - coverage)) * (1.2 - 0.35 * tool.flow),
    );
    const strength =
      (0.22 + 0.78 * coverage) * (0.28 + 0.72 * tool.flow) * this.pressure;
    const steps = Math.min(28, Math.max(1, Math.round(dist / spacing)));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const x = x0 + (x1 - x0) * t;
      const y = y0 + (y1 - y0) * t;
      this.stamp(x, y, diameter, strength, tool);
      this.addPool(dt / steps, speed, diameter, tool, cap);
    }
  }

  private stamp(x: number, y: number, diameter: number, strength: number, tool: Tool) {
    const ctx = this.pctx;
    if (!ctx) return;
    const cap = CAP_BY_ID[tool.cap];
    const paint = resolvePaint(tool);
    const [r, g, b] = hexToRgb(paint.hex);
    const radius = diameter * 0.5;
    const wet = Math.max(0.05, Math.min(1, strength));
    const grain = Math.min(2.2, Math.max(1, this.wallPx(1) / Math.max(1, cap.dotMin)));
    const count = Math.max(
      2,
      Math.round(cap.dots * (0.2 + 0.8 * wet) * (0.82 + 0.18 * tool.distance)),
    );
    const jx = x + (Math.random() - 0.5) * diameter * 0.05;
    const jy = y + (Math.random() - 0.5) * diameter * 0.05;
    const alpha = cap.aMin + (cap.aMax - cap.aMin) * (0.3 + 0.7 * wet);

    ctx.save();
    ctx.globalCompositeOperation = cap.erase ? "destination-out" : "source-over";
    ctx.fillStyle = cap.erase ? "#fff" : `rgb(${r},${g},${b})`;
    fillDroplets(ctx, jx, jy, radius, count, cap.focus, cap.dotMin * grain, cap.dotMax * grain, alpha, 0);

    const mistCount = Math.round(count * cap.sat + cap.dots * cap.mist * 0.16 * wet);
    if (mistCount > 0) {
      fillDroplets(
        ctx,
        jx,
        jy,
        radius * cap.mistScale,
        mistCount,
        0.7,
        Math.max(0.55, cap.dotMin * grain * 0.42),
        Math.max(cap.dotMin * grain, cap.dotMax * grain * 0.5),
        alpha * 0.34,
        0.58,
      );
    }

    if (paint.metallic && !cap.erase && this.spark) {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.32 + 0.4 * wet;
      const sparkSize = diameter * (0.32 + Math.random() * 0.26);
      ctx.drawImage(
        this.spark,
        jx - sparkSize / 2 + (Math.random() - 0.5) * radius * 0.35,
        jy - sparkSize / 2 + (Math.random() - 0.5) * radius * 0.35,
        sparkSize,
        sparkSize,
      );
    }
    ctx.restore();
  }

  private addPool(dt: number, speed: number, diameter: number, tool: Tool, cap: CapSpec) {
    if (!tool.drips || cap.erase || cap.drip <= 0) return;
    const slow = 1 / (1 + speed / (diameter * 7));
    this.pool += dt * tool.flow * cap.drip * (0.35 + slow) * 3.4 * this.pressure;
    let spawned = 0;
    while (this.pool > 0.1 && spawned < 3 && this.drips.length < 48) {
      this.pool -= 0.12;
      this.spawnDrip(diameter, tool);
      spawned++;
    }
  }

  private spawnDrip(diameter: number, tool: Tool) {
    const { hex } = resolvePaint(tool);
    const [r, g, b] = hexToRgb(hex);
    this.drips.push({
      x: this.x + (Math.random() - 0.5) * diameter * 0.32,
      y: this.y + diameter * (0.12 + Math.random() * 0.32),
      vy: 10 + Math.random() * 28,
      width: Math.max(this.wallPx(4.5), diameter * (0.05 + Math.random() * 0.03)),
      volume: 0.72 + Math.random() * 0.85,
      r,
      g,
      b,
      seed: Math.random() * 20,
      acc: 260 + Math.random() * 200,
      maxVy: 240 + Math.random() * 200,
    });
  }

  private stepDrips(dt: number) {
    if (!this.pctx || this.drips.length === 0) return;
    const ctx = this.pctx;
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = this.drips.length - 1; i >= 0; i--) {
      const drip = this.drips[i]!;
      const prevX = drip.x;
      const prevY = drip.y;
      drip.vy = Math.min(drip.maxVy, drip.vy + drip.acc * dt);
      if (Math.random() < dt * 0.55) drip.vy *= 0.6;
      drip.y += drip.vy * dt;
      drip.x += Math.sin(drip.y * 0.07 + drip.seed) * 16 * dt;
      drip.x += this.mortarBias(drip.x, drip.y) * 28 * dt;
      const lum = this.sample(drip.x, drip.y) / 255;
      const rel = 0.66 + lum * 0.42;
      ctx.strokeStyle = rgba(drip.r * rel, drip.g * rel, drip.b * rel, 0.92);
      ctx.lineWidth = Math.max(this.wallPx(2.2), drip.width);
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(drip.x, drip.y);
      ctx.stroke();
      ctx.fillStyle = rgba(
        Math.min(255, drip.r * rel * 1.06),
        Math.min(255, drip.g * rel * 1.06),
        Math.min(255, drip.b * rel * 1.06),
        0.96,
      );
      ctx.beginPath();
      ctx.arc(drip.x, drip.y, Math.max(this.wallPx(1.6), drip.width * 0.62), 0, Math.PI * 2);
      ctx.fill();
      drip.volume -= dt * (0.26 + drip.vy / 980);
      if (drip.volume < 0.34) drip.width *= Math.max(0.15, 1 - dt * 1.5);
      const fork =
        drip.volume > 0.42 && Math.random() < dt * 0.28 && this.drips.length < 48;
      if (fork) {
        drip.volume *= 0.62;
        this.drips.push({
          x: drip.x + (Math.random() - 0.5) * 4,
          y: drip.y,
          vy: drip.vy * 0.72,
          width: drip.width * 0.62,
          volume: drip.volume * 0.48,
          r: drip.r,
          g: drip.g,
          b: drip.b,
          seed: Math.random() * 20,
          acc: drip.acc,
          maxVy: drip.maxVy,
        });
      }
      if (drip.volume <= 0 || drip.width < 0.7 || drip.y > this.hh + 10) {
        this.drips.splice(i, 1);
      }
    }
    ctx.restore();
    this.dirty = true;
  }

  private render() {
    if (!this.wallImg || !this.paint || !this.shade || !this.detail || !this.dctx) return;
    const { ox, oy, dw, dh } = this.cover();
    const dctx = this.dctx;
    dctx.setTransform(1, 0, 0, 1, 0, 0);
    dctx.globalAlpha = 1;
    dctx.globalCompositeOperation = "source-over";
    dctx.clearRect(0, 0, this.ww, this.hh);
    dctx.drawImage(this.shade, 0, 0);
    dctx.globalCompositeOperation = "destination-in";
    dctx.drawImage(this.paint, 0, 0);
    dctx.globalCompositeOperation = "source-over";

    const view = this.vctx;
    view.setTransform(1, 0, 0, 1, 0, 0);
    view.imageSmoothingEnabled = true;
    view.imageSmoothingQuality = "high";
    view.clearRect(0, 0, this.view.width, this.view.height);
    view.drawImage(this.wallImg, ox, oy, dw, dh);
    view.drawImage(this.paint, ox, oy, dw, dh);
    view.save();
    view.globalCompositeOperation = "overlay";
    view.globalAlpha = BRICK_ALPHA;
    view.drawImage(this.detail, ox, oy, dw, dh);
    view.restore();
  }

  private cover() {
    const vw = this.view.width || 1;
    const vh = this.view.height || 1;
    const s = Math.max(vw / Math.max(1, this.ww), vh / Math.max(1, this.hh));
    const dw = this.ww * s;
    const dh = this.hh * s;
    return { s, dw, dh, ox: (vw - dw) / 2, oy: (vh - dh) / 2 };
  }

  private wallPx(cssPx: number) {
    const rect = this.view.getBoundingClientRect();
    const { s } = this.cover();
    const cssPerWall = (s * rect.width) / Math.max(1, this.view.width);
    return cssPx / Math.max(0.08, cssPerWall);
  }

  private toWall(clientX: number, clientY: number) {
    const rect = this.view.getBoundingClientRect();
    const vx = ((clientX - rect.left) / Math.max(1, rect.width)) * this.view.width;
    const vy = ((clientY - rect.top) / Math.max(1, rect.height)) * this.view.height;
    const { s, ox, oy } = this.cover();
    return { x: (vx - ox) / s, y: (vy - oy) / s };
  }

  private emitAim(clientX: number, clientY: number, target: EventTarget | null, forceVisible = false) {
    this.lastClientX = clientX;
    this.lastClientY = clientY;
    const tool = this.getTool();
    const cap = CAP_BY_ID[tool.cap];
    const diameter = cap.diameter * tool.distance;
    const rect = this.view.getBoundingClientRect();
    const { s } = this.cover();
    const css = this.ww ? diameter * s * (rect.width / Math.max(1, this.view.width)) : 48;
    const el = target instanceof Element ? target : null;
    const overUi = !!el?.closest("[data-ui]");
    const { hex } = resolvePaint(tool);
    this.onAim({
      x: clientX,
      y: clientY,
      d: Math.max(12, css),
      hex,
      visible: forceVisible || (!overUi && this.lastClientX != null),
    });
  }

  private sample(x: number, y: number) {
    if (!this.lum || !this.ww) return 150;
    const ix = Math.max(0, Math.min(this.ww - 1, x | 0));
    const iy = Math.max(0, Math.min(this.hh - 1, y | 0));
    return this.lum[iy * this.ww + ix] ?? 150;
  }

  private mortarBias(x: number, y: number) {
    return (this.sample(x - 2, y + 3) - this.sample(x + 2, y + 3)) / 255;
  }

  private pushHistory() {
    if (!this.paint || !this.wallId) return;
    const stack = this.pastStack();
    stack.push(cloneCanvas(this.paint));
    if (stack.length > HISTORY_LIMIT) stack.shift();
    this.future.set(this.wallId, []);
    this.emitHistory();
  }

  private pastStack() {
    return this.bucket(this.past);
  }

  private futureStack() {
    return this.bucket(this.future);
  }

  private bucket(map: Map<string, HTMLCanvasElement[]>) {
    let stack = map.get(this.wallId);
    if (!stack) {
      stack = [];
      map.set(this.wallId, stack);
    }
    return stack;
  }

  private emitHistory() {
    if (!this.wallId) {
      this.onHistory({ canUndo: false, canRedo: false });
      return;
    }
    this.onHistory({
      canUndo: (this.past.get(this.wallId)?.length ?? 0) > 0,
      canRedo: (this.future.get(this.wallId)?.length ?? 0) > 0,
    });
  }

  private scheduleSave() {
    this.dirtySave = true;
    window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => void this.flushSave(), 420);
  }

  private async flushSave() {
    if (!this.dirtySave || !this.wallId || !this.paint) return;
    const id = this.wallId;
    const canvas = this.paint;
    this.dirtySave = false;
    const blob = await toBlob(canvas);
    if (!blob || this.dead) return;
    await idbPut(id, blob);
  }

  private async restore(id: string, canvas: HTMLCanvasElement) {
    const blob = await idbGet(id);
    if (!blob || this.painted.has(id) || this.dead) return;
    try {
      const bitmap = await createImageBitmap(blob);
      if (this.painted.has(id) || this.dead) {
        bitmap.close();
        return;
      }
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      this.dirty = true;
    } catch {
      /* ignore broken blobs */
    }
  }
}

class SprayAudio {
  private ctx: AudioContext | null = null;
  private gain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;

  setSpraying(on: boolean, hz: number, enabled: boolean) {
    if (!enabled || !on) {
      if (this.ctx && this.gain) {
        this.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.04);
      }
      return;
    }
    this.ensure();
    if (!this.ctx || !this.gain || !this.filter) return;
    if (this.ctx.state === "suspended") void this.ctx.resume();
    const time = this.ctx.currentTime;
    this.filter.frequency.setTargetAtTime(hz, time, 0.05);
    this.gain.gain.setTargetAtTime(0.04, time, 0.03);
  }

  close() {
    const ctx = this.ctx;
    this.ctx = null;
    this.gain = null;
    this.filter = null;
    if (ctx) void ctx.close();
  }

  private ensure() {
    if (this.ctx) return;
    const ctx = new AudioContext();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 680;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.55;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    source.connect(highpass);
    highpass.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    this.ctx = ctx;
    this.gain = gain;
    this.filter = filter;
  }
}

function fillDroplets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  count: number,
  focus: number,
  dotMin: number,
  dotMax: number,
  alpha: number,
  inner: number,
) {
  if (count <= 0 || alpha <= 0.02) return;
  ctx.globalAlpha = Math.max(0.05, Math.min(1, alpha));
  ctx.beginPath();
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const span = inner + (1 - inner) * Math.random();
    const rad = radius * Math.pow(span, focus);
    let size = dotMin + Math.random() * Math.max(0, dotMax - dotMin);
    if (Math.random() < 0.055) size *= 1.85 + Math.random() * 0.7;
    const px = x + Math.cos(ang) * rad;
    const py = y + Math.sin(ang) * rad;
    const dot = Math.max(0.6, size);
    ctx.moveTo(px + dot, py);
    ctx.arc(px, py, dot, 0, Math.PI * 2);
  }
  ctx.fill();
}

function makeSpark() {
  const canvas = document.createElement("canvas");
  canvas.width = 72;
  canvas.height = 72;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 28; i++) {
    const ang = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.7) * 30;
    ctx.globalAlpha = 0.25 + Math.random() * 0.75;
    ctx.beginPath();
    ctx.arc(36 + Math.cos(ang) * rad, 36 + Math.sin(ang) * rad, 0.6 + Math.random() * 1.1, 0, Math.PI * 2);
    ctx.fill();
  }
  return canvas;
}

function analyze(img: HTMLImageElement) {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const src = document.createElement("canvas");
  src.width = w;
  src.height = h;
  const sctx = src.getContext("2d", { willReadFrequently: true });
  const shade = document.createElement("canvas");
  shade.width = w;
  shade.height = h;
  const shadeCtx = shade.getContext("2d");
  const lum = new Uint8Array(w * h);
  if (!sctx || !shadeCtx) return { shade, lum };
  sctx.drawImage(img, 0, 0);
  const image = sctx.getImageData(0, 0, w, h);
  const shadeImage = shadeCtx.createImageData(w, h);
  const d = image.data;
  const sd = shadeImage.data;
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    const y = d[i]! * 0.299 + d[i + 1]! * 0.587 + d[i + 2]! * 0.114;
    lum[p] = y | 0;
    let c = (y - 128) * 1.65 + 118;
    c = c * 0.78 + 52;
    const v = c < 0 ? 0 : c > 255 ? 255 : c;
    sd[i] = sd[i + 1] = sd[i + 2] = v;
    sd[i + 3] = 255;
  }
  shadeCtx.putImageData(shadeImage, 0, 0);
  return { shade, lum };
}

function cloneCanvas(src: HTMLCanvasElement) {
  const canvas = document.createElement("canvas");
  canvas.width = src.width;
  canvas.height = src.height;
  canvas.getContext("2d")?.drawImage(src, 0, 0);
  return canvas;
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("wall"));
    img.src = url;
  });
}

function hexToRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${clamp255(r)},${clamp255(g)},${clamp255(b)},${a})`;
}

function clamp255(value: number) {
  return Math.max(0, Math.min(255, value)) | 0;
}

function readPressure(event: PointerEvent) {
  if (event.pointerType === "pen") return Math.max(0.12, event.pressure || 0.4);
  return 0.92;
}

function toBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else canvas.toBlob((fallback) => resolve(fallback), "image/png");
      },
      "image/webp",
      0.82,
    );
  });
}

function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(DB_STORE)) {
        request.result.createObjectStore(DB_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbPut(id: string, blob: Blob) {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      tx.objectStore(DB_STORE).put(blob, id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    /* storage unavailable */
  }
}

async function idbGet(id: string) {
  try {
    const db = await openDb();
    const blob = await new Promise<Blob | null>((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readonly");
      const request = tx.objectStore(DB_STORE).get(id);
      request.onsuccess = () => resolve((request.result as Blob | undefined) ?? null);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return blob;
  } catch {
    return null;
  }
}
