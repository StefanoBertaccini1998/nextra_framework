import { useTheme } from "../../theme/ThemeProvider";
import { baseTheme, darkTheme, darkRedTheme, accessibleTheme, type NextraTheme } from "../../theme/theme";
import { IconButton } from "./IconButton";
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
    <div className="flex items-center">
      <div className="flex gap-1">
        <IconButton 
          size="sm"
          isActive={theme.name === "light"}
          onClick={() => handleThemeChange(baseTheme)}
          title="Light Theme"
          color="white"
        >
          <SunIcon className="w-5 h-5 stroke-[1.5]" />
        </IconButton>
        <IconButton 
          size="sm"
          isActive={theme.name === "dark"}
          onClick={() => handleThemeChange(darkTheme)}
          title="Dark Theme"
          color="white"
        >
          <MoonIcon className="w-5 h-5 stroke-[1.5]" />
        </IconButton>
        <IconButton 
          size="sm"
          isActive={theme.name === "dark-red"}
          onClick={() => handleThemeChange(darkRedTheme)}
          title="Dark Red Theme"
          color="white"
        >
          <FireIcon className="w-5 h-5 stroke-[1.5]" />
        </IconButton>
        <IconButton 
          size="sm"
          isActive={theme.name === "accessible"}
          onClick={() => handleThemeChange(accessibleTheme)}
          title="Accessible Theme"
          color="white"
        >
          <EyeIcon className="w-5 h-5 stroke-[1.5]" />
        </IconButton>
      </div>
    </div>
  );
}
