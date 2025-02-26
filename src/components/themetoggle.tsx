import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from "@/app/page.module.css";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  return (
    <button 
      onClick={toggleTheme}
      className={`${styles.themeToggle} ${isDark ? styles.themeToggleDark : styles.themeToggleLight}`}
      aria-label="Toggle theme"
    >
      <div className={styles.backgroundIcons}>
        <Sun size={14} className={`${styles.themeIcon} ${styles.bgSunIcon}`} />
        <Moon size={14} className={`${styles.themeIcon} ${styles.bgMoonIcon}`} />
      </div>
      <div className={`${styles.toggleThumb} ${isDark ? styles.toggleThumbDark : styles.toggleThumbLight}`}>
        <Sun size={14} className={`${styles.themeIcon} ${styles.sunIcon}`} />
        <Moon size={14} className={`${styles.themeIcon} ${styles.moonIcon}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
