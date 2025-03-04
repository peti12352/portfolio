import { SiteContent } from '../types/content';

export const content: SiteContent = {
  personal: {
    name: "Peter Tallosy",
    title: "Physics undergrad & software developer",
    intro: "Building high-performance solutions & applying physics to real-world problems.",
    location: "Budapest, Hungary",
    social: {
      linkedin: "https://linkedin.com/in/peter-tallosy",
      github: "https://github.com/peti12352",
      email: "peter@tallosy.hu"
    }
  },
  projects: [
    {
      title: "Research Assistant",
      organization: "BME Institute of Physics",
      timespan: "June 2024 – Present",
      icon: "assets/nano.png",
      description: "Project - PCMO resistive switching devices",
      link: "#"
    },
    {
      title: "Team Member",
      organization: "mesh",
      timespan: "Dec 2023 – Present",
      icon: "assets/mesh.jfif",
      link: "https://growmesh.io",
      timeline: [
        {
          date: "Dec 2024",
          description: "Delivered a technical session on Boltzmann Machines."
        },
        {
          date: "Aug 2024 – Dec 2024",
          description: "Designed an ML-based congestion-pricing model (Miracle Traffic Solutions)."
        },
        {
          date: "May 2024",
          description: "Created RepoSnap (chrome extension) for local GitHub repo setup."
        },
        {
          date: "Dec 2023 – Jan 2024",
          description: "Built a collaborative filtering system for Diversum."
        }
      ]
    },
    {
      title: "TDK Participant",
      organization: "University of Szeged",
      timespan: "Mar 2022 – Nov 2022",
      icon: "assets/tdk.jpg",
      description: "Researched false color astronomical image processing; earned 3rd place at TDK.",
      technologies: "Python (NumPy, SciPy, Matplotlib), GIMP"
    },
    {
      title: "Software Developer",
      organization: "OffSocial",
      timespan: "Oct 2021 – May 2022",
      icon: "assets/offsocial.png",
      description: "Contributed to OffSocial, a mobile app aimed at reducing social media usage.",
      technologies: "Flutter, Firebase"
    },
    {
      title: "Hardware Developer",
      organization: "Zeto EU",
      timespan: "Mar 2022 – Nov 2022",
      icon: "assets/zeto.png",
      description: "Developed a testing software for an EEG/ECG emulator (voltage measurements with various waveforms).",
      technologies: "C/WiringPi, Raspberry Pi",
      link: "https://github.com/peti12352/ght/"
    }
  ],
  education: [
    {
      degree: "B.Sc. in Physics Engineering",
      institution: "Budapest University of Technology and Economics",
      timespan: "Expected 2027",
      icon: "assets/ttk.png",
      description: "English-taught program",
      projects: "data compression in C, a custom bigint class in C++ (operator overloading), multiple numerical solvers for the three-body problem."
    },
    {
      degree: "Maturity Exam in Math & Physics Specialization",
      institution: "Piarist School Szeged",
      timespan: "May 2023",
      icon: "assets/piarista.png",
      description: "Graduated with an Excellent final mark."
    }
  ],
  skills: {
    mathematics: {
      title: "Mathematics",
      content: "Advanced calculus, differential equations, linear algebra, numerical analysis, optimization theory, probability & statistics"
    },
    physics: {
      title: "Physics",
      content: "Classical mechanics, electrodynamics, quantum mechanics, statistical physics, thermodynamics, computational physics, numerical modeling"
    },
    programming: {
      title: "Programming",
      content: "Scientific Python: NumPy, SciPy, OpenCV, PyTorch, TensorFlow for data analysis & ML\nSystems Programming: Basic C/C++ for embedded systems\nDevelopment: Git, Linux, LaTeX, HTML/CSS/JS"
    },
    instrumentation: {
      title: "Instrumentation",
      content: "Computer-aided measurement systems, data acquisition, signal processing, electronics prototyping, LabVIEW, oscilloscopes & multimeters"
    },
    languages: {
      title: "Languages",
      items: [
        { language: "Hungarian", level: "Native" },
        { language: "English", level: "Fluent" },
        { language: "German", level: "Fluent" }
      ]
    },
    soft_skills: {
      title: "Soft Skills",
      content: "Technical documentation, research methodology, problem analysis, collaborative development, scientific communication, tutoring"
    }
  },
  about: {
    intro: "Physics undergraduate skilled in mathematics, physics, and algorithm development. Built software for a Raspberry Pi–based EEG emulator, performed advanced astronomical image processing, and developed ML solutions for urban traffic optimization. Contributed to mesh, a collaborative environment that fosters a vibrant community. Spent 8 years in Austria, mastering German and fueling my passion for math and physics.",
    personal: "Outside of academics, I like to run 5Ks, and find inspiration in Dostoevsky's literary works. My daily routine includes brewing coffee and yerba mate. I'm also interested in health related research. I like to listen to electronic music like Marsh and Air.",
    research_interests: [
      "Quantum Computing & Information",
      "Machine Learning models",
      {
        title: "Post-CMOS Computing",
        link: "https://irds.ieee.org/home/what-is-beyond-cmos"
      }
    ]
  }
}; 