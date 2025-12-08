import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ✅ FINAL ROUTER FIX */}
      <BrowserRouter>
        <Routes>
          {/* ✅ Allow BOTH home paths */}
          <Route path="/" element={<Index />} />
          <Route path="/sphere-3js/" element={<Index />} />

          {/* ✅ Optional redirect safety */}
          <Route path="/sphere-3js" element={<Navigate to="/sphere-3js/" replace />} />

          {/* ✅ Keep 404 last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


