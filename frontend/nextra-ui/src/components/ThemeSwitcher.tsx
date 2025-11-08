import { useTheme } from "../theme/ThemeProvider";
import { baseTheme, darkTheme, accessibleTheme, type NextraTheme } from "../theme/theme";
import { Button } from "./common/Button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: NextraTheme) => {
    console.log('Switching to theme:', newTheme.name);
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex rounded-lg bg-surface-hover p-1 gap-1">
        <Button 
          size="sm"
          variant={theme.name === "light" ? "primary" : "ghost"}
          isActive={theme.name === "light"}
          onClick={() => handleThemeChange(baseTheme)}
        >
          Light
        </Button>
        <Button 
          size="sm"
          variant={theme.name === "dark" ? "primary" : "ghost"}
          isActive={theme.name === "dark"}
          onClick={() => handleThemeChange(darkTheme)}
        >
          Dark
        </Button>
        <Button
          size="sm"
          variant={theme.name === "accessible" ? "primary" : "ghost"}
          isActive={theme.name === "accessible"}
          onClick={() => handleThemeChange(accessibleTheme)}
        >
          A11y
        </Button>
      </div>
    </div>
  );
}
