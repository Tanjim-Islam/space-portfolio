export const navLinks = [
  { id: "hero", title: "Hero" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
  { id: "portfolio", title: "Portfolio" },
  { id: "experience", title: "Experience" },
  { id: "research", title: "R&T" },
  { id: "contact", title: "Contact" },
];

export const experiences = [
  {
    title: "Fullstack Developer",
    company_name: "Invicta Solutions Ltd",
    date: "June 2024 - Present",
    details: [
      "Developed responsive and visually appealing interfaces using <span style='color: white;'>React.js, Node.js, Redux, RESTful APIs</span>",
      "Implemented <span style='color: white;'>CI/CD pipelines, testing with Jest</span>, and collaborated with UI/UX designers",
      "Worked with <span style='color: white;'>scalable architecture</span> and efficient state management",
      "Utilized <span style='color: white;'>Git</span> for version control and collaborative development",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Kaz Software Ltd.",
    date: "July 2023 - May 2024",
    details: [
      "Designed RESTful services in <span style='color: white;'>Node.js</span> backed by <span style='color: white;'>PostgreSQL</span>, increasing data retrieval efficiency by 25%",
      "Led UI consistency across projects using <span style='color: white;'>TailwindCSS</span> and <span style='color: white;'>Adobe Illustrator</span>, reducing design inconsistencies by 40%",
      "Migrated microservices to <span style='color: white;'>AWS Lambda</span>, improving system reliability by 30% and reducing operational costs by 20%",
    ],
  },
  {
    title: "Backend Engineer",
    company_name: "Infolytx",
    date: "January 2023 - June 2023",
    details: [
      "Developed REST APIs and backend pipelines using <span style='color: white;'>Python</span> and <span style='color: white;'>PostgreSQL</span>",
      "Built internal dashboards with custom graphics using <span style='color: white;'>Photoshop</span> and <span style='color: white;'>Dreamweaver</span>",
    ],
  },
  {
    title: "Mobile Developer",
    company_name: "LeadSoft Bangladesh Ltd.",
    date: "July 2022 - December 2022",
    details: [
      "Built mobile UI components and integrated <span style='color: white;'>Firebase</span> for real-time user tracking",
    ],
  },
  {
    title: "DevOps Intern",
    company_name: "DataSoft Systems Bangladesh Ltd.",
    date: "January 2022 - June 2022",
    details: [
      "Automated CI/CD pipelines and managed containerized deployments using <span style='color: white;'>Docker</span> and <span style='color: white;'>Linux</span> servers",
    ],
  },
  {
    title: "UI/UX Design Assistant",
    company_name: "Genex Infosys Ltd.",
    date: "September 2021 - December 2021",
    details: [
      "Designed web and mobile graphics using <span style='color: white;'>Photoshop</span>, <span style='color: white;'>Illustrator</span>, and <span style='color: white;'>Dreamweaver</span>",
    ],
  },
];

export const education = [
  {
    institution: "BRAC University",
    degree: "B.Sc. in Computer Science & Engineering",
    date: "2020 - 2024",
  },
  {
    institution: "Bangladesh International School and College",
    degree: "Higher School Certificate (HSC)",
    date: "2019",
  },
  {
    institution: "Chetona Model Academy",
    degree: "Secondary School Certificate (SSC)",
    date: "2017",
  },
];

export const portfolio = [
  {
    name: "StoreIt",
    description:
      "Full-stack file storage application with secure authentication and file management capabilities",
    image: "/projects/storeit.jpg",
    github: "https://github.com/Tanjim-Islam/Storage-management",
    demo: "https://storeit-site.netlify.app/",
  },
  {
    name: "Algorithm Visualizer",
    description:
      "Interactive tool for visualizing various algorithms including sorting, searching, and graph algorithms",
    image: "/projects/algoviz.jpg",
    github: "https://github.com/Tanjim-Islam/Algorithm-Visualizer",
    demo: "https://visualize-algo.netlify.app/",
  },
  {
    name: "PinkShop",
    description:
      "E-commerce frontend with modern UI, product catalog, cart functionality, and responsive design",
    image: "/projects/pinkshop.jpg",
    github: "https://github.com/Tanjim-Islam/ecommerce-pinkshop",
    demo: "https://ecom-pinkshop.netlify.app",
  },
  {
    name: "HomieStay",
    description:
      "P2P booking platform similar to Airbnb with property listings, user authentication, and booking system",
    image: "/projects/homiestay.jpg",
    github: "https://github.com/Tanjim-Islam/HomieStay",
    demo: "https://homie-stay.vercel.app",
  },
  {
    name: "3D Portfolio Website",
    description:
      "Personal portfolio website showcasing skills, projects, and professional experience",
    image: "/projects/portfolio.jpg",
    github: "https://github.com/Tanjim-Islam/Portfolio",
    demo: "https://tanjimriju.vercel.app",
  },
  {
    name: "Chess Clock",
    description:
      "Web-based chess clock application with customizable time controls and themes",
    image: "/projects/chessclock.jpg",
    github: "https://github.com/Tanjim-Islam/Chess-Clock",
    demo: "https://chess-clock-blue.vercel.app",
  },
];

export const allProjects = [
  ...portfolio,
  {
    name: "Hand Sign Recognition with YOLOv8",
    description:
      "Computer vision project that detects and classifies hand signs in real-time using YOLOv8 object detection framework",
    image: "/projects/handsignrecognition.jpg",
    github: "https://github.com/Tanjim-Islam/Hand-Sign-Recognition-with-YOLOv8",
    demo: null,
  },
  {
    name: "Fake News Detection",
    description:
      "ML system using the FaKnow library to detect fake news with high accuracy across multiple datasets",
    image: "/projects/fakenewsdetection.jpg",
    github: "https://github.com/Tanjim-Islam/Fake-News-Detection",
    demo: null,
  },
  {
    name: "Emotion Prediction",
    description:
      "Neural network-based text classification system for emotion prediction from textual content",
    image: "/projects/emotionprediction.jpg",
    github:
      "https://github.com/Tanjim-Islam/Emotion-Prediction-Using-Text-Classification-with-Neural-Networks",
    demo: null,
  },
  {
    name: "Parkinson's Disease Prediction",
    description:
      "SVM-based machine learning model for early detection of Parkinson's disease from medical data",
    image: "/projects/parkinsondisease.jpg",
    github:
      "https://github.com/Tanjim-Islam/Parkinson-s-Disease-Prediction-Using-SVM",
    demo: null,
  },
  {
    name: "Kidney Disease Prediction",
    description:
      "Multiple machine learning models for predicting kidney disease from patient data",
    image: "/projects/kidneydisease.jpg",
    github:
      "https://github.com/Tanjim-Islam/Kidney-Disease-Prediction-Using-Machine-Learning",
    demo: null,
  },
  {
    name: "Bangla Voice Bot",
    description:
      "Chatbot with sentiment analysis capabilities for Bangla language",
    image: "/projects/banglavoicebot.jpg",
    github: "https://github.com/Tanjim-Islam/Bangla-Voice-Bot",
    demo: null,
  },
];

export interface Skill {
  name: string;
  category:
    | "languages"
    | "web"
    | "ml"
    | "tools"
    | "cloud"
    | "databases"
    | "design"
    | "other";
  level: number; // 1-5
  description: string;
}

export const skills: Skill[] = [
  // Languages
  {
    name: "Python",
    category: "languages",
    level: 5,
    description: "Primary language for ML/AI development and data science",
  },
  {
    name: "JavaScript",
    category: "languages",
    level: 5,
    description: "Modern ES6+ features for web development",
  },
  {
    name: "C/C++",
    category: "languages",
    level: 4,
    description: "System programming and algorithm implementation",
  },
  {
    name: "Java",
    category: "languages",
    level: 3,
    description: "Object-oriented programming and application development",
  },

  // Web Development
  {
    name: "React.js",
    category: "web",
    level: 5,
    description: "Frontend library for building user interfaces",
  },
  {
    name: "Next.js",
    category: "web",
    level: 4,
    description: "React framework for production-grade applications",
  },
  {
    name: "Node.js",
    category: "web",
    level: 4,
    description: "Server-side JavaScript runtime",
  },
  {
    name: "Nest.js",
    category: "web",
    level: 3,
    description: "Progressive Node.js framework for scalable applications",
  },
  {
    name: "Tailwind CSS",
    category: "web",
    level: 4,
    description: "Utility-first CSS framework for rapid UI development",
  },

  // ML/AI
  {
    name: "TensorFlow",
    category: "ml",
    level: 4,
    description: "Deep learning framework for neural networks",
  },
  {
    name: "PyTorch",
    category: "ml",
    level: 4,
    description: "Machine learning library for research and production",
  },
  {
    name: "scikit-learn",
    category: "ml",
    level: 4,
    description: "Machine learning library for classical algorithms",
  },
  {
    name: "Computer Vision",
    category: "ml",
    level: 4,
    description: "OpenCV, YOLO, and Fast R-CNN for image processing",
  },
  {
    name: "NLP",
    category: "ml",
    level: 4,
    description: "BERT, GPT, and transformer models for text processing",
  },
  {
    name: "Quantum ML",
    category: "ml",
    level: 3,
    description: "Qiskit and Pennylane for quantum machine learning",
  },

  // Databases
  {
    name: "MySQL",
    category: "databases",
    level: 4,
    description: "Relational database management system",
  },
  {
    name: "MongoDB",
    category: "databases",
    level: 4,
    description: "NoSQL document database for modern applications",
  },
  {
    name: "SQL",
    category: "databases",
    level: 4,
    description: "Query language for relational databases",
  },

  // Cloud & DevOps
  {
    name: "Docker",
    category: "cloud",
    level: 3,
    description: "Containerization for application deployment",
  },
  {
    name: "Git",
    category: "cloud",
    level: 5,
    description: "Version control system for collaborative development",
  },
  {
    name: "Kubernetes",
    category: "cloud",
    level: 2,
    description: "Container orchestration for scalable applications",
  },

  // Design & Tools
  {
    name: "Figma",
    category: "design",
    level: 3,
    description: "Collaborative interface design tool",
  },
  {
    name: "Adobe XD",
    category: "design",
    level: 3,
    description: "UI/UX design and prototyping tool",
  },

  // Other Tools
  {
    name: "Agile/Scrum",
    category: "tools",
    level: 4,
    description: "Project management methodologies",
  },
  {
    name: "Jupyter",
    category: "tools",
    level: 5,
    description: "Interactive computing environment for data science",
  },
  {
    name: "LaTeX",
    category: "tools",
    level: 4,
    description: "Document preparation system for technical writing",
  },
];

export const categoryColors = {
  languages: "#3498db",
  web: "#2ecc71",
  ml: "#9b59b6",
  tools: "#e74c3c",
  cloud: "#f39c12",
  databases: "#1abc9c",
  design: "#e67e22",
  other: "#7f8c8d",
};

export const research = [
  {
    title: "Maternal Fetal Ultrasound Diagnosis with Deep Learning",
    description:
      "Used SE blocks and deep learning for prenatal anomaly detection.",
    type: "Thesis",
  },
  {
    title: "Medical Report Generation with Multimodal Data + LLMs",
    description:
      "Combines GPT-4 with image and text data for report generation.",
    type: "Research",
  },
  {
    title: "Load Balancing in Distributed Cache Systems",
    description:
      "Focuses on adaptive techniques to improve latency and efficiency.",
    type: "Research",
  },
];

export const contactInfo = {
  email: "tanjim.riju1243@gmail.com",
  linkedin: "https://www.linkedin.com/in/tanjim-riju/",
  github: "https://github.com/Tanjim-Islam",
};
