import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CropCatalog from "./pages/CropCatalog";
import CropDetail from "./pages/CropDetail";
import CropManagement from "./pages/CropManagement";
import CropDoctor from "./pages/CropDoctor";
import AIAssistant from "./pages/AIAssistant";
import AboutDeveloper from "./pages/AboutDeveloper";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crop-catalog" element={<CropCatalog />} />
          <Route path="/crop/:cropName" element={<CropDetail />} />
          <Route path="/crop-management" element={<CropManagement />} />
          <Route path="/crop-doctor" element={<CropDoctor />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/about" element={<AboutDeveloper />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
