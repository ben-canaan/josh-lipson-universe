import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Feather, ExternalLink, ChevronDown } from "lucide-react";

const poems = [
  {
    title: "Tehom-Rabba (The Space Between The Notes)",
    publication: "Obra/Artifact",
    link: null,
    lines: [
      "I revisit the project in instants between",
      "the universal mind moving",
      "and in the cleft between the rock",
      "lush quark, luminous granule, lather",
      "repeat: collision in blank mass",
      "every angle jeweled moonshot",
      "I lose my place: no matter —",
      "no one to hear it —",
      "axes in violent bloom —",
    ],
  },
  {
    title: "Hathor",
    publication: null,
    link: null,
    lines: [
      "things that never occurred to me",
      "skinning a Chinese gooseberry",
      "",
      "golden, the",
      "mandrakes beam back",
      "methyl memories of torsion",
      "avarice cinches back to",
      "flower and the sea runs",
      "high with potash",
      "honest as the dun carapace",
      "mind in limestone gambols",
      "not a star.",
      "uses for mastic and dried mint",
      "cavity sealant kiwi-lime ananda",
      "pure Castile soap of consciousness",
      "to make you run with airs of Lebanon.",
      "oarsmen among the water-lilies",
      "belfry in the wooden",
      "pendant universe.",
      "shut up in obsidian",
      "Tabnit undone",
      "retains the shade",
      "of ribbon alphabet.",
      "",
      "current through a latticework amphora:",
      "and you are holding my hand in the middle of the water",
    ],
  },
  {
    title: "Cutting Through",
    publication: "Angel City Review",
    link: null,
    lines: [
      "nothing but current",
      "warm with sea",
      "and if —",
      "",
      "knew in that moment there was no First Cause",
      "and glid",
      "",
      "shelf receding",
      "blew her mind in international waters",
      "",
      "cleared the bellows",
      "shot the witness",
    ],
  },
  {
    title: "Haunt",
    publication: "Homonym Journal",
    link: null,
    lines: [
      "I am the ghost in the machine of Hebrew grammar",
      "My head is wrapped in gauze called",
      "Song of the Sea — this too is a state",
      "Let your mind fall upon a face",
      "Let your mind recall a face",
      "Let your mind take another shape",
      "",
      "My pen is in my mouth",
      "I laugh in the reflexive",
      "",
      "If there's ever a way for the jazz to get in",
      "the skull requires compression —",
      "I spoke in levels of your information",
      "",
      "The ribcage — which has appeared",
      "at the bottom of a valley of asphalt",
      "and shale — jangles about on the",
      "sound of spoons and resonates with the",
      "alphabet. I am wandering through it,",
      "a composite organism cloven,",
      "words out loud,",
      "and graphemes hung from high on union square",
      "I am not in the game,",
      "I am not even dressed the part tonight",
    ],
  },
  {
    title: "Pulses",
    publication: null,
    link: null,
    lines: [
      "Second sleepless morning mid-October",
      "Istanbul: the shock doctrine.",
      "",
      "I habit my eyes to the dazzle of the light",
      "and simmer pulses. Last snacks fell at midnight",
      "",
      "down my stomach through a shaft",
      "between apartments: screeching Sorani children",
      "",
      "sell me weed. Down Tarlabasi drainway,",
      "a street played host to Polish Catholic poet,",
      "",
      "and Old Damascus cafeteria: smugglers,",
      "legwork, hot legumes. I greet my cousins",
      "",
      "with the stilted terse ammiyeh of a newscaster:",
      "godly synaptics order my beans broad. A bevy",
      "",
      "of broken sesame, Palestine olives pressed into",
      "corvee, lemons disappeared in death flights",
      "",
      "over Rio de la Plata. I told them I was Lebanese:",
      "Stockholm syndrome of our lowland Neolithic",
      "",
      "rivalry, raw onions; I compensate",
      "as for my stature with tomatoes. Heart-attack",
      "",
      "stockbroker, mad with blue-light instruments,",
      "I crack an egg. Crimean Turk,",
      "",
      "musty master of the house stirs hopeless",
      "in the dawn. I raise the cover from the boil",
      "",
      "and check my pulses.",
    ],
  },
  {
    title: "Diyarbakir Black",
    publication: "KGB Bar Lit Magazine",
    link: "https://kgbbarlit.com/content/five-poems-4",
    lines: [
      "Light cut in basalt",
      "I would die of your dome",
      "for vegetables at breakfast —",
      "smartest caravanserai",
      "this side of the conflict zone.",
      "",
      "Zebra arches bound into a colonnade —",
      "Kurmanji eyes at nine o'clock,",
      "entoptic kilim splayed.",
      "",
      "Where the flinty steppe geometry",
      "runs dry, but unicorn and ayran",
      "stanch the urge of lines",
      "to bloom to boteh:",
      "",
      "The lamp hangs determined",
      "and stark above my smugglers' tea.",
      "",
      "Heart too ready to be drowned",
      "in volcanic rock",
      "and Aryan eyes.",
      "",
      "Withering minarets",
      "and midnight Armenian steeples",
      "are your neck",
      "in Song of Songs.",
      "",
      "Martyrs glint out from",
      "moustache on the gallery.",
      "For coffee and a thousand suns,",
      "mihrab.",
      "",
      "Street alive with sumac and the veneration of",
      "a little dark girl,",
      "millions gone missing in the Syrian register,",
      "blood runs warm to me in the mountains.",
    ],
  },
  {
    title: "In the Gear Room",
    publication: "briars lit",
    link: null,
    lines: [
      "Seize all the levers,",
      "and the world will never",
      "be the same in any measure",
      "Hallelujah.",
      "",
      "If I spoke of wheels",
      "and the circuit of their satellites",
      "would you?",
      "But do you believe that I exist?",
      "",
      "I blasted my virginity to the stars",
      "losing myself in the filigreed folds of",
      "the boiler room.",
      "",
      "With the humming eternity of",
      "this electric closet",
      "I fling myself",
      "at you",
      "Share in my pathological extraversion",
      "",
      "I promise you can have it all.",
      "Let us wrench the drawers out",
      "of the cabinet",
      "and sample every tremor.",
      "",
      "Heart shake my blood",
      "Temple burn igneous",
      "Gears turn:",
    ],
  },
  {
    title: "Censer",
    publication: "SHARKPACK Annual",
    link: null,
    lines: [
      "Thurible and visor",
      "Shadervan and speaker",
      "",
      "The spinal column of the song:",
      "She's definitely an electric mouse.",
      "",
      "Dasht-i-lut is burning up:",
      "The Safavid Empire",
      "saved in a cloud.",
      "",
      "Frankincense and tendon",
      "Ligament and myrrh",
      "My sandal bones.",
      "",
      "The common thistle",
      "the universe's",
      "manifold and zero properties.",
    ],
  },
  {
    title: "The Question",
    publication: "in parentheses",
    link: null,
    lines: [
      "Is simplicity a fool's errand?",
      "Wind-born locus of intensive computation",
      "Double-bound sovereign of a thousand square feet",
      "Metropolis of gaslamps blaring from a bluff above the squall-torn bay",
      "Scylla of fourscore Charybdi and Charybdis of numberless Pelasgians",
      "Representation at the head of all representations,",
      "idée fixe whose tendrils poke through every",
      "Brodmann area, and on occasion",
      "it's the same by you:",
      "I am being hallucinated by dozens of flashbulb",
      "entities at any given moment",
      "I am the paradox as much if not more",
      "than anything I've ever made an object",
      "I am the puddle of mud at the foot of the bridge",
    ],
  },
];

const PoemAccordion = ({ poem }: { poem: typeof poems[0] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <div>
          <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
            {poem.title}
          </h3>
          {poem.publication && (
            <p className="text-xs text-muted-foreground font-body mt-1 tracking-wide">
              {poem.publication}
            </p>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 ml-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-8">
          <div className="font-body text-foreground/85 leading-relaxed space-y-0">
            {poem.lines.map((line, i) =>
              line === "" ? (
                <div key={i} className="h-4" />
              ) : (
                <p key={i}>{line}</p>
              )
            )}
          </div>
          {poem.link && (
            <a
              href={poem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-body text-primary hover:text-primary/80 transition-colors"
            >
              Read at {poem.publication}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const Poetry = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Feather className="w-5 h-5 text-primary" />
            <h1 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
              Poetry
            </h1>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            Verses & Songs
          </h2>

          <p className="text-lg text-muted-foreground font-body mb-6 leading-relaxed max-w-2xl">
            A collection of poems and songs exploring consciousness, longing, history, and the sacred.
          </p>

          <p className="text-base text-muted-foreground font-body mb-16 leading-relaxed max-w-2xl">
            Credits in <em>Harbinger Asylum</em>, <em>Angel City Review</em>, <em>Obra/Artifact</em>,{" "}
            <em>Three Line Poetry</em>, <em>Homonym Journal</em>, <em>The Meadow</em>,{" "}
            <em>briars lit</em>, <em>Burning House Press</em>, <em>Anatolios</em>,{" "}
            <em>Petrichor</em>, <em>Haddu's Petition Revue Post</em>, <em>Bookends Review</em>,{" "}
            <em>Humble Pie</em>, <em>Aji</em>, <em>Lammergeier</em>, <em>SHARKPACK Annual</em>,{" "}
            <em>Lucky Jefferson</em>, <em>KGB Bar Lit Magazine</em>, <em>8 Poems</em>,{" "}
            <em>in parentheses</em>, and <em>Wells Street Journal</em>.
          </p>

          <div>
            {poems.map((poem, i) => (
              <PoemAccordion key={i} poem={poem} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Poetry;
