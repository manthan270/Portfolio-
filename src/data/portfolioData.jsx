import {
  GithubIcon, Linkedin01Icon, Mail01Icon
} from 'hugeicons-react';

export const portfolioData = {
  hero: {
    name: "Manthan Gadegone",
    title: "Manthan",
    pronunciation: "",
    roles: ["UI/UX Designer", "Frontend Developer", "Web Developer"],
    description: [
      "Bridging the gap between creativity and functionality to bring ideas to life through human-centered design and clean code."
    ],
    profileImage: "/images/profile/profile2.webp",
    profileVideo: "/videos/heymain.mp4",
    cvLink: "/CV/MANTHAN GADEGONE.pdf",
    socials: [
      { name: "Email", icon: Mail01Icon, link: "mailto:anilgadegone@gmail.com" },
      { name: "GitHub", icon: GithubIcon, link: "https://github.com/manthan270" },
      { name: "LinkedIn", icon: Linkedin01Icon, link: "https://linkedin.com/in/manthan-gadegone-126a7922b" },
    ]
  },
  projects: [
    {
      id: 'smartcampus',
      slug: 'smartcampus',
      title: 'SmartCampus Navigator',
      description: 'Interactive Campus Navigation App',
      fullDescription: 'SmartCampus Navigator is an interactive campus navigation app featuring map-based locations, smart search, and a chat assistant to quickly find places like labs and buildings. The app helps students and visitors efficiently navigate the campus with an intuitive interface and real-time assistance.',
      features: [
        'Map Navigation: Interactive map with location markers for all campus buildings and labs',
        'Smart Search: Quickly find any campus location by name or category',
        'Chat Assistant: AI-powered assistant to answer navigation queries instantly',
        'Location Details: Detailed info cards for each campus location',
      ],
      techStack: ['React.js', 'JavaScript', 'TailwindCSS', 'JSON'],
      link: 'https://github.com/manthan270',
      year: '2024',
      image: '/images/projects/campus system.webp',
      category: 'Web Projects',
    },
    {
      id: 'hirelite',
      slug: 'hirelite',
      title: 'HireLite',
      description: 'Job Opportunities Web Platform',
      fullDescription: 'HireLite is a web platform designed to help users explore job opportunities and connect with hiring companies easily. It provides a clean, user-friendly interface that simplifies the job search process and bridges the gap between candidates and employers.',
      features: [
        'Job Listings: Browse and filter live job opportunities across companies',
        'Company Profiles: Explore hiring companies and their open roles',
        'Clean UI: Intuitive and responsive interface for seamless browsing',
        'Quick Apply: Streamlined flow to connect with employers efficiently',
      ],
      techStack: ['React.js', 'JavaScript', 'TailwindCSS'],
      link: 'https://hirelite.vercel.app',
      year: '2024',
      image: '/images/projects/OrdersOgImage.webp',
      category: 'Web Projects',
    },
  ],
  experience: [
    {
      role: 'Intern',
      company: 'Maharashtra Remote Sensing Application Centre',
      period: 'Jan 2025 – May 2025',
      description: 'Developed backend REST APIs for integrating ML models. Worked on a land cover classification system. Integrated frontend and backend components. Collaborated with team for project delivery.',
      technologies: ['React.js', 'Express.js', 'JavaScript', 'Gemini API']
    },
  ],
  education: [
    {
      title: 'B.Tech – Electronics & Telecommunication Engineering',
      institution: 'ST. VINCENT PALLOTTI COLLEGE OF ENGINEERING AND TECHNOLOGY',
      location: 'NAGPUR, MAHARASHTRA',
      period: '2021 – 2025',
      description: 'Studied core electronics, communication systems, and signal processing while building a strong foundation in programming, data analysis, and software development.',
      tags: ['SQL', 'Python', 'Excel', 'Data Analysis', 'AI Solutions', 'Web Development']
    }
  ],

  //custom svg from folder public/images/icons
  skills: [
    { name: 'React', Icon: '/images/icons/React.svg' },
    { name: 'JS', Icon: '/images/icons/JavaScript.svg' },
    { name: 'Tailwind', Icon: '/images/icons/Tailwind CSS.svg' },
    { name: 'CSS', Icon: '/images/icons/CSS3.svg' },
    { name: 'HTML', Icon: '/images/icons/HTML5.svg' },
    { name: 'Node', Icon: '/images/icons/Node.js.svg' },
    { name: 'Git', Icon: '/images/icons/Git.svg' },
    { name: 'Python', Icon: '/images/icons/Python.svg' },
    { name: 'SQL', Icon: '/images/icons/SQL Developer.svg' },
    { name: 'Figma', Icon: '/images/icons/Figma.svg' },
  ],
  footer: {
    year: new Date().getFullYear(),
    text: "All rights reserved",
    love: "Built with ❤︎ by Manthan Gadegone"
  }
};
