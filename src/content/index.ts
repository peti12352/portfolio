import { SiteContent } from '../types/content';

export const content: SiteContent = {
  personal: {
    name: "Peter Tallosy",
    title: "Physics engineering student",
    intro: "Inference kernels and numerical physics. Hungary.",
    bio: `I run benchmarks on local LLM decode: NVFP4 on a 5090, speculative drafting (MTP, DFlash2), long contexts with tool calls. I log acceptance length and tok/s on replayed SWE agent traces.

BSc at BME, Budapest. Thesis: SiOx memristor noise (LAMMPS + MLIP, compare to lab spectra). Earlier project: 3D quantum percolation in JAX.

Co-founded <a href="https://growmesh.io" target="_blank" rel="noopener">mesh.</a> in Budapest.`,
    location: "Hungary",
    social: {
      linkedin: "https://linkedin.com/in/peter-tallosy",
      github: "https://github.com/peti12352",
      email: "peter@tallosy.hu"
    }
  },
  projects: [
    {
      title: "Local inference",
      organization: "personal",
      timespan: "2025 to present",
      description:
        "Scripts and notes under my GitHub: agent replay on Qwen3.8-27B NVFP4, batch curves, MTP vs DFlash2 on thinking output. Working on kernels and draft/verify paths for coding agents.",
      link: "https://github.com/peti12352"
    },
    {
      title: "Lilith",
      organization: "BadCompany",
      timespan: "2025 to 2026",
      link: "https://badcompany.xyz",
      description:
        "Agent security on Linux: policy on each tool call (Cedar), enforcement in the kernel (seccomp, Landlock, BPF-LSM, egress rules). Earlier <a href=\"https://github.com/BadC-mpany/lilith-zero\" target=\"_blank\" rel=\"noopener\">Lilith-Zero</a> was MCP middleware in Rust, fail-closed, checked with Kani. Shipped and discontinued; I stopped working on it in 2026.",
      timeline: [
        {
          date: "2025",
          description: "Lilith-Zero, MCP path."
        },
        {
          date: "2026",
          description: "Kernel enforcer + policy engine; write-up on badcompany.xyz."
        }
      ]
    },
    {
      title: "Co-founder",
      organization: "mesh.",
      timespan: "2023 to present",
      link: "https://growmesh.io",
      description: "Builder workspace in Budapest."
    },
    {
      title: "Hardware",
      organization: "Zeto",
      timespan: "2021",
      description: "ECG/EEG signal emulation, C tests on embedded Linux."
    }
  ],
  research: [
    {
      title: "SiOx memristors (thesis)",
      organization: "BME",
      timespan: "2024 to 2026",
      description:
        "MD with a machine-learned potential (LAMMPS, Zongo MTP) on SiOx switching. Compare resistance noise to measurements from the Halbritter group. Filament structure from snapshots, simple 1/f models.",
    },
    {
      title: "3D quantum percolation",
      organization: "personal",
      timespan: "2025",
      description:
        "Transfer-matrix Lyapunov exponents, JAX/CUDA, QR stabilization. Site dilution at E = 3.1t: p<sub>q</sub> = 0.517 ± 0.005 with FSS on M in {10, 12}. Checked Anderson disorder against Slevin & Ohtsuki (ν ≈ 1.62).",
      highlights: [
        "GPU: on-the-fly disorder, JAX Gram-Schmidt"
      ]
    }
  ],
  misc: [
    {
      title: "B.Sc. Physics Engineering",
      organization: "BME",
      timespan: "2023 to 2027",
      description: "Nanotechnology and quantum applications."
    },
    {
      title: "National TDK, physics, 3rd place",
      organization: "Hungary",
      timespan: "2022",
      description: "Astronomical image processing."
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
