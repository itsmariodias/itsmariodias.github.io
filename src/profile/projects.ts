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
      'An end-to-end deep learning model trained to detect and classify suspicious and anomalous activities through surveillance footage. The model used is SlowFast and was trained on a customized dataset based on the DCSASS dataset. The model was designed to distinguish between normal and abnormal activities. Framework used is Keras and a custom batch generator was designed in order to efficiently load video data during training and testing.',
    year: '2020',
    tags: ['Deep Learning', 'Computer Vision', 'Keras'],
    featured: false,
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/suspicious-activity-recognition' },
      {
        label: 'Article',
        url: 'https://www.linkedin.com/pulse/armed-injured-other-suspicious-activity-recognition-using-deshpande/',
      },
    ],
  },
  {
    title: 'Virtual City Tour Web Application in AWS',
    description:
      'We design and deploy a three-tier architecture-based web application which showcases different tourist spots of a city alongside detailed descriptions with an advanced search system and user review system in AWS. The 3 tiers included are the Presentation tier which consisted of Nginx displaying the webpage designed using Bootstrap, the Application tier which consisted of Django with Gunicorn as the WSGI and the Data tier which consisted of the MySQL RDBMS server. The entire application was designed and deployed on AWS with proper configuration of the various subnets and EC2 instances, NACL and the security groups for each tier. We serve the static files like images to the website using Amazon S3 bucket.',
    year: '2020',
    tags: ['Amazon Web Services', 'Django', 'MySQL', 'Nginx', 'Bootstrap'],
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/VirtualVasai' },
    ],
  },
  {
    title: 'Online Classroom Application using Flutter',
    description:
      'An Online Classroom App developed using Flutter and Firebase that allows teachers to better communicate with students by posting updates and assignments along with timeline and deadline notifications. Students can join their respective classes and submit assignments directly and teachers will get information on all student submissions. Updates posted by teachers will be visible on the notification wall for all students. Both teachers and students have user accounts to store information regarding subjects, assignments and submissions. Teachers can also get a clear overview on the work done by each individual student and also regarding each assignment published.',
    year: '2021',
    tags: ['Flutter', 'Firebase', 'Mobile Development'],
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/online-classroom-app' },
    ],
  },
  {
    title: 'First Aid and Emergency Assistance Robot using Deep Learning',
    description:
      'A smart IOT based robot system that aims to assist people, especially elderly, in case they are injured or in a state of emergency and when no one else is present to assist them. We divided the overall functioning into three stages: distress detection, navigation and searching and assistance and feedback. The robot detects distress in the form of audible screams and then navigates throughout the household. After successfully locating the person, it begins communication and attempts to get feedback to provide appropriate remedy. If victim is unconscious, it then contacts emergency services immediately. The prototypes were designed and tested with different test cases to draw conclusions and evaluate limitations and scope for future improvements.',
    year: '2021',
    tags: ['Object Detection', 'Speech Recognition', 'IoT', 'ROS', 'Natural Language Processing'],
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/emergency-assistance-robot' },
      { label: 'Paper', url: 'https://doi.org/10.1109/ICCMC56507.2023.10083934' },
    ],
    featured: true,
  },
  {
    title: 'Designing an Effective Framework for Visual Question Answering using Deep Learning',
    description:
      'Designed a novel framework for open-ended visual question answering using deep-learning and compared it with existing state-of-the art in order to check its effectiveness. Visual question answering is a well-known problem in the field of computer vision and natural language processing where an image and a question related to the image are given and the machine has to generate a natural language answer. We explore the advancements made in this domain and evaluate and modify existing frameworks to improve their performance. Our best single model delivers 71% overall accuracy on the test-std split of the VQA 2.0 dataset.',
    year: '2022',
    tags: ['Deep Learning', 'Computer Vision', 'Natural Language Processing', 'TensorFlow', 'Keras'],
    featured: true,
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/bert-mcoatt-vqa' },
      { label: 'Paper', url: 'https://doi.org/10.1109/ICICCS53718.2022.9788253' },
    ],
  },
  {
    title: "It's a My Money",
    description:
      'A personal finance app for Android built with Expo. Track income, expenses, and account balances, fully offline with no accounts and no cloud.',
    year: '2026',
    tags: ['React Native', 'Expo', 'TypeScript'],
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/its-a-my-money' },
    ],
    featured: true,
  },
  {
    title: 'PokeDex IRL',
    description:
      'Identifies real-world animals, plants, and sea life from a photo and generates fun, Pokedex-style entries using AI and LangChain agents. FastAPI backend with a React front end.',
    year: '2025',
    tags: ['LangChain', 'FastAPI', 'React'],
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/pokedex-irl' },
    ],
  },
  {
    title: 'ShineMonitor MQTT Reporter',
    description:
      'Publishes solar system telemetry from the ShineMonitor API to an MQTT broker, ready to wire into Home Assistant for monitoring and automation.',
    year: '2024',
    tags: ['Python', 'MQTT', 'Home Assistant'],
    links: [
      { label: 'GitHub', url: 'https://github.com/itsmariodias/shinemonitor-reporter-mqtt' },
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
  },
] satisfies Publication[];
