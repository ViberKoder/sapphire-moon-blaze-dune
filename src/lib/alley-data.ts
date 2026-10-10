import block from "@/assets/walls/block.jpg";
import buff from "@/assets/walls/buff.jpg";
import night from "@/assets/walls/night.jpg";

export type WallId = "night" | "buff" | "block";
export type CapId = "skinny" | "fat" | "soft" | "astro" | "wipe";

export type CapSpec = {
  id: CapId;
  label: string;
  diameter: number;
  /** How many droplets a full, slow stamp throws. */
  dots: number;
  focus: number;
  dotMin: number;
  dotMax: number;
  aMin: number;
  aMax: number;
  sat: number;
  mist: number;
  mistScale: number;
  drip: number;
  erase: boolean;
  hz: number;
};

export type Paint = {
  id: string;
  name: string;
  hex: string;
  metal: boolean;
};

export type WallDef = {
  id: WallId;
  name: string;
  src: string;
};

export const WALLS: WallDef[] = [
  { id: "night", name: "Ночь", src: night },
  { id: "buff", name: "Бафф", src: buff },
  { id: "block", name: "Блок", src: block },
];

export const PAINTS: Paint[] = [
  { id: "black", name: "Чёрный", hex: "#161616", metal: false },
  { id: "white", name: "Белый", hex: "#f3f0e7", metal: false },
  { id: "red", name: "Красный", hex: "#e10600", metal: false },
  { id: "blood", name: "Бордо", hex: "#8a1c24", metal: false },
  { id: "orange", name: "Оранжевый", hex: "#f25c05", metal: false },
  { id: "yellow", name: "Жёлтый", hex: "#ffe14a", metal: false },
  { id: "lime", name: "Лайм", hex: "#c6e02a", metal: false },
  { id: "green", name: "Зелёный", hex: "#178a3c", metal: false },
  { id: "teal", name: "Бирюза", hex: "#14968f", metal: false },
  { id: "blue", name: "Синий", hex: "#1a3fd4", metal: false },
  { id: "royal", name: "Электрик", hex: "#3c6bff", metal: false },
  { id: "purple", name: "Фиолетовый", hex: "#5b2db8", metal: false },
  { id: "pink", name: "Розовый", hex: "#e21878", metal: false },
  { id: "brown", name: "Коричневый", hex: "#6b3e2a", metal: false },
  { id: "chrome", name: "Хром", hex: "#c5ced6", metal: true },
  { id: "gold", name: "Золото", hex: "#e0b34a", metal: true },
];

export const CAPS: CapSpec[] = [
  {
    id: "skinny",
    label: "Скинни",
    diameter: 32,
    dots: 54,
    focus: 2.5,
    dotMin: 0.85,
    dotMax: 1.7,
    aMin: 0.35,
    aMax: 0.72,
    sat: 0.14,
    mist: 0.45,
    mistScale: 1.65,
    drip: 0.35,
    erase: false,
    hz: 3400,
  },
  {
    id: "fat",
    label: "Фэт",
    diameter: 84,
    dots: 150,
    focus: 1.35,
    dotMin: 1.25,
    dotMax: 2.7,
    aMin: 0.28,
    aMax: 0.62,
    sat: 0.2,
    mist: 0.55,
    mistScale: 1.85,
    drip: 1,
    erase: false,
    hz: 1450,
  },
  {
    id: "soft",
    label: "Софт",
    diameter: 150,
    dots: 110,
    focus: 0.78,
    dotMin: 1.6,
    dotMax: 3.4,
    aMin: 0.16,
    aMax: 0.4,
    sat: 0.28,
    mist: 0.7,
    mistScale: 1.55,
    drip: 0.55,
    erase: false,
    hz: 880,
  },
  {
    id: "astro",
    label: "Астро",
    diameter: 16,
    dots: 16,
    focus: 3.4,
    dotMin: 1.15,
    dotMax: 2.1,
    aMin: 0.55,
    aMax: 0.9,
    sat: 0.08,
    mist: 0.2,
    mistScale: 1.45,
    drip: 0.08,
    erase: false,
    hz: 4700,
  },
  {
    id: "wipe",
    label: "Смывка",
    diameter: 72,
    dots: 70,
    focus: 1.15,
    dotMin: 1.8,
    dotMax: 3.6,
    aMin: 0.35,
    aMax: 0.7,
    sat: 0.12,
    mist: 0.35,
    mistScale: 1.4,
    drip: 0,
    erase: true,
    hz: 1700,
  },
];

export const CAP_BY_ID: Record<CapId, CapSpec> = Object.fromEntries(
  CAPS.map((cap) => [cap.id, cap]),
) as Record<CapId, CapSpec>;

export type Tool = {
  wallId: WallId;
  cap: CapId;
  paintId: string;
  customHex: string;
  distance: number;
  flow: number;
  drips: boolean;
  sound: boolean;
};

export const DEFAULT_TOOL: Tool = {
  wallId: "night",
  cap: "fat",
  paintId: "red",
  customHex: "#3c6bff",
  distance: 1,
  flow: 0.72,
  drips: true,
  sound: true,
};

export function resolvePaint(tool: Tool): { hex: string; metallic: boolean; name: string } {
  if (tool.paintId === "custom") {
    return { hex: tool.customHex, metallic: false, name: "Свой цвет" };
  }
  const paint = PAINTS.find((item) => item.id === tool.paintId) ?? PAINTS[2]!;
  return { hex: paint.hex, metallic: paint.metal, name: paint.name };
}

const STORAGE_KEY = "pereulok-tool";

export function readStoredTool(): Tool | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Tool>;
    const wallId = WALLS.some((wall) => wall.id === parsed.wallId) ? parsed.wallId! : DEFAULT_TOOL.wallId;
    const cap = CAPS.some((item) => item.id === parsed.cap) ? parsed.cap! : DEFAULT_TOOL.cap;
    const paintId =
      parsed.paintId === "custom" || PAINTS.some((paint) => paint.id === parsed.paintId)
        ? parsed.paintId!
        : DEFAULT_TOOL.paintId;
    const customHex =
      typeof parsed.customHex === "string" && /^#[0-9a-fA-F]{6}$/.test(parsed.customHex)
        ? parsed.customHex
        : DEFAULT_TOOL.customHex;
    const distance =
      typeof parsed.distance === "number"
        ? Math.min(1.75, Math.max(0.55, parsed.distance))
        : DEFAULT_TOOL.distance;
    const flow =
      typeof parsed.flow === "number" ? Math.min(1, Math.max(0.22, parsed.flow)) : DEFAULT_TOOL.flow;
    return {
      wallId,
      cap,
      paintId,
      customHex,
      distance,
      flow,
      drips: typeof parsed.drips === "boolean" ? parsed.drips : DEFAULT_TOOL.drips,
      sound: typeof parsed.sound === "boolean" ? parsed.sound : DEFAULT_TOOL.sound,
    };
  } catch {
    return null;
  }
}

export function writeStoredTool(tool: Tool) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tool));
  } catch {
    /* quota or private mode */
  }
}
