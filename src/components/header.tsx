import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import ToggleTheme from "./toggleTheme";

function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b  bg-background/95 backdrop-blur-0 py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container flex mx-auto h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={isDark ? "logo (1).png" : "logo2.png"}
            alt="logo"
            className="h-14"
          />
        </Link>

        <div>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}

export default Header;
