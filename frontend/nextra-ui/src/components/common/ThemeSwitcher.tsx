import { useTheme } from "../../theme/ThemeProvider";
import { baseTheme, darkTheme, darkRedTheme, accessibleTheme, type NextraTheme } from "../../theme/theme";
import { Button } from "./Button";
import { 
  SunIcon, 
  MoonIcon,
  EyeIcon,
  FireIcon
} from '@heroicons/react/24/solid';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: NextraTheme) => {
    console.log('Switching to theme:', newTheme.name);
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex rounded-lg p-1 gap-1">
        <Button 
          size="sm"
          variant="ghost"
          isActive={theme.name === "light"}
          onClick={() => handleThemeChange(baseTheme)}
          title="Light Theme"
          className="text-white hover:bg-white/10"
        >
          <SunIcon className="w-5 h-5" />
          <span className="sr-only">Light Theme</span>
        </Button>
        <Button 
          size="sm"
          variant="ghost"
          isActive={theme.name === "dark"}
          onClick={() => handleThemeChange(darkTheme)}
          title="Dark Theme"
          className="text-white hover:bg-white/10"
        >
          <MoonIcon className="w-5 h-5" />
          <span className="sr-only">Dark Theme</span>
        </Button>
        <Button 
          size="sm"
          variant="ghost"
          isActive={theme.name === "dark-red"}
          onClick={() => handleThemeChange(darkRedTheme)}
          title="Dark Red Theme"
          className="text-white hover:bg-white/10"
        >
          <FireIcon className="w-5 h-5" />
          <span className="sr-only">Dark Red Theme</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          isActive={theme.name === "accessible"}
          onClick={() => handleThemeChange(accessibleTheme)}
          title="Accessible Theme"
          className="text-white hover:bg-white/10"
        >
          <EyeIcon className="w-5 h-5" />
          <span className="sr-only">Accessible Theme</span>
        </Button>
      </div>
    </div>
  );
}
