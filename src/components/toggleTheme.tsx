import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`cursor-pointer flex items-center transition-transform duration-500
        ${isDark ? "rotate-180" : "rotate-0"}
        `}
    >
      {isDark ? (
        <Sun className="h-6 w-6 transition-all text-yellow-500 rotate-0" />
      ) : (
        <Moon className="h-6 w-6 transition-all text-blue-500 rotate-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}

export default ToggleTheme;
