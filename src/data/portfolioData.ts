export interface Experience {
  company: string;
  logo: string;
  role: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  preview: string;
  bullets: string[];
  tools: string[];
  impact?: string;
  awards?: string[];
}

export interface Project {
  title: string;
  image: string;
  bullets: string[];
  tools: string[];
}

export interface Award {
  title: string;
  org: string;
}

export interface Education {
  school: string;
  logo: string;
  degree: string;
  dates: string;
  description?: string;
  coursework?: string[];
  extras?: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    company: "S&P Global",
    logo: "S&P",
    role: "Data Project Coordinator (Intern)",
    type: "AI & Workflow",
    location: "S&P Global · Calgary, AB",
    startDate: "MAY 2025",
    endDate: "AUG 2025",
    preview: "Designed workflow intelligence automation for 200+ AI/ML energy model development programs. Replaced manual tracking with structured Python, Power Automate, and AI API parsing.",
    impact: "27% increase in tracking accuracy",
    bullets: [
      "Designed workflow intelligence automation for AI/ML energy model development programs spanning 200+ commodity-specific ML model workflows",
      "Architected end-to-end system integrating Power Automate email scraping, Python-based data cleaning, and AI API contextual analysis for risk and bottleneck detection",
      "Led 3-member intern team through full project lifecycle from instruction drafting to validated deployment",
      "Delivered 27% increase in tracking accuracy and reduced manual PM workload through automated weekly reporting",
      "Solution adopted for continued internal use post-internship, standardizing reporting framework across the program",
    ],
    tools: ["Python", "Power Automate", "AI API (LLM-based)", "Excel", "SharePoint"],
    awards: ["Intern Innovation Challenge Winner 2025"],
  },
  {
    company: "S&P Global",
    logo: "S&P",
    role: "Data Researcher",
    type: "Canadian Energy Assets",
    location: "S&P Global · Bangalore, IN",
    startDate: "JAN 2022",
    endDate: "AUG 2024",
    preview: "Maintained regulatory-sensitive Alberta Crown & Freehold land database. Co-developed ETL automation and complex SQL reconciliation queries.",
    impact: "30% reduction in data load cycle times",
    bullets: [
      "Maintained and validated Alberta Crown and Freehold land database covering hundreds of thousands of regulatory-sensitive records across the full land lifecycle",
      "Wrote complex SQL queries (joins, subqueries, validation logic, reconciliation) for post-load QC and data integrity verification",
      "Co-developed automated ETL data loaders replacing manual injection workflows, reducing load time by 30%",
      "Built SQL-based QC framework during Data Quality Hackathon, automating post-load inconsistency detection",
      "Created Power BI dashboards for monitoring load volumes, achieving 25% faster stakeholder response time",
    ],
    tools: ["SQL", "ETL", "ETS", "SPIN II", "Power BI", "Accumap"],
    awards: ["CEO Recognition Q2 2024", "Data Quality Hackathon Winner 2024"],
  },
  {
    company: "Enverus",
    logo: "ENV",
    role: "Application Support Analyst",
    type: "Energy Platform",
    location: "Enverus · Bangalore, IN",
    startDate: "APR 2021",
    endDate: "JAN 2022",
    preview: "Supported commodity trading & risk platform. Conducted root cause analysis and executed SQL validation queries to ensure pricing data integrity.",
    impact: "Improved SLA compliance by 20%",
    bullets: [
      "Provided L1/L2 support for commodity trading and risk platform serving external energy clients, handling 75-100 tickets per week",
      "Performed root cause analysis of data feed issues using SQL validation queries and FTP data verification",
      "Managed ticket lifecycle through ServiceNow and Jira with structured triage workflows",
      "Improved SLA compliance by 20% through faster resolution and systematic escalation",
    ],
    tools: ["SQL", "ServiceNow", "Jira", "FTP"],
  },
  {
    company: "ONGC",
    logo: "ONGC",
    role: "Research Intern",
    type: "Petroleum Geomechanics",
    location: "ONGC · Tripura, IN",
    startDate: "FEB 2020",
    endDate: "MAY 2020",
    preview: "Analyzed core samples and well logs. Calculated overburden stress and fracture gradients. Wrote Python scripts to generate synthetic well logs.",
    impact: "Delivered accurate predictive mud weight windows to reduce drilling risk",
    bullets: [
      "Conducted geomechanical analysis calculating overburden stress, minimum horizontal stress, fracture gradient, and mud weight window using Eaton's method",
      "Generated synthetic well logs for missing intervals using Drillworks Predict and Python, cross-validating computational vs software outputs",
      "Analyzed core samples, well logs, drilling reports, and completion reports for drilling stability assessment",
    ],
    tools: ["Drillworks Predict", "Python", "Excel"],
  },
];

export const projects: Project[] = [
  {
    title: "Black Oil Reservoir Simulation",
    image: "reservoir",
    bullets: [
      "Built in CMG IMEX. Conducted sensitivity analysis on permeability and injection rates to evaluate recovery factor responses.",
    ],
    tools: ["CMG IMEX", "Reservoir Modeling", "Sensitivity Analysis"],
  },
  {
    title: "Automated Data Quality Framework",
    image: "geomech",
    bullets: [
      "Engineered an automated SQL-based ETL validation pipeline replacing manual data injection.",
    ],
    tools: ["SQL", "ETL", "Automation", "Validation Pipelines"],
  },
];

export const awards: Award[] = [
  { title: "Intern Innovation Challenge Winner 2025", org: "S&P Global" },
  { title: "CEO Recognition Q2 2024", org: "S&P Global" },
  { title: "Data Quality Hackathon Winner 2024", org: "S&P Global" },
  { title: "1st Place — Technical Paper Presentation", org: "International Conference on Unconventional Hydrocarbon" },
  { title: "1st Place — Case Study Competition", org: "PETRAMET'19" },
];

export const education: Education[] = [
  {
    school: "University of Calgary",
    logo: "UCalgary",
    degree: "M.Eng Petroleum Engineering",
    dates: "2024 – 2026",
    description: "Specializing in reservoir geomechanics, subsurface data analytics, and AI-driven drilling optimization.",
    coursework: [
      "Advanced Reservoir Engineering",
      "Enhanced Oil Recovery (EOR)",
      "SAGD",
      "Process Simulation (Aspen HYSYS)",
      "Data Analytics",
    ],
  },
  {
    school: "Presidency University",
    logo: "PU",
    degree: "B.Tech Petroleum Engineering",
    dates: "2016 – 2020",
    description: "Comprehensive foundation in petroleum engineering, well logging, and production technology.",
    extras: [
      "Head Event Organizer, AAPG Student Chapter",
      "International Conference — Technical Paper Presentation",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Python & AI APIs",
    icon: "terminal",
    skills: ["Python", "AI API Integration", "LLM Automation"],
  },
  {
    name: "Advanced SQL & ETL",
    icon: "database",
    skills: ["SQL", "ETL Workflows", "Data Validation"],
  },
  {
    name: "Power Automate",
    icon: "workflow",
    skills: ["Power Automate", "Email Scraping", "Workflow Orchestration"],
  },
  {
    name: "CMG IMEX",
    icon: "flask",
    skills: ["Reservoir Simulation", "Sensitivity Analysis", "Recovery Factor"],
  },
  {
    name: "Aspen HYSYS",
    icon: "settings",
    skills: ["Process Simulation", "SAGD Modeling"],
  },
  {
    name: "Geomechanical Modeling",
    icon: "layers",
    skills: ["Pore Pressure", "Fracture Gradient", "Wellbore Stability"],
  },
  {
    name: "Power BI",
    icon: "bar-chart",
    skills: ["Dashboards", "Data Visualization", "KPI Monitoring"],
  },
  {
    name: "Well Log Analysis",
    icon: "activity",
    skills: ["Log Interpretation", "Drillworks Predict", "Synthetic Logs"],
  },
];

export const contactInfo = {
  email: "alananand15@gmail.com",
  phone: "+1 (403) 461-6579",
  linkedin: "https://linkedin.com/in/alananand/",
  location: "Calgary, AB",
};
