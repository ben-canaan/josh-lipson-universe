import { Brain, BookOpen, MessageCircle } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Psychotherapy (coming soon)",
    description: "Clinical psychological services grounded in depth, meaning, and human connection. Specializing in preparation, integration, and meaning-making around psychedelic and spiritual experiences.",
    tag: "Clinical",
  },
  {
    icon: BookOpen,
    title: "Tutoring and Courses",
    description: "Academic guidance in psychology, history, and the humanities, admissions counseling, and one-on-one tutoring in modern and classical Hebrew. Stay tuned for course offerings.",
    tag: "Education",
  },
  {
    icon: MessageCircle,
    title: "Consulting",
    description: "Research consultation on psychedelics, consciousness studies, and cross-cultural approaches to mental health.",
    tag: "Research",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-4">
            Services
          </h2>
          <p className="font-display text-3xl md:text-4xl text-foreground max-w-xl">
            Working together toward understanding
          </p>
        </div>
        
        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card p-8 rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <service.icon className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="text-xs tracking-widest uppercase text-muted-foreground font-body">
                  {service.tag}
                </span>
              </div>
              
              <h3 className="font-display text-2xl text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground font-body leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wide rounded hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
