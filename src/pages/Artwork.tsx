import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Palette } from "lucide-react";

const Artwork = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h1 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
              Artwork
            </h1>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            Visual Expressions
          </h2>
          
          <p className="text-lg text-muted-foreground font-body mb-12 leading-relaxed max-w-2xl">
            A gallery of visual work exploring texture, symbol, and the interplay of ancient and modern.
          </p>
          
          {/* Placeholder gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-secondary/50 rounded-lg border border-border/30 flex items-center justify-center group hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="text-center">
                  <p className="text-sm text-muted-foreground font-body">
                    Artwork {i}
                  </p>
                  <p className="text-xs text-muted-foreground/60 font-body mt-1">
                    Coming soon
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Artwork;
