import { createContext, useContext, useEffect, useState } from "react";

export type ColorTheme = "red" | "blue" | "green" | "orange" | "purple";

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorSchemes = {
  red: {
    primary: "0 100% 50%",
    accent: "0 100% 50%",
    ring: "0 100% 50%",
    sidebarPrimary: "0 100% 50%",
    sidebarRing: "0 100% 50%",
    chart1: "0 100% 50%",
    chart4: "0 100% 50%",
    destructive: "0 100% 50%"
  },
  blue: {
    primary: "217 91% 60%",
    accent: "217 91% 60%", 
    ring: "217 91% 60%",
    sidebarPrimary: "217 91% 60%",
    sidebarRing: "217 91% 60%",
    chart1: "217 91% 60%",
    chart4: "217 91% 60%",
    destructive: "0 100% 50%" // Keep red for destructive
  },
  green: {
    primary: "142 76% 36%",
    accent: "142 76% 36%",
    ring: "142 76% 36%", 
    sidebarPrimary: "142 76% 36%",
    sidebarRing: "142 76% 36%",
    chart1: "142 76% 36%",
    chart4: "142 76% 36%",
    destructive: "0 100% 50%" // Keep red for destructive
  },
  orange: {
    primary: "25 95% 53%",
    accent: "25 95% 53%",
    ring: "25 95% 53%",
    sidebarPrimary: "25 95% 53%", 
    sidebarRing: "25 95% 53%",
    chart1: "25 95% 53%",
    chart4: "25 95% 53%",
    destructive: "0 100% 50%" // Keep red for destructive
  },
  purple: {
    primary: "271 81% 56%",
    accent: "271 81% 56%",
    ring: "271 81% 56%",
    sidebarPrimary: "271 81% 56%",
    sidebarRing: "271 81% 56%", 
    chart1: "271 81% 56%",
    chart4: "271 81% 56%",
    destructive: "0 100% 50%" // Keep red for destructive
  }
};

function applyColorTheme(theme: ColorTheme) {
  const root = document.documentElement;
  const colors = colorSchemes[theme];
  
  // Apply to both light and dark mode
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--ring', colors.ring);
  root.style.setProperty('--sidebar-primary', colors.sidebarPrimary);
  root.style.setProperty('--sidebar-ring', colors.sidebarRing);
  root.style.setProperty('--chart-1', colors.chart1);
  root.style.setProperty('--chart-4', colors.chart4);
  root.style.setProperty('--destructive', colors.destructive);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    // Load from localStorage or default to blue (Ocean Blue)
    const saved = localStorage.getItem('sportscopilot-color-theme');
    return (saved as ColorTheme) || 'blue';
  });

  useEffect(() => {
    // Apply the theme on mount and when it changes
    applyColorTheme(colorTheme);
    localStorage.setItem('sportscopilot-color-theme', colorTheme);
  }, [colorTheme]);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ThemeProvider');
  }
  return context;
}

export { colorSchemes };