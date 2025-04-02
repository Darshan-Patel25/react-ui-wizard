
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";
import UserProfile from "./pages/UserProfile";
import GpsService from "./pages/GpsService";
import Requests from "./pages/Requests";
import TelegramBot from "./pages/TelegramBot";
import Cars from "./pages/Cars";
import TestDrive from "./pages/TestDrive";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/gps-service" element={<GpsService />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/telegram-bot" element={<TelegramBot />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/test-drive" element={<TestDrive />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
