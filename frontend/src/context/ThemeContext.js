import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Apply theme to document body when it changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Apply the theme to the body element
    applyTheme(savedTheme || theme);
  }, []);

  // Update body attributes and classes when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Function to apply theme to body and HTML elements
  const applyTheme = (currentTheme) => {
    document.body.setAttribute('data-theme', currentTheme);
    
    // Apply theme-specific CSS variables
    if (currentTheme === 'dark') {
      document.documentElement.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.9)');
      document.documentElement.style.setProperty('--text-color-secondary', 'rgba(255, 255, 255, 0.6)');
      document.documentElement.style.setProperty('--background-color', '#1e1e1e');
      document.documentElement.style.setProperty('--card-background', '#2e2e2e');
      document.documentElement.style.setProperty('--card-border', '#444444');
    } else {
      document.documentElement.style.setProperty('--text-color', 'rgba(34, 34, 96, 0.9)');
      document.documentElement.style.setProperty('--text-color-secondary', 'rgba(34, 34, 96, 0.6)');
      document.documentElement.style.setProperty('--background-color', '#f0f2f5');
      document.documentElement.style.setProperty('--card-background', '#FCF6F9');
      document.documentElement.style.setProperty('--card-border', '#FFFFFF');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
