import React from "react";
import { Music } from "lucide-react";
import styles from "@/app/page.module.css";

const SpotifySection = () => {
  return (
    <section className={styles.spotifySection}>
      <div className={styles.spotifyCard}>
        <div className={styles.spotifyHeader}>
          <Music size={14} aria-hidden />
          <h3>currently on repeat</h3>
        </div>
        <div className={styles.spotifyContent}>
          <iframe
            src="https://open.spotify.com/embed/track/2FUwEr2BAfyebUBSOeLwO8?utm_source=generator"
            className={styles.spotifyEmbed}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify — currently on repeat"
          />
        </div>
      </div>
    </section>
  );
};

export default SpotifySection;
