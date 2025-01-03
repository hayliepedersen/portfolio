import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from "@/app/page.module.css";

interface EventImage {
  url: string;
  alt: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  images: EventImage[];
}

const EventsGallery = () => {
    const [selectedImage, setSelectedImage] = useState<Event | null>(null);
    const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});
  
    const events: Event[] = [
      { 
        id: 1, 
        title: "First Hackathon!",
        description: "(Did not) win first place with my team at HackNEU 2024 building an AI-powered accessibility tool.",
        date: "March 2024",
        images: [
          { url: "/api/placeholder/400/320", alt: "Team working at hackathon" },
          { url: "/api/placeholder/400/320", alt: "Project presentation" },
          { url: "/api/placeholder/400/320", alt: "Award ceremony" }
        ]
      },
      { 
        id: 2, 
        title: "NER Racing Team",
        description: "Joined Northeastern Electric Racing as a software developer. Working on the team website and learning about electric vehicles!",
        date: "January 2024",
        images: [
          { url: "/api/placeholder/400/320", alt: "Team meeting" },
          { url: "/api/placeholder/400/320", alt: "Working on the car" },
          { url: "/api/placeholder/400/320", alt: "Team photo" }
        ]
      }
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
          <p className={styles.eventsSubtitle}>...in my life ♡</p>
  
          <div className={styles.eventsGrid}>
            {events.map((event) => {
              const currentIndex = currentImageIndexes[event.id] || 0;
              return (
                <div 
                  key={event.id}
                  className={`${styles.eventCard} bg-white/80 backdrop-blur-md`}
                >
                  <div 
                    className={styles.eventImageWrapper}
                    onClick={() => setSelectedImage(event)}
                    style={{ cursor: 'pointer' }}
                  >
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
                  </div>

                  <div className={styles.eventText}>
                    <h3 className={styles.heading}>{event.title}</h3>
                    <p className={styles.date}>{event.date}</p>
                    <p className={styles.description}>{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal for full-size image view */}
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
                <X size={24} />
              </button>
            </div>
          </div>
        )}
      </section>
    );
};

export { EventsGallery };