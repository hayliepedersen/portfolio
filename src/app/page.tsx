import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <div className={styles.navLinks}>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className={styles.headerSection}>
        <h1>HAYLIE PEDERSEN</h1>
      </header>

      <div className={styles.profileSection}>
        <div className={styles.decorativeDivider}>
          <svg viewBox="0 0 1200 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,15 
              C300,15 300,0 600,0 
              C900,0 900,15 1200,15
              C900,15 900,30 600,30
              C300,30 300,15 0,15
              Z
              M540,15 C570,15 570,10 600,10
              C630,10 630,15 660,15
              C630,15 630,20 600,20
              C570,20 570,15 540,15" />
          </svg>
        </div>

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

        <div className={styles.decorativeDivider}>
          <svg viewBox="0 0 1200 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,15 
              C300,15 300,30 600,30 
              C900,30 900,15 1200,15
              C900,15 900,0 600,0
              C300,0 300,15 0,15
              Z
              M540,15 C570,15 570,20 600,20
              C630,20 630,15 660,15
              C630,15 630,10 600,10
              C570,10 570,15 540,15" />
          </svg>
        </div>
      </div>

      <section className={styles.projects}>
        <h2>Featured Projects</h2>
        <div className={styles.projectGrid}>
          <div className={styles.projectCard}>
            <h3>Project Name</h3>
            <p>Project description goes here...</p>
            <div className={styles.tags}>
              <span>React</span>
              <span>TypeScript</span>
            </div>
          </div>

          <div className={styles.projectCard}>
            <h3>Project Name</h3>
            <p>Project description goes here...</p>
            <div className={styles.tags}>
              <span>Next.js</span>
              <span>CSS</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
