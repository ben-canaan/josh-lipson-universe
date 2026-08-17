import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, BookOpen, MessageCircle, GraduationCap, ExternalLink } from "lucide-react";

const speakingTopics = [
  "Psychedelics and mental health",
  "Post-psychedelic difficulties and adverse effects",
  "Psychedelics and Jewish spirituality",
  "Jewish DNA and history / the historical genomics revolution",
  "The psychology of meaning-making",
  "Selfhood and mental health in cross-cultural perspective",
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Work With Me
            </h1>
            <div className="w-16 h-px bg-primary/30 mb-6" />
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Clinical practice, research consultation, speaking, and teaching — rooted in depth, the meaning-making, and human connection.
            </p>
          </div>

          {/* Psychotherapy */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Psychotherapy
              </h2>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed mb-6 max-w-2xl">
              Clinical psychological services tailored to your specific needs, with an orientation toward depth and collaborative exploration. Specializing in preparation, integration, and meaning-making around psychedelic and spiritual experiences, as well as finding footing in an unpredictable world.
            </p>
            <a
              href="https://drjoshlipson.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-body group"
            >
              <span className="border-b border-foreground/20 group-hover:border-primary pb-1">
                Visit the practice site
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </section>

          {/* Consulting */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Consulting
              </h2>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
              Research consultation on psychedelics, clinical implementation, and cross-cultural approaches to mental health. Available to advise on study design, adverse-event frameworks, and the integration of spiritual and religious context into clinical and research work.
            </p>
          </section>

          {/* Speaking */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Speaking
              </h2>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed mb-6 max-w-2xl">
              Available for talks, panels, and public engagements on topics including:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {speakingTopics.map((topic) => (
                <li
                  key={topic}
                  className="text-foreground/85 font-body text-sm px-4 py-3 bg-secondary/50 rounded border border-border/50"
                >
                  {topic}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground font-body text-sm">
              Contact me to discuss a talk, panel, or event.
            </p>
          </section>

          {/* Courses */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Courses
              </h2>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
              Academic guidance in psychology, history, and the humanities, admissions counseling, and one-on-one tutoring in modern and classical Hebrew. Boutique course offerings (e.g. "Psychedelic Spirituality", "Hebrew for Mystics and Poets") coming soon.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
