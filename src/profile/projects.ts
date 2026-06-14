type ProjectLinkLabel = 'GitHub' | 'Demo' | 'Article' | 'Paper' | 'Website';

interface ProjectLink {
  label: ProjectLinkLabel;
  url: string;
}

interface Project {
  title: string;
  description: string;
  year?: string;
  tags?: string[];
  links: ProjectLink[];
  featured?: boolean;
  cover?: string;
}

interface Publication {
  authors: string;
  title: string;
  venue: string;
  year: string;
  doi?: string;
}

export const projects = [
  {
    title: 'Suspicious Activity Recognition using Drone Surveillance',
    description:
      'End-to-end deep learning model that detects armed, injured, and other suspicious activities in surveillance footage. Built on SlowFast, trained on a customised DCSASS dataset with a custom Keras batch generator for efficient video loading.',
    year: '2020',
    tags: ['Deep Learning', 'Computer Vision', 'Keras'],
    featured: true,
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/suspicious-activity-recognition' },
      {
        label: 'Article',
        url: 'https://www.linkedin.com/pulse/armed-injured-other-suspicious-activity-recognition-using-deshpande/',
      },
    ],
  },
  {
    title: 'This Site',
    description:
      'Personal portfolio and blog built with Astro and Tailwind, hosted on GitHub Pages. Blog posts are authored in markdown, syntax-highlighted with Shiki, and themed for light/dark.',
    year: '2026',
    tags: ['Astro', 'Tailwind', 'TypeScript'],
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/itsmariodias.github.io' },
      { label: 'Website', url: 'https://itsmariodias.github.io/' },
    ],
  },
] satisfies Project[];

export const publications = [
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
] satisfies Publication[];
