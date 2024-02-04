import { ChevronLeft, MoonStar, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Capacitor } from "@capacitor/core";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/hooks";

export const Header = ({ isTop }: { isTop: boolean }) => {
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header
      className={`flex h-20 w-full justify-center transition-all duration-300 ${
        isTop ? "border-b-2 border-transparent" : "border-b-2"
      } ${Capacitor.isNativePlatform() ? "mb-2 px-8 py-12" : "mb-4 p-4"}`}>
      {Capacitor.isNativePlatform() && pathname.startsWith("/payroll") && (
        <Link to="/">
          <ChevronLeft className="h-8 w-8" />
        </Link>
      )}
      <h1 className="w-full justify-between text-2xl font-semibold md:w-2/3 lg:w-1/2">
        <Link to="/">Payslips</Link>
      </h1>
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === "dark" ? (
          <MoonStar className="h-6 w-6" />
        ) : (
          <Sun className="h-6 w-6" />
        )}
      </Button>
    </header>
  );
};
