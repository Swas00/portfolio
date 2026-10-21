export const profile = {
  name: "Swastik Sahu",
  initials: "SS",
  role: "Full-stack developer · applied ML",
  location: "Bengaluru, India",
  email: "swastik.sahu@mca.christuniversity.in",
  github: "https://github.com/Swas00",
  linkedin: "https://www.linkedin.com/in/swastik-sahu-linkdin07",
  resume: "/Swastik_Sahu_Resume.pdf",
} as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "path", label: "Path" },
  { id: "contact", label: "Contact" },
] as const;

export const skillGroups = [
  {
    title: "Languages",
    used: ["Python", "JavaScript", "TypeScript", "Java", "SQL"],
  },
  {
    title: "Frontend",
    used: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "Recharts"],
  },
  {
    title: "Backend & APIs",
    used: ["Node.js", "Express", "FastAPI", "REST APIs", "Socket.IO", "JWT auth", "Prisma", "Jest + Supertest"],
  },
  {
    title: "Data",
    used: ["MongoDB", "Mongoose", "Oracle SQL", "SQLite"],
  },
  {
    title: "ML & AI",
    used: ["scikit-learn", "Random Forest", "Gemini API"],
    exploring: ["LangChain", "RAG", "LLM applications"],
  },
  {
    title: "Tooling",
    used: ["Git", "GitHub", "Vercel", "Docker"],
  },
] as const;

export const experience = [
  {
    period: "Dec 2024 – Mar 2025",
    title: "Research Intern",
    org: "Amity University, Noida",
    points: [
      "Ran data analysis and simulations in Python and MATLAB for physics-based systems and models.",
      "Interpreted complex datasets to identify patterns and trends that supported the findings.",
      "Applied statistical techniques to improve the reliability of results.",
    ],
  },
  {
    period: "May 2024 – Jul 2024",
    title: "Research Intern",
    org: "Amity University, Noida",
    points: [
      "Assisted with research on particle accelerators and their applications through analytical modelling.",
      "Worked with scientific datasets to run calculations and derive insights.",
      "Documented observations and presented findings in a structured format.",
    ],
  },
] as const;

export const leadership = [
  { period: "Jun 2026 – Present", title: "Class Representative", org: "CHRIST University, Bengaluru" },
  { period: "2026 – Present", title: "Editorial Team Member", org: "Infobahn, CHRIST University" },
  { period: "Feb – Mar 2024", title: "Organizing Committee", org: "International Young Physicists’ League, IAPS" },
  { period: "Dec 2023 – Mar 2024", title: "Volunteer", org: "Karuna The Compassion NGO, New Delhi" },
] as const;

export const education = [
  {
    period: "2026 – 2028",
    title: "Master of Computer Applications",
    org: "CHRIST (Deemed to be University), Bengaluru",
    note: "GPA 3.55 / 4.0",
  },
  {
    period: "Graduated May 2025",
    title: "B.Sc. Physics (Hons.)",
    org: "Amity University Uttar Pradesh, Noida",
    note: "GPA 8.89 / 10",
  },
] as const;

export const certifications = [
  { name: "Google AI Essentials Specialization", issuer: "Google", date: "May 2026" },
  { name: "Foundations of AI Fundamentals", issuer: "IBM", date: "May 2026" },
  { name: "Winter School on Generative AI", issuer: "IIT Jodhpur", date: "Dec 2024" },
  { name: "Applications of Machine Learning in Urban Studies", issuer: "ISRO", date: "Jun 2023" },
] as const;

export const achievements = [
  { name: "Hack Devengers 2.0 — Top 50 Projects", detail: "Team Devengers", date: "Sep 2026" },
  {
    name: "Poster presentation",
    detail: "National Symposium on Advanced Research of Plasma Science Society, PDEU, Gujarat",
    date: "Dec 2024",
  },
  { name: "Science Hackathon 2023", detail: "Indian International Science Festival, Hack2Skill", date: "Sep 2023" },
] as const;
