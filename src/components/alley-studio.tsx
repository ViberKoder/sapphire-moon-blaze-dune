import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Download,
  Droplets,
  Plus,
  Redo2,
  SprayCan,
  Trash2,
  Undo2,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  CAPS,
  DEFAULT_TOOL,
  PAINTS,
  WALLS,
  readStoredTool,
  resolvePaint,
  writeStoredTool,
  type CapId,
  type Tool,
  type WallId,
} from "@/lib/alley-data";
import { SprayEngine, type AimState, type HistoryState } from "@/lib/spray-engine";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function AlleyStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<SprayEngine | null>(null);
  const toolRef = useRef<Tool>(DEFAULT_TOOL);
  const [tool, setTool] = useState<Tool>(DEFAULT_TOOL);
  const [hint, setHint] = useState(true);
  const [hist, setHist] = useState<HistoryState>({ canUndo: false, canRedo: false });
  const persistReady = useRef(false);
  toolRef.current = tool;

  const onHistory = useCallback((state: HistoryState) => setHist(state), []);
  const onFirstStroke = useCallback(() => setHint(false), []);
  const onAim = useCallback((aim: AimState) => {
    const ring = ringRef.current;
    if (!ring) return;
    ring.hidden = !aim.visible;
    ring.style.transform = `translate(${aim.x}px, ${aim.y}px) translate(-50%, -50%)`;
    ring.style.width = `${aim.d}px`;
    ring.style.height = `${aim.d}px`;
    ring.style.setProperty("--aim-color", aim.hex);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new SprayEngine(canvas, () => toolRef.current, onHistory, onAim, onFirstStroke);
    engineRef.current = engine;
    engine.start();
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [onAim, onFirstStroke, onHistory]);

  useEffect(() => {
    const stored = readStoredTool();
    if (stored) setTool(stored);
    persistReady.current = true;
  }, []);

  useEffect(() => {
    if (!persistReady.current) return;
    writeStoredTool(tool);
    engineRef.current?.refreshAim();
  }, [tool]);

  useEffect(() => {
    const wall = WALLS.find((item) => item.id === tool.wallId) ?? WALLS[0]!;
    void engineRef.current?.setWall(wall.id, wall.src);
  }, [tool.wallId]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      const key = event.key.toLowerCase();
      const meta = event.metaKey || event.ctrlKey;
      if (meta && key === "z" && !event.shiftKey) {
        event.preventDefault();
        engineRef.current?.undo();
      } else if ((meta && key === "z" && event.shiftKey) || (meta && key === "y")) {
        event.preventDefault();
        engineRef.current?.redo();
      } else if (key === "[") {
        setTool((current) => ({ ...current, distance: Math.max(0.55, current.distance - 0.06) }));
      } else if (key === "]") {
        setTool((current) => ({ ...current, distance: Math.min(1.75, current.distance + 0.06) }));
      } else if (key >= "1" && key <= "5") {
        const cap = CAPS[Number(key) - 1];
        if (cap) setTool((current) => ({ ...current, cap: cap.id }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const paint = resolvePaint(tool);
  const wall = WALLS.find((item) => item.id === tool.wallId) ?? WALLS[0]!;

  return (
    <main className="stage fixed inset-0 overflow-hidden bg-bg text-fg">
      <img
        src={wall.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        draggable={false}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-none touch-none"
        aria-label="Кирпичная стена. Рисуйте мышью, пером или пальцем."
      />
      <div ref={ringRef} className="aim pointer-events-none fixed top-0 left-0 z-20 rounded-full" hidden />

      <div
        className="pointer-events-none absolute inset-0 z-30 flex flex-col gap-3 p-3 sm:p-4"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-start justify-between gap-2">
          <div data-ui className="pointer-events-auto flex items-center gap-3 rounded-xl border border-border bg-bg px-3 py-2">
            <SprayCan className="size-5 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <h1 className="font-display text-xl leading-none tracking-widest">ПЕРЕУЛОК</h1>
              <p className="mt-1 text-xs text-muted">Лос-Анджелес</p>
            </div>
          </div>
          <div
            data-ui
            className="pointer-events-auto flex gap-2 rounded-lg border border-border bg-bg p-2"
            role="radiogroup"
            aria-label="Стена"
          >
            {WALLS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={tool.wallId === item.id}
                aria-label={item.name}
                title={item.name}
                onClick={() => setTool((current) => ({ ...current, wallId: item.id as WallId }))}
                className={cx(
                  "size-11 overflow-hidden rounded-sm border bg-cover bg-center",
                  tool.wallId === item.id ? "border-fg" : "border-border",
                )}
                style={{ backgroundImage: `url(${item.src})` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {hint ? (
            <p className="mx-auto max-w-md rounded-md bg-bg px-3 py-2 text-center text-sm text-muted">
              Веди медленно — слой ляжет плотно и потечёт. Быстрый росчерк оставляет зерно баллона.
            </p>
          ) : null}

          <div data-ui className="pointer-events-auto flex flex-col gap-3 rounded-xl border border-border bg-bg p-3">
            <div className="scroller -mx-1 flex gap-2 overflow-x-auto px-1 py-1" role="listbox" aria-label="Цвет">
              {PAINTS.map((item) => {
                const active = tool.paintId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={active}
                    aria-label={item.name}
                    title={item.name}
                    onClick={() => setTool((current) => ({ ...current, paintId: item.id }))}
                    className={cx(
                      "size-11 shrink-0 rounded-full border",
                      active ? "border-fg ring-2 ring-fg ring-offset-2 ring-offset-bg" : "border-border",
                    )}
                    style={{ backgroundColor: item.hex }}
                  />
                );
              })}
              <label
                className={cx(
                  "relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border",
                  tool.paintId === "custom" ? "border-fg ring-2 ring-fg ring-offset-2 ring-offset-bg" : "border-dashed border-muted",
                )}
                style={{ backgroundColor: tool.customHex }}
                title="Свой цвет"
              >
                <span className="sr-only">Свой цвет</span>
                {tool.paintId === "custom" ? null : <Plus className="size-4 text-bg" aria-hidden="true" />}
                <input
                  type="color"
                  value={tool.customHex}
                  aria-label="Свой цвет"
                  className="absolute inset-0 opacity-0"
                  onChange={(event) =>
                    setTool((current) => ({
                      ...current,
                      paintId: "custom",
                      customHex: event.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="scroller flex gap-2 overflow-x-auto" role="radiogroup" aria-label="Кэп">
              {CAPS.map((cap) => {
                const active = tool.cap === cap.id;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setTool((current) => ({ ...current, cap: cap.id as CapId }))}
                    className={cx(
                      "h-11 shrink-0 rounded-md px-3 text-sm font-medium",
                      active ? "bg-fg text-accent-fg" : "bg-surface-2 text-fg",
                    )}
                  >
                    {cap.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex min-w-0 items-center gap-2">
                <span className="w-20 shrink-0 text-xs text-muted">Дистанция</span>
                <input
                  className="spray-range min-w-0 flex-1"
                  type="range"
                  min={0.55}
                  max={1.75}
                  step={0.01}
                  value={tool.distance}
                  aria-label="Дистанция от стены"
                  onChange={(event) =>
                    setTool((current) => ({ ...current, distance: Number(event.target.value) }))
                  }
                />
              </label>
              <label className="flex min-w-0 items-center gap-2">
                <span className="w-20 shrink-0 text-xs text-muted">Напор</span>
                <input
                  className="spray-range min-w-0 flex-1"
                  type="range"
                  min={0.22}
                  max={1}
                  step={0.01}
                  value={tool.flow}
                  aria-label="Напор краски"
                  onChange={(event) =>
                    setTool((current) => ({ ...current, flow: Number(event.target.value) }))
                  }
                />
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-pressed={tool.drips}
                onClick={() => setTool((current) => ({ ...current, drips: !current.drips }))}
                className={cx(
                  "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium",
                  tool.drips ? "bg-fg text-accent-fg" : "bg-surface-2 text-fg",
                )}
              >
                <Droplets className="size-5" aria-hidden="true" />
                <span className="hidden md:inline">Потёки</span>
              </button>
              <div className="ml-auto flex gap-2">
                <IconButton label="Шаг назад" disabled={!hist.canUndo} onClick={() => engineRef.current?.undo()}>
                  <Undo2 className="size-5" />
                </IconButton>
                <IconButton label="Шаг вперёд" disabled={!hist.canRedo} onClick={() => engineRef.current?.redo()}>
                  <Redo2 className="size-5" />
                </IconButton>
                <IconButton
                  label={tool.sound ? "Выключить шипение" : "Включить шипение"}
                  pressed={tool.sound}
                  onClick={() => setTool((current) => ({ ...current, sound: !current.sound }))}
                >
                  {tool.sound ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
                </IconButton>
                <IconButton label="Смыть стену" onClick={() => engineRef.current?.clear()}>
                  <Trash2 className="size-5" />
                </IconButton>
                <IconButton label="Скачать" onClick={() => engineRef.current?.download()}>
                  <Download className="size-5" />
                </IconButton>
              </div>
            </div>
            <p className="sr-only">Сейчас {paint.name}. Кэп {CAPS.find((cap) => cap.id === tool.cap)?.label}.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function IconButton({
  label,
  children,
  disabled,
  pressed,
  onClick,
}: {
  label: string;
  children: ReactNode;
  disabled?: boolean;
  pressed?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        "inline-flex size-11 items-center justify-center rounded-md",
        pressed ? "bg-fg text-accent-fg" : "bg-surface-2 text-fg",
        disabled && "opacity-40",
      )}
    >
      {children}
    </button>
  );
}
