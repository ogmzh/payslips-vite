import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner"
import { AnimatedRoutes } from "@/components/animated/routes";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/providers/theme";

const queryClient = new QueryClient();

function App() {
  const [isTop, setIsTop] = useState(true);
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <div className="flex flex-col h-[100vh] overflow-y-hidden">
            <Header isTop={isTop} />
            <AnimatedRoutes setIsTop={setIsTop} />
          </div>
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
