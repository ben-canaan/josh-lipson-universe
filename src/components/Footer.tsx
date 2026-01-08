import { Linkedin, BookOpen, GraduationCap } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
    },
    {
      name: "Substack",
      href: "https://substack.com",
      icon: BookOpen,
    },
    {
      name: "Google Scholar",
      href: "https://scholar.google.com",
      icon: GraduationCap,
    },
  ];

  return (
    <footer id="contact" className="py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[2fr,1fr] gap-12 mb-16">
          {/* Left - Contact info */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Let's connect
            </h2>
            <p className="text-muted-foreground font-body max-w-md leading-relaxed">
              Interested in collaboration, consultation, or conversation? I'd love to hear from you.
            </p>
          </div>
          
          {/* Right - Social links */}
          <div className="flex md:justify-end items-start">
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-body">
          <p>© {new Date().getFullYear()} Josh Lipson. All rights reserved.</p>
          <p className="italic font-display text-base">
            "Seeking thoughtful collaborations"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
