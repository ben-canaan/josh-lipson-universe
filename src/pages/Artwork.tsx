import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Palette } from "lucide-react";
import artwork2 from "@/assets/artwork2.jpeg";
import artwork4 from "@/assets/artwork4.jpg";
import artwork5 from "@/assets/artwork5.jpg";
import artwork6 from "@/assets/artwork6.jpg";
import artwork7 from "@/assets/wave.jpg";
import artwork8 from "@/assets/shirhashirim.jpg";

const artworks = [
  { src: artwork6, alt: "Havdalah Shabbat - red ink painting with Hebrew calligraphy" },
  { src: artwork2, alt: "B'Sadot - colorful watercolor with Hebrew text and landscape" },
  { src: artwork4, alt: "Purple watercolor mountains with Hebrew inscription" },
  { src: artwork5, alt: "Orange watercolor with Hebrew calligraphy" },
  { src: artwork7, alt: "Ink drawing with Arabic and ancient script" },
  { src: artwork8, alt: "Shir HaShirim - multicolored wave text composition" },
];

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
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {artworks.map((artwork, i) => (
              <div
                key={i}
                className="aspect-square bg-secondary/50 rounded-lg border border-border/30 overflow-hidden group hover:border-primary/30 transition-colors cursor-pointer"
              >
                {artwork.src ? (
                  <img
                    src={artwork.src}
                    alt={artwork.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-sm text-muted-foreground font-body">Coming soon</p>
                  </div>
                )}
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
