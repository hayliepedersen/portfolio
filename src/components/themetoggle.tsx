import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from "@/app/page.module.css";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const userPreference = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;

    setIsDark(userPreference === 'dark' || (!userPreference && systemPreference));
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  return (
    <button 
      onClick={toggleTheme}
      className={`${styles.themeToggle} ${isDark ? styles.dark : ''}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className={styles.sunIcon} />
      ) : (
        <Moon className={styles.moonIcon} />
      )}
    </button>
  );
};

export default ThemeToggle;
