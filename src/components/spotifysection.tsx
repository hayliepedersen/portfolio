import React from 'react';
import styles from "@/app/page.module.css";

const SpotifySection = () => {
  return (
    <section className={styles.spotifySection}>
      <div className={styles.spotifyContainer}>
        <div className={styles.spotifyCard}>
          <div className={styles.spotifyHeader}>
            <h3>currently on repeat ♡</h3>
          </div>
          <div className={styles.spotifyContent}>
            <iframe 
              src="https://open.spotify.com/embed/track/7sxjOcfj6F1uaTL6rySXa5?utm_source=generator" 
              className={styles.spotifyEmbed}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifySection;