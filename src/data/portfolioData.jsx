import {
  Github, Linkedin, Mail
} from 'lucide-react';

const contactEmail = 'anilgadegone@gmail.com';

export const portfolioData = {
  contact: {
    email: contactEmail,
  },
  hero: {
    name: "Manthan Gadegone",
    title: "Manthan",
    pronunciation: "",
    roles: ["UI/UX Designer", "Frontend Developer", "Web Developer"],
    description: [
      "Bridging the gap between creativity and functionality to bring ideas to life through human-centered design and clean code."
    ],
    profileImage: "/images/profile/profile2.webp",
    cvLink: "/CV/MANTHAN GADEGONE.pdf",
    socials: [
      { name: "Email", icon: Mail, link: `mailto:${contactEmail}` },
      { name: "GitHub", icon: Github, link: "https://github.com/manthan270" },
      { name: "LinkedIn", icon: Linkedin, link: "https://linkedin.com/in/manthan-gadegone-126a7922b" },
    ]
  },
  projects: [
    {
      id: 'global-restaurant-analysis',
      slug: 'global-restaurant-analysis',
      title: 'Global Restaurant Analysis',
      description: 'End-to-End Data Analysis Dashboard',
      fullDescription: 'A business intelligence analysis of 9,551 restaurant records across 15 countries. Built to support strategic decisions on market expansion, service mix, and cuisine positioning using an interactive slicer-driven dashboard.',
      features: [
        'Market Expansion: Identified high-opportunity markets',
        'Service Impact: Analyzed the effect of services on customer ratings',
        'Cuisine Performance: Highlighted top-performing cuisines',
        'Interactive Dashboard: Built with KPIs, slicers, and regional insights',
      ],
      techStack: ['Microsoft Excel', 'Data Analysis', 'Pivot Tables', 'Business Intelligence'],
      link: 'https://github.com/manthan270/Global-Restaurant-Analysis',
      year: '2024',
      image: '/images/projects/global_restaurant_analysis.webp',
      imageSrcSet: '/images/projects/global_restaurant_analysis-400.webp 400w, /images/projects/global_restaurant_analysis-800.webp 800w, /images/projects/global_restaurant_analysis.webp 1861w',
      category: 'Data Projects',
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
      image: '/images/projects/hirelite.webp',
      imageSrcSet: '/images/projects/hirelite-400.webp 400w, /images/projects/hirelite-800.webp 800w, /images/projects/hirelite.webp 1900w',
      category: 'Web Projects',
    },
  ],
  experience: [
    {
      role: 'Intern',
      company: 'Maharashtra Remote Sensing Application Centre',
      period: 'Jan 2025 – May 2025',
      description: 'Built a Random Forest land-cover classifier in Python using Rasterio, NumPy, and scikit-learn, trained on satellite imagery. Performed change-detection analysis to map land-cover changes from 2005–2025 and identify urban expansion trends.',
      technologies: ['Python', 'Rasterio', 'NumPy', 'scikit-learn', 'Satellite Imagery', 'Change Detection', 'Geospatial Analysis']
    },
  ],
  certificates: [
    {
      title: 'Fabric Data Engineer Associate',
      issuer: 'Microsoft',
      year: '2026',
      file: '/certificates/fabric-data-engineer-associate-microsoft-2026.pdf',
    },
    {
      title: 'Fabric Analytics Engineer Associate',
      issuer: 'Microsoft',
      year: '2026',
      file: '/certificates/fabric-analytics-engineer-associate-microsoft-2026.pdf',
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
    { name: 'React', icon: '/images/icons/React.svg' },
    { name: 'JS', icon: '/images/icons/JavaScript.svg' },
    { name: 'Tailwind', icon: '/images/icons/Tailwind CSS.svg' },
    { name: 'CSS', icon: '/images/icons/CSS3.svg' },
    { name: 'HTML', icon: '/images/icons/HTML5.svg' },
    { name: 'Node', icon: '/images/icons/Node.js.svg' },
    { name: 'Git', icon: '/images/icons/Git.svg' },
    { name: 'Python', icon: '/images/icons/Python.svg' },
    { name: 'SQL', icon: '/images/icons/SQL Developer.svg' },
    { name: 'Figma', icon: '/images/icons/Figma.svg' },
  ],
  footer: {
    year: new Date().getFullYear(),
    text: "All rights reserved",
    love: "Built with ❤︎ by Manthan Gadegone"
  }
};
