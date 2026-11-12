import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AppearanceCard from "@/components/AppearanceCard";
import { Mic, ArrowRight } from "lucide-react";
import { appearances, speakingTopics } from "@/data/speaking";

const Speaking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Mic className="w-5 h-5 text-primary" />
              <p className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Speaking
              </p>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Talks, Conversations & Residencies
            </h1>
            <div className="w-16 h-px bg-primary/30 mb-6" />
            <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl">
              I give lectures, keynotes, scholar-in-residence weekends, workshops, and public conversations, and I'm glad to join podcasts, interviews, and panels. I'm especially interested in engagements that leave room for conversation as well as presentation.
            </p>
          </div>

          {/* Topics */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-6">
              Recent and Recurring Themes
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {speakingTopics.map((topic) => (
                <li
                  key={topic}
                  className="text-foreground/85 font-body text-sm px-4 py-3 bg-secondary/50 rounded border border-border/50"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </section>

          {/* Bio */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-6">
              Short Bio
            </h2>
            <p className="text-foreground/85 font-body leading-relaxed max-w-2xl">
              Josh Lipson, PhD, is a psychologist, historian, and poet. He completed his doctoral training in clinical psychology at Columbia's Spirituality Mind Body Institute and a postdoctoral fellowship at the Emory Center for Psychedelics and Spirituality. He is co-founder of the Jewish Genetic Discovery Foundation, writes the Substack <span className="italic">Whit·manic</span>, and is editing <span className="italic">Trippers and Askers</span>, an anthology of world spiritual classics for the psychedelic experience. He lives in New York.
            </p>
          </section>

          {/* Past appearances */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-6">
              Past Appearances
            </h2>
            <div className="space-y-4">
              {appearances.map((appearance) => (
                <AppearanceCard key={appearance.link} appearance={appearance} />
              ))}
            </div>
          </section>

          {/* Invite */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Invite me to speak
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6 max-w-2xl">
              Tell me about your community or audience, the format you have in mind, and your dates.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-body group"
            >
              <span className="border-b border-foreground/20 group-hover:border-primary pb-1">
                Get in touch
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Speaking;
