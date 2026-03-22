import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";

const essays = [
  {
    title: "When I fed Claude Code 804 of my poems",
    subtitle: "The awesome and grotesque act of building a concordance.",
    date: "March 2026",
    publication: "Whitmanic",
    link: "https://whitmanic.substack.com/p/when-i-fed-claude-code-804-of-my",
    tags: ["AI", "poetry", "technology"],
  },
  {
    title: "The hard problem of AI therapy",
    subtitle: "Why even 'perfect' AI therapy may be structurally doomed.",
    date: "February 2026",
    publication: "Whitmanic",
    link: "https://whitmanic.substack.com/p/the-hard-problem-of-ai-therapy",
    tags: ["psychology", "AI", "therapy"],
  },
  {
    title: "How you become a liturgical poet",
    subtitle: "",
    date: "January 2026",
    publication: "Whitmanic",
    link: "https://whitmanic.substack.com/p/how-you-become-a-liturgical-poet",
    tags: ["poetry", "religion", "language"],
  },
  {
    title: "Semitic triangles: the romance of the three-letter root",
    subtitle: "On the most obscure game in the world.",
    date: "December 2025",
    publication: "Whitmanic",
    link: "https://whitmanic.substack.com/p/semitic-triangles-the-most-obscure",
    tags: ["linguistics", "Hebrew", "Arabic"],
  },
  {
    title: "Why the optimal amount of delulu is not zero",
    subtitle: "And the opposite of depression is not what you think.",
    date: "November 2025",
    publication: "Whitmanic",
    link: "https://whitmanic.substack.com/p/the-optimal-amount-of-delulu-is-not",
    tags: ["psychology", "mental health"],
  },
  {
    title: "The most important pop stars of the future will be religious",
    subtitle: "On LUX, Rosalía's metamodern Catholic masterpiece.",
    date: "November 2025",
    publication: "Whitmanic",
    link: "https://whitmanic.substack.com/p/the-most-important-pop-stars-of-the",
    tags: ["music", "religion", "culture"],
  },
  {
    title: "Why psychedelics don't fit the drug paradigm",
    subtitle: "",
    date: "December 2024",
    publication: "Lucid News",
    link: "https://www.lucid.news/why-psychedelics-dont-fit-the-drug-paradigm/",
    tags: ["psychedelics", "psychology"],
  },
];

const academicWork = [
  {
    title: "Baseline Mood and 'Relational Triad' Predict Acute Qualities of Psychedelic Experience",
    venue: "Behavioral Science · Dissertation Work · Columbia University",
    year: "2025",
    link: "https://pubmed.ncbi.nlm.nih.gov/41750119/",
  },
  {
    title: "Self, Other, and Higher Power: A 'Relational Triad' Moderates Associations Between Mystical Experience and Mental Health",
    venue: "International Journal for the Psychology of Religion · Dissertation Work · Columbia University",
    year: "2024",
    link: "https://www.tandfonline.com/doi/abs/10.1080/10508619.2024.2422171",
  },
  {
    title: "Trait Absorption: Correlates And Role In A Mindfulness-Based Intervention For Social Anxiety",
    venue: "Master's Thesis · William & Mary",
    year: "2019",
    link: "https://scholarworks.wm.edu/items/fa742cf0-210c-4f9b-922a-7507e8eebc1d",
  },
  {
    title: "Ashkenazi Revolution: The Politics of Reaction, Heresy, and Suppression in 1960s Israel",
    venue: "Undergraduate Thesis · Harvard University · Harvard Judaica Division Research Series",
    year: "2014",
    link: "https://www.academia.edu/15452737/Ashkenazi_Revolution_The_Politics_of_Reaction_Heresy_and_Suppression_in_1960s_Israel",
  },
];

const projects = [
  {
    title: "Jewish Genetic Discovery Foundation",
    description:
      "A citizen science effort to reconstruct Jewish population history through Y-chromosomal and autosomal DNA. Co-founded with a team of geneticists, genealogists, and historians.",
    link: "https://jewishgeneticdiscovery.org",
    linkLabel: "Visit site",
  },
];

const Essays = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Essays & Projects
            </h1>
            <div className="w-16 h-px bg-primary/30 mb-6" />
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Selected writing and ongoing work across psychology, history, language, and the philosophy of mind.
            </p>
          </div>

          {/* Essays */}
          <section className="mb-20">
            <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-8">
              Essays
            </h2>
            <div className="space-y-8">
              {essays.map((essay, i) => (
                <a
                  key={i}
                  href={essay.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group border-b border-border/50 pb-8 last:border-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {(essay.date || essay.publication) && (
                        <p className="text-xs text-muted-foreground font-body mb-2 tracking-wide">
                          {[essay.date, essay.publication].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                        {essay.title}
                      </h3>
                      {essay.subtitle && (
                        <p className="text-muted-foreground font-body leading-relaxed">
                          {essay.subtitle}
                        </p>
                      )}
                      {essay.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {essay.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground font-body"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Academic Work */}
          <section className="mb-20">
            <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-8">
              Academic Work
            </h2>
            <div className="space-y-8">
              {academicWork.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group border-b border-border/50 pb-8 last:border-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-body mb-2 tracking-wide">
                        {item.year} · {item.venue}
                      </p>
                      <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-8">
              Projects
            </h2>
            <div className="space-y-8">
              {projects.map((project, i) => (
                <div key={i} className="border-b border-border/50 pb-8 last:border-0">
                  <h3 className="font-display text-xl text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-body text-foreground hover:text-primary transition-colors group"
                  >
                    <span className="border-b border-foreground/20 group-hover:border-primary pb-0.5">
                      {project.linkLabel}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Essays;
