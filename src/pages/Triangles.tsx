import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft, Crosshair, ExternalLink, Link2, Minus, Plus, RotateCw, SkipForward, Undo2, X,
} from "lucide-react";
import {
  ALPHABETS, AlphabetId, Game, H, LANGUAGES, Lexicon, RootSense, buildRootIndex, lookupRoot, SCRIPT_FONT, SCRIPT_LABEL, ScriptId, Tri,
  arrangements, boardOf, canPlayAt, checkRoot, decodeGame, encodeGame, fixedCorners, glyph,
  letterFromKey, newGame, parseStoredGame, parseTri, scores, tKey, translit, triAt, triCentroid,
  triVerts, vPos,
} from "@/lib/triangles";

const STORAGE_KEY = "semitic-triangles:game";
const ESSAY_URL = "https://whitmanic.substack.com/p/semitic-triangles-the-most-obscure";
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@500&family=Noto+Sans+Phoenician&family=Noto+Sans+Syriac:wght@500&family=Noto+Serif+Hebrew:wght@500&display=swap";

type Camera = { x: number; y: number; z: number };
const MIN_Z = 18;
const MAX_Z = 240;
const clampZ = (z: number) => Math.min(MAX_Z, Math.max(MIN_Z, z));

const defaultGame = () => newGame("canaanite", ["Player 1", "Player 2"]);

// Centre of the played area, so a loaded game opens where the action is.
const centreOf = (game: Game): [number, number] => {
  if (game.moves.length === 0) return [0.5, H / 3];
  let x = 0, y = 0;
  for (const m of game.moves) {
    const [cx, cy] = triCentroid(parseTri(m.tri));
    x += cx; y += cy;
  }
  return [x / game.moves.length, y / game.moves.length];
};

const rootText = (root: string[], game: Game) => root.map((l) => glyph(l, game.script)).join(" ");
const rootTranslit = (root: string[], game: Game) => root.map((l) => translit(l, game.alphabet)).join("-");

// ===================================================================== page

const Triangles = () => {
  const [game, setGame] = useState<Game>(defaultGame);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [root, setRoot] = useState<string[]>([]);
  const [arrIdx, setArrIdx] = useState(0);
  const [gloss, setGloss] = useState("");
  // Kept between moves: players tend to stay in one language for a while.
  const [lang, setLang] = useState("");
  const [inspected, setInspected] = useState<number | null>(null);
  const [setupOpen, setSetupOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  // A script from the other alphabet, waiting for the player to agree to a fresh board.
  const [pendingScript, setPendingScript] = useState<ScriptId | null>(null);
  const [lex, setLex] = useState<Lexicon | null>(null);
  const [cam, setCam] = useState<Camera>({ x: 0.5, y: H / 3, z: 130 });

  const board = useMemo(() => boardOf(game), [game]);
  const rootIndex = useMemo(() => (lex ? buildRootIndex(lex, game.alphabet) : null), [lex, game.alphabet]);
  const rootInfo = rootIndex && root.length === 3 ? lookupRoot(rootIndex, root) : null;
  const selTri = selected ? parseTri(selected) : null;
  const fixed = selTri ? fixedCorners(board, selTri) : null;
  const arrs = fixed && root.length === 3 ? arrangements(fixed, root) : [];
  const verdict = selTri ? checkRoot(game, board, selTri, root) : null;
  const preview = arrs.length ? arrs[arrIdx % arrs.length] : null;
  const current = game.players[game.turn % game.players.length];

  // Fonts for the three scripts, loaded only on this page.
  useEffect(() => {
    if (document.querySelector(`link[href="${FONTS_HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS_HREF;
    document.head.appendChild(link);
  }, []);

  // The root dictionary loads separately so the board appears at once.
  useEffect(() => {
    import("@/data/roots.json").then((m) => setLex(m.default as unknown as Lexicon)).catch(() => {});
  }, []);

  // Load: a shared link wins, then this browser's saved game.
  useEffect(() => {
    let g: Game | null = null;
    const m = window.location.hash.match(/^#g=(.+)$/);
    if (m) {
      g = decodeGame(m[1]);
      if (g) toast.success("Loaded the shared game. Your move, if it's your turn.");
      else toast.error("That game link couldn't be read.");
      history.replaceState(null, "", window.location.pathname);
    }
    if (!g) {
      try { g = parseStoredGame(localStorage.getItem(STORAGE_KEY)); } catch { /* storage blocked */ }
    }
    if (g) {
      setGame(g);
      const [x, y] = centreOf(g);
      setCam((c) => ({ ...c, x, y }));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(game)); } catch { /* storage blocked */ }
  }, [game, loaded]);

  const clearComposer = () => {
    setSelected(null);
    setRoot([]);
    setArrIdx(0);
    setGloss("");
  };

  const place = useCallback(() => {
    if (!selTri || !verdict?.ok || !preview) return;
    // With no meaning typed, take the dictionary's.
    const known = rootInfo?.senses.find((s) => !lang || s.lang === lang) ?? rootInfo?.senses[0];
    const meaning = gloss.trim() || known?.gloss || "";
    const language = lang || (!gloss.trim() && known ? known.lang : "");
    setGame((g) => ({
      ...g,
      moves: [...g.moves, { tri: tKey(selTri), root, corners: preview, gloss: meaning, ...(language ? { lang: language } : {}), player: g.turn }],
      turn: (g.turn + 1) % g.players.length,
    }));
    clearComposer();
  }, [selTri, verdict, preview, root, gloss, lang, rootInfo]);

  const pass = () => {
    clearComposer();
    setGame((g) => ({ ...g, turn: (g.turn + 1) % g.players.length }));
  };

  const undo = () => {
    if (!game.moves.length) return;
    const last = game.moves[game.moves.length - 1];
    clearComposer();
    setInspected(null);
    setGame((g) => ({ ...g, moves: g.moves.slice(0, -1), turn: last.player }));
    toast(`Took back ${rootText(last.root, game)}.`);
  };

  const addLetter = useCallback((l: string) => {
    setRoot((r) => (r.length < 3 ? [...r, l] : r));
    setArrIdx(0);
  }, []);

  // Typing: native script, Phoenician, or Latin transliteration.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (!selected || t.closest("input, textarea, select")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") clearComposer();
      else if (e.key === "Backspace") { setRoot((r) => r.slice(0, -1)); setArrIdx(0); e.preventDefault(); }
      else if (e.key === "Enter") { place(); e.preventDefault(); }
      else if (e.key === "Tab" && arrs.length > 1) { setArrIdx((i) => i + 1); e.preventDefault(); }
      else {
        const l = letterFromKey(e.key, game.alphabet);
        if (l) { addLetter(l); e.preventDefault(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, place, arrs.length, game.alphabet, addLetter]);

  const onTriClick = (tri: Tri) => {
    const k = tKey(tri);
    const claimedBy = board.claimed.get(k);
    if (claimedBy !== undefined) {
      setInspected(claimedBy);
      clearComposer();
      return;
    }
    setInspected(null);
    const v = canPlayAt(game, board, tri);
    if (!v.ok) {
      toast(v.reason);
      return;
    }
    if (k !== selected) {
      setSelected(k);
      // On a phone the entry panel sits below the board: bring it into view.
      if (window.matchMedia("(max-width: 1023px)").matches)
        setTimeout(() => document.getElementById("composer")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      setRoot([]);
      setArrIdx(0);
      setGloss("");
    }
  };

  const focusMove = (i: number) => {
    const [x, y] = triCentroid(parseTri(game.moves[i].tri));
    setCam((c) => ({ ...c, x, y }));
    setInspected(i);
    clearComposer();
  };

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#g=${encodeGame(game)}`;
    setShareUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied. Send it to your opponent; they play and send one back.");
    } catch {
      toast("Copy the link below and send it to your opponent.");
    }
  };

  const alphabetOf = (s: ScriptId) =>
    (Object.keys(ALPHABETS) as AlphabetId[]).find((a) => ALPHABETS[a].scripts.includes(s))!;

  // Scripts of the same alphabet redraw the board; the other alphabet needs a new game.
  const chooseScript = (s: ScriptId) => {
    const a = alphabetOf(s);
    if (a === game.alphabet) {
      setGame((g) => ({ ...g, script: s }));
      setPendingScript(null);
    } else if (game.moves.length === 0) {
      startGame(a, game.players.map((p) => p.name), s);
    } else {
      setPendingScript(s);
    }
  };

  const startGame = (alphabet: AlphabetId, names: string[], script?: ScriptId) => {
    const g = { ...newGame(alphabet, names), ...(script ? { script } : {}) };
    setPendingScript(null);
    setGame(g);
    clearComposer();
    setInspected(null);
    setCam((c) => ({ ...c, x: 0.5, y: H / 3 }));
    setSetupOpen(false);
  };

  const sc = scores(game);
  const fontFamily = SCRIPT_FONT[game.script];
  const letters = ALPHABETS[game.alphabet].letters;
  const needed = new Set((fixed ?? []).filter(Boolean) as string[]);
  const inspectedMove = inspected !== null ? game.moves[inspected] : null;

  return (
    <div className="bg-background text-foreground lg:h-[100dvh] lg:flex lg:overflow-hidden">
      {/* Board */}
      <div className="relative h-[55dvh] lg:h-auto lg:flex-1 border-b lg:border-b-0 lg:border-r border-border">
        <BoardView
          game={game}
          board={board}
          cam={cam}
          setCam={setCam}
          selected={selected}
          preview={preview}
          inspected={inspected}
          fontFamily={fontFamily}
          onTriClick={onTriClick}
        />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          <div className="pointer-events-auto bg-background/85 backdrop-blur rounded-md px-2.5 py-1.5 lg:px-3 lg:py-2 border border-border/60">
            <Link to="/essays" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-body">
              <ArrowLeft className="w-3 h-3" /> josh-lipson.com
            </Link>
            <h1 className="font-display text-xl lg:text-2xl leading-tight">Semitic Triangles</h1>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 flex flex-col gap-1">
          {[
            { icon: Plus, label: "Zoom in", fn: () => setCam((c) => ({ ...c, z: clampZ(c.z * 1.25) })) },
            { icon: Minus, label: "Zoom out", fn: () => setCam((c) => ({ ...c, z: clampZ(c.z / 1.25) })) },
            { icon: Crosshair, label: "Back to the game", fn: () => { const [x, y] = centreOf(game); setCam((c) => ({ ...c, x, y })); } },
          ].map(({ icon: Icon, label, fn }) => (
            <button key={label} onClick={fn} title={label} aria-label={label}
              className="w-9 h-9 grid place-items-center rounded-md bg-background/90 border border-border hover:bg-secondary">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <aside className="lg:w-[380px] lg:overflow-y-auto font-body text-sm">
        <div className="p-5 space-y-6">
          {/* Players */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs tracking-[0.25em] uppercase text-primary">
                {game.players.length > 1 ? "Turn" : "Solo game"}
              </h2>
              <div className="flex gap-1">
                {game.players.length > 1 && (
                  <button onClick={pass} className="flex items-center gap-1 px-2 py-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                    title="Can't think of a root? Hand over the pen. No record is kept of the fumble.">
                    <SkipForward className="w-3.5 h-3.5" /> Pass
                  </button>
                )}
                <button onClick={undo} disabled={!game.moves.length}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:pointer-events-none">
                  <Undo2 className="w-3.5 h-3.5" /> Undo
                </button>
              </div>
            </div>
            <ul className="space-y-1">
              {game.players.map((p, i) => {
                const active = i === game.turn % game.players.length;
                return (
                  <li key={i} className={`flex items-center gap-2 px-3 py-2 rounded border ${active ? "border-foreground/30 bg-secondary/60" : "border-transparent"}`}>
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: p.color }} />
                    <span className={`flex-1 ${active ? "font-medium" : "text-muted-foreground"}`}>{p.name}</span>
                    <span className="tabular-nums text-muted-foreground">{sc[i]} {sc[i] === 1 ? "root" : "roots"}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Composer */}
          <section id="composer" className="rounded-lg border border-border p-4 bg-card scroll-mt-4">
            {selTri ? (
              <Composer
                game={game}
                root={root}
                setRoot={(r) => { setRoot(r); setArrIdx(0); }}
                addLetter={addLetter}
                letters={letters}
                needed={needed}
                fixed={fixed!}
                arrCount={arrs.length}
                arrIdx={arrIdx}
                cycle={() => setArrIdx((i) => i + 1)}
                gloss={gloss}
                setGloss={setGloss}
                lang={lang}
                setLang={setLang}
                rootInfo={rootInfo}
                lexReady={!!lex}
                useSense={(s: RootSense) => { setGloss(s.gloss); setLang(s.lang); }}
                verdict={verdict!}
                place={place}
                cancel={clearComposer}
                playerName={current.name}
                playerColor={current.color}
                fontFamily={fontFamily}
              />
            ) : inspectedMove ? (
              <div>
                <div className="flex items-start justify-between">
                  <p className="text-xs text-muted-foreground mb-1">
                    Root {inspected! + 1} · {game.players[inspectedMove.player]?.name}
                    {inspectedMove.lang && <> · {inspectedMove.lang}</>}
                  </p>
                  <button onClick={() => setInspected(null)} aria-label="Close" className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p dir="rtl" className="text-3xl text-right" style={{ fontFamily }}>{rootText(inspectedMove.root, game)}</p>
                <p className="text-muted-foreground mt-1">
                  {rootTranslit(inspectedMove.root, game)}
                  {inspectedMove.gloss && <> · <span className="italic text-foreground/80">{inspectedMove.gloss}</span></>}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">{current.name}</span>
                {game.moves.length === 0
                  ? ": tap any triangle to lay down the first root."
                  : ": tap a shaded triangle beside the letters to add a root."}
                <span className="block mt-2 text-xs">Drag to move around, scroll or pinch to zoom.</span>
              </p>
            )}
          </section>

          {/* Moves */}
          {game.moves.length > 0 && (
            <section>
              <h2 className="text-xs tracking-[0.25em] uppercase text-primary mb-3">Roots played</h2>
              <ol className="space-y-0.5 max-h-72 overflow-y-auto pr-1">
                {[...game.moves].map((m, i) => ({ m, i })).reverse().map(({ m, i }) => (
                  <li key={i}>
                    <button onClick={() => focusMove(i)}
                      className={`w-full flex items-baseline gap-3 px-2 py-1.5 rounded text-left hover:bg-secondary/70 ${inspected === i ? "bg-secondary" : ""}`}>
                      <span className="w-6 text-xs text-muted-foreground tabular-nums">{i + 1}</span>
                      <span className="w-2 h-2 rounded-full shrink-0 self-center" style={{ background: game.players[m.player]?.color }} />
                      <span dir="rtl" className="text-lg w-16 text-right" style={{ fontFamily }}>{rootText(m.root, game)}</span>
                      <span className="text-muted-foreground truncate">
                        {rootTranslit(m.root, game)}{m.gloss && <span className="italic"> · {m.gloss}</span>}
                        {m.lang && <span className="ml-1.5 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary text-muted-foreground not-italic">{m.lang}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Game controls */}
          <section className="space-y-3">
            <h2 className="text-xs tracking-[0.25em] uppercase text-primary">Game</h2>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Script</p>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(ALPHABETS) as AlphabetId[]).map((a) => (
                  <div key={a} className="flex rounded-md border border-border overflow-hidden">
                    {ALPHABETS[a].scripts.map((s: ScriptId) => (
                      <button key={s} onClick={() => chooseScript(s)} aria-pressed={game.script === s}
                        className={`px-3 py-1.5 ${game.script === s ? "bg-secondary font-medium" : "text-muted-foreground hover:bg-secondary/50"}`}>
                        {SCRIPT_LABEL[s]}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                Paleo-Hebrew and Hebrew share a board, so you can switch between them mid-game. Syriac and Arabic each have a board of their own.
              </p>
              {pendingScript && (
                <div className="mt-2 rounded-md border border-border p-3 space-y-2 bg-card">
                  <p>{SCRIPT_LABEL[pendingScript]} uses a different alphabet, so it needs a fresh board. This clears the current game ({game.moves.length} {game.moves.length === 1 ? "root" : "roots"}).</p>
                  <div className="flex gap-2">
                    <button onClick={() => startGame(alphabetOf(pendingScript), game.players.map((p) => p.name), pendingScript)}
                      className="flex-1 py-1.5 rounded-md bg-primary text-primary-foreground font-medium">
                      New {SCRIPT_LABEL[pendingScript]} game
                    </button>
                    <button onClick={() => setPendingScript(null)} className="px-3 py-1.5 rounded-md border border-border hover:bg-secondary">Cancel</button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={share} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:bg-secondary">
                <Link2 className="w-3.5 h-3.5" /> Copy game link
              </button>
              <button onClick={() => setSetupOpen((o) => !o)} className="px-3 py-1.5 rounded-md border border-border hover:bg-secondary">
                New game
              </button>
            </div>
            {shareUrl && (
              <div className="flex gap-1.5">
                <input id="share-url" readOnly value={shareUrl} onFocus={(e) => e.currentTarget.select()}
                  aria-label="Game link" className="flex-1 min-w-0 px-2 py-1.5 rounded border border-input bg-background text-xs" />
                <button onClick={() => setShareUrl(null)} aria-label="Hide link" className="px-2 rounded border border-border hover:bg-secondary">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {setupOpen && <Setup game={game} onStart={startGame} onCancel={() => setSetupOpen(false)} />}
          </section>

          {/* Rules */}
          <section>
            <details className="group" open={!loaded || game.moves.length === 0}>
              <summary className="cursor-pointer text-xs tracking-[0.25em] uppercase text-primary list-none flex items-center gap-2">
                <span className="transition-transform group-open:rotate-90">›</span> How to play
              </summary>
              <div className="mt-3 space-y-2 text-muted-foreground leading-relaxed">
                <p>Each triangle holds one three-letter Semitic root, one radical on each corner. Where six triangles meet at a point, they all share that letter.</p>
                <p>So a new root has to fit the letters already on its corners: one shared letter with every triangle it touches at a point, two with every triangle it shares a side with.</p>
                <p>Any root from any Semitic language is fair game: Hebrew, Aramaic, Arabic, Akkadian, Ge'ez and the rest, spelled in this game's alphabet. Tag each root with its language if you like. No root may be played twice. Stuck? Pass the pen; no record is kept of the fumble.</p>
                <p>Playing alone, keep going until you drop. Playing apart, copy the game link after your move and send it.</p>
                <p className="text-xs">
                  When a root is laid down, the game looks it up in Wiktionary (CC BY-SA 4.0, via kaikki.org), Brown–Driver–Briggs (Hebrew and Aramaic; digital edition by the Open Scriptures Hebrew Bible Project, CC BY 4.0) and Lane's <i>Arabic-English Lexicon</i> (text provided by Perseus Digital Library, with funding from The U.S. Department of Education and The Max Planck Society). A root missing from all three is still fair: they don't cover Akkadian, Ge'ez or the rest.
                </p>
                <a href={ESSAY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                  The essay behind the game <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </details>
          </section>
        </div>
      </aside>
    </div>
  );
};

// ==================================================================== board

type BoardProps = {
  game: Game;
  board: ReturnType<typeof boardOf>;
  cam: Camera;
  setCam: React.Dispatch<React.SetStateAction<Camera>>;
  selected: string | null;
  preview: string[] | null;
  inspected: number | null;
  fontFamily: string;
  onTriClick: (t: Tri) => void;
};

const BoardView = ({ game, board, cam, setCam, selected, preview, inspected, fontFamily, onTriClick }: BoardProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const [hover, setHover] = useState<string | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ moved: 0, pinch: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toWorld = useCallback((px: number, py: number, c: Camera) => {
    const rect = ref.current!.getBoundingClientRect();
    return [c.x + (px - rect.left - rect.width / 2) / c.z, c.y + (py - rect.top - rect.height / 2) / c.z] as const;
  }, []);

  // Wheel zoom about the cursor (needs a non-passive listener).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setCam((c) => {
        const z = clampZ(c.z * Math.exp(-e.deltaY * 0.0015));
        const [wx, wy] = toWorld(e.clientX, e.clientY, c);
        return { x: wx - (wx - c.x) * (c.z / z), y: wy - (wy - c.y) * (c.z / z), z };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setCam, toWorld]);

  const onPointerDown = (e: React.PointerEvent) => {
    ref.current!.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) gesture.current = { moved: 0, pinch: 0 };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current.pinch = Math.hypot(a.x - b.x, a.y - b.y);
      gesture.current.moved = 99; // never a tap
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = pointers.current.get(e.pointerId);
    if (!p) {
      if (e.pointerType === "mouse") {
        const [wx, wy] = toWorld(e.clientX, e.clientY, cam);
        setHover(tKey(triAt(wx, wy)));
      }
      return;
    }
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      gesture.current.moved += Math.abs(dx) + Math.abs(dy);
      if (gesture.current.moved > 6) setCam((c) => ({ ...c, x: c.x - dx / c.z, y: c.y - dy / c.z }));
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const ratio = d / (gesture.current.pinch || d);
      gesture.current.pinch = d;
      setCam((c) => {
        const z = clampZ(c.z * ratio);
        const [wx, wy] = toWorld(mx, my, c);
        return { x: wx - (wx - c.x) * (c.z / z) - dx / 2 / z, y: wy - (wy - c.y) * (c.z / z) - dy / 2 / z, z };
      });
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const wasTap = pointers.current.size === 1 && gesture.current.moved <= 6;
    pointers.current.delete(e.pointerId);
    if (wasTap) {
      const [wx, wy] = toWorld(e.clientX, e.clientY, cam);
      onTriClick(triAt(wx, wy));
    }
  };

  // Visible world rectangle, padded by a cell.
  const vw = size.w / cam.z, vh = size.h / cam.z;
  const x0 = cam.x - vw / 2 - 1, x1 = cam.x + vw / 2 + 1;
  const y0 = cam.y - vh / 2 - 1, y1 = cam.y + vh / 2 + 1;
  const k = 1 / Math.sqrt(3);

  // Grid: three families of parallel lines.
  const lines: string[] = [];
  for (let r = Math.floor(y0 / H); r <= Math.ceil(y1 / H); r++) lines.push(`M${x0} ${r * H}H${x1}`);
  const qMin = Math.floor(x0 - y1 * k), qMax = Math.ceil(x1 - y0 * k);
  for (let q = qMin; q <= qMax; q++) lines.push(`M${q + y0 * k} ${y0}L${q + y1 * k} ${y1}`);
  const sMin = Math.floor(x0 + y0 * k), sMax = Math.ceil(x1 + y1 * k);
  for (let s = sMin; s <= sMax; s++) lines.push(`M${s - y0 * k} ${y0}L${s - y1 * k} ${y1}`);

  const triPath = (key: string) => {
    const ps = triVerts(parseTri(key)).map(vPos);
    return `M${ps[0][0]} ${ps[0][1]}L${ps[1][0]} ${ps[1][1]}L${ps[2][0]} ${ps[2][1]}Z`;
  };

  // Letters sit just inside each corner, as in the notebook: a point shared
  // by six triangles shows its letter six times around it.
  const cornerLetters = (key: string, corners: (string | null)[], opts: { fill: string; opacity?: number }) => {
    const t = parseTri(key);
    const [cx, cy] = triCentroid(t);
    return triVerts(t).map((v, j) => {
      const l = corners[j];
      if (!l) return null;
      const [vx, vy] = vPos(v);
      return (
        <text key={`${key}-${j}`} x={vx + (cx - vx) * 0.34} y={vy + (cy - vy) * 0.34}
          fontSize={0.2} textAnchor="middle" dominantBaseline="central"
          fill={opts.fill} opacity={opts.opacity ?? 1} style={{ fontFamily }}>
          {glyph(l, game.script)}
        </text>
      );
    });
  };

  const first = game.moves.length === 0;
  const playableHover = hover && !board.claimed.has(hover) && (first || board.open.has(hover)) && hover !== selected;
  const selFixed = selected ? fixedCorners(board, parseTri(selected)) : null;

  return (
    <svg
      ref={ref}
      className="w-full h-full block select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
      viewBox={`${cam.x - vw / 2} ${cam.y - vh / 2} ${vw} ${vh}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={(e) => pointers.current.delete(e.pointerId)}
      onPointerLeave={() => setHover(null)}
      role="application"
      aria-label="Semitic Triangles board"
    >
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="hsl(var(--background))" />

      {/* Open triangles: where the next root can go. */}
      {[...board.open].map((key) => (
        <path key={key} d={triPath(key)} fill="hsl(var(--primary))" opacity={0.06} />
      ))}

      {/* Claimed triangles. */}
      {game.moves.map((m, i) => (
        <path key={m.tri} d={triPath(m.tri)} fill={game.players[m.player]?.color ?? "#888"}
          opacity={inspected === i ? 0.28 : 0.11} />
      ))}

      {playableHover && <path d={triPath(hover!)} fill="hsl(var(--primary))" opacity={0.12} />}

      <path d={lines.join("")} stroke="hsl(var(--foreground))" strokeOpacity={0.22}
        strokeWidth={1} vectorEffect="non-scaling-stroke" fill="none" />

      {selected && (
        <path d={triPath(selected)} fill="hsl(var(--primary))" fillOpacity={0.14}
          stroke="hsl(var(--primary))" strokeWidth={2.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      )}

      {/* Points that carry a letter. */}
      {[...board.letters.keys()].map((vk) => {
        const [q, r] = vk.split(",").map(Number);
        const [x, y] = vPos([q, r]);
        return <circle key={vk} cx={x} cy={y} r={0.025} fill="hsl(var(--foreground))" opacity={0.6} />;
      })}

      {game.moves.map((m, i) => {
        const [cx, cy] = triCentroid(parseTri(m.tri));
        return (
          <g key={m.tri}>
            {cornerLetters(m.tri, m.corners, { fill: "hsl(var(--foreground))" })}
            <text x={cx} y={cy} fontSize={0.09} textAnchor="middle" dominantBaseline="central"
              fill="hsl(var(--muted-foreground))" opacity={0.7} style={{ fontFamily: "Inter, sans-serif" }}>
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* What the root being composed would look like. */}
      {selected && selFixed && cornerLetters(selected, preview ?? selFixed, { fill: "hsl(var(--primary))", opacity: preview ? 0.9 : 0.6 })}
    </svg>
  );
};

// ================================================================= composer

type ComposerProps = {
  game: Game;
  root: string[];
  setRoot: (r: string[]) => void;
  addLetter: (l: string) => void;
  letters: { id: string; translit: string }[];
  needed: Set<string>;
  fixed: (string | null)[];
  arrCount: number;
  arrIdx: number;
  cycle: () => void;
  gloss: string;
  setGloss: (s: string) => void;
  lang: string;
  setLang: (s: string) => void;
  rootInfo: ReturnType<typeof lookupRoot> | null;
  lexReady: boolean;
  useSense: (s: RootSense) => void;
  verdict: { ok: boolean; reason?: string };
  place: () => void;
  cancel: () => void;
  playerName: string;
  playerColor: string;
  fontFamily: string;
};

const Composer = (p: ComposerProps) => {
  const { game, root, fontFamily } = p;
  const neededList = p.fixed.filter(Boolean) as string[];
  const full = root.length === 3;
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="flex items-center gap-2 font-medium">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.playerColor }} />
            {p.playerName}, name a root
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {neededList.length === 0
              ? "Any root will do."
              : neededList.length === 3
                ? "All three corners are set: name the root they spell, in any order."
                : <>It must contain <span style={{ fontFamily }} className="text-base text-foreground">{neededList.map((l) => glyph(l, game.script)).join(" ")}</span>.</>}
          </p>
        </div>
        <button onClick={p.cancel} aria-label="Cancel" className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Three radical slots, first radical on the right. */}
      <div dir="rtl" className="flex gap-2 justify-center">
        {[0, 1, 2].map((i) => (
          <button key={i} onClick={() => p.setRoot(root.slice(0, i))}
            className={`w-16 h-16 rounded-md border-2 grid place-items-center text-3xl transition-colors ${
              i === root.length ? "border-primary" : root[i] ? "border-border bg-secondary/40" : "border-dashed border-border"}`}
            style={{ fontFamily }} title={root[i] ? "Clear from here" : undefined}>
            {root[i] ? glyph(root[i], game.script) : ""}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground -mt-2 h-4">
        {root.length > 0 && rootTranslit(root, game)}
      </p>

      {/* Letter keys. */}
      <div dir="rtl" className="flex flex-wrap justify-center gap-1">
        {p.letters.map((l) => (
          <button key={l.id} onClick={() => p.addLetter(l.id)} disabled={full}
            className={`w-[calc((100%-1.5rem)/7)] rounded border py-1 leading-none flex flex-col items-center gap-0.5 hover:bg-secondary disabled:opacity-40 ${
              p.needed.has(l.id) ? "border-primary/60 bg-primary/5" : "border-border"}`}>
            <span className="text-xl" style={{ fontFamily }}>{glyph(l.id, game.script)}</span>
            <span className="text-[10px] text-muted-foreground" dir="ltr">{l.translit}</span>
          </button>
        ))}
      </div>

      {full && p.lexReady && p.rootInfo && <RootNotes p={p} />}

      {full && p.arrCount > 1 && (
        <button onClick={p.cycle} className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md border border-border hover:bg-secondary">
          <RotateCw className="w-3.5 h-3.5" /> Turn it on the board ({(p.arrIdx % p.arrCount) + 1} of {p.arrCount})
        </button>
      )}

      <div className="flex gap-2">
        <input id="root-gloss" value={p.gloss} onChange={(e) => p.setGloss(e.target.value)} placeholder="Meaning (optional)"
          aria-label="Meaning" className="flex-1 min-w-0 px-3 py-2 rounded-md border border-input bg-background text-sm"
          onKeyDown={(e) => { if (e.key === "Enter") p.place(); }} />
        <select id="root-lang" value={p.lang} onChange={(e) => p.setLang(e.target.value)} aria-label="Language the root comes from"
          className={`w-32 px-2 py-2 rounded-md border border-input bg-background text-sm ${p.lang ? "" : "text-muted-foreground"}`}>
          <option value="">Language</option>
          {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {full && !p.verdict.ok && <p className="text-destructive text-xs">{p.verdict.reason}</p>}

      <div className="flex gap-2">
        <button onClick={p.place} disabled={!p.verdict.ok}
          className="flex-1 py-2 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-40">
          Place root
        </button>
        <button onClick={() => p.setRoot(root.slice(0, -1))} disabled={!root.length}
          className="px-3 py-2 rounded-md border border-border hover:bg-secondary disabled:opacity-40">
          ⌫
        </button>
      </div>
      <p className="text-[11px] text-muted-foreground leading-snug">
        Keyboard: type in Hebrew, Syriac or Arabic (either works in any game){game.alphabet !== "arabic" && <>, or Latin (x = ḥ, T = ṭ, c = ṣ, S = š, e = ʿ, a = ʾ)</>}. Enter places, Tab turns, Esc cancels.
      </p>
    </div>
  );
};

// ==================================================================== setup

const Setup = ({ game, onStart, onCancel }: { game: Game; onStart: (a: AlphabetId, names: string[]) => void; onCancel: () => void }) => {
  const [alphabet, setAlphabet] = useState<AlphabetId>(game.alphabet);
  const [names, setNames] = useState<string[]>(game.players.map((p) => p.name));
  const [confirming, setConfirming] = useState(false);
  const start = () => {
    if (game.moves.length && !confirming) {
      setConfirming(true);
      return;
    }
    onStart(alphabet, names.map((n, i) => n.trim() || `Player ${i + 1}`));
  };
  return (
    <div className="rounded-lg border border-border p-4 space-y-4 bg-card">
      <div>
        <p className="text-xs text-muted-foreground mb-2">Alphabet</p>
        <div className="flex flex-col gap-1">
          {(Object.keys(ALPHABETS) as AlphabetId[]).map((a) => (
            <label key={a} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="alphabet" checked={alphabet === a} onChange={() => setAlphabet(a)} />
              {ALPHABETS[a].label}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Players</p>
        <div className="space-y-1.5">
          {names.map((n, i) => (
            <div key={i} className="flex gap-1.5">
              <input value={n} onChange={(e) => setNames(names.map((m, j) => (j === i ? e.target.value : m)))}
                className="flex-1 px-2 py-1.5 rounded border border-input bg-background" aria-label={`Player ${i + 1} name`} />
              {names.length > 1 && (
                <button onClick={() => setNames(names.filter((_, j) => j !== i))} aria-label="Remove player"
                  className="px-2 rounded border border-border hover:bg-secondary"><X className="w-3.5 h-3.5" /></button>
              )}
            </div>
          ))}
          {names.length < 4 && (
            <button onClick={() => setNames([...names, `Player ${names.length + 1}`])} className="text-xs text-primary hover:underline">
              + Add player
            </button>
          )}
        </div>
      </div>
      {confirming && (
        <p className="text-xs text-destructive">This clears the current board ({game.moves.length} {game.moves.length === 1 ? "root" : "roots"}). Undo can't bring it back.</p>
      )}
      <div className="flex gap-2">
        <button onClick={start} className="flex-1 py-2 rounded-md bg-primary text-primary-foreground font-medium">
          {confirming ? "Clear the board and start" : "Start"}
        </button>
        <button onClick={onCancel} className="px-3 py-2 rounded-md border border-border hover:bg-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default Triangles;

// What the dictionary says about the root being composed.
const RootNotes = ({ p }: { p: ComposerProps }) => {
  const { senses, otherOrders } = p.rootInfo!;
  const { game, fontFamily } = p;
  return (
    <div className="rounded-md bg-secondary/50 px-3 py-2.5 space-y-2 text-xs">
      {senses.length ? (
        <div className="space-y-1">
          <p className="text-muted-foreground">In the dictionary · tap to use</p>
          {senses.map((s) => (
            <button key={s.lang} onClick={() => p.useSense(s)}
              className={`block w-full text-left rounded px-1.5 py-1 hover:bg-background/70 ${p.gloss === s.gloss ? "bg-background/70" : ""}`}>
              <span className="uppercase tracking-wider text-[10px] text-muted-foreground mr-1.5">{s.lang}</span>
              <span className="text-foreground/90">{s.gloss}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Not in the Hebrew, Aramaic or Arabic dictionaries. Still fair if it comes from another Semitic language: add its meaning and language below.
        </p>
      )}
      {otherOrders.length > 0 && (
        <div className="space-y-1 pt-1 border-t border-border/60">
          <p className="text-muted-foreground">Same letters, other roots · tap to switch</p>
          {otherOrders.slice(0, 4).map((o) => (
            <button key={o.root.join("")} onClick={() => p.setRoot(o.root)}
              className="flex w-full items-baseline gap-2 text-left rounded px-1.5 py-1 hover:bg-background/70">
              <span dir="rtl" className="text-base shrink-0" style={{ fontFamily }}>{o.root.map((l) => glyph(l, game.script)).join(" ")}</span>
              <span className="text-muted-foreground shrink-0">{rootTranslit(o.root, game)}</span>
              <span className="truncate text-foreground/80">{o.senses[0].gloss}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
