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
  description?: string;
  featured?: boolean;
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
    description: 'With urbanization and societal changes, there has been an increase in the number of people living alone. This raises concern for elderly people as many mishaps or accidents can happen in a household environment when they are alone. This study proposes a smart IOT and Deep learning based robotic system to assist people, especially the elderly, in case they are alone at home. The objective is to detect anomalies and provide first aid to the victim or call emergency contacts if necessary in minimal time. The system has three stages: Distress detection, Navigation and Searching, and Assistance with feedback. The robot detects distress in form of audible screams and also monitors its surroundings frequently. Once it detects a tragic situation, it tries to detect the person in its camera frame. The robot then searches the person and attempts to get feedback from the person and tries to provide an appropriate remedy to the victim. If the victim is unconscious, it contacts emergency services. The prototype of the robot was designed and tested with three different test cases to draw conclusions and evaluate the system. To test the efficiency of the robot, three evaluation parameters are defined, they are, Robot Activation Time, Search Time, and Response Time. Since it is an emergency robot, the main objective is to minimize these parameters. Experimental results show that the robot is able to locate the victim in various scenarios in a reasonable amount of time when placed in a central location in a home environment.',
  },
  {
    authors: 'Dias, M., Aloj, H., Ninan, N., Koshti, D.',
    title: 'BERT-based Multiple Parallel Co-attention Model for Visual Question Answering',
    venue: 'IEEE 6th International Conference on Intelligent Computing and Control Systems (ICICCS)',
    year: '2022',
    doi: 'https://doi.org/10.1109/ICICCS53718.2022.9788253',
    description: 'Humans can easily interpret visual and textual content whereas for a machine this is a challenging task. Visual question answering is a well-known problem in the field of computer vision and NLP where an image and a question related to the image are given and the machine has to generate a natural language answer. This paper explores the use of transformer BERT as a language model in VQA. The BERT-based multiple parallel co-attention visual question answering model has been proposed and the effect of introducing a powerful feature extractor like BERT for language modeling has been studied. From the experimental results, it is concluded that the proposed model improves over the original baseline VQA model by 3%.',
    featured: true,
  },
] satisfies Publication[];
