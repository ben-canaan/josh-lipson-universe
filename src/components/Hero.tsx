import React from "react";

const Hero = () => {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center px-6 py-20 relative">
      {/* Subtle decorative element */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-8 left-10 w-24 h-24 rounded-full bg-accent/10 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-3xl mx-auto text-center opacity-0 animate-fade-up">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 font-body">
          Psychologist • Historian • Poet
        </p>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-foreground mb-8 leading-[1.1]">
          Josh Lipson
        </h1>
        
        <p className="text-xl md:text-2xl font-display italic text-muted-foreground leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-up stagger-2">
          I help people feel at home in deep time, and in the deep ends of the mind.
        </p>
      </div>
    </section>
  );
};

export default Hero;
