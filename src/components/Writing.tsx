import { ExternalLink, Mic, PenLine } from "lucide-react";

const Writing = () => {
  return (
    <section id="writing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Writing column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <PenLine className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Writing
              </h2>
            </div>
            
            <h3 className="font-display text-3xl text-foreground mb-6">
              Essays & Reflections
            </h3>
            
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Explorations in meaning-making, consciousness, history, and the human condition. Subscribe to stay connected with new work.
            </p>
            
            <a
              href="https://substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-body group"
            >
              <span className="border-b border-foreground/20 group-hover:border-primary pb-1">
                Read on Substack
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
            {/* Placeholder for embedded posts */}
            <div className="mt-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-secondary/50 rounded border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <p className="text-xs text-muted-foreground font-body mb-1">Coming soon</p>
                  <p className="font-display text-lg text-foreground">Recent essay {i}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Media column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Mic className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Media
              </h2>
            </div>
            
            <h3 className="font-display text-3xl text-foreground mb-6">
              Appearances & Interviews
            </h3>
            
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Conversations on podcasts, panels, and publications exploring the frontiers of consciousness research and meaning.
            </p>
            
            {/* Placeholder for media appearances */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-card rounded-lg shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-body mb-1">
                        Podcast / Interview
                      </p>
                      <p className="font-display text-lg text-foreground">
                        Media appearance {i}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writing;
