import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, Mic, MessagesSquare, Users, GraduationCap, ExternalLink } from "lucide-react";

const speakingTopics = [
  "Psychedelics, spirituality, and psychological transformation",
  "Jewish genetics, ancestry, and deep history",
  "Meaning and purpose under conditions of radical unpredictability",
  "Consciousness and mental health in cross-cultural perspective",
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Work With Me
            </h1>
            <div className="w-16 h-px bg-primary/30 mb-6" />
            <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl">
              I welcome opportunities that are intellectually serious, creatively alive, and oriented toward genuine human flourishing. If you think my work might be a good fit for your community or project, I'd be glad to hear from you.
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
              I maintain a private psychotherapy practice in New York, with particular interests in psychedelic integration, spirituality, meaning, identity, and psychological growth. If you're interested in working together clinically, please visit my practice website.
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

          {/* Speaking */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Mic className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Speaking
              </h2>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed mb-6 max-w-2xl">
              I give lectures, keynotes, scholar-in-residence weekends, workshops, and public conversations. Recent and recurring themes include:
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
            <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
              I'm especially interested in engagements that leave room for conversation as well as presentation.
            </p>
          </section>

          {/* Conversations & Media */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <MessagesSquare className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Conversations & Media
              </h2>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
              I enjoy thoughtful conversations more than polished performances. I'm happy to consider podcasts, interviews, documentaries, panels, essays, and other opportunities that help bring difficult or fascinating ideas into public conversation.
            </p>
          </section>

          {/* Advisory & Collaboration */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Advisory & Collaboration
              </h2>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
              I occasionally advise organizations, researchers, founders, writers, and institutions working at the intersection of psychology, psychedelics, spirituality, Jewish history, public scholarship, and culture. I'm most interested in projects that require careful thinking, synthesis across disciplines, or long-range strategic perspective.
            </p>
          </section>

          {/* Teaching */}
          <section className="mb-16 pb-16 border-b border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Teaching
              </h2>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
              I periodically develop seminars, workshops, and educational offerings of my own, and I'm always interested in conversations with institutions that value intellectually adventurous teaching.
            </p>
          </section>

          {/* Closing note */}
          <p className="text-muted-foreground font-body italic leading-relaxed max-w-2xl">
            If you're reaching out with something that doesn't fit neatly into one of these categories, please don't let that stop you. Some of the most meaningful opportunities begin with an email that starts, "This is a little unusual…"
          </p>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
