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
}

interface Publication {
  authors: string;
  title: string;
  venue: string;
  year: string;
  doi?: string;
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

export const resume = {
  name: 'Mario Dias',
  tagline: 'AI & Software Engineer',
  location: 'Mumbai, Maharashtra, India',
  email: 'mario.dias3100@gmail.com',
  about: [
    "Hi, I'm Mario. I'm an AI engineer with a strong backend and data-engineering background. I've built scalable systems with Java, Spring, Python, and Databricks, and I spend most of my time integrating AI into enterprise workflows using LangGraph, FastAPI, and Azure OpenAI.",
    "These days I work in applied AI, building intelligent systems and agents that solve real business problems. I care about production-grade engineering as much as the model behind it, and I'm happiest working at the intersection of software engineering and AI.",
  ],
  experience: [
    {
      role: 'AI & Software Engineer',
      org: 'UBS',
      location: 'Navi Mumbai, India',
      period: 'Jul 2022 – Present',
      bullets: [
        'Built a real-time audio-based RAG assistant for the CEO, CFO, and Investor Relations team to generate context-aware, low-latency talking points during quarterly earnings calls (Azure Speech, Azure OpenAI, FAISS, FastAPI).',
        'Deployed an autonomous agent for financial sign-off summarisation as part of the UBS ampliFi initiative, using LangGraph, FastAPI, and Azure OpenAI to streamline work for controllers.',
        'Won the UBS India Hackathon 2024 with a multi-agent RAG-based AI assistant (LangChain, LangGraph, Azure OpenAI, Azure AI Search) providing application-specific user assistance and automated incident reporting.',
        'Delivered a PoC for AI-powered financial commentary automation (FastAPI, LangGraph, Azure OpenAI), saving users up to 1.5 hours daily.',
        'Designed and optimised an ETL pipeline in Databricks ingesting millions of records for daily balance-sheet reporting, using a concurrent queue to process data from 13+ regions across 100+ daily jobs.',
        'Boosted critical Databricks jobs from 45 minutes to under 8 minutes, improving data availability and reducing cost.',
        'Recognised as a UBS Certified Gold Engineer for technical excellence and consistent delivery.',
        'Core member of the UBS AI Ventures Challenge, mentoring graduates on AI and innovation against real financial datasets.',
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
      qualification: 'B.E. Computer Engineering',
      institution: 'Fr. Conceicao Rodrigues College of Engineering, Mumbai',
      affiliation: 'University of Mumbai',
      period: '2018 – 2022',
      result: 'CGPA 9.74 / 10',
    },
    {
      qualification: 'HSC (Science)',
      institution: 'Thomas Baptista Junior College, Vasai',
      affiliation: 'Maharashtra State Board',
      period: '2016 – 2018',
      result: '94.92%',
    },
    {
      qualification: 'SSC',
      institution: 'Notre Dame High School, Vasai',
      affiliation: 'CBSE',
      period: '2016',
      result: 'CGPA 10.0 / 10',
    },
  ] satisfies Education[],
  publications: [
    {
      authors: 'Dias, M., Aloj, H., Ninan, N., Koshti, D., Kamoji, S.',
      title: 'First Aid and Emergency Assistance Robot for Individuals at Home using IoT and Deep Learning',
      venue: 'IEEE 7th International Conference on Computing Methodologies and Communication (ICCMC)',
      year: '2023',
      doi: 'https://doi.org/10.1109/ICCMC56507.2023.10083934',
    },
    {
      authors: 'Dias, M., Aloj, H., Ninan, N., Koshti, D.',
      title: 'BERT-based Multiple Parallel Co-attention Model for Visual Question Answering',
      venue: 'IEEE 6th International Conference on Intelligent Computing and Control Systems (ICICCS)',
      year: '2022',
      doi: 'https://doi.org/10.1109/ICICCS53718.2022.9788253',
    },
  ] satisfies Publication[],
  awards: [
    {
      title: 'Outstanding Performer Achievement',
      issuer: 'UBS',
      year: '2023',
    },
    {
      title: 'Top 6, AI for Healthcare Hackathon',
      issuer: 'DERBI Foundation',
      year: '2021',
      note: 'Deep Learning Multiple Diseases Prediction Model based on Retina Image',
    },
  ] satisfies Award[],
  certifications: [
    { title: 'Azure AI Engineer Associate', issuer: 'Microsoft', year: '2026' },
    { title: 'Azure AI Fundamentals', issuer: 'Microsoft', year: '2024' },
    { title: 'Power BI Data Analyst Associate', issuer: 'Microsoft', year: '2024' },
    { title: 'Microsoft Azure Fundamentals', issuer: 'Microsoft', year: '2023' },
    { title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI (Coursera)', year: '2020' },
  ] satisfies Certification[],
  skills: {
    Programming: ['Python', 'Java'],
    'AI / ML': ['Generative AI', 'NLP', 'Agentic AI', 'Forecasting', 'Anomaly Detection'],
    Frameworks: ['LangChain', 'LangGraph', 'FastAPI', 'Spring Framework'],
    'Data & Cloud': ['Databricks', 'Apache Spark', 'Microsoft Azure', 'PostgreSQL'],
    Tools: ['Kubernetes', 'Power BI', 'GitLab CI/CD'],
  } satisfies Record<string, string[]>,
  socials: [
    { label: 'GitHub', url: 'https://github.com/itsmariodias', handle: '@itsmariodias' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mario-dias/', handle: 'mario-dias' },
  ] satisfies Social[],
};
