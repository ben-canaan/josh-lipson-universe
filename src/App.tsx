import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Poetry from "./pages/Poetry";
import Artwork from "./pages/Artwork";
import Essays from "./pages/Essays";
import Services from "./pages/Services";
import Speaking from "./pages/Speaking";
import NotFound from "./pages/NotFound";
import { routeMeta, notFoundMeta } from "./seo";

const queryClient = new QueryClient();

// Keeps the tab title right when moving between pages without a reload.
const PageTitle = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
    document.title = (routeMeta[path] ?? notFoundMeta).title;
  }, [pathname]);
  return null;
};

// The router is supplied by the caller: BrowserRouter in main.tsx,
// StaticRouter in entry-server.tsx (build-time pre-rendering).
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PageTitle />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/poetry" element={<Poetry />} />
        <Route path="/artwork" element={<Artwork />} />
        <Route path="/essays" element={<Essays />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/services" element={<Services />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
