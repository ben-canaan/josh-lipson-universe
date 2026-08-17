import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Services = () => {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-4">
          Work With Me
        </h2>
        <p className="font-display text-2xl md:text-3xl text-foreground mb-6 max-w-xl mx-auto">
          Individual psychotherapy, consulting, speaking, and courses.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-body group"
        >
          <span className="border-b border-foreground/20 group-hover:border-primary pb-1">
            See how we might work together
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default Services;
