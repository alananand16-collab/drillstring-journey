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
  screenshots?: string[];
  githubUrl?: string;
  certificateImage?: string;
}

export interface Project {
  title: string;
  tagline: string;
  narrative: string;
  description: string;
  image: string;
  tools: string[];
  connectsTo: string;
  status: string;
  githubUrl?: string;
}

export interface Award {
  title: string;
  org: string;
}

export interface Education {
  school: string;
  logo: string;
  logoImage?: string;
  degree: string;
  dates: string;
  description?: string;
  coursework?: string[];
  extras?: string[];
  campusImage?: string;
  projectImages?: string[];
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
    title: "Petroleum Engineering AI Assistant",
    tagline: "Context-aware AI assistant powered by specialized petroleum literature",
    narrative: "Petroleum engineers deal with massive amounts of complex literature and scanned documents. Tracking down specific technical answers across hundreds of pages is time-consuming. This assistant bridges the gap by providing localized RAG capabilities, allowing users to query a specialized knowledge base and get context-aware answers with accurate source attribution.",
    description: "A sophisticated Retrieval-Augmented Generation (RAG) application that ingests petroleum engineering PDFs (with OCR support for scanned documents), chunks and embeds them using HuggingFace models, and stores them in a Chroma vector database. Users interact with the assistant through a Gradio web interface, querying Google's Gemini 2.5 Flash LLM to receive highly accurate answers with full source citations.",
    image: "reservoir",
    tools: ["Python", "LangChain", "HuggingFace", "ChromaDB", "Google Gemini", "Gradio"],
    connectsTo: "S&P Global AI Workflow Automation + Petroleum Domain Knowledge",
    status: "Project Completed",
    githubUrl: "https://github.com/alananand16-collab/petroleum_ai/",
  },
  {
    title: "Production Decline Curve Analyzer",
    tagline: "Interactive Arps decline curve fitting and EUR forecasting tool",
    narrative: "Every petroleum engineer needs to forecast production. Arps decline curve analysis is the industry standard method, but most engineers still do it in Excel with manual curve fitting. This tool automates the process with proper statistical fitting and interactive visualization.",
    description: "Users upload production data as CSV (date, oil rate, gas rate, water cut). The tool auto-fits three decline models: exponential, hyperbolic, and harmonic using scipy curve_fit optimization. An interactive chart displays historical data overlaid with all three forecast curves, letting users compare which model best fits their reservoir behavior. The tool calculates Estimated Ultimate Recovery (EUR) for each model and generates an exportable PDF report with decline parameters, forecast curves, and EUR estimates.",
    image: "geomech",
    tools: ["Python", "scipy", "plotly", "Streamlit", "pandas"],
    connectsTo: "CMG IMEX project + M.Eng coursework (Advanced Reservoir Engineering, Production Optimization)",
    status: "In Development",
  },
  {
    title: "Automated Alberta Land Lease Tracker",
    tagline: "Proof-of-concept automation for Crown land lifecycle monitoring",
    narrative: "Alberta Crown land goes through a defined lifecycle: posting, sale, lease activation, encumbrances, expiry, and re-posting. At S&P Global Bangalore, I tracked this lifecycle manually across hundreds of thousands of parcels for 2.5 years. This project productizes that workflow into an automated monitoring system.",
    description: "The system ingests publicly available Alberta Crown land posting data from the Alberta Energy Regulator, stores it in a SQL database tracking lease status across all lifecycle stages, and generates automated alerts when leases approach expiry or undergo status changes. A dashboard visualizes lease activity by township/range, operator, and current status, with historical analysis showing average time-to-lease and expiry rates by region.",
    image: "land",
    tools: ["Python", "SQL (PostgreSQL)", "Streamlit", "Scheduled ETL Scripts"],
    connectsTo: "S&P Global Bangalore (ETS, SPIN II, Crown land lifecycle, SQL, ETL)",
    status: "In Development",
  },
  {
    title: "Alberta Well Data Dashboard",
    tagline: "Interactive exploration of Alberta's public well data",
    narrative: "The Alberta Energy Regulator publishes well data publicly, but it's raw, scattered across multiple files, and difficult to explore without specialized tools. This dashboard makes that data accessible and visual for anyone in the Canadian energy sector.",
    description: "The system ingests public AER well data including well headers, status codes, spud dates, target formations, and operators. After cleaning and structuring with Python and SQL, the data feeds an interactive map showing wells by location, color-coded by status (active, suspended, abandoned). Users can filter by operator, formation, date range, and well type. Summary statistics show wells drilled per year, top operators by activity, and formation-level drilling trends over time.",
    image: "well",
    tools: ["Python", "SQL", "Streamlit/React", "Leaflet/Mapbox", "pandas", "plotly"],
    connectsTo: "S&P Global Bangalore (Alberta land data, SQL, Accumap) + M.Eng coursework",
    status: "In Development",
  },
  {
    title: "EOR Recovery Efficiency Comparison via Reservoir Simulation",
    tagline: "Head-to-head simulation of five EOR methods on the same reservoir model",
    narrative: "Which enhanced oil recovery method delivers the best recovery factor for a given reservoir? Engineers often rely on screening criteria and published case studies, but those don't account for specific reservoir conditions. This project answers the question directly by simulating multiple EOR scenarios on the same reservoir model and comparing their performance head-to-head.",
    description: "The project builds a base reservoir model in CMG (IMEX for black oil and waterflood scenarios, STARS for thermal and chemical methods) representing a typical Alberta-type reservoir. Five recovery scenarios are simulated on the identical model: primary depletion as a baseline, conventional waterflooding, CO₂ miscible flooding, polymer flooding, and SAGD thermal recovery. Python post-processing reads CMG output files and generates comparison plots across key metrics: recovery factor percentage, time to production plateau, pressure response, water cut evolution, and cumulative oil production. An interactive Streamlit dashboard presents side-by-side performance curves.",
    image: "eor",
    tools: ["CMG IMEX", "CMG STARS", "Python", "pandas", "matplotlib", "plotly", "Streamlit"],
    connectsTo: "CMG IMEX academic project + M.Eng coursework (EOR, SAGD, Advanced Reservoir Engineering)",
    status: "In Development",
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
    logoImage: "/images/logo-uofcalgary.png",
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
    logoImage: "/images/logo-presidency.png",
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
  email: "alananand16@gmail.com",
  phone: "+1 (403) 461-6579",
  linkedin: "https://linkedin.com/in/alananand/",
  location: "Calgary, AB",
};
