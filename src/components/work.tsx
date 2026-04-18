"use client";
import { useEffect, useRef } from "react";
import {
  Code2,
  CircuitBoard,
  Briefcase,
  Sandwich,
  ChefHat,
  type LucideIcon,
} from "lucide-react";
import styles from "@/app/page.module.css";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  Icon: LucideIcon;
}

const WorkTimeline = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const items = root.querySelectorAll(`.${styles.timelineItem}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const experiences: Experience[] = [
    {
      title: "Software Engineer Co-op",
      company: "Verizon (NExT)",
      period: "2025",
      description:
        "Built VZbility, a telecommunications sentiment analysis platform providing market intelligence. Developed full-stack features using React/TypeScript and FastAPI/Python on AWS — including automated data pipelines, ML-based anomaly detection, and performance optimizations supporting strategic business operations.",
      Icon: Code2,
    },
    {
      title: "Software Developer",
      company: "Northeastern Electric Racing",
      period: "2024 — Now",
      description:
        "Develop and maintain the team website using TypeScript, React, Prisma, and Express. Optimize development workflows with Postman and Docker containerization.",
      Icon: CircuitBoard,
    },
    {
      title: "Office Assistant",
      company: "Northeastern Office of Student Employment",
      period: "2024 — Now",
      description:
        "Support office operations using ServiceNow, Workday, and Excel to process data and manage workflows. Facilitate effective communication through Teams and Outlook while assisting students with employment-related needs.",
      Icon: Briefcase,
    },
    {
      title: "Sandwich Artist",
      company: "Crust Kitchen & Bar",
      period: "2022 — 2023",
      description:
        "Greeted customers and prepared food items. Honed problem-solving skills by addressing real-time challenges in a dynamic work environment.",
      Icon: Sandwich,
    },
    {
      title: "Crew Trainer",
      company: "McDonald's",
      period: "2021 — 2022",
      description:
        "Oversaw the instruction of new employees and guided coworkers through the fundamentals of the job. Enhanced team collaboration by developing clear communication strategies.",
      Icon: ChefHat,
    },
  ];

  return (
    <section className={styles.workExperience}>
      <div className={styles.timelineContainer}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>02</span>
          <h2 className={styles.sectionTitle}>
            <em>work</em>
          </h2>
        </div>

        <div className={styles.timeline} ref={timelineRef}>
          <div className={styles.timelineLine} aria-hidden />
          {experiences.map((exp, i) => {
            const { Icon } = exp;
            return (
              <div key={i} className={styles.timelineItem}>
                <span className={styles.timelineIcon} aria-hidden>
                  <Icon />
                </span>
                <p className={styles.period}>{exp.period}</p>
                <div className={styles.timelineCard}>
                  <h3>{exp.title}</h3>
                  <p className={styles.company}>{exp.company}</p>
                  <p className={styles.description}>{exp.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { WorkTimeline };
