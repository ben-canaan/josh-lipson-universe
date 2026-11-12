import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-40 pb-24 px-6 text-center">
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">Page not found</h1>
        <p className="text-muted-foreground font-body mb-8">That page doesn't exist, or has moved.</p>
        <a href="/" className="text-primary underline underline-offset-4 font-body">
          Return home
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
