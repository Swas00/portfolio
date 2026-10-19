export type Project = {
  slug: string;
  name: string;
  year: string;
  tagline: string;
  summary: string;
  featured: boolean;
  stack: string[];
  repo: string;
  live?: string;
  /** Short facts shown beside the project. Every one is stated in the repo README or resume. */
  facts: { label: string; value: string; count?: boolean }[];
  caseStudy?: {
    problem: string;
    role: string;
    decisions: { title: string; body: string }[];
    features: string[];
    notes?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "dropoutguard-ai",
    name: "DropoutGuard AI",
    year: "2026",
    tagline: "An early-warning system that shows why a student is at risk.",
    summary:
      "Combines academic and engagement indicators into an explainable Random Forest model, then gives faculty a way to simulate and track interventions.",
    featured: true,
    stack: ["React", "TypeScript", "Node.js", "Express", "FastAPI", "scikit-learn", "MongoDB"],
    repo: "https://github.com/Swas00/DropoutGuard-AI",
    facts: [
      { label: "Accuracy", value: "86.78%", count: true },
      { label: "ROC-AUC", value: "0.9251", count: true },
      { label: "Records", value: "4,424", count: true },
    ],
    caseStudy: {
      problem:
        "Dropout is usually noticed after a student has already disengaged. The goal was to flag risk early, explain the reasons behind each score, and give faculty something concrete to do about it: Detect, Explain, Intervene, Monitor.",
      role:
        "Built as a hackathon entry for Hack Devengers 2.0 (Open Innovation MVP track), which placed in the Top 50 projects. Developer on the team; see the resume for the full scope.",
      decisions: [
        {
          title: "Explainability over a marginal accuracy gain",
          body: "A Random Forest was chosen against a Logistic Regression baseline (86.78% vs 85.88% accuracy, ROC-AUC 0.9251 vs 0.9199). Each score ships with ranked contributing factors, so a faculty member can see why a student was flagged.",
        },
        {
          title: "A separate ML service",
          body: "Prediction, simulation and metrics live in a FastAPI service on its own port. The Express API handles CRUD, auth and orchestration, so the model can be retrained without touching the web stack.",
        },
        {
          title: "What-if simulation",
          body: "Faculty can adjust attendance or coursework completion and see how predicted risk changes, which turns a score into a conversation about an intervention.",
        },
        {
          title: "Runs without setup",
          body: "MongoDB is optional: the backend falls back to an in-memory set of 1,250 seed records, so the demo works on a fresh machine.",
        },
      ],
      features: [
        "Admin, Faculty and Student roles with JWT authentication",
        "Single and bulk CSV student ingestion",
        "Risk distribution, attendance-vs-risk and department views",
        "Per-student risk timeline and ranked “Why?” factors",
        "Intervention tracking: Pending, In-Progress, Completed",
        "Guardrailed intervention text via the Gemini API",
      ],
      notes:
        "Trained on the UCI “Predict Students’ Dropout and Academic Success” dataset (4,424 records, 80/20 stratified split). The demo student STU1024 is synthetic and labelled as such in the app. No live deployment yet.",
    },
  },
  {
    slug: "letscollab",
    name: "LetsCollab",
    year: "2026",
    tagline: "Real-time project management that refuses to overwrite your work.",
    summary:
      "A collaborative workspace where tasks, comments and notifications sync live, edits are protected by optimistic concurrency, and permissions are enforced at the API.",
    featured: true,
    stack: ["Next.js 14", "TypeScript", "Express", "Socket.IO", "Prisma", "Zod", "Jest"],
    repo: "https://github.com/Swas00/letscollab",
    live: "https://letscollab-delta.vercel.app",
    facts: [
      { label: "Roles", value: "4" },
      { label: "Conflict code", value: "HTTP 409" },
      { label: "Transport", value: "WebSockets" },
    ],
    caseStudy: {
      problem:
        "In a shared board, two people editing the same task silently clobber each other. LetsCollab treats that as a first-class case instead of an edge case.",
      role:
        "Built for the Full Stack Engineering Hackathon 2026: Next.js frontend, Express and Socket.IO backend, Prisma data model, and the integration tests.",
      decisions: [
        {
          title: "Optimistic concurrency, not locking",
          body: "Every task carries an integer version. A stale write returns HTTP 409, and the UI opens a diff dialog offering “Discard & load server version” or “Force overwrite”. Nobody is blocked from editing, and nothing is lost silently.",
        },
        {
          title: "Permissions live in the API",
          body: "Admin, Project Manager, Team Member and Viewer are enforced in middleware and return 403 for unauthorised mutations. Hiding a button is not security, so the UI is only a convenience layer on top.",
        },
        {
          title: "Rooms per project and user",
          body: "Socket.IO rooms scope live task, comment and notification events, with presence indicators. Notifications include @mention alerts and read/unread state.",
        },
        {
          title: "Immutable audit trail",
          body: "Mutations write structured activity-log entries so changes can be traced after the fact.",
        },
      ],
      features: [
        "Live task, status, priority, team and comment sync",
        "Version-based conflict detection with a resolution diff",
        "Four-role RBAC; deactivated users are rejected",
        "Notification centre with @mentions",
        "SQLite by default, PostgreSQL via configuration",
        "Jest + Supertest integration tests for RBAC, 409 conflicts and audit logging",
      ],
      notes:
        "A one-click role switcher on the login page makes the permission model easy to try. The live demo is deployed on Vercel.",
    },
  },
  {
    slug: "spendwise",
    name: "SpendWise",
    year: "2026",
    tagline: "Expense tracking and a campus treasury for Indian students.",
    summary:
      "Natural-language expense entry (“Swiggy 320”), a roommate bill splitter, budget tracking and an AI advisor, in ₹ with UPI and hostel-mess categories.",
    featured: false,
    stack: ["React 19", "Vite", "Tailwind v4", "Express 5", "MongoDB", "Docker"],
    repo: "https://github.com/Swas00/Spend_Wise",
    facts: [],
  },
  {
    slug: "traana",
    name: "TRAANA",
    year: "2026",
    tagline: "Disaster alerts, shelters and evacuation routing in one flow.",
    summary:
      "An MVP that takes a citizen from alert to shelter: severity-rated alerts, a Leaflet evacuation map that routes around hazard zones, and an admin simulator for floods, cyclones and wildfires.",
    featured: false,
    stack: ["React 19", "Vite", "Leaflet", "Express", "MongoDB"],
    repo: "https://github.com/Swas00/traana-mvp",
    facts: [],
  },
  {
    slug: "life-rpg",
    name: "LIFE-RPG",
    year: "2026",
    tagline: "Daily habits as an RPG progression engine.",
    summary: "A habit tracker that levels up stats as you complete real-life tasks, with dual-theme 3D animations.",
    featured: false,
    stack: ["HTML5", "CSS3", "JavaScript"],
    repo: "https://github.com/Swas00/liferpg",
    live: "https://liferpg-six-delta.vercel.app",
    facts: [],
  },
];

export const featured = projects.filter((p) => p.featured);
export const others = projects.filter((p) => !p.featured);
