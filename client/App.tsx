import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { UpdatedNavigation } from "./components/UpdatedNavigation";
import { UpdatedFooter } from "./components/UpdatedFooter";
import { CouponPopup } from "./components/CouponPopup";
import Index from "./pages/Index";
import { Locations } from "./pages/Locations";
import { OurStory } from "./pages/OurStory";
import Franchise from "./pages/Franchise";
import NotFound from "./pages/NotFound";
import AdminKasa from "./pages/AdminKasa";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isAdminPage =
    location.pathname === "/admin" || location.pathname === "/admin-kasa";

  return (
    <>
      {!isAdminPage && <UpdatedNavigation />}
      <CouponPopup />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/fransiza" element={<Franchise />} />
        <Route path="/admin" element={<AdminKasa />} />
        <Route path="/admin-kasa" element={<AdminKasa />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminPage && <UpdatedFooter />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
const w = window as unknown as { __appRoot?: ReturnType<typeof createRoot> };
if (!w.__appRoot) {
  w.__appRoot = createRoot(container);
}
w.__appRoot.render(<App />);
