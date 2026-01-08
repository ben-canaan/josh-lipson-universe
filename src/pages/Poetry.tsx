import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Feather } from "lucide-react";

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
          
          <p className="text-lg text-muted-foreground font-body mb-12 leading-relaxed max-w-2xl">
            A collection of poems and songs exploring consciousness, longing, history, and the sacred.
          </p>
          
          {/* Placeholder poems */}
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="p-8 bg-card rounded-lg shadow-soft border border-border/30"
              >
                <h3 className="font-display text-2xl text-foreground mb-2">
                  Poem Title {i}
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-6">
                  Coming soon
                </p>
                <div className="font-body text-foreground/80 leading-relaxed italic">
                  <p className="mb-4">The first stanza would appear here,</p>
                  <p className="mb-4">with line breaks preserved as intended</p>
                  <p className="mb-4">by the poet, carrying rhythm</p>
                  <p>and meaning through white space.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Poetry;
