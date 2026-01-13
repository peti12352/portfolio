import { SiteContent } from '../types/content';

export const content: SiteContent = {
  personal: {
    name: "Peter Tallosy",
    title: "CTO & Physics Engineering Student",
    intro: "Physics-trained engineer and CTO specializing in AI-native systems, neuromorphic hardware, and formal verification. Currently building Bad Company, focusing on cryptographically secure agentic frameworks and autonomous infrastructure. Leveraging multi-physics simulation and machine learning to bridge the gap between hardware dynamics and verified AI behavior.",
    location: "Budapest, Hungary",
    social: {
      linkedin: "https://linkedin.com/in/peter-tallosy",
      github: "https://github.com/peti12352",
      email: "peter@tallosy.hu"
    }
  },
  projects: [
    {
      title: "CTO & Co-founder",
      organization: "Bad Company",
      timespan: "Dec 2023 – Present",
      icon: "assets/mesh.jfif",
      link: "https://growmesh.io",
      description: "Born from the <strong>mesh.</strong> builder community. Architecting the infrastructure for a safe, agentic future. Developing <strong>Sentinel</strong>, a Rust-based secure MCP framework with end-to-end encrypted tool-call interception and cryptographically enforced capability systems.",
      timeline: [
        {
          date: "Dec 2025 – Present",
          description: "<strong>Research Lead @ AI-Native Systems:</strong> Exploration of formal verification for AI-generated code. Designing semantic filesystems and OS-level abstractions to constrain and verify agentic behavior."
        },
        {
          date: "Sep 2025 – Jan 2026",
          description: "<strong>Sentinel</strong>: high-performance Rust proxy for agentic verification."
        },
        {
          date: "May 2025 – Oct 2025",
          description: "Pivoted from red-teaming games to enterprise-grade agentic security products."
        }
      ]
    },
    {
      title: "Research Assistant",
      organization: "BME Institute of Physics",
      timespan: "June 2024 – Present",
      icon: "assets/nano.png",
      description: "<strong>Neuromorphic Hardware & Memristors:</strong> Developed a multi-scale simulation stack for SiO₂/SiOₓ resistive-switching devices. Modeling filament formation and switching dynamics to enable energy-efficient, hardware-native neural network designs.",
      link: "#"
    },
    {
      title: "Lead Developer",
      organization: "Generative CAD",
      timespan: "2025",
      icon: "assets/mesh.jfif",
      description: "Created a text-to-LEGO pipeline using a coordinate-free model description language for autoregressive build generation. Integrated automated brick detection and library management."
    },
    {
      title: "Member",
      organization: "mesh",
      timespan: "2023 – Present",
      icon: "assets/mesh.jfif",
      description: "Part of the <strong>mesh</strong> builder space community, a collaborative environment fueling innovation and from which Bad Company emerged."
    },
    {
      title: "ML Architect",
      organization: "Large-scale Optimization",
      timespan: "2024",
      icon: "assets/location.svg",
      description: "Deployment of a distributed optimization framework with resource-aware scheduling and reproducible execution for production-scale ML workloads."
    },
    {
      title: "Hardware Developer",
      organization: "ZetoEU",
      timespan: "2021",
      icon: "assets/zeto.png",
      description: "Engineering medical-grade ECG/EEG simulation hardware. Built an automated C test suite on Raspberry Pi to verify signal integrity and timing reliability."
    },
    {
      title: "Winner / 3rd Place",
      organization: "TDK Physics Research",
      timespan: "2022",
      icon: "assets/tdk.jpg",
      description: "Researched and implemented false-color processing techniques for astronomical imagery. Published findings and awarded at the national TDK competition."
    }
  ],
  education: [
    {
      degree: "B.Sc. in Physics Engineering",
      institution: "Budapest University of Technology",
      timespan: "2023 – 2027 (Expected)",
      icon: "assets/ttk.png",
      description: "Specializing in Nanotechnology and Quantum Applications. Projects: custom numerical solvers, LLM training on Shakespeare, and C++ library design."
    },
    {
      degree: "Maturity Exam",
      institution: "Piarist School Szeged",
      timespan: "2023",
      icon: "assets/piarista.png",
      description: "Math & Physics Specialization. Graduated with honors."
    }
  ],
  skills: {
    core: {
      title: "Core Expertise",
      content: "Physics-driven ML · Neuromorphic Hardware · Agentic AI Security · Distributed Optimization · Formal Verification · Rust · C++ · Python"
    },
    stack: {
      title: "Stack",
      content: "PyTorch · TensorFlow · NumPy · SciPy · OpenCV · LaTeX · Linux · Git · Raspberry Pi / Embedded Systems"
    },
    languages: {
      title: "Languages",
      items: [
        { language: "Hungarian", level: "Native" },
        { language: "English", level: "Fluent" },
        { language: "German", level: "Fluent" }
      ]
    }
  },
  about: {
    intro: "Physics-trained CTO and researcher specializing in AI-native systems and neuromorphic hardware.",
    personal: "Outside of engineering, I run 5Ks, read Dostoevsky, and brew excessive amounts of coffee and yerba mate. I find inspiration in the intersection of health research and electronic music (Marsh, Air).",
    research_interests: [
      "Quantum Information",
      "Agentic Safety",
      "Post-CMOS Computing"
    ]
  }
};