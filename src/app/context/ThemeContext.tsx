// "use client";

// import type React from "react";
// import { createContext, useState, useContext, useEffect, useRef } from "react";

// type Theme = "light" | "dark";

// type ThemeContextType = {
//   theme: Theme;
//   toggleTheme: () => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   // Initialize theme from localStorage directly (using function to avoid SSR issues)
//   const [theme, setTheme] = useState<Theme>(() => {
//     if (typeof window !== "undefined") {
//       const savedTheme = localStorage.getItem("theme") as Theme | null;
//       return savedTheme || "dark";
//     }
//     return "dark";
//   });
//   const isFirstRender = useRef(true);

//   useEffect(() => {
//     // Apply theme to document on mount and when theme changes
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }

//     // Save to localStorage only after first render (to avoid overwriting on initial load)
//     if (!isFirstRender.current) {
//       localStorage.setItem("theme", theme);
//     } else {
//       isFirstRender.current = false;
//     }
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };
