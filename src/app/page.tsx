"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GithubIcon, ExternalLink, X, Menu } from "lucide-react";
import styles from "./page.module.css";
import { WorkTimeline } from "@/components/work";
import { EventsGallery } from "@/components/events";
import ThemeToggle from "@/components/themetoggle";
import VideoPlayer from "@/components/videoplayer";
import SpotifySection from "@/components/spotifysection";

interface Project {
  title: string;
  description: string;
  video?: string;
  videoId?: string;
  image?: string;
  poster?: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
}

export default function Home() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.slidingBorder}`);
    setTimeout(() => {
      elements.forEach((el) => el.classList.add(styles.animate));
    }, 100);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && navbarOpen) {
        setNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navbarOpen]);

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

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setNavbarOpen(false);
    }
  };

  const projects: Project[] = [
    {
      title: "aurora",
      description:
        "Personalized music recommendation engine that leverages Spotify's API to analyze listening patterns and generate curated playlists.",
      videoId: "1045070217",
      tags: ["React", "Javascript", "CSS", "Spotify API", "OAuth"],
      liveLink: "https://auroraplaylists.vercel.app/",
      githubLink: "https://github.com/hayliepedersen/aurora",
    },
    {
      title: "petfetch",
      description:
        "Comprehensive pet adoption platform that streamlines the match-making process between shelters and potential adopters.",
      videoId: "1045069421",
      poster: "/media/petfetchPoster.png",
      tags: ["Flask", "Pandas", "Streamlit", "Python", "MySQL", "Docker"],
      githubLink: "https://github.com/hayliepedersen/petalytics-petfetch",
    },
    {
      title: "c4c admin dashboard",
      description:
        "Full-stack administrative interface developed for Code4Community that optimizes partner management across multiple servers.",
      videoId: "1045068778",
      tags: ["Express", "React", "CSS", "Node.js", "REST API"],
      githubLink: "https://github.com/hayliepedersen/c4c-challenge-fall-2024",
    },
    {
      title: "pbcups",
      description:
        "First website I built! An engaging, responsive website showcasing the art and history of the wonderful peanut butter cups.",
      videoId: "1045064467",
      tags: ["HTML", "CSS", "Responsive Design"],
      githubLink: "https://github.com/hayliepedersen/pbcup-blog",
    },
    {
      title: "codewhisper",
      description:
        "Voice-controlled code completion tool that combines Deepgram's speech recognition with OpenAI's language models.",
      image: "/media/codewhisper.png",
      tags: ["Python", "Deepgram", "OpenAI", "TypeScript", "API Integration"],
      githubLink: "https://github.com/hayliepedersen/codewhisper-calhacks",
    },
    {
      title: "ideastruct",
      description:
        "Learning platform that automatically generates interactive knowledge graphs from educational content.",
      image: "/media/ideastruct.png",
      tags: [
        "Next.js",
        "CSS",
        "Machine Learning",
        "OpenAI",
        "Graph Algorithms",
      ],
      githubLink: "https://github.com/hayliepedersen/ideastruct-hackmit",
    },
  ];

  return (
    <div className={styles.page}>
      <ThemeToggle />

      {/* Mobile Navigation */}
      <div className={styles.mobileNav}>
        <div className={styles.mobileMenu}>
          {!navbarOpen ? (
            <button onClick={() => setNavbarOpen(true)}>
              <Menu strokeWidth="1" size={30} />
            </button>
          ) : (
            <button onClick={() => setNavbarOpen(false)}>
              <X strokeWidth="1" size={30} />
            </button>
          )}
        </div>
        <div
          className={`${styles.dropdownContent} ${
            navbarOpen ? styles.active : ""
          }`}
        >
          <a onClick={() => scrollToSection("about")}>About</a>
          <a onClick={() => scrollToSection("work")}>Work</a>
          <a onClick={() => scrollToSection("projects")}>Projects</a>
          <a onClick={() => scrollToSection("events")}>Events</a>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className={`${styles.navbar} ${styles.slidingBorder}`}>
        <div className={styles.navLinks}>
          <a onClick={() => scrollToSection("about")}>About</a>
          <a onClick={() => scrollToSection("work")}>Work</a>
          <a onClick={() => scrollToSection("projects")}>Projects</a>
          <a onClick={() => scrollToSection("events")}>Events</a>
        </div>
      </nav>

      <header className={styles.headerSection}>
        <h1>HAYLIE PEDERSEN</h1>
      </header>

      <div className={`${styles.profileSection} ${styles.slidingBorder}`}>
        <div className={styles.mainContent}>
          <p className={styles.title}>Software Developer</p>
          <p className={styles.bio}>
            Aspiring mind. Enthusiast of imaginative worlds, dark chocolate, and
            espresso.
          </p>
          <div className={styles.buttons}>
            <button
              className={styles.primaryBtn}
              onClick={() => scrollToSection("contact")}
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
        <div className={styles.modal} onClick={() => setShowResumeModal(false)}>
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
          <p>Hi! Welcome to this little space about me :)</p>
          <p>
            I&apos;m Haylie, an aspiring software developer with a passion for
            creating elegant solutions to complex problems. When I&apos;m not
            coding, you can find me exploring new technologies, admiring
            nature&apos;s beauty, or enjoying a vanilla latte while reading the
            latest fantasy novel.
          </p>
          <p>
            My journey in software development started with a curiosity about
            how things work, and that curiosity has only grown stronger with
            each project I undertake.
          </p>
        </div>

        <div className={styles.imageContainer}>
          <svg width="0" height="0">
            <defs>
              <mask id="flowerMask">
                <path
                  fill="white"
                  d="
                  M200,0 C160,40 80,40 40,80 C0,120 0,200 40,240 
                  C80,280 160,280 200,320 C240,280 320,280 360,240 
                  C400,200 400,120 360,80 C320,40 240,40 200,0 Z
                "
                />
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

                {project.videoId ? (
                  <VideoPlayer videoId={project.videoId} />
                ) : project.video ? (
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
                ) : (
                  project.image && (
                    <div className={styles.videoWrapper}>
                      <Image
                        src={project.image}
                        alt="Project Image"
                        fill
                        className={styles.video}
                      />
                    </div>
                  )
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

      <div id="work">
        <WorkTimeline />
      </div>
      <div id="events">
        <EventsGallery />
      </div>
      <SpotifySection />
      <footer id="contact" className={styles.footer}>
        <h2 className={styles.title}>Lets Connect!</h2>
        <div className={styles.contactInfo}>
          <a
            href="mailto:pedersen.h@northeastern.edu"
            className={styles.contactItem}
          >
            <i className={`${styles.icon} fas fa-envelope`}></i>
            pedersen.h@northeastern.edu
          </a>
          <a href="tel:+13155716223" className={styles.contactItem}>
            <i className={`${styles.icon} fas fa-phone`}></i>+1 (315) 571-6223
          </a>
          <a
            href="https://www.linkedin.com/in/haylie-pedersen/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <i className={`${styles.icon} fab fa-linkedin`}></i>LinkedIn
          </a>
          <a
            href="https://github.com/hayliepedersen"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <i className={`${styles.icon} fab fa-github`}></i>GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
