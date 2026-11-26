// Semitic Triangles: board geometry, alphabets and rules.
//
// The board is an endless lattice of equilateral triangles. Every lattice
// point (vertex) holds one consonant; every triangle holds one three-letter
// root, its letters sitting on the triangle's three corners. Because corners
// are shared, a letter written at a point belongs to all six triangles that
// meet there, and two triangles that share a side share two letters.

// ---------------------------------------------------------------- geometry

/** Height of an equilateral triangle with unit sides. */
export const H = Math.sqrt(3) / 2;

/** Vertex (q, r) in axial lattice coordinates. */
export type Vertex = readonly [number, number];
/** Triangle: k = 0 points down (flat top), k = 1 points up (flat bottom). */
export type Tri = readonly [number, number, 0 | 1];

export const vKey = ([q, r]: Vertex) => `${q},${r}`;
export const tKey = ([q, r, k]: Tri) => `${q},${r},${k}`;
export const parseTri = (key: string): Tri => {
  const [q, r, k] = key.split(",").map(Number);
  return [q, r, k as 0 | 1];
};

/** The three corners of a triangle, in a fixed order. */
export const triVerts = ([q, r, k]: Tri): [Vertex, Vertex, Vertex] =>
  k === 0
    ? [[q, r], [q + 1, r], [q, r + 1]]
    : [[q + 1, r], [q + 1, r + 1], [q, r + 1]];

/** The six triangles that meet at a vertex. */
export const trisAround = ([q, r]: Vertex): Tri[] => [
  [q, r, 0], [q - 1, r, 0], [q, r - 1, 0],
  [q - 1, r, 1], [q, r - 1, 1], [q - 1, r - 1, 1],
];

/** World position of a vertex (unit side length, y grows downward). */
export const vPos = ([q, r]: Vertex): [number, number] => [q + r / 2, r * H];

export const triCentroid = (t: Tri): [number, number] => {
  const ps = triVerts(t).map(vPos);
  return [(ps[0][0] + ps[1][0] + ps[2][0]) / 3, (ps[0][1] + ps[1][1] + ps[2][1]) / 3];
};

/** Which triangle contains a world point. */
export const triAt = (x: number, y: number): Tri => {
  const rf = y / H;
  const qf = x - rf / 2;
  const q = Math.floor(qf);
  const r = Math.floor(rf);
  return [q, r, qf - q + (rf - r) < 1 ? 0 : 1];
};

// --------------------------------------------------------------- alphabets

export type AlphabetId = "canaanite" | "arabic";
export type ScriptId = "hebrew" | "paleo" | "arabic";

type Letter = { id: string; translit: string; keys?: string[] };

// Letters are stored by their square-Hebrew form (or Arabic form), and
// drawn in whichever script the players choose. Paleo-Hebrew/Phoenician and
// square Hebrew are the same 22-letter alphabet, so a game can switch
// between them at any time.
const CANAANITE: Letter[] = [
  { id: "א", translit: "ʾ", keys: ["a", "'"] },
  { id: "ב", translit: "b", keys: ["b"] },
  { id: "ג", translit: "g", keys: ["g"] },
  { id: "ד", translit: "d", keys: ["d"] },
  { id: "ה", translit: "h", keys: ["h"] },
  { id: "ו", translit: "w", keys: ["w", "v"] },
  { id: "ז", translit: "z", keys: ["z"] },
  { id: "ח", translit: "ḥ", keys: ["x", "H"] },
  { id: "ט", translit: "ṭ", keys: ["T"] },
  { id: "י", translit: "y", keys: ["y", "i", "j"] },
  { id: "כ", translit: "k", keys: ["k"] },
  { id: "ל", translit: "l", keys: ["l"] },
  { id: "מ", translit: "m", keys: ["m"] },
  { id: "נ", translit: "n", keys: ["n"] },
  { id: "ס", translit: "s", keys: ["s"] },
  { id: "ע", translit: "ʿ", keys: ["e", "`"] },
  { id: "פ", translit: "p", keys: ["p", "f"] },
  { id: "צ", translit: "ṣ", keys: ["c"] },
  { id: "ק", translit: "q", keys: ["q"] },
  { id: "ר", translit: "r", keys: ["r"] },
  { id: "ש", translit: "š", keys: ["S", "$"] },
  { id: "ת", translit: "t", keys: ["t"] },
];

const PHOENICIAN = Array.from({ length: 22 }, (_, i) => String.fromCodePoint(0x10900 + i));

const ARABIC: Letter[] = [
  ["ء", "ʾ"], ["ب", "b"], ["ت", "t"], ["ث", "ṯ"], ["ج", "j"], ["ح", "ḥ"], ["خ", "ḫ"],
  ["د", "d"], ["ذ", "ḏ"], ["ر", "r"], ["ز", "z"], ["س", "s"], ["ش", "š"], ["ص", "ṣ"],
  ["ض", "ḍ"], ["ط", "ṭ"], ["ظ", "ẓ"], ["ع", "ʿ"], ["غ", "ġ"], ["ف", "f"], ["ق", "q"],
  ["ك", "k"], ["ل", "l"], ["م", "m"], ["ن", "n"], ["ه", "h"], ["و", "w"], ["ي", "y"],
].map(([id, translit]) => ({ id, translit }));

export const ALPHABETS: Record<AlphabetId, { label: string; letters: Letter[]; scripts: ScriptId[] }> = {
  canaanite: { label: "Hebrew / Paleo-Hebrew (22)", letters: CANAANITE, scripts: ["paleo", "hebrew"] },
  arabic: { label: "Arabic (28)", letters: ARABIC, scripts: ["arabic"] },
};

export const SCRIPT_LABEL: Record<ScriptId, string> = {
  paleo: "Paleo-Hebrew",
  hebrew: "Square Hebrew",
  arabic: "Arabic",
};

export const SCRIPT_FONT: Record<ScriptId, string> = {
  paleo: "'Noto Sans Phoenician', 'Segoe UI Historic', sans-serif",
  hebrew: "'Noto Serif Hebrew', 'Times New Roman', serif",
  arabic: "'Noto Naskh Arabic', 'Noto Sans Arabic', serif",
};

/** How a stored letter is drawn in a script. */
export const glyph = (id: string, script: ScriptId) => {
  if (script !== "paleo") return id;
  const i = CANAANITE.findIndex((l) => l.id === id);
  return i < 0 ? id : PHOENICIAN[i];
};

export const translit = (id: string, alphabet: AlphabetId) =>
  ALPHABETS[alphabet].letters.find((l) => l.id === id)?.translit ?? id;

const HEBREW_FINALS: Record<string, string> = { ך: "כ", ם: "מ", ן: "נ", ף: "פ", ץ: "צ" };
const ARABIC_VARIANTS: Record<string, string> = { ا: "ء", أ: "ء", إ: "ء", آ: "ء", ؤ: "ء", ئ: "ء", ى: "ي", ة: "ت" };

/** Map a typed key (native script, Phoenician, or Latin transliteration) to a letter id. */
export const letterFromKey = (key: string, alphabet: AlphabetId): string | null => {
  const letters = ALPHABETS[alphabet].letters;
  if (alphabet === "canaanite") {
    const k = HEBREW_FINALS[key] ?? key;
    if (letters.some((l) => l.id === k)) return k;
    const p = PHOENICIAN.indexOf(key);
    if (p >= 0) return letters[p].id;
    // Exact match first so that "S" (shin) and "s" (samekh) stay distinct.
    const exact = letters.find((l) => l.keys?.includes(key));
    if (exact) return exact.id;
    return letters.find((l) => l.keys?.includes(key.toLowerCase()))?.id ?? null;
  }
  const k = ARABIC_VARIANTS[key] ?? key;
  return letters.some((l) => l.id === k) ? k : null;
};

// ------------------------------------------------------------------- game

export type Player = { name: string; color: string };

export type Move = {
  tri: string;
  /** The root as named, first radical first. */
  root: string[];
  /** The letter placed on each corner, in triVerts order. */
  corners: string[];
  gloss: string;
  player: number;
};

export type Game = {
  version: 1;
  alphabet: AlphabetId;
  script: ScriptId;
  players: Player[];
  moves: Move[];
  /** Whose turn it is. Passing moves the pen on without leaving a record. */
  turn: number;
};

export const PLAYER_COLORS = ["#b5532f", "#3d5a80", "#6b7d2a", "#8a4f7d"];

export const newGame = (alphabet: AlphabetId, names: string[]): Game => ({
  version: 1,
  alphabet,
  script: ALPHABETS[alphabet].scripts[0],
  players: names.map((name, i) => ({ name, color: PLAYER_COLORS[i % PLAYER_COLORS.length] })),
  moves: [],
  turn: 0,
});

export type Board = {
  /** Letter at each lettered vertex. */
  letters: Map<string, string>;
  /** Claimed triangles and the move index that claimed them. */
  claimed: Map<string, number>;
  /** Roots already played, as joined strings. */
  used: Set<string>;
  /** Unclaimed triangles that touch at least one lettered vertex. */
  open: Set<string>;
};

export const boardOf = (game: Game): Board => {
  const letters = new Map<string, string>();
  const claimed = new Map<string, number>();
  const used = new Set<string>();
  game.moves.forEach((m, i) => {
    claimed.set(m.tri, i);
    used.add(m.root.join(""));
    triVerts(parseTri(m.tri)).forEach((v, j) => letters.set(vKey(v), m.corners[j]));
  });
  const open = new Set<string>();
  for (const m of game.moves) {
    for (const v of triVerts(parseTri(m.tri))) {
      for (const t of trisAround(v)) {
        const k = tKey(t);
        if (!claimed.has(k)) open.add(k);
      }
    }
  }
  return { letters, claimed, used, open };
};

/** Letters already fixed on a triangle's corners (null where blank). */
export const fixedCorners = (board: Board, tri: Tri) =>
  triVerts(tri).map((v) => board.letters.get(vKey(v)) ?? null);

const PERMS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];

/**
 * Every way to lay a root's letters onto a triangle's corners that agrees
 * with the letters already there. Each result lists the letter per corner.
 */
export const arrangements = (fixed: (string | null)[], root: string[]): string[][] => {
  if (root.length !== 3) return [];
  const seen = new Set<string>();
  const out: string[][] = [];
  for (const p of PERMS) {
    const corners = p.map((i) => root[i]);
    if (corners.every((l, j) => fixed[j] === null || fixed[j] === l)) {
      const k = corners.join("");
      if (!seen.has(k)) {
        seen.add(k);
        out.push(corners);
      }
    }
  }
  return out;
};

export type Verdict = { ok: boolean; reason?: string };

/** Can this triangle be played at all (before a root is named)? */
export const canPlayAt = (game: Game, board: Board, tri: Tri): Verdict => {
  const k = tKey(tri);
  if (board.claimed.has(k)) return { ok: false, reason: "That triangle already holds a root." };
  if (game.moves.length > 0 && !board.open.has(k))
    return { ok: false, reason: "A new triangle has to touch a letter already on the board." };
  return { ok: true };
};

export const checkRoot = (game: Game, board: Board, tri: Tri, root: string[]): Verdict => {
  const at = canPlayAt(game, board, tri);
  if (!at.ok) return at;
  if (root.length < 3) return { ok: false, reason: "Name all three radicals." };
  if (board.used.has(root.join(""))) return { ok: false, reason: "That root has already been played." };
  const fixed = fixedCorners(board, tri);
  if (arrangements(fixed, root).length === 0) {
    const need = fixed.filter(Boolean) as string[];
    return {
      ok: false,
      reason: `This triangle needs a root containing ${need.map((l) => glyph(l, game.script)).join(" + ")}.`,
    };
  }
  return { ok: true };
};

/** Scores: triangles claimed per player. */
export const scores = (game: Game) =>
  game.players.map((_, i) => game.moves.filter((m) => m.player === i).length);

// ------------------------------------------------------------ persistence

const isGame = (g: unknown): g is Game => {
  const x = g as Game;
  return (
    !!x && x.version === 1 && (x.alphabet === "canaanite" || x.alphabet === "arabic") &&
    Array.isArray(x.players) && x.players.length > 0 && Array.isArray(x.moves) &&
    x.moves.every((m) => typeof m.tri === "string" && Array.isArray(m.root) && Array.isArray(m.corners)) &&
    typeof x.turn === "number"
  );
};

const toB64Url = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromB64Url = (s: string) => {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};

export const encodeGame = (game: Game) => toB64Url(JSON.stringify(game));

export const decodeGame = (s: string): Game | null => {
  try {
    const g = JSON.parse(fromB64Url(s));
    return isGame(g) ? g : null;
  } catch {
    return null;
  }
};

export const parseStoredGame = (s: string | null): Game | null => {
  if (!s) return null;
  try {
    const g = JSON.parse(s);
    return isGame(g) ? g : null;
  } catch {
    return null;
  }
};
