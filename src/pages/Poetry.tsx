import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Feather, ExternalLink } from "lucide-react";

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
          
          <p className="text-base text-muted-foreground font-body mb-12 leading-relaxed max-w-2xl">
            Credits in <em>Harbinger Asylum</em>, <em>Angel City Review</em>, <em>Obra/Artifact</em>, <em>Three Line Poetry</em>, <em>Homonym Journal</em>, <em>The Meadow</em>, <em>briars lit</em>, <em>Burning House Press</em>, <em>Anatolios</em>, <em>Petrichor</em>, <em>Haddu's Petition Revue Post</em>, <em>Bookends Review</em>, <em>Humble Pie</em>, <em>Aji</em>, <em>Lammergeier</em>, <em>Sharkpack Annual</em>, <em>Lucky Jefferson</em>, <em>KGB Lit Magazine</em>, <em>8 Poems</em>, <em>in parentheses</em>, and <em>Wells Street Journal</em>.
          </p>
          
          <div className="space-y-6">
            <a
              href="https://kgbbarlit.com/content/five-poems-4"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 bg-card rounded-lg shadow-soft border border-border/30 hover:border-primary/30 hover:-translate-y-0.5 transition-all group"
            >
              <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors mb-2">
                Five Poems
              </h3>
              <p className="text-sm text-muted-foreground font-body mb-4">
                KGB Bar Lit Magazine
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-body text-sm">
                Read at kgbbarlit.com
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Poetry;
