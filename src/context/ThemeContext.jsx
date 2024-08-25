import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const themeContext = createContext();

function ThemeContext({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia("(prefer-color-scheme:darl)").matches,
    "theme"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setDarkMode((mode) => !mode);
  }

  return (
    <themeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </themeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error(
      "Dark theme is been accessed from outside the scope of provider"
    );
  }
  return context;
}

export default ThemeContext;
