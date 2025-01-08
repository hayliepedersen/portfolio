import React from 'react';
import styles from "@/app/page.module.css";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <div className={styles.videoContainer}>
      <iframe
        className={styles.videoIframe}
        src={`https://player.vimeo.com/video/${videoId}`}
        title="Project Demo Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;