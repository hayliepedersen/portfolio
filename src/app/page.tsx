"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  GithubIcon,
  ArrowUpRight,
  Menu,
  X,
  Mail,
  Linkedin,
  FileText,
} from "lucide-react";
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

function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const NAME_LETTERS = "HAYLIE PEDERSEN";

const HERO_PHOTOS = [
  { src: "/media/hero/portrait.jpeg", alt: "Haylie Pedersen" },
  { src: "/media/hero/park.jpeg", alt: "Boston Public Garden in spring" },
  { src: "/media/hero/magnolia.jpeg", alt: "Magnolia tree in bloom" },
  { src: "/media/hero/spresso.jpeg", alt: "Espresso" },
];

export default function Home() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [touchedLetters, setTouchedLetters] = useState<Set<number>>(new Set());
  const [sparkleVisible, setSparkleVisible] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
    const id = setInterval(() => {
      setHeroSlide((s) => (s + 1) % HERO_PHOTOS.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const aboutRef = useReveal<HTMLElement>();
  const projectsRef = useReveal<HTMLElement>();
  const projectListRef = useReveal<HTMLDivElement>();

  const totalTargetLetters = NAME_LETTERS.replace(/\s/g, "").length;

  const handleLetterEnter = (index: number) => {
    setTouchedLetters((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      if (next.size >= totalTargetLetters) {
        setSparkleVisible(true);
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
          setSparkleVisible(false);
          setTouchedLetters(new Set());
        }, 2400);
      }
      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && navbarOpen) setNavbarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [navbarOpen]);

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navbarOpen]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setNavbarOpen(false);
    }
  };

  const projects: Project[] = [
    {
      title: "aurora",
      description:
        "Personalized music recommendation engine that leverages Spotify's API to analyze listening patterns and generate curated playlists.",
      videoId: "1045070217",
      tags: ["React", "JavaScript", "Spotify API", "OAuth"],
      liveLink: "https://auroraplaylists.vercel.app/",
      githubLink: "https://github.com/hayliepedersen/aurora",
    },
    {
      title: "petfetch",
      description:
        "Pet adoption platform that streamlines the match-making process between shelters and potential adopters.",
      videoId: "1045069421",
      poster: "/media/petfetchPoster.png",
      tags: ["Flask", "Pandas", "Streamlit", "Python", "MySQL", "Docker"],
      githubLink: "https://github.com/hayliepedersen/petalytics-petfetch",
    },
    {
      title: "c4c admin dashboard",
      description:
        "Full-stack administrative interface for Code4Community that optimizes partner management across multiple servers.",
      videoId: "1045068778",
      tags: ["Express", "React", "Node.js", "REST API"],
      githubLink: "https://github.com/hayliepedersen/c4c-challenge-fall-2024",
    },
    {
      title: "pbcups",
      description:
        "My very first website — a responsive tribute to the art and history of peanut butter cups.",
      videoId: "1045064467",
      tags: ["HTML", "CSS", "Responsive Design"],
      githubLink: "https://github.com/hayliepedersen/pbcup-blog",
    },
    {
      title: "codewhisper",
      description:
        "Voice-controlled code completion tool combining Deepgram's speech recognition with OpenAI's language models.",
      image: "/media/codewhisper.png",
      tags: ["Python", "Deepgram", "OpenAI", "TypeScript"],
      githubLink: "https://github.com/hayliepedersen/codewhisper-calhacks",
    },
    {
      title: "ideastruct",
      description:
        "Learning platform that automatically generates interactive knowledge graphs from educational content.",
      image: "/media/ideastruct.png",
      tags: ["Next.js", "Machine Learning", "OpenAI", "Graph Algorithms"],
      githubLink: "https://github.com/hayliepedersen/ideastruct-hackmit",
    },
  ];

  return (
    <div className={styles.page}>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
      >
        <div className={styles.navInner}>
          <a
            className={styles.navBrand}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            haylie
          </a>
          <div className={styles.navLinks}>
            <a
              className={styles.navLink}
              onClick={() => scrollToSection("about")}
            >
              about
            </a>
            <a
              className={styles.navLink}
              onClick={() => scrollToSection("work")}
            >
              work
            </a>
            <a
              className={styles.navLink}
              onClick={() => scrollToSection("projects")}
            >
              projects
            </a>
            <a
              className={styles.navLink}
              onClick={() => scrollToSection("events")}
            >
              events
            </a>
            <a
              className={styles.navLink}
              onClick={() => scrollToSection("contact")}
            >
              contact
            </a>
          </div>
          <div className={styles.navRight}>
            <ThemeToggle />
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setNavbarOpen(true)}
              aria-label="Open menu"
            >
              <Menu strokeWidth={1.5} size={22} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`${styles.mobileOverlay} ${navbarOpen ? styles.active : ""}`}
      >
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setNavbarOpen(false)}
          aria-label="Close menu"
          style={{ position: "absolute", top: "1rem", right: "1.5rem" }}
        >
          <X strokeWidth={1.5} size={22} />
        </button>
        <a onClick={() => scrollToSection("about")}>about</a>
        <a onClick={() => scrollToSection("work")}>work</a>
        <a onClick={() => scrollToSection("projects")}>projects</a>
        <a onClick={() => scrollToSection("events")}>events</a>
        <a onClick={() => scrollToSection("contact")}>contact</a>
      </div>

      {/* Hero */}
      <header className={styles.hero}>
        <svg
          className={styles.heroSwoop}
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          aria-hidden
          focusable="false"
        >
          <defs>
            <linearGradient id="heroSwoopFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="currentColor" stopOpacity="1" />
              <stop offset="0.3" stopColor="currentColor" stopOpacity="1" />
              <stop offset="0.46" stopColor="currentColor" stopOpacity="0" />
              <stop offset="0.54" stopColor="currentColor" stopOpacity="0" />
              <stop offset="0.7" stopColor="currentColor" stopOpacity="1" />
              <stop offset="1" stopColor="currentColor" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            className={`${styles.heroSwoopPath} ${styles.heroSwoopPathMain}`}
            d="M -80 460 C 160 140, 360 540, 580 320 S 980 60, 1180 360 S 1460 260, 1620 160"
            pathLength="1"
            fill="none"
            stroke="url(#heroSwoopFade)"
            strokeWidth="1.25"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className={styles.heroSwoopDash}
            d="M -80 480 C 200 220, 420 520, 640 300 S 1000 120, 1200 340 S 1480 280, 1620 200"
            fill="none"
            stroke="url(#heroSwoopFade)"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="1.4 4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className={styles.heroPhotoCol}>
          <div
            className={styles.heroPortrait}
            onClick={() =>
              setHeroSlide((s) => (s + 1) % HERO_PHOTOS.length)
            }
            role="button"
            tabIndex={0}
            aria-label="Next photo"
          >
            {HERO_PHOTOS.map((p, i) => (
              <div
                key={p.src}
                className={`${styles.heroPortraitSlide} ${
                  i === heroSlide ? styles.heroPortraitSlideActive : ""
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="360px"
                  priority={i === 0}
                />
              </div>
            ))}
            <div className={styles.heroPortraitDots} aria-hidden>
              {HERO_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.heroPortraitDot} ${
                    i === heroSlide ? styles.heroPortraitDotActive : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHeroSlide(i);
                  }}
                  aria-label={`Show photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.heroTextCol}>
          <h1 className={styles.heroName} aria-label="Haylie Pedersen">
            <span
              className={`${styles.heroNameSparkle} ${
                sparkleVisible ? styles.visible : ""
              }`}
              aria-hidden
            >
              hello!
            </span>
            {NAME_LETTERS.split(" ").map((word, wi, arr) => {
              const startIndex = arr
                .slice(0, wi)
                .reduce((acc, w) => acc + w.length + 1, 0);
              const isLastWord = wi === arr.length - 1;
              return (
                <span key={wi} className={styles.heroNameWord} aria-hidden>
                  {word.split("").map((char, li) => {
                    const i = startIndex + li;
                    return (
                      <span
                        key={i}
                        className={`${styles.heroNameLetter} ${
                          touchedLetters.has(i) ? styles.touched : ""
                        }`}
                        onMouseEnter={() => handleLetterEnter(i)}
                      >
                        {char}
                      </span>
                    );
                  })}
                  {isLastWord && (
                    <span className={styles.heroCat} aria-hidden>
                      <Image
                        src="/media/cat.gif"
                        alt=""
                        width={80}
                        height={80}
                        unoptimized
                      />
                    </span>
                  )}
                </span>
              );
            })}
          </h1>
          <p className={styles.heroTitle}>Software Developer</p>
          <p className={styles.heroTagline}>
            Aspiring mind. Enthusiast of imaginative worlds, dark chocolate,
            and espresso.
          </p>
          <div className={styles.heroLinks}>
            <a
              className={styles.heroLink}
              onClick={() => scrollToSection("contact")}
            >
              get in touch <ArrowUpRight size={14} />
            </a>
            <a
              className={styles.heroLink}
              href="/media/Pedersen_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              resume <ArrowUpRight size={14} />
            </a>
            <a
              className={styles.heroLink}
              href="https://github.com/hayliepedersen"
              target="_blank"
              rel="noopener noreferrer"
            >
              github <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* About */}
      <section
        id="about"
        ref={aboutRef}
        className={`${styles.section} ${styles.reveal}`}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>01</span>
          <h2 className={styles.sectionTitle}>
            <em>about</em>
          </h2>
        </div>
        <div className={styles.aboutText}>
          <p>
            Hi — welcome to this little corner of the internet. I&apos;m Haylie,
            a developer drawn to elegant solutions for complex problems.
          </p>
          <p>
            My journey into software started with a quiet curiosity about how
            things work, and that curiosity has grown with every project I
            pick up. Lately I&apos;ve been thinking a lot about{" "}
            <strong>interfaces that feel alive</strong> without getting in the
            way.
          </p>
          <p>
            Off-screen, you&apos;ll usually find me exploring new tech,
            admiring nature, or reading a fantasy novel with a vanilla latte
            close by.
          </p>
        </div>
      </section>

      <div id="work">
        <WorkTimeline />
      </div>

      {/* Projects */}
      <section
        id="projects"
        ref={projectsRef}
        className={`${styles.section} ${styles.reveal}`}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>03</span>
          <h2 className={styles.sectionTitle}>
            <em>projects</em>
          </h2>
        </div>
        <div
          ref={projectListRef}
          className={`${styles.projectList} ${styles.revealStagger}`}
        >
          {projects.map((project, index) => (
            <article key={index} className={styles.projectCard}>
              <div className={styles.projectMedia}>
                {project.videoId ? (
                  <VideoPlayer videoId={project.videoId} />
                ) : project.video ? (
                  <video
                    controls
                    poster={project.poster}
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  project.image && (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 680px"
                    />
                  )
                )}
              </div>
              <div className={styles.projectBody}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
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
                      className={styles.projectLink}
                    >
                      visit site <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      source <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div id="events">
        <EventsGallery />
      </div>

      <SpotifySection />

      <footer id="contact" className={styles.footer}>
        <div className={styles.footerInner}>
          <h2 className={styles.footerTitle}>
            let&apos;s <em>connect</em>
          </h2>
          <p className={styles.footerIntro}>
            I&apos;m always open to conversations about new projects,
            collaborations, or just trading book recommendations.
          </p>
          <div className={styles.contactInfo}>
            <a
              href="mailto:pedersen.h@northeastern.edu"
              className={styles.contactItem}
            >
              <Mail size={16} />
              <span>pedersen.h@northeastern.edu</span>
            </a>
            <a
              href="https://www.linkedin.com/in/haylie-pedersen/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <Linkedin size={16} />
              <span>linkedin</span>
            </a>
            <a
              href="https://github.com/hayliepedersen"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <GithubIcon size={16} />
              <span>github</span>
            </a>
            <a
              href="/media/Pedersen_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <FileText size={16} />
              <span>resume</span>
            </a>
          </div>
          <div className={styles.footerMeta}>
            <span>© {new Date().getFullYear()} Haylie Pedersen</span>
            <span>Boston, MA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
