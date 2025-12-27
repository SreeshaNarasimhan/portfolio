import { ResumeData } from './types';

export const RESUME_CONTENT: ResumeData = {
  // Replace this URL with your local image path or base64 string
  profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
  name: "SREESHA NARASIMHAN",
  title: "Content Writer | B.Tech AI & Data Science Student",
  contact: {
    email: "sreeshamn@gmail.com",
    location: "Salem, Tamil Nadu, India",
    linkedin: "linkedin.com/in/sreesha-narasimhan", 
  },
  summary: "Highly motivated B.Tech student specializing in Artificial Intelligence and Data Science, passionate about leveraging Python and prompt engineering to drive innovative solutions. Possesses strong technical aptitude, hands-on experience through multiple full-stack and Python internships, and robust communication skills demonstrated through content writing and awareness programs. Certified in core AI concepts and advanced programming, seeking opportunities to apply technical skills in a challenging data-driven environment.",
  skills: [
    {
      category: "Programming",
      skills: ["Python (Advanced Proficiency)", "Full-Stack Development"]
    },
    {
      category: "AI / ML",
      skills: ["Data Science", "Prompt Engineering", "Gemini AI (Certified)"]
    },
    {
      category: "Tools & Platforms",
      skills: ["NPTEL", "CodSoft", "Google for Startups", "Gateway Software Solutions"]
    }
  ],
  languages: ["English", "Hindi (Advanced - Hindi Praveen Certified)"],
  experience: [
    {
      role: "Full-Stack Python Intern",
      company: "Gateway Software Solutions",
      duration: "July 2025",
      points: [
        "Successfully completed a Full-Stack Python internship, gaining hands-on experience in both front-end and back-end development principles.",
        "Applied learned Python skills in a professional setting to contribute to software development projects."
      ]
    },
    {
      role: "Python Programming Intern",
      company: "CodSoft",
      duration: "May 2025 (4 Weeks)",
      points: [
        "Completed a 4-week virtual internship program focused on enhancing practical Python Programming skills.",
        "Demonstrated proficiency in Python applications and problem-solving through project-based work."
      ]
    },
    {
      role: "Content Writer",
      company: "Self/Freelance",
      duration: "Ongoing",
      points: [
        "Utilized strong written communication skills to create engaging and informative content, bridging technical complexity with clear, accessible language.",
        "Managed the communication and outreach for an Education & AI Awareness Program team."
      ]
    }
  ],
  projects: [
    {
      title: "Future of Work: Humans vs. Machines",
      description: "Presented an academic project analyzing the societal and technological impacts of Human-Machine Collaboration and AI integration."
    }
  ],
  certifications: [
    {
      title: "Gemini Certified Student",
      issuer: "Google for Education",
      date: "Oct 2025",
      image: "https://placehold.co/800x600/2563eb/white?text=Gemini+Certified+Student" // Replace with actual image
    },
    {
      title: "Startup School: Prompt to Prototype",
      issuer: "Google for Startups",
      date: "Oct 2025",
      image: "https://placehold.co/800x600/3b82f6/white?text=Startup+School+Certificate" // Replace with actual image
    },
    {
      title: "Python for Data Science",
      issuer: "NPTEL Online Certification",
      date: "Jul-Aug 2023",
      score: "60%",
      image: "https://placehold.co/800x600/ef4444/white?text=NPTEL+Python+Certificate" // Replace with actual image
    },
    {
      title: "Fullstack Python Internship",
      issuer: "Gateway Software Solutions",
      date: "July 2025",
      image: "https://placehold.co/800x600/10b981/white?text=Gateway+Internship+Certificate" // Replace with actual image
    },
    {
      title: "Python Programming Internship",
      issuer: "CodSoft",
      date: "Sept 2025",
      image: "https://placehold.co/800x600/f59e0b/white?text=CodSoft+Internship+Certificate" // Replace with actual image
    },
    {
      title: "Hindi Praveen (Advanced Proficiency)",
      issuer: "Dakshin Bharat Hindi Prachar Sabha",
      date: "Aug 2020",
      image: "https://placehold.co/800x600/8b5cf6/white?text=Hindi+Praveen+Certificate" // Replace with actual image
    }
  ],
  education: {
    degree: "B.Tech Artificial Intelligence & Data Science",
    institution: "AVS Engineering College",
    location: "Salem, Tamil Nadu, India",
    details: [
      "Current Pursuit: Focusing on core subjects including Machine Learning, Data Structures, and Algorithm Design.",
      "Key Focus: Application of AI principles and data-driven analysis in practical scenarios."
    ]
  }
};