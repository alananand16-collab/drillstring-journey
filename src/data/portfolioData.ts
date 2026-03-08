export interface Experience {
  company: string;
  logo: string;
  role: string;
  location: string;
  dates: string;
  preview: string;
  bullets: string[];
  tools: string[];
  awards?: string[];
}

export interface Project {
  title: string;
  bullets: string[];
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
  coursework?: string[];
  extras?: string[];
}

export interface SkillCategory {
  name: string;
  skills: { name: string; icon?: string }[];
}

export const experiences: Experience[] = [
  {
    company: "S&P Global",
    logo: "S&P Global Logo",
    role: "Data Project Coordinator (Intern)",
    location: "Calgary, AB",
    dates: "May 2025 – Aug 2025",
    preview: "AI Workflow Automation for 200+ ML Models",
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
    logo: "S&P Global Logo",
    role: "Data Researcher (Canadian Lands)",
    location: "Bangalore, IN",
    dates: "Jan 2022 – Aug 2024",
    preview: "Alberta Crown Land Database — Hundreds of Thousands of Records",
    bullets: [
      "Maintained and validated Alberta Crown and Freehold land database covering hundreds of thousands of regulatory-sensitive records across the full land lifecycle",
      "Wrote complex SQL queries (joins, subqueries, validation logic, reconciliation) for post-load QC and data integrity verification",
      "Co-developed automated ETL data loaders replacing manual injection workflows, reducing load time by 30%",
      "Built SQL-based QC framework during Data Quality Hackathon, automating post-load inconsistency detection",
      "Created Power BI dashboards for monitoring load volumes, achieving 25% faster stakeholder response time",
    ],
    tools: ["SQL", "ETL workflows", "ETS", "SPIN II", "Power BI", "Accumap"],
    awards: ["CEO Recognition Q2 2024", "Data Quality Hackathon Winner 2024"],
  },
  {
    company: "Enverus",
    logo: "Enverus Logo",
    role: "Application Support Analyst",
    location: "Bangalore, IN",
    dates: "Apr 2021 – Jan 2022",
    preview: "L1/L2 Commodity Trading Platform Support",
    bullets: [
      "Provided L1/L2 support for commodity trading and risk platform serving external energy clients, handling 75-100 tickets per week",
      "Performed root cause analysis of data feed issues using SQL validation queries and FTP data verification",
      "Managed ticket lifecycle through ServiceNow and Jira with structured triage workflows",
      "Improved SLA compliance by 20% through faster resolution and systematic escalation",
    ],
    tools: ["SQL", "ServiceNow", "Jira", "FTP"],
  },
  {
    company: "Cue Learn Pvt. Ltd",
    logo: "Cue Learn Logo",
    role: "Business Development Associate (US Operations)",
    location: "Bengaluru, IN",
    dates: "Jun 2020 – Mar 2021",
    preview: "US Operations — Client Acquisition & Revenue Growth",
    bullets: [
      "Served as primary point of contact for all incoming US leads, initiating contact and orchestrating experience sessions",
      "Cultivated client relationships ensuring customer satisfaction and contributing to revenue growth",
      "Implemented data-driven strategic actions to enhance sales effectiveness",
    ],
    tools: ["CRM", "Sales Analytics"],
  },
  {
    company: "ONGC",
    logo: "ONGC Logo",
    role: "Research Intern (Petroleum Geomechanics)",
    location: "Tripura, IN",
    dates: "Feb 2020 – May 2020",
    preview: "Geomechanical Pore Pressure Modeling",
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
    title: "Reservoir Simulation — CMG IMEX",
    bullets: [
      "Built Black Oil simulation model with sensitivity analysis on permeability, porosity, injection rate, and bottomhole pressure",
      "Evaluated production trends and recovery factor response across water-oil pressure behavior scenarios",
    ],
  },
  {
    title: "Geomechanical Wellbore Stability Analysis",
    bullets: [
      "Calculated overburden stress, minimum horizontal stress, and fracture gradient for wellbore stability assessment",
      "Cross-validated computational methods against Drillworks Predict software outputs",
    ],
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
    logo: "University of Calgary Logo",
    degree: "M.Eng Petroleum Engineering",
    dates: "Sept 2024 – May 2026",
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
    logo: "Presidency University Logo",
    degree: "B.Tech Petroleum Engineering",
    dates: "Jun 2016 – Mar 2020",
    extras: [
      "Head Event Organizer, AAPG Student Chapter",
      "International Conference — Technical Paper Presentation",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Engineering & Subsurface",
    skills: [
      { name: "CMG IMEX" },
      { name: "EOR" },
      { name: "SAGD" },
      { name: "Pore Pressure Modeling" },
      { name: "Geomechanical Analysis" },
      { name: "Aspen HYSYS" },
    ],
  },
  {
    name: "Data & Automation",
    skills: [
      { name: "Python" },
      { name: "SQL" },
      { name: "Power Automate" },
      { name: "ETL" },
      { name: "AI API Integration" },
    ],
  },
  {
    name: "Energy Systems",
    skills: [
      { name: "ETS" },
      { name: "SPIN II" },
      { name: "Alberta Crown Land Lifecycle" },
      { name: "Commodity Trading Platforms" },
    ],
  },
  {
    name: "Reporting & Tools",
    skills: [
      { name: "Power BI" },
      { name: "Excel" },
      { name: "ServiceNow" },
      { name: "Jira" },
    ],
  },
];

export const contactInfo = {
  email: "alananand15@gmail.com",
  phone: "+1 (403) 461-6579",
  linkedin: "https://linkedin.com/in/alananand/",
  location: "Calgary, AB",
};
