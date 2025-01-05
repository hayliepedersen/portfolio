"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { GithubIcon, ExternalLink, X } from 'lucide-react';
import styles from "./page.module.css";
import { WorkTimeline } from '@/components/work';
import { EventsGallery } from '@/components/events';
import ThemeToggle from '@/components/themetoggle';
// import ParticleEffect from '@/components/particle';

interface Project {
  title: string;
  description: string;
  video?: string;
  image?: string;
  poster?: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  
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

  useEffect(() => {
    const handleScroll = () => {
      const workSection = document.querySelector(`.${styles.workExperience}`);
      if (!workSection) return;
  
      const rect = workSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
  
      if (isVisible) {
        workSection.classList.add(styles.visible);
      } else {
        workSection.classList.remove(styles.visible);
      }
    };
  
    handleScroll();
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); 
    }
  };

  const projects: Project[] = [
    {
      title: "soundwrap",
      description: "A dynamic music visualization platform that transforms audio into stunning visual experiences. Built with React and the Web Audio API, it offers real-time audio analysis and interactive visualizations.",
      video: "/media/soundwrap-demo.mov",
      tags: ["React", "TypeScript"],
      liveLink: "https://soundwrap.demo",
      githubLink: "https://github.com/yourusername/soundwrap"
    },
    {
      title: "petfetch",
      description: "A dynamic music visualization platform that transforms audio into stunning visual experiences. Built with React and the Web Audio API, it offers real-time audio analysis and interactive visualizations.",
      video: "/media/petfetch.mp4",
      poster: "/media/petfetchPoster.png",
      tags: ["Flask", "Pandas", "Streamlit", "Python", "MySQL", "Docker"],
      liveLink: "https://soundwrap.demo",
      githubLink: "https://github.com/yourusername/soundwrap"
    },
    {
      title: "c4c admin dashboard",
      description: "An AI-powered code completion tool that helps developers write better code faster. Features include syntax highlighting, multi-language support, and intelligent suggestions.",
      video: "/media/c4c.mov",
      tags: ["Next.js", "CSS", "Machine Learning"],
      liveLink: "https://codewhisper.demo",
      githubLink: "https://github.com/yourusername/codewhisper"
    },
    {
      title: "pbcups",
      description: "A dynamic music visualization platform that transforms audio into stunning visual experiences. Built with React and the Web Audio API, it offers real-time audio analysis and interactive visualizations.",
      video: "/media/pbcupblog.mov",
      tags: ["HTML", "CSS"],
      liveLink: "https://codewhisper.demo",
      githubLink: "https://github.com/yourusername/codewhisper"
    },
    {
      title: "codewhisper",
      description: "An AI-powered code completion tool that helps developers write better code faster. Features include syntax highlighting, multi-language support, and intelligent suggestions.",
      image: "/media/codewhisper.png",
      tags: ["Next.js", "CSS", "Machine Learning"],
      liveLink: "https://codewhisper.demo",
      githubLink: "https://github.com/yourusername/codewhisper"
    },
    {
      title: "ideastruct",
      description: "An AI-powered code completion tool that helps developers write better code faster. Features include syntax highlighting, multi-language support, and intelligent suggestions.",
      image: "/media/ideastruct.png",
      tags: ["Next.js", "CSS", "Machine Learning"],
      liveLink: "https://codewhisper.demo",
      githubLink: "https://github.com/yourusername/codewhisper"
    },
  ];

  return (
    <div className={styles.page}>
      {/* <ParticleEffect /> */}
      <style>
        {`
          ::selection {
            color: #010201; 
            background: #FF5500; 
          }
        `}
      </style>

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
        <a onClick={() => scrollToSection('about')}>About</a>
        <a onClick={() => scrollToSection('work')}>Work</a>
        <a onClick={() => scrollToSection('projects')}>Projects</a>
        <a onClick={() => scrollToSection('events')}>Events</a>
      </div>
      </div>

      {/* Desktop Navigation */}
      <nav className={`${styles.navbar} ${styles.slidingBorder}`}>
        <div className={styles.navLinks}>
          <a onClick={() => scrollToSection('about')}>About</a>
          <a onClick={() => scrollToSection('work')}>Work</a>
          <a onClick={() => scrollToSection('projects')}>Projects</a>
          <a onClick={() => scrollToSection('events')}>Events</a>
        </div>
      </nav>

      <header className={styles.headerSection}>
        <h1>HAYLIE PEDERSEN</h1>
      </header>

      <div className={`${styles.profileSection} ${styles.slidingBorder}`}>
        <div className={styles.mainContent}>
          <p className={styles.title}>Software Developer</p>
          <p className={styles.bio}>
            Aspiring mind. Enthusiast of imaginative worlds, dark chocolate, and espresso.
          </p>
          <div className={styles.buttons}>
            <button 
              className={styles.primaryBtn}
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </button>
            <button 
              className={styles.secondaryBtn}
              onClick={() => setShowResumeModal(true)}
            >
              View Resume
            </button>
          </div>
        </div>
      </div>

      <div className={styles.cat}>
        <Image
          src="/media/cat.gif" 
          alt="Cat"
          width={50}
          height={50}
          unoptimized
        />
      </div>

      {showResumeModal && (
        <div 
          className={styles.modal}
          onClick={() => setShowResumeModal(false)}
        >
          <div className={styles.modalContent}>
            <Image
              src="/media/resume.png" 
              alt="Resume"
              className={styles.modalImage}
              fill
              unoptimized
            />
            <button 
              className={styles.modalClose}
              onClick={(e) => {
                e.stopPropagation();
                setShowResumeModal(false);
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutText}>
          <h2>ABOUT ME</h2>
          <p>
            {/* ADD APOSTROPHES HERE SOMEHOW */}
            Hi! Welcome to this little space about me :)
          </p>
          <p>
            Im Haylie, an aspiring software developer with a passion for creating elegant solutions to complex problems. 
            When Im not coding, you can find me exploring new technologies, admiring natures beauty, or enjoying a
            vanilla latte while reading the latest fantasy novel.
          </p>
          <p>
            My journey in software development started with a curiosity about how things work, 
            and that curiosity has only grown stronger with each project I undertake.
          </p>
        </div>
        
        <div className={styles.imageContainer}>
          <svg width="0" height="0">
            <defs>
              <mask id="flowerMask">
                <path fill="white" d="
                  M200,0 C160,40 80,40 40,80 C0,120 0,200 40,240 
                  C80,280 160,280 200,320 C240,280 320,280 360,240 
                  C400,200 400,120 360,80 C320,40 240,40 200,0 Z
                "/>
              </mask>
            </defs>
          </svg>
          <Image 
            src="/media/portrait.jpeg" 
            alt="About me"
            fill
            className={styles.maskedImage}
          />
        </div>
      </section>

      <section id="projects" className={styles.projects}>
        <h2>PROJECTS</h2>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectContent}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                {project.video && (
                  <div className={styles.videoWrapper}>
                    <video 
                      controls 
                      className={styles.video}
                      poster={project.poster} 
                    >
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {project.image && (
                  <div className={styles.videoWrapper}>
                    <Image 
                      src={project.image} 
                      alt="Project Image"
                      fill
                      className={styles.video}
                     />
                  </div>
                )}
                
                <div className={styles.tags}>
                  {project.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
                
                <div className={styles.projectLinks}>
                  {project.liveLink && (
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.projectLink} ${styles.liveLink}`}
                    >
                      <ExternalLink size={16} />
                      Visit Site
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.projectLink} ${styles.githubLink}`}
                    >
                      <GithubIcon size={16} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id='work'>
        <WorkTimeline />
      </div>
      <div id='events'>
        <EventsGallery />
      </div>
      <footer className={styles.footer}>
      <h2 className={styles.title}>Lets Connect!</h2>
      <div className={styles.contactInfo}>
        <a href="mailto:pedersen.h@northeastern.edu" className={styles.contactItem}>
          <i className={`${styles.icon} fas fa-envelope`}></i>pedersen.h@northeastern.edu
        </a>
        <a href="tel:+13155716223" className={styles.contactItem}>
          <i className={`${styles.icon} fas fa-phone`}></i>+1 (315) 571-6223
        </a>
        <a href="https://www.linkedin.com/in/haylie-pedersen/" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
          <i className={`${styles.icon} fab fa-linkedin`}></i>LinkedIn
        </a>
        <a href="https://github.com/hayliepedersen" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
          <i className={`${styles.icon} fab fa-github`}></i>GitHub
        </a>
      </div>
      </footer>
      <ThemeToggle />
    </div>
  );
}