import { SiteContent } from '../types/content';

export const content: SiteContent = {
  personal: {
    name: "Peter Tallosy",
    title: "Physics engineering student",
    intro: "I like fast code on real hardware.",
    bio: `I study physics engineering at BME and spend most of my free time on ML inference: how fast you can run a useful model on a single GPU when the workload looks like a coding agent (long threads, tools, lots of hidden reasoning). I measure before I claim.

Thesis work is on SiOx memristors with the Halbritter group: simulations, noise, comparing to what we see in the lab.

I co-founded <a href="https://growmesh.io" target="_blank" rel="noopener">mesh.</a>, a small builder space in Budapest.`,
    location: "Hungary",
    social: {
      linkedin: "https://linkedin.com/in/peter-tallosy",
      github: "https://github.com/peti12352",
      email: "peter@tallosy.hu"
    }
  },
  projects: [
    {
      title: "Inference on a home GPU",
      organization: "personal",
      timespan: "2025 to present",
      description:
        "I have an RTX 5090 and use it to stress-test decode for Qwen-scale models: speculative drafting, batching when several agent sessions run at once, and whether the faster path still matches greedy output. Code and notes are on GitHub.",
      link: "https://github.com/peti12352"
    },
    {
      title: "Lilith",
      organization: "BadCompany",
      timespan: "2025 to 2026",
      link: "https://badcompany.xyz",
      description:
        "With BadCompany I built agent security that does not trust the process: policies on tool calls, enforcement in the kernel so a compromised agent cannot just ignore the rules. We shipped it, wrote it up on <a href=\"https://badcompany.xyz\" target=\"_blank\" rel=\"noopener\">badcompany.xyz</a>, and discontinued the product line in 2026. The earlier <a href=\"https://github.com/BadC-mpany/lilith-zero\" target=\"_blank\" rel=\"noopener\">Lilith-Zero</a> prototype was Rust middleware on MCP.",
    },
    {
      title: "Co-founder",
      organization: "mesh.",
      timespan: "2023 to present",
      link: "https://growmesh.io",
      description: "A physical place in Budapest for people who want to build things and hold each other to it."
    },
    {
      title: "Hardware",
      organization: "Zeto",
      timespan: "2021",
      description: "Test rigs for medical EEG/ECG hardware: signal paths, timing, automated tests in C on embedded Linux."
    }
  ],
  research: [
    {
      title: "SiOx memristors",
      organization: "BME, thesis",
      timespan: "2024 to 2026",
      description:
        "Atomistic simulations of resistive switching in silicon oxide. The open question is which picture fits the lab data better: filament growth or vacancy percolation. I compare simulated resistance noise to measured spectra and keep the models honest about what they can explain.",
    },
    {
      title: "3D quantum percolation",
      organization: "personal",
      timespan: "2025",
      description:
        "Numerical study of site dilution on a 3D tight-binding model (transfer matrices, Lyapunov exponents, finite-size scaling). Main number: p<sub>q</sub> ≈ 0.517 at E = 3.1t. I used JAX on a GPU because the parameter sweeps are painful on a CPU.",
      highlights: [
        "Cross-checked against Slevin & Ohtsuki on Anderson localization in the same pipeline"
      ]
    }
  ],
  misc: [
    {
      title: "B.Sc. Physics Engineering",
      organization: "BME",
      timespan: "2023 to 2027",
      description: "Nanotechnology and quantum applications track."
    },
    {
      title: "National TDK, physics",
      organization: "Hungary",
      timespan: "2022",
      description: "3rd place. Image processing for astronomy."
    },
    {
      title: "Maturity exam",
      organization: "Piarist School, Szeged",
      timespan: "2023",
      description: "Math and physics."
    }
  ],
  skills: {
    technical: {
      title: "Tools",
      content: "Python, JAX, CUDA, Rust, C, Linux"
    },
    languages: {
      title: "Languages",
      items: [
        { language: "Hungarian", level: "native" },
        { language: "English", level: "fluent" },
        { language: "German", level: "fluent" }
      ]
    }
  },
  about: {
    personal: "",
    research_interests: []
  }
};
