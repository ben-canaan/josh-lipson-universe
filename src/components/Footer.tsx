import { Linkedin, BookOpen, GraduationCap, Send } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jlipson/",
      icon: Linkedin,
    },
    {
      name: "Substack",
      href: "https://whitmanic.substack.com/",
      icon: BookOpen,
    },
    {
      name: "Google Scholar",
      href: "https://scholar.google.com/citations?user=hi0H3xgAAAAJ&hl=en",
      icon: GraduationCap,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:lipson.joshua@gmail.com?subject=${subject}&body=${body}`;
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <footer id="contact" className="py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[2fr,1fr] gap-12 mb-12">
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
                  title={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="max-w-lg mb-16 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-3 bg-secondary/50 border border-border/50 rounded text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 bg-secondary/50 border border-border/50 rounded text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wide rounded hover:bg-primary/90 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
        
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