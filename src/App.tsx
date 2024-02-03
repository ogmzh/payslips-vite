import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

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
          <div className="flex h-screen justify-center pb-10 pt-24">
            <Header isTop={isTop} />
            <AnimatedRoutes setIsTop={setIsTop} />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
