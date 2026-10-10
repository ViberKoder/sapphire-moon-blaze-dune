import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trash2, c as Plus, l as Droplets, n as Volume2, o as SprayCan, r as Undo2, s as Redo2, t as VolumeX, u as Download } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-mu8BgZCx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WALLS = [
	{
		id: "night",
		name: "Ночь",
		src: "/assets/night-BiDRzK8l.jpg"
	},
	{
		id: "buff",
		name: "Бафф",
		src: "/assets/buff-DbEaOFSX.jpg"
	},
	{
		id: "block",
		name: "Блок",
		src: "/assets/block-C6pywVI0.jpg"
	}
];
var PAINTS = [
	{
		id: "black",
		name: "Чёрный",
		hex: "#161616",
		metal: false
	},
	{
		id: "white",
		name: "Белый",
		hex: "#f3f0e7",
		metal: false
	},
	{
		id: "red",
		name: "Красный",
		hex: "#e10600",
		metal: false
	},
	{
		id: "blood",
		name: "Бордо",
		hex: "#8a1c24",
		metal: false
	},
	{
		id: "orange",
		name: "Оранжевый",
		hex: "#f25c05",
		metal: false
	},
	{
		id: "yellow",
		name: "Жёлтый",
		hex: "#ffe14a",
		metal: false
	},
	{
		id: "lime",
		name: "Лайм",
		hex: "#c6e02a",
		metal: false
	},
	{
		id: "green",
		name: "Зелёный",
		hex: "#178a3c",
		metal: false
	},
	{
		id: "teal",
		name: "Бирюза",
		hex: "#14968f",
		metal: false
	},
	{
		id: "blue",
		name: "Синий",
		hex: "#1a3fd4",
		metal: false
	},
	{
		id: "royal",
		name: "Электрик",
		hex: "#3c6bff",
		metal: false
	},
	{
		id: "purple",
		name: "Фиолетовый",
		hex: "#5b2db8",
		metal: false
	},
	{
		id: "pink",
		name: "Розовый",
		hex: "#e21878",
		metal: false
	},
	{
		id: "brown",
		name: "Коричневый",
		hex: "#6b3e2a",
		metal: false
	},
	{
		id: "chrome",
		name: "Хром",
		hex: "#c5ced6",
		metal: true
	},
	{
		id: "gold",
		name: "Золото",
		hex: "#e0b34a",
		metal: true
	}
];
var CAPS = [
	{
		id: "skinny",
		label: "Скинни",
		diameter: 34,
		alpha: .78,
		mist: .2,
		mistScale: 1.55,
		drip: .28,
		erase: false,
		hz: 3400,
		brush: {
			size: 96,
			count: 380,
			focus: 2.6,
			dotMin: 1.25,
			dotMax: 2.3,
			aMin: .14,
			aMax: .36,
			sat: .07
		},
		mistBrush: {
			size: 96,
			count: 140,
			focus: .95,
			dotMin: 1.1,
			dotMax: 2,
			aMin: .05,
			aMax: .12,
			sat: .16
		}
	},
	{
		id: "fat",
		label: "Фэт",
		diameter: 86,
		alpha: .62,
		mist: .34,
		mistScale: 1.7,
		drip: 1,
		erase: false,
		hz: 1450,
		brush: {
			size: 210,
			count: 1450,
			focus: 1.5,
			dotMin: 1.45,
			dotMax: 3.1,
			aMin: .07,
			aMax: .2,
			sat: .11
		},
		mistBrush: {
			size: 210,
			count: 460,
			focus: .72,
			dotMin: 1.3,
			dotMax: 2.6,
			aMin: .035,
			aMax: .09,
			sat: .22
		}
	},
	{
		id: "soft",
		label: "Софт",
		diameter: 148,
		alpha: .4,
		mist: .5,
		mistScale: 1.48,
		drip: .48,
		erase: false,
		hz: 880,
		brush: {
			size: 300,
			count: 980,
			focus: .82,
			dotMin: 1.7,
			dotMax: 3.5,
			aMin: .045,
			aMax: .13,
			sat: .18
		},
		mistBrush: {
			size: 300,
			count: 380,
			focus: .55,
			dotMin: 1.5,
			dotMax: 3,
			aMin: .03,
			aMax: .07,
			sat: .26
		}
	},
	{
		id: "astro",
		label: "Астро",
		diameter: 18,
		alpha: .92,
		mist: .08,
		mistScale: 1.4,
		drip: .06,
		erase: false,
		hz: 4700,
		brush: {
			size: 64,
			count: 70,
			focus: 3.5,
			dotMin: 1.5,
			dotMax: 2.5,
			aMin: .28,
			aMax: .6,
			sat: .04
		},
		mistBrush: {
			size: 64,
			count: 28,
			focus: 1.5,
			dotMin: 1,
			dotMax: 1.7,
			aMin: .05,
			aMax: .12,
			sat: .1
		}
	},
	{
		id: "wipe",
		label: "Смывка",
		diameter: 74,
		alpha: .78,
		mist: .22,
		mistScale: 1.42,
		drip: 0,
		erase: true,
		hz: 1700,
		brush: {
			size: 170,
			count: 640,
			focus: 1.2,
			dotMin: 1.7,
			dotMax: 3.3,
			aMin: .12,
			aMax: .3,
			sat: .08
		},
		mistBrush: {
			size: 170,
			count: 180,
			focus: .8,
			dotMin: 1.4,
			dotMax: 2.4,
			aMin: .05,
			aMax: .12,
			sat: .12
		}
	}
];
var CAP_BY_ID = Object.fromEntries(CAPS.map((cap) => [cap.id, cap]));
var DEFAULT_TOOL = {
	wallId: "night",
	cap: "fat",
	paintId: "red",
	customHex: "#3c6bff",
	distance: 1,
	flow: .72,
	drips: true,
	sound: true
};
function resolvePaint(tool) {
	if (tool.paintId === "custom") return {
		hex: tool.customHex,
		metallic: false,
		name: "Свой цвет"
	};
	const paint = PAINTS.find((item) => item.id === tool.paintId) ?? PAINTS[2];
	return {
		hex: paint.hex,
		metallic: paint.metal,
		name: paint.name
	};
}
var STORAGE_KEY = "pereulok-tool";
function readStoredTool() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return {
			wallId: WALLS.some((wall) => wall.id === parsed.wallId) ? parsed.wallId : DEFAULT_TOOL.wallId,
			cap: CAPS.some((item) => item.id === parsed.cap) ? parsed.cap : DEFAULT_TOOL.cap,
			paintId: parsed.paintId === "custom" || PAINTS.some((paint) => paint.id === parsed.paintId) ? parsed.paintId : DEFAULT_TOOL.paintId,
			customHex: typeof parsed.customHex === "string" && /^#[0-9a-fA-F]{6}$/.test(parsed.customHex) ? parsed.customHex : DEFAULT_TOOL.customHex,
			distance: typeof parsed.distance === "number" ? Math.min(1.75, Math.max(.55, parsed.distance)) : DEFAULT_TOOL.distance,
			flow: typeof parsed.flow === "number" ? Math.min(1, Math.max(.22, parsed.flow)) : DEFAULT_TOOL.flow,
			drips: typeof parsed.drips === "boolean" ? parsed.drips : DEFAULT_TOOL.drips,
			sound: typeof parsed.sound === "boolean" ? parsed.sound : DEFAULT_TOOL.sound
		};
	} catch {
		return null;
	}
}
function writeStoredTool(tool) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tool));
	} catch {}
}
var HISTORY_LIMIT = 6;
var BRICK_ALPHA = .55;
var DB_NAME = "pereulok";
var DB_STORE = "walls";
var SprayEngine = class {
	view;
	vctx;
	getTool;
	onHistory;
	onAim;
	onFirstStroke;
	brushes = null;
	spark = null;
	tintHex = "";
	tinted = /* @__PURE__ */ new Map();
	wallId = "";
	wallImg = null;
	ww = 0;
	hh = 0;
	layers = /* @__PURE__ */ new Map();
	layerLoads = /* @__PURE__ */ new Map();
	shades = /* @__PURE__ */ new Map();
	lums = /* @__PURE__ */ new Map();
	images = /* @__PURE__ */ new Map();
	paint = null;
	pctx = null;
	shade = null;
	lum = null;
	detail = null;
	dctx = null;
	past = /* @__PURE__ */ new Map();
	future = /* @__PURE__ */ new Map();
	painted = /* @__PURE__ */ new Set();
	drips = [];
	pool = 0;
	ready = false;
	dead = false;
	dirty = false;
	dirtySave = false;
	told = false;
	down = false;
	moved = false;
	pointerId = null;
	pressure = .9;
	x = 0;
	y = 0;
	lastT = 0;
	dwell = 0;
	lastClientX = null;
	lastClientY = null;
	token = 0;
	raf = 0;
	lastFrame = 0;
	saveTimer = 0;
	ac = new AbortController();
	ro = null;
	audio = new SprayAudio();
	constructor(view, getTool, onHistory, onAim, onFirstStroke) {
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
		this.brushes = buildBrushes();
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
		if (this.dirtySave) this.flushSave();
		this.audio.close();
	}
	async setWall(id, url) {
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
			this.paint = this.layers.get(id);
			const pctx = this.paint.getContext("2d");
			if (!pctx) return;
			this.pctx = pctx;
			this.shade = this.shades.get(id);
			this.lum = this.lums.get(id);
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
		const snap = this.past.get(this.wallId)?.pop();
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
		const snap = this.future.get(this.wallId)?.pop();
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
	bind() {
		const signal = this.ac.signal;
		this.view.addEventListener("pointerdown", this.onDown, {
			signal,
			passive: false
		});
		this.view.addEventListener("contextmenu", (event) => event.preventDefault(), { signal });
		window.addEventListener("pointermove", this.onMove, {
			signal,
			passive: false
		});
		window.addEventListener("pointerup", this.onUp, { signal });
		window.addEventListener("pointercancel", this.onUp, { signal });
		document.addEventListener("visibilitychange", this.onHide, { signal });
		this.ro = new ResizeObserver(() => this.resize());
		this.ro.observe(this.view);
	}
	resize = () => {
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
	loop = (now) => {
		if (this.dead) return;
		const dt = Math.min(.05, Math.max(0, (now - this.lastFrame) / 1e3));
		this.lastFrame = now;
		if (this.down && this.ready) {
			if (!this.moved) this.hold(dt);
			const tool = this.getTool();
			this.audio.setSpraying(true, CAP_BY_ID[tool.cap].hz, tool.sound);
		} else this.audio.setSpraying(false, 1200, false);
		this.moved = false;
		if (this.drips.length) this.stepDrips(dt);
		if (this.dirty) {
			this.render();
			this.dirty = this.drips.length > 0;
		}
		this.raf = requestAnimationFrame(this.loop);
	};
	onDown = (event) => {
		if (!this.ready || !this.wallId || !this.pctx) return;
		if (event.pointerType === "mouse" && event.button !== 0) return;
		event.preventDefault();
		this.view.setPointerCapture(event.pointerId);
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
		const alpha = cap.alpha * (.55 + .45 * tool.flow) * this.pressure;
		this.stamp(point.x, point.y, diameter, alpha, tool);
		this.painted.add(this.wallId);
		this.dirty = true;
		if (!this.told) {
			this.told = true;
			this.onFirstStroke();
		}
		this.emitAim(event.clientX, event.clientY, event.target, true);
	};
	onMove = (event) => {
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
	onUp = (event) => {
		if (this.pointerId !== null && event.pointerId !== this.pointerId) return;
		const wasDown = this.down;
		this.down = false;
		this.pointerId = null;
		this.audio.setSpraying(false, 1200, false);
		if (wasDown) this.scheduleSave();
	};
	onHide = () => {
		if (document.hidden && this.dirtySave) this.flushSave();
	};
	strokeTo(clientX, clientY) {
		const point = this.toWall(clientX, clientY);
		const now = performance.now();
		let dt = (now - this.lastT) / 1e3;
		const dist = Math.hypot(point.x - this.x, point.y - this.y);
		if (dt < .001) {
			if (dist < .35) return;
			dt = dist / 2800;
		}
		dt = Math.min(.05, dt);
		this.paintSegment(this.x, this.y, point.x, point.y, dt);
		this.x = point.x;
		this.y = point.y;
		this.lastT = now;
		this.dirty = true;
		if (this.wallId) this.painted.add(this.wallId);
	}
	hold(dt) {
		if (!this.pctx) return;
		const tool = this.getTool();
		const cap = CAP_BY_ID[tool.cap];
		const diameter = cap.diameter * tool.distance;
		this.dwell += dt;
		let stamped = false;
		while (this.dwell >= .028) {
			this.dwell -= .028;
			const alpha = cap.alpha * (.5 + .5 * tool.flow) * this.pressure;
			this.stamp(this.x, this.y, diameter, alpha, tool);
			this.addPool(.028, 0, diameter, tool, cap);
			stamped = true;
		}
		if (stamped) {
			this.dirty = true;
			if (this.wallId) this.painted.add(this.wallId);
		}
	}
	paintSegment(x0, y0, x1, y1, dt) {
		const tool = this.getTool();
		const cap = CAP_BY_ID[tool.cap];
		const diameter = cap.diameter * tool.distance;
		const dist = Math.hypot(x1 - x0, y1 - y0);
		const speed = dist / Math.max(dt, .001);
		const coverage = 1 / (1 + speed / (diameter * 14));
		const spacing = Math.max(1.25, diameter * (.12 + .68 * (1 - coverage)) * (1.2 - .35 * tool.flow));
		const alpha = cap.alpha * (.34 + .66 * coverage) * (.32 + .68 * tool.flow) * this.pressure;
		const steps = Math.max(1, Math.round(dist / spacing));
		for (let i = 1; i <= steps; i++) {
			const t = i / steps;
			const x = x0 + (x1 - x0) * t;
			const y = y0 + (y1 - y0) * t;
			this.stamp(x, y, diameter, alpha, tool);
			this.addPool(dt / steps, speed, diameter, tool, cap);
		}
	}
	stamp(x, y, diameter, alpha, tool) {
		if (!this.pctx || !this.brushes || !this.spark) return;
		const cap = CAP_BY_ID[tool.cap];
		const set = this.brushes[cap.id];
		const vi = Math.random() * set.main.length | 0;
		const ctx = this.pctx;
		const main = set.main[vi];
		if (!main) return;
		const paint = resolvePaint(tool);
		ctx.save();
		ctx.translate(x + (Math.random() - .5) * diameter * .05, y + (Math.random() - .5) * diameter * .05);
		ctx.rotate(Math.random() * Math.PI * 2);
		ctx.globalAlpha = clamp01(alpha);
		if (cap.erase) {
			ctx.globalCompositeOperation = "destination-out";
			ctx.drawImage(main, -diameter / 2, -diameter / 2, diameter, diameter);
			const mist = set.mist[Math.random() * set.mist.length | 0];
			if (mist) {
				ctx.globalAlpha = clamp01(alpha * cap.mist);
				const md = diameter * cap.mistScale;
				ctx.drawImage(mist, -md / 2, -md / 2, md, md);
			}
		} else {
			const brush = this.tint(`${cap.id}-m-${vi}`, paint.hex, main);
			ctx.drawImage(brush, -diameter / 2, -diameter / 2, diameter, diameter);
			const mi = Math.random() * set.mist.length | 0;
			const mistSrc = set.mist[mi];
			if (mistSrc) {
				const mist = this.tint(`${cap.id}-s-${mi}`, paint.hex, mistSrc);
				ctx.globalAlpha = clamp01(alpha * cap.mist);
				const md = diameter * cap.mistScale;
				ctx.drawImage(mist, -md / 2, -md / 2, md, md);
			}
			if (paint.metallic) {
				ctx.globalCompositeOperation = "source-over";
				ctx.globalAlpha = .34;
				const s = diameter * (.42 + Math.random() * .2);
				ctx.drawImage(this.spark, -s / 2 + (Math.random() - .5) * diameter * .25, -s / 2 + (Math.random() - .5) * diameter * .25, s, s);
			}
		}
		ctx.restore();
	}
	addPool(dt, speed, diameter, tool, cap) {
		if (!tool.drips || cap.erase || cap.drip <= 0) return;
		const slow = 1 / (1 + speed / (diameter * 7));
		this.pool += dt * tool.flow * cap.drip * (.2 + slow) * 2.15 * this.pressure;
		let spawned = 0;
		while (this.pool > .18 && spawned < 2 && this.drips.length < 36) {
			this.pool -= .18;
			this.spawnDrip(diameter, tool);
			spawned++;
		}
	}
	spawnDrip(diameter, tool) {
		const { hex } = resolvePaint(tool);
		const [r, g, b] = hexToRgb(hex);
		this.drips.push({
			x: this.x + (Math.random() - .5) * diameter * .32,
			y: this.y + diameter * (.12 + Math.random() * .32),
			vy: 8 + Math.random() * 24,
			width: Math.max(2.1, diameter * (.042 + Math.random() * .034)),
			volume: .5 + Math.random() * .75,
			r,
			g,
			b,
			seed: Math.random() * 20,
			acc: 260 + Math.random() * 200,
			maxVy: 240 + Math.random() * 200
		});
	}
	stepDrips(dt) {
		if (!this.pctx || this.drips.length === 0) return;
		const ctx = this.pctx;
		ctx.save();
		ctx.globalCompositeOperation = "source-over";
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		for (let i = this.drips.length - 1; i >= 0; i--) {
			const drip = this.drips[i];
			const prevX = drip.x;
			const prevY = drip.y;
			drip.vy = Math.min(drip.maxVy, drip.vy + drip.acc * dt);
			if (Math.random() < dt * .55) drip.vy *= .6;
			drip.y += drip.vy * dt;
			drip.x += Math.sin(drip.y * .07 + drip.seed) * 16 * dt;
			drip.x += this.mortarBias(drip.x, drip.y) * 28 * dt;
			const rel = .66 + this.sample(drip.x, drip.y) / 255 * .42;
			ctx.strokeStyle = rgba(drip.r * rel, drip.g * rel, drip.b * rel, .78);
			ctx.lineWidth = Math.max(.8, drip.width);
			ctx.beginPath();
			ctx.moveTo(prevX, prevY);
			ctx.lineTo(drip.x, drip.y);
			ctx.stroke();
			ctx.fillStyle = rgba(Math.min(255, drip.r * rel * 1.08), Math.min(255, drip.g * rel * 1.08), Math.min(255, drip.b * rel * 1.08), .4);
			ctx.beginPath();
			ctx.arc(drip.x, drip.y, Math.max(.8, drip.width * .48), 0, Math.PI * 2);
			ctx.fill();
			drip.volume -= dt * (.26 + drip.vy / 980);
			if (drip.volume < .34) drip.width *= Math.max(.15, 1 - dt * 1.5);
			if (drip.volume > .42 && Math.random() < dt * .28 && this.drips.length < 36) {
				drip.volume *= .62;
				this.drips.push({
					x: drip.x + (Math.random() - .5) * 4,
					y: drip.y,
					vy: drip.vy * .72,
					width: drip.width * .62,
					volume: drip.volume * .48,
					r: drip.r,
					g: drip.g,
					b: drip.b,
					seed: Math.random() * 20,
					acc: drip.acc,
					maxVy: drip.maxVy
				});
			}
			if (drip.volume <= 0 || drip.width < .7 || drip.y > this.hh + 10) this.drips.splice(i, 1);
		}
		ctx.restore();
		this.dirty = true;
	}
	render() {
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
	cover() {
		const vw = this.view.width || 1;
		const vh = this.view.height || 1;
		const s = Math.max(vw / Math.max(1, this.ww), vh / Math.max(1, this.hh));
		const dw = this.ww * s;
		const dh = this.hh * s;
		return {
			s,
			dw,
			dh,
			ox: (vw - dw) / 2,
			oy: (vh - dh) / 2
		};
	}
	toWall(clientX, clientY) {
		const rect = this.view.getBoundingClientRect();
		const vx = (clientX - rect.left) / Math.max(1, rect.width) * this.view.width;
		const vy = (clientY - rect.top) / Math.max(1, rect.height) * this.view.height;
		const { s, ox, oy } = this.cover();
		return {
			x: (vx - ox) / s,
			y: (vy - oy) / s
		};
	}
	emitAim(clientX, clientY, target, forceVisible = false) {
		this.lastClientX = clientX;
		this.lastClientY = clientY;
		const tool = this.getTool();
		const cap = CAP_BY_ID[tool.cap];
		const diameter = cap.diameter * tool.distance * Math.max(1, cap.mistScale);
		const rect = this.view.getBoundingClientRect();
		const { s } = this.cover();
		const css = this.ww ? diameter * s * (rect.width / Math.max(1, this.view.width)) : 48;
		const overUi = !!(target instanceof Element ? target : null)?.closest("[data-ui]");
		const { hex } = resolvePaint(tool);
		this.onAim({
			x: clientX,
			y: clientY,
			d: Math.max(12, css),
			hex,
			visible: forceVisible || !overUi && this.lastClientX != null
		});
	}
	tint(slot, hex, src) {
		if (hex !== this.tintHex) {
			this.tintHex = hex;
			this.tinted.clear();
		}
		const cached = this.tinted.get(slot);
		if (cached) return cached;
		const canvas = document.createElement("canvas");
		canvas.width = src.width;
		canvas.height = src.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return src;
		ctx.drawImage(src, 0, 0);
		ctx.globalCompositeOperation = "source-in";
		ctx.fillStyle = hex;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.tinted.set(slot, canvas);
		return canvas;
	}
	sample(x, y) {
		if (!this.lum || !this.ww) return 150;
		const ix = Math.max(0, Math.min(this.ww - 1, x | 0));
		const iy = Math.max(0, Math.min(this.hh - 1, y | 0));
		return this.lum[iy * this.ww + ix] ?? 150;
	}
	mortarBias(x, y) {
		return (this.sample(x - 2, y + 3) - this.sample(x + 2, y + 3)) / 255;
	}
	pushHistory() {
		if (!this.paint || !this.wallId) return;
		const stack = this.pastStack();
		stack.push(cloneCanvas(this.paint));
		if (stack.length > HISTORY_LIMIT) stack.shift();
		this.future.set(this.wallId, []);
		this.emitHistory();
	}
	pastStack() {
		return this.bucket(this.past);
	}
	futureStack() {
		return this.bucket(this.future);
	}
	bucket(map) {
		let stack = map.get(this.wallId);
		if (!stack) {
			stack = [];
			map.set(this.wallId, stack);
		}
		return stack;
	}
	emitHistory() {
		if (!this.wallId) {
			this.onHistory({
				canUndo: false,
				canRedo: false
			});
			return;
		}
		this.onHistory({
			canUndo: (this.past.get(this.wallId)?.length ?? 0) > 0,
			canRedo: (this.future.get(this.wallId)?.length ?? 0) > 0
		});
	}
	scheduleSave() {
		this.dirtySave = true;
		window.clearTimeout(this.saveTimer);
		this.saveTimer = window.setTimeout(() => void this.flushSave(), 420);
	}
	async flushSave() {
		if (!this.dirtySave || !this.wallId || !this.paint) return;
		const id = this.wallId;
		const canvas = this.paint;
		this.dirtySave = false;
		const blob = await toBlob(canvas);
		if (!blob || this.dead) return;
		await idbPut(id, blob);
	}
	async restore(id, canvas) {
		const blob = await idbGet(id);
		if (!blob || this.painted.has(id) || this.dead) return;
		try {
			const bitmap = await createImageBitmap(blob);
			if (this.painted.has(id) || this.dead) {
				bitmap.close();
				return;
			}
			canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
			bitmap.close();
			this.dirty = true;
		} catch {}
	}
};
var SprayAudio = class {
	ctx = null;
	gain = null;
	filter = null;
	setSpraying(on, hz, enabled) {
		if (!enabled || !on) {
			if (this.ctx && this.gain) this.gain.gain.setTargetAtTime(0, this.ctx.currentTime, .04);
			return;
		}
		this.ensure();
		if (!this.ctx || !this.gain || !this.filter) return;
		if (this.ctx.state === "suspended") this.ctx.resume();
		const time = this.ctx.currentTime;
		this.filter.frequency.setTargetAtTime(hz, time, .05);
		this.gain.gain.setTargetAtTime(.04, time, .03);
	}
	close() {
		const ctx = this.ctx;
		this.ctx = null;
		this.gain = null;
		this.filter = null;
		if (ctx) ctx.close();
	}
	ensure() {
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
		filter.Q.value = .55;
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
};
function buildBrushes() {
	const ids = Object.keys(CAP_BY_ID);
	const sets = {};
	for (const id of ids) {
		const cap = CAP_BY_ID[id];
		sets[id] = {
			main: [
				0,
				1,
				2
			].map(() => makeBrush(cap.brush)),
			mist: [0, 1].map(() => makeBrush(cap.mistBrush))
		};
	}
	return sets;
}
function makeBrush(spec) {
	const canvas = document.createElement("canvas");
	canvas.width = spec.size;
	canvas.height = spec.size;
	const ctx = canvas.getContext("2d");
	if (!ctx) return canvas;
	const cx = spec.size / 2;
	const maxR = spec.size * .48;
	const total = spec.count + Math.floor(spec.count * spec.sat);
	ctx.fillStyle = "#fff";
	for (let i = 0; i < total; i++) {
		const satellite = i >= spec.count;
		const ang = Math.random() * Math.PI * 2;
		const rad = satellite ? maxR * (.82 + Math.random() * .42) : maxR * Math.pow(Math.random(), spec.focus);
		let radius = spec.dotMin + Math.random() * (spec.dotMax - spec.dotMin);
		let alpha = spec.aMin + Math.random() * (spec.aMax - spec.aMin);
		if (!satellite && Math.random() < .04) {
			radius *= 2.3;
			alpha = Math.min(.85, alpha * 1.8);
		}
		ctx.globalAlpha = alpha;
		ctx.beginPath();
		ctx.arc(cx + Math.cos(ang) * rad, cx + Math.sin(ang) * rad, radius, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.globalAlpha = 1;
	ctx.globalCompositeOperation = "destination-in";
	const gradient = ctx.createRadialGradient(cx, cx, spec.size * .05, cx, cx, spec.size * .5);
	gradient.addColorStop(0, "rgba(0,0,0,1)");
	gradient.addColorStop(.42, "rgba(0,0,0,0.95)");
	gradient.addColorStop(.72, "rgba(0,0,0,0.55)");
	gradient.addColorStop(1, "rgba(0,0,0,0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, spec.size, spec.size);
	return canvas;
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
		const rad = Math.pow(Math.random(), .7) * 30;
		ctx.globalAlpha = .25 + Math.random() * .75;
		ctx.beginPath();
		ctx.arc(36 + Math.cos(ang) * rad, 36 + Math.sin(ang) * rad, .6 + Math.random() * 1.1, 0, Math.PI * 2);
		ctx.fill();
	}
	return canvas;
}
function analyze(img) {
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
	if (!sctx || !shadeCtx) return {
		shade,
		lum
	};
	sctx.drawImage(img, 0, 0);
	const image = sctx.getImageData(0, 0, w, h);
	const shadeImage = shadeCtx.createImageData(w, h);
	const d = image.data;
	const sd = shadeImage.data;
	for (let i = 0, p = 0; i < d.length; i += 4, p++) {
		const y = d[i] * .299 + d[i + 1] * .587 + d[i + 2] * .114;
		lum[p] = y | 0;
		let c = (y - 128) * 1.65 + 118;
		c = c * .78 + 52;
		const v = c < 0 ? 0 : c > 255 ? 255 : c;
		sd[i] = sd[i + 1] = sd[i + 2] = v;
		sd[i + 3] = 255;
	}
	shadeCtx.putImageData(shadeImage, 0, 0);
	return {
		shade,
		lum
	};
}
function cloneCanvas(src) {
	const canvas = document.createElement("canvas");
	canvas.width = src.width;
	canvas.height = src.height;
	canvas.getContext("2d")?.drawImage(src, 0, 0);
	return canvas;
}
function loadImage(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("wall"));
		img.src = url;
	});
}
function hexToRgb(hex) {
	const n = Number.parseInt(hex.slice(1), 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function rgba(r, g, b, a) {
	return `rgba(${clamp255(r)},${clamp255(g)},${clamp255(b)},${a})`;
}
function clamp255(value) {
	return Math.max(0, Math.min(255, value)) | 0;
}
function clamp01(value) {
	return Math.max(.02, Math.min(1, value));
}
function readPressure(event) {
	if (event.pointerType === "pen") return Math.max(.12, event.pressure || .4);
	return .92;
}
function toBlob(canvas) {
	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			if (blob) resolve(blob);
			else canvas.toBlob((fallback) => resolve(fallback), "image/png");
		}, "image/webp", .82);
	});
}
function openDb() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 1);
		request.onupgradeneeded = () => {
			if (!request.result.objectStoreNames.contains(DB_STORE)) request.result.createObjectStore(DB_STORE);
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}
async function idbPut(id, blob) {
	try {
		const db = await openDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(DB_STORE, "readwrite");
			tx.objectStore(DB_STORE).put(blob, id);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
		db.close();
	} catch {}
}
async function idbGet(id) {
	try {
		const db = await openDb();
		const blob = await new Promise((resolve, reject) => {
			const request = db.transaction(DB_STORE, "readonly").objectStore(DB_STORE).get(id);
			request.onsuccess = () => resolve(request.result ?? null);
			request.onerror = () => reject(request.error);
		});
		db.close();
		return blob;
	} catch {
		return null;
	}
}
function cx(...parts) {
	return parts.filter(Boolean).join(" ");
}
function AlleyStudio() {
	const canvasRef = (0, import_react.useRef)(null);
	const ringRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	const toolRef = (0, import_react.useRef)(DEFAULT_TOOL);
	const [tool, setTool] = (0, import_react.useState)(DEFAULT_TOOL);
	const [hint, setHint] = (0, import_react.useState)(true);
	const [hist, setHist] = (0, import_react.useState)({
		canUndo: false,
		canRedo: false
	});
	const persistReady = (0, import_react.useRef)(false);
	toolRef.current = tool;
	const onHistory = (0, import_react.useCallback)((state) => setHist(state), []);
	const onFirstStroke = (0, import_react.useCallback)(() => setHint(false), []);
	const onAim = (0, import_react.useCallback)((aim) => {
		const ring = ringRef.current;
		if (!ring) return;
		ring.hidden = !aim.visible;
		ring.style.transform = `translate(${aim.x}px, ${aim.y}px) translate(-50%, -50%)`;
		ring.style.width = `${aim.d}px`;
		ring.style.height = `${aim.d}px`;
		ring.style.setProperty("--aim-color", aim.hex);
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const engine = new SprayEngine(canvas, () => toolRef.current, onHistory, onAim, onFirstStroke);
		engineRef.current = engine;
		engine.start();
		return () => {
			engine.destroy();
			engineRef.current = null;
		};
	}, [
		onAim,
		onFirstStroke,
		onHistory
	]);
	(0, import_react.useEffect)(() => {
		const stored = readStoredTool();
		if (stored) setTool(stored);
		persistReady.current = true;
	}, []);
	(0, import_react.useEffect)(() => {
		if (!persistReady.current) return;
		writeStoredTool(tool);
		engineRef.current?.refreshAim();
	}, [tool]);
	(0, import_react.useEffect)(() => {
		const wall = WALLS.find((item) => item.id === tool.wallId) ?? WALLS[0];
		engineRef.current?.setWall(wall.id, wall.src);
	}, [tool.wallId]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
			const key = event.key.toLowerCase();
			const meta = event.metaKey || event.ctrlKey;
			if (meta && key === "z" && !event.shiftKey) {
				event.preventDefault();
				engineRef.current?.undo();
			} else if (meta && key === "z" && event.shiftKey || meta && key === "y") {
				event.preventDefault();
				engineRef.current?.redo();
			} else if (key === "[") setTool((current) => ({
				...current,
				distance: Math.max(.55, current.distance - .06)
			}));
			else if (key === "]") setTool((current) => ({
				...current,
				distance: Math.min(1.75, current.distance + .06)
			}));
			else if (key >= "1" && key <= "5") {
				const cap = CAPS[Number(key) - 1];
				if (cap) setTool((current) => ({
					...current,
					cap: cap.id
				}));
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const paint = resolvePaint(tool);
	const wall = WALLS.find((item) => item.id === tool.wallId) ?? WALLS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "stage fixed inset-0 overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: wall.src,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover",
				fetchPriority: "high",
				draggable: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 h-full w-full cursor-none touch-none",
				"aria-label": "Кирпичная стена. Рисуйте мышью, пером или пальцем."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: ringRef,
				className: "aim pointer-events-none fixed top-0 left-0 z-20 rounded-full",
				hidden: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-30 flex flex-col gap-3 p-3 sm:p-4",
				style: { paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-ui": true,
						className: "pointer-events-auto flex items-center gap-3 rounded-xl border border-border bg-bg px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SprayCan, {
							className: "size-5 shrink-0",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-xl leading-none tracking-widest",
								children: "ПЕРЕУЛОК"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: "Лос-Анджелес"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-ui": true,
						className: "pointer-events-auto flex gap-2 rounded-lg border border-border bg-bg p-2",
						role: "radiogroup",
						"aria-label": "Стена",
						children: WALLS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "radio",
							"aria-checked": tool.wallId === item.id,
							"aria-label": item.name,
							title: item.name,
							onClick: () => setTool((current) => ({
								...current,
								wallId: item.id
							})),
							className: cx("size-11 overflow-hidden rounded-sm border bg-cover bg-center", tool.wallId === item.id ? "border-fg" : "border-border"),
							style: { backgroundImage: `url(${item.src})` }
						}, item.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-col gap-2",
					children: [hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto max-w-md rounded-md bg-bg px-3 py-2 text-center text-sm text-muted",
						children: "Веди медленно — слой ляжет плотно и потечёт. Быстрый росчерк оставляет зерно баллона."
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-ui": true,
						className: "pointer-events-auto flex flex-col gap-3 rounded-xl border border-border bg-bg p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "scroller -mx-1 flex gap-2 overflow-x-auto px-1 py-1",
								role: "listbox",
								"aria-label": "Цвет",
								children: [PAINTS.map((item) => {
									const active = tool.paintId === item.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "option",
										"aria-selected": active,
										"aria-label": item.name,
										title: item.name,
										onClick: () => setTool((current) => ({
											...current,
											paintId: item.id
										})),
										className: cx("size-11 shrink-0 rounded-full border", active ? "border-fg ring-2 ring-fg ring-offset-2 ring-offset-bg" : "border-border"),
										style: { backgroundColor: item.hex }
									}, item.id);
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: cx("relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border", tool.paintId === "custom" ? "border-fg ring-2 ring-fg ring-offset-2 ring-offset-bg" : "border-dashed border-muted"),
									style: { backgroundColor: tool.customHex },
									title: "Свой цвет",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Свой цвет"
										}),
										tool.paintId === "custom" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
											className: "size-4 text-bg",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "color",
											value: tool.customHex,
											"aria-label": "Свой цвет",
											className: "absolute inset-0 opacity-0",
											onChange: (event) => setTool((current) => ({
												...current,
												paintId: "custom",
												customHex: event.target.value
											}))
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "scroller flex gap-2 overflow-x-auto",
								role: "radiogroup",
								"aria-label": "Кэп",
								children: CAPS.map((cap) => {
									const active = tool.cap === cap.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "radio",
										"aria-checked": active,
										onClick: () => setTool((current) => ({
											...current,
											cap: cap.id
										})),
										className: cx("h-11 shrink-0 rounded-md px-3 text-sm font-medium", active ? "bg-fg text-accent-fg" : "bg-surface-2 text-fg"),
										children: cap.label
									}, cap.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-w-0 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-20 shrink-0 text-xs text-muted",
										children: "Дистанция"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "spray-range min-w-0 flex-1",
										type: "range",
										min: .55,
										max: 1.75,
										step: .01,
										value: tool.distance,
										"aria-label": "Дистанция от стены",
										onChange: (event) => setTool((current) => ({
											...current,
											distance: Number(event.target.value)
										}))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-w-0 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-20 shrink-0 text-xs text-muted",
										children: "Напор"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "spray-range min-w-0 flex-1",
										type: "range",
										min: .22,
										max: 1,
										step: .01,
										value: tool.flow,
										"aria-label": "Напор краски",
										onChange: (event) => setTool((current) => ({
											...current,
											flow: Number(event.target.value)
										}))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-pressed": tool.drips,
									onClick: () => setTool((current) => ({
										...current,
										drips: !current.drips
									})),
									className: cx("inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium", tool.drips ? "bg-fg text-accent-fg" : "bg-surface-2 text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
										className: "size-5",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden md:inline",
										children: "Потёки"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ml-auto flex gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											label: "Шаг назад",
											disabled: !hist.canUndo,
											onClick: () => engineRef.current?.undo(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											label: "Шаг вперёд",
											disabled: !hist.canRedo,
											onClick: () => engineRef.current?.redo(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											label: tool.sound ? "Выключить шипение" : "Включить шипение",
											pressed: tool.sound,
											onClick: () => setTool((current) => ({
												...current,
												sound: !current.sound
											})),
											children: tool.sound ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											label: "Смыть стену",
											onClick: () => engineRef.current?.clear(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											label: "Скачать",
											onClick: () => engineRef.current?.download(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-5" })
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "sr-only",
								children: [
									"Сейчас ",
									paint.name,
									". Кэп ",
									CAPS.find((cap) => cap.id === tool.cap)?.label,
									"."
								]
							})
						]
					})]
				})]
			})
		]
	});
}
function IconButton({ label, children, disabled, pressed, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		disabled,
		"aria-pressed": pressed,
		onClick,
		className: cx("inline-flex size-11 items-center justify-center rounded-md", pressed ? "bg-fg text-accent-fg" : "bg-surface-2 text-fg", disabled && "opacity-40"),
		children
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlleyStudio, {});
}
//#endregion
export { Home as component };
