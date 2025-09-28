import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useColorTheme, ColorTheme } from "@/contexts/ThemeContext";

const themeColors = {
  red: "#ff0000",
  blue: "#3b82f6", 
  green: "#22c55e",
  orange: "#f97316",
  purple: "#a855f7"
};

const themeNames = {
  red: "Classic Red",
  blue: "Ocean Blue", 
  green: "Forest Green",
  orange: "Sunset Orange",
  purple: "Royal Purple"
};

export default function ThemeSelector() {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover-elevate active-elevate-2"
          data-testid="button-theme-selector"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6" align="end">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Choose Your Theme
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize SportsCopilot with your favorite color
            </p>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            {(Object.keys(themeColors) as ColorTheme[]).map((theme) => (
              <button
                key={theme}
                onClick={() => setColorTheme(theme)}
                className={`group relative flex flex-col items-center space-y-2 p-3 rounded-lg hover-elevate active-elevate-2 transition-all duration-200 ${
                  colorTheme === theme 
                    ? 'bg-primary/10 ring-2 ring-primary' 
                    : 'hover:bg-muted/50'
                }`}
                data-testid={`theme-${theme}`}
              >
                {/* Color Circle */}
                <div
                  className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all duration-200 ${
                    colorTheme === theme 
                      ? 'ring-primary scale-110' 
                      : 'ring-transparent group-hover:ring-muted-foreground/20'
                  }`}
                  style={{ backgroundColor: themeColors[theme] }}
                />
                
                {/* Theme Name */}
                <span className={`text-xs font-medium text-center leading-tight transition-colors ${
                  colorTheme === theme 
                    ? 'text-primary' 
                    : 'text-muted-foreground group-hover:text-foreground'
                }`}>
                  {themeNames[theme]}
                </span>
                
                {/* Selected Indicator */}
                {colorTheme === theme && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
          
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Your theme preference is automatically saved
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}