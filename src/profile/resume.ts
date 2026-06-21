interface Experience {
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
}

interface Education {
  qualification: string;
  institution: string;
  affiliation?: string;
  period: string;
  result?: string;
}

interface Certification {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

interface Award {
  title: string;
  issuer: string;
  year: string;
  note?: string;
}

interface Social {
  label: string;
  url: string;
  handle?: string;
}

interface Interest {
  icon: string;
  label: string;
}

interface Language {
  name: string;
  proficiency: string;
}

export const resume = {
  name: 'Mario Dias',
  tagline: 'AI & Software Engineer',
  location: 'Mumbai, Maharashtra, India',
  email: 'mario.dias3100@gmail.com',
  about: [
    "I'm an AI engineer with a strong backend and data-engineering background. I've built scalable systems with Java, Spring, Python, and Databricks, and I spend most of my time integrating AI into enterprise workflows using LangGraph, FastAPI, and Azure OpenAI.",
    "These days I work in applied AI, building intelligent systems and agents that solve real business problems. I care about production-grade engineering as much as the model behind it, and I'm happiest working at the intersection of software engineering and AI.",
  ],
  experience: [
    {
      role: 'AI & Software Engineer',
      org: 'UBS',
      location: 'Navi Mumbai, India',
      period: 'Jul 2022 – Present',
      bullets: [
        'Built a real-time audio-based RAG assistant for the CEO, CFO, and Investor Relations team to generate context-aware, low-latency talking points during quarterly earnings calls using Azure Speech, Azure OpenAI, FAISS, and FastAPI.',
        'Developed ampliFi Data Integrity, a configurable machine learning-based anomaly detection system for financial datasets to early detect and prevent data quality issues, using SynapseML, Databricks and MLFlow.',
        'Deployed an autonomous agent for financial signoff summarization as part of the UBS ampliFi initiative, leveraging LangGraph, FastAPI, and Azure OpenAI to streamline and assist controllers.',
        'Won UBS India Hackathon 2024 by developing a multi-agent RAG-based AI assistant using LangChain, LangGraph, Azure OpenAI, and Azure AI Search to provide application-specific user assistance and automated incident reporting, showcasing innovation in enterprise AI.',
        'Designed and optimised an ETL pipeline in Databricks ingesting millions of records for daily balance-sheet reporting, using a concurrent queue to process data from 13+ regions across 100+ daily jobs.',
        'Boosted the performance of critical Databricks jobs from 45 minutes to under 8 minutes, significantly enhancing data availability, reducing costs, and improving operational efficiency.',
        'Played a key role in the development of an efficient Automation Testing framework for the application, leveraging Spring and Cucumber to encourage Behaviour-Driven Development and reduce testing time, leading to increased release cycles.',
        'Recognised as a UBS Certified Gold Engineer for technical excellence and consistent delivery.',
        'Core member of the UBS AI Ventures Challenge, mentoring graduates on AI and innovation against real-world business problem statements.',
      ],
    },
    {
      role: 'Web Intern',
      org: 'Kindness Unlimited',
      location: 'Mumbai, India',
      period: 'Dec 2019 – Dec 2020',
      bullets: [
        'Managed and updated website content, redesigned layouts for events, and optimised performance with plugins and caching.',
        'Collaborated with the team on timely updates and technical issue resolution.',
      ],
    },
    {
      role: 'Deep Learning Intern',
      org: 'Bennett University',
      location: 'Greater Noida, India',
      period: 'Jun 2020 – Jul 2020',
      bullets: [
        'Developed and trained an end-to-end deep learning model for activity recognition to detect suspicious behaviour in surveillance footage.',
      ],
    },
  ] satisfies Experience[],
  education: [
    {
      qualification: 'Bachelor of Engineering in Computer Engineering',
      institution: 'Fr. Conceicao Rodrigues College of Engineering, Mumbai',
      affiliation: 'University of Mumbai',
      period: '2018 – 2022',
      result: 'CGPA 9.74 / 10',
    },
    {
      qualification: 'Higher Secondary Certificate',
      institution: 'Thomas Baptista Junior College, Vasai',
      affiliation: 'Maharashtra State Board of Secondary and Higher Secondary Education',
      period: '2016 – 2018',
      result: '94.92%',
    },
    {
      qualification: 'Secondary School Certificate',
      institution: 'Notre Dame High School, Vasai',
      affiliation: 'Central Board of Secondary Education (CBSE)',
      period: '2016',
      result: 'CGPA 10.0 / 10',
    },
  ] satisfies Education[],
  awards: [
    {
      title: 'Winner, UBS India Hackathon 2024',
      issuer: 'UBS',
      year: '2024',
      note: 'Built a multi-agent RAG-based AI assistant providing application-specific user assistance and automated incident reporting.',
    },
    {
      title: 'Outstanding Performer Achievement',
      issuer: 'UBS',
      year: '2023',
    },
    {
      title: 'Top 6, AI for Healthcare Hackathon',
      issuer: 'DERBI Foundation',
      year: '2021',
      note: 'Theme: Deep Learning Multiple Diseases Prediction Model based on Retina Image',
    },
  ] satisfies Award[],
  certifications: [
    { title: 'Agentic AI', issuer: 'DeepLearning.AI', year: '2026', url: 'https://learn.deeplearning.ai/certificates/16db5331-7a08-41d2-950e-19bfb5ca1870' },
    { title: 'Azure AI Engineer Associate', issuer: 'Microsoft', year: '2026', url: 'https://learn.microsoft.com/en-us/users/mariodias-5640/credentials/a7c8c4b36201ecd8' },
    { title: 'UBS Certified Gold Engineer', issuer: 'UBS', year: '2025', url: 'https://www.credly.com/badges/ddb8b2ea-362c-47c7-b529-49f22ac2a681'},
    { title: 'Azure AI Fundamentals', issuer: 'Microsoft', year: '2024', url: 'https://learn.microsoft.com/en-us/users/mariodias-5640/credentials/390e31d18b3c2009' },
    { title: 'Power BI Data Analyst Associate', issuer: 'Microsoft', year: '2024', url: 'https://learn.microsoft.com/en-us/users/mariodias-5640/credentials/c51accc8f931fe67' },
    { title: 'Databricks Fundamentals', issuer: 'Databricks', year: '2024', url: 'https://credentials.databricks.com/8976af1e-7512-4303-ab37-fcfc20b1f3f6#acc.p4ThPr1i' },
    { title: 'Azure Fundamentals', issuer: 'Microsoft', year: '2023', url: 'https://learn.microsoft.com/en-us/users/mariodias-5640/credentials/ef9d19ba120cc9eb' },
    { title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', year: '2020', url: 'https://www.coursera.org/account/accomplishments/specialization/NYHFDZ3YFQGR' },
  ] satisfies Certification[],
  skills: {
    Programming: ['Python', 'Java'],
    'AI / ML': ['Generative AI', 'NLP', 'Agentic AI', 'Forecasting', 'Anomaly Detection', 'Retrieval-Augmented Generation (RAG)'],
    Frameworks: ['LangChain', 'LangGraph', 'FastAPI', 'Spring Framework'],
    'Data & Cloud': ['Databricks', 'Apache Spark', 'Microsoft Azure', 'PostgreSQL'],
    Tools: ['Kubernetes', 'Power BI', 'GitLab CI/CD', 'Docker', 'MLflow'],
  } satisfies Record<string, string[]>,
  interests: [
    { icon: 'home', label: 'Home Automation' },
    { icon: 'printer', label: '3D Printing' },
    { icon: 'gamepad', label: 'Video Games' },
    { icon: 'bot', label: 'AI' },
  ] satisfies Interest[],
  languages: [
    { name: 'English', proficiency: 'Native or bilingual proficiency' },
    { name: 'Hindi', proficiency: 'Professional working proficiency' },
    { name: 'Marathi', proficiency: 'Limited working proficiency' },
  ] satisfies Language[],
  socials: [
    { label: 'GitHub', url: 'https://github.com/itsmariodias', handle: '@itsmariodias' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mario-dias/', handle: 'mario-dias' },
    { label: 'Medium', url: 'https://itsmariodias.medium.com/', handle: '@itsmariodias' },
  ] satisfies Social[],
};
