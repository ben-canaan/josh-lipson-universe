import portraitImage from "@/assets/portrait.webp";
const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[1fr,2fr] gap-12 md:gap-16">
          {/* Left column - Photo and Section title */}
          <div>
            <div className="mb-8">
              <div className="relative">
                <img
                  src={portraitImage}
                  alt="Josh Lipson"
                  className="w-full aspect-[3/4] object-cover object-top rounded-sm shadow-elevated"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-sm" />
              </div>
            </div>
            <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-4">
              About
            </h2>
            <div className="w-12 h-px bg-primary/30" />
          </div>
          
          {/* Right column - Content */}
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
            <p className="font-display text-2xl md:text-3xl text-foreground leading-snug">
              Can we leverage the "gratuitous grace" of psychedelic chemistry to make people feel more whole, and more at home in the universe? Can we do it humbly?
            </p>
            
            <p className="font-body">
              Seeking thoughtful collaborations in this space.
            </p>
            
            <p className="font-body">
              I'm interested in meaning-making, phenomenology of consciousness, the interplay between "nebulosity" and "pattern", antifragility, predictive processing, "preconquest consciousness" and "the breakdown of the bicameral mind", and examining today's idioms of distress in cross-cultural context.
            </p>
            
            <p className="font-body">
              I have an undergraduate background in the humanities, and am passionate about relating to human civilizational expression across space and time, in a full-bodied way. Ask me about <span className="italic">Şeb-i Arus</span>, bossa nova, Semitic grammar, or the Austronesian migrations.
            </p>
            
            <p className="font-body">
              I also moonlight as a historian, with a focus on Jewish affairs, ideas, and genes from the Iron Age to the 20th century, and am the co-founder of the <a href="https://jewishgeneticdiscovery.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60 transition-colors">Jewish Genetic Discovery Foundation</a>.
            </p>
            
            <p className="font-body text-muted-foreground">
              I speak enough Hebrew, Spanish, Arabic, and Portuguese to get me both into and out of trouble, and I also write poems and songs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
