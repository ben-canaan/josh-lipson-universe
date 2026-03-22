import { useState } from "react";
import { Mail } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
            Contact
          </h2>
        </div>
        <h3 className="font-display text-3xl text-foreground mb-4">
          Get in Touch
        </h3>
        <p className="text-muted-foreground font-body mb-10 leading-relaxed">
          Whether you're interested in working together, have a question, or just want to say hello — I'd love to hear from you.
        </p>

        {submitted ? (
          <div className="p-8 bg-card rounded border border-border text-center">
            <p className="font-display text-2xl text-foreground mb-2">Thank you.</p>
            <p className="text-muted-foreground font-body">Your message has been sent. I'll be in touch soon.</p>
          </div>
        ) : (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Hidden fields required by Netlify */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>Don't fill this out: <input name="bot-field" /></label>
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-body text-foreground/80 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-body text-foreground/80 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-body text-foreground/80 mb-2">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="w-full px-4 py-3 bg-background border border-border rounded text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-body text-foreground/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 bg-background border border-border rounded text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-foreground text-background font-body text-sm tracking-wider uppercase hover:bg-foreground/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
