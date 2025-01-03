import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from "@/app/page.module.css";

interface EventImage {
  url: string;
  alt: string;
}

interface Event {
  id: number;
  title: string;
  images: EventImage[];
}

const EventsGallery = () => {
    const [selectedImage, setSelectedImage] = useState<Event | null>(null);
    const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});
  
    const events: Event[] = [
      { 
        id: 1, 
        title: "Tech Conference 2023",
        images: [
          { url: "https://picsum.photos/400/320?random=1", alt: "Conference Day 1" },
          { url: "https://picsum.photos/400/320?random=2", alt: "Conference Day 2" },
          { url: "https://picsum.photos/400/320?random=3", alt: "Conference Day 3" }
        ]
      },
      { 
        id: 2, 
        title: "Hackathon Winner",
        images: [
          { url: "https://picsum.photos/400/320?random=4", alt: "Team Working" },
          { url: "https://picsum.photos/400/320?random=5", alt: "Final Presentation" },
          { url: "https://picsum.photos/400/320?random=6", alt: "Award Ceremony" }
        ]
      },
      // Add more events as needed
    ];
  
    const handleNext = (eventId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const event = events.find(e => e.id === eventId);
      if (!event) return;
      
      setCurrentImageIndexes(prev => ({
        ...prev,
        [eventId]: ((prev[eventId] || 0) + 1) % event.images.length
      }));
    };
  
    const handlePrev = (eventId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const event = events.find(e => e.id === eventId);
      if (!event) return;
      
      setCurrentImageIndexes(prev => ({
        ...prev,
        [eventId]: ((prev[eventId] || 0) - 1 + event.images.length) % event.images.length
      }));
    };
  
    return (
      <section className={styles.eventsSection}>
        <div className={styles.eventsContainer}>
          <h2 className={styles.sectionTitle}>RECENT EVENTS</h2>
  
          <div className={styles.eventsGrid}>
            {events.map((event) => {
              const currentIndex = currentImageIndexes[event.id] || 0;
              return (
                <div 
                  key={event.id}
                  className={styles.eventCard}
                  onClick={() => setSelectedImage(event)}
                >
                  <div className={styles.eventImageWrapper}>
                    <div className={styles.carouselContainer}>
                      {event.images.map((image, index) => (
                        <div
                          key={index}
                          className={styles.carouselSlide}
                          style={{
                            transform: `translateX(${(index - currentIndex) * 100}%)`,
                          }}
                        >
                          <Image
                            src={image.url}
                            alt={image.alt}
                            className={styles.eventImage}
                            fill
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className={styles.navigationButtons}>
                      <button 
                        className={`${styles.navButton} ${styles.prevButton}`}
                        onClick={(e) => handlePrev(event.id, e)}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={(e) => handleNext(event.id, e)}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
  
                    <div className={styles.imageDots}>
                      {event.images.map((_, index) => (
                        <span
                          key={index}
                          className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                        />
                      ))}
                    </div>
  
                    <div className={styles.eventOverlay} />
                    <div className={styles.eventTitle}>
                      <h3>{event.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  
        {selectedImage && (
          <div 
            className={styles.modal}
            onClick={() => setSelectedImage(null)}
          >
            <div className={styles.modalContent}>
              <Image
                src={selectedImage.images[currentImageIndexes[selectedImage.id] || 0].url}
                alt={selectedImage.images[currentImageIndexes[selectedImage.id] || 0].alt}
                className={styles.modalImage}
                fill
                unoptimized
              />
              <div className={styles.modalNavigation}>
                <button 
                  className={`${styles.navButton} ${styles.modalNavButton}`}
                  onClick={(e) => handlePrev(selectedImage.id, e)}
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className={`${styles.navButton} ${styles.modalNavButton}`}
                  onClick={(e) => handleNext(selectedImage.id, e)}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <button 
                className={styles.modalClose}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </section>
    );
  };

export { EventsGallery };