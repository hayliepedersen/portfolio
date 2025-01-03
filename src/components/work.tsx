import styles from "@/app/page.module.css";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: string;
}

const WorkTimeline = () => {
  const experiences: Experience[] = [
    {
      title: "Crew Trainer",
      company: "McDonald's",
      period: "2021 - 2022",
      description: "Enhanced team collaboration by developing clear communication strategies and tools.",
      icon: "🍟"
    },
    {
      title: "Sandwich Artist",
      company: "Crust Kitchen & Bar",
      period: "2022 - 2023",
      description: "Leveraged problem-solving skills to address real-time challenges in a dynamic work environment.",
      icon: "🍞"
    },
    {
      title: "Office Assistant",
      company: "Northeastern Office of Student Employment",
      period: "2024 - Present",
      description: "Support office operations using ServiceNow, Workday, and Excel to process data and manage workflows. Facilitate effective communication and collaboration through Teams and Outlook while assisting students with employment-related needs.",
      icon: "💻"
    },
    {
      title: "Software Developer",
      company: "Northeastern Electrical Racing",
      period: "2024 - Present",
      description: "Develop and maintain team website utilizing TypeScript, Prisma, and Express. Optimize site development workflows with Postman and Docker containerization.",
      icon: "🏎️"
    },
  ];

  return (
    <section className={styles.workExperience}>
      <div className={styles.timelineContainer}>
        <h2 className={styles.sectionTitle}>WORK EXPERIENCE</h2>
        
        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              className={`${styles.timelineItem} ${
                i % 2 === 0 ? styles.timelineItemRight : styles.timelineItemLeft
              }`}
            >
              <div className={styles.timelineNode}>
                {exp.icon}
              </div>
              
              <div className={styles.timelineContent}>
                <div className={styles.timelineCard}>
                  <h3>{exp.title}</h3>
                  <p className={styles.company}>{exp.company}</p>
                  <p className={styles.period}>{exp.period}</p>
                  <p className={styles.description}>{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { WorkTimeline };