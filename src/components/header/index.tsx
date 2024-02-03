import { MoonStar, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/hooks";
import { Link } from "react-router-dom";

export const Header = ({ isTop }: { isTop: boolean }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 p-4 transition-all duration-300 ${
        isTop ? "border-b-2 border-transparent" : "border-b-2"
      }`}>
      <div className="flex justify-center">
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
      </div>
    </header>
  );
};
