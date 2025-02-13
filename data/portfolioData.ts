export const navLinks = [
  { id: "hero", title: "Hero" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
  { id: "portfolio", title: "Portfolio" },
  { id: "experience", title: "Experience" },
  { id: "contact", title: "Contact" },
]

export const experiences = [
  {
    title: "Frontend Developer",
    company_name: "Invicta Solution Limited",
    date: "June 2024 - Present",
    details: [
      "Developed responsive and visually appealing interfaces using <span style='color: white;'> HTML, CSS, JavaScript, React, and Vue. </span>",
      "Collaborated with designers and backend developers to enhance user experience.",
      "Implemented <span style='color: white;'> web performance optimization </span> techniques for faster load times.",
      "Contributed to code reviews and the development of reusable components.",
    ],
  },
]

export const portfolio = [
  {
    name: "Hand Sign Recognition with YOLOv8",
    description:
      "This repository showcases a computer vision project that detects and classifies hand signs in real time using the YOLOv8 object detection framework. It includes training scripts, a labeled dataset, and an inference pipeline that demonstrates how to process live or recorded video streams to identify different hand gestures.",
    image: "/placeholder.svg?height=200&width=300",
    link: "https://github.com/Tanjim-Islam/Hand-Sign-Recognition-with-YOLOv8",
  },
  {
    name: "Fake News Detection",
    description:
      "Developed a high-accuracy fake news detection system using the FaKnow library, achieving near-perfect metrics across datasets with advanced content and social context-based algorithms.",
    image: "/placeholder.svg?height=200&width=300",
    link: "https://github.com/Tanjim-Islam/Fake-News-Detection",
  },
  {
    name: "HomieStay",
    description:
      "HomieStay is a modern, clean, and user-friendly platform for hosting and connecting with people in need of temporary housing.",
    image: "/placeholder.svg?height=200&width=300",
    link: "https://homie-stay.vercel.app/",
  },
]

export interface Skill {
  name: string
  category: "frontend" | "backend" | "ai" | "devops"
  level: number // 1-5
  description: string
}

export const skills: Skill[] = [
  {
    name: "JavaScript",
    category: "frontend",
    level: 5,
    description: "Expert in modern ES6+ features and frameworks",
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: 4,
    description: "Strong typing and advanced TypeScript patterns",
  },
  {
    name: "React",
    category: "frontend",
    level: 5,
    description: "Complex React applications and performance optimization",
  },
  {
    name: "Next.js",
    category: "frontend",
    level: 4,
    description: "Full-stack React framework expertise",
  },
  {
    name: "Node.js",
    category: "backend",
    level: 4,
    description: "Server-side JavaScript and API development",
  },
  {
    name: "Python",
    category: "backend",
    level: 5,
    description: "Backend development and scripting",
  },
  {
    name: "TensorFlow",
    category: "ai",
    level: 4,
    description: "Deep learning and neural networks",
  },
  {
    name: "PyTorch",
    category: "ai",
    level: 4,
    description: "Machine learning model development",
  },
  {
    name: "Computer Vision",
    category: "ai",
    level: 3,
    description: "Image processing and object detection",
  },
  {
    name: "NLP",
    category: "ai",
    level: 3,
    description: "Natural Language Processing applications",
  },
  {
    name: "Docker",
    category: "devops",
    level: 4,
    description: "Containerization and deployment",
  },
  {
    name: "AWS",
    category: "devops",
    level: 3,
    description: "Cloud infrastructure and services",
  },
  {
    name: "Git",
    category: "devops",
    level: 5,
    description: "Version control and collaboration",
  },
  {
    name: "CI/CD",
    category: "devops",
    level: 4,
    description: "Automated testing and deployment",
  },
  {
    name: "Agile",
    category: "devops",
    level: 4,
    description: "Project management and team collaboration",
  },
]

export const categoryColors = {
  frontend: "#3498db",
  backend: "#2ecc71",
  ai: "#9b59b6",
  devops: "#e74c3c",
}

