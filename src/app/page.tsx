"use client";
import { useState, useEffect } from 'react';
import styles from "./page.module.css";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    // Add sliding border animation on mount
    const elements = document.querySelectorAll(`.${styles.slidingBorder}`);
    setTimeout(() => {
      elements.forEach(el => el.classList.add(styles.animate));
    }, 100);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest(`.${styles.mobileNav}`)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className={styles.page}>
      {/* Mobile Navigation */}
      <div className={styles.mobileNav}>
        <button 
          className={styles.hamburger}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className={`${styles.dropdownContent} ${isMenuOpen ? styles.active : ''}`}>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className={`${styles.navbar} ${styles.slidingBorder}`}>
        <div className={styles.navLinks}>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className={styles.headerSection}>
        <h1>HAYLIE PEDERSEN</h1>
      </header>

      <div className={`${styles.profileSection} ${styles.slidingBorder}`}>
        <div className={styles.mainContent}>
          <p className={styles.title}>Software Developer</p>
          <p className={styles.bio}>
            Aspiring mind. Enthusiast of imaginative worlds, dark chocolate, and cheese.
          </p>
          <div className={styles.buttons}>
            <button className={styles.primaryBtn}>Contact Me</button>
            <button className={styles.secondaryBtn}>View Resume</button>
          </div>
        </div>
      </div>

      <section className={styles.projects}>
        <h2>Projects</h2>
        <div className={styles.projectGrid}>

          <div className={styles.projectCard}>
            <h3>soundwrap</h3>
            <p>description goes here...</p>
            <div className={styles.tags}>
              <span>React</span>
              <span>TypeScript</span>
            </div>
          </div>

          <div className={styles.projectCard}>
            <h3>codewhisper</h3>
            <p>description goes here...</p>
            <div className={styles.tags}>
              <span>Next.js</span>
              <span>CSS</span>
            </div>
          </div>

          <div className={styles.projectCard}>
            <h3>petfetch</h3>
            <p>description goes here...</p>
            <div className={styles.tags}>
              <span>React</span>
              <span>TypeScript</span>
            </div>
          </div>

          <div className={styles.projectCard}>
            <h3>pb cup blog</h3>
            <p>description goes here...</p>
            <div className={styles.tags}>
              <span>React</span>
              <span>TypeScript</span>
            </div>
          </div>

          <div className={styles.projectCard}>
            <h3>c4c admin dashboard</h3>
            <p>description goes here...</p>
            <div className={styles.tags}>
              <span>React</span>
              <span>TypeScript</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}