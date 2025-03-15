import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import ToggleTheme from "./toggleTheme";
import SearchCity from "./SearchCity";

function Header() {
  const { theme } = useTheme();
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

        <div className="flex  gap-4">
          <SearchCity />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}

export default Header;
