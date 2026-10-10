import { SiteContent } from '../types/content';

const a = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

export const content: SiteContent = {
  name: "Peter Tallosy",
  intro: "Physicist and research engineer, Budapest.",
  photo: "assets/profile-cv.jpg",
  githubUser: "peti12352",
  social: {
    github: "https://github.com/peti12352",
    linkedin: "https://www.linkedin.com/in/peter-tallosy/",
    email: "peter@tallosy.hu",
  },
  bio: `I am a physicist by training: B.Sc. in physics engineering at BME, finishing in 2027. These days I am also a research engineer. I work on ${a("https://meshapplied.com", "mesh.applied")}, where we make inference faster for specific tasks, and my thesis is on silicon oxide memristors in the Halbritter group.

Earlier I did experimental nanophysics, took third place at the national TDK in physics (2022, image processing for astronomy), and built test rigs for medical EEG hardware at Zeto.`,

  now: [
    {
      title: "mesh.applied",
      meta: "2026 to present",
      link: "https://meshapplied.com",
      body: `mesh.applied is three of us: Matteo, Janos and me. We make inference faster for one task or domain at a time instead of for models in general. We closed our first deal, and the team will be in San Francisco for the next two months.

My part is the decode path: kernels, speculative drafters, and the benchmarks that tell us whether a change actually helped.

The number I trust most right now: a 27B model in NVFP4 with the DFlash2 drafter decodes at 239 tokens/s for a single stream on one RTX 5090. The same model with MTP3 gets 174. I measured this by replaying traces from seven real SWE-agent sessions, because agent traffic is long contexts and a lot of hidden reasoning, and drafters behave differently there than on chat prompts. Seven sessions is a small sample, so read it as a result on those traces and not as a general claim.`,
    },
    {
      title: "mesh.",
      meta: "co-founder, 2023 to present",
      link: "https://growmesh.io",
      body: `mesh. is a community of builders and hackers in Budapest. I co-founded it in 2023. Today I run the research and projects side of it, which mostly means mentoring people.`,
    },
  ],

  research: [
    {
      title: "Resistive switching in SiOx",
      meta: "B.Sc. thesis, BME, 2024 to 2026",
      body: `My thesis in the Halbritter group is about how a thin silicon oxide film changes its resistance when you push current through it. I am testing one picture, where conducting paths come from oxygen vacancies percolating through the oxide, against a more filament-like one, and comparing both with the resistance noise measured in the lab.

The simulation chain starts with a melt-quenched glass in LAMMPS with a machine-learned potential. On top of that sits a resistor network on the vacancy sites, and on top of that a kinetic Monte Carlo model of filament growth with Joule heating.

It is still early. One result so far: for one choice of barrier parameters I ran 30 seeds at each of 7 bias levels. Filaments grew at every bias, but only the low-bias ones survived. At 0.5 to 1.0 V all 30 runs ended with a stable filament, and at 2.5 V and above none did. The model does not match the measured noise well yet. It is off by about as much as the simpler static fit it was built from (R² of 0.53), so that gap is not new.`,
    },
    {
      title: "Generative LEGO",
      meta: "2025, restarted 2026",
      body: `Text or a photo in, a buildable LEGO model out: parts list, structure, instructions. It builds on BrickNet from CVPR 2026. I first tried this in 2025 and restarted it this year, with LLM-generated captions and, in the last few weeks, diffusion-style generation.

The results are not good yet. The best recipe is still the unmodified BrickNet checkpoint with best-of-8 sampling, a judge that picks between candidates, and a physical-validity check. A fine-tuned model I had reported as better did not survive a re-check, so I retracted it. Nothing in the pipeline yet checks whether a generated model would stand up under gravity. The research log has every number and every mistake.`,
    },
  ],

  work: [
    {
      title: "Lilith",
      meta: "BadCompany, CTO, 2025 to 2026",
      link: "https://badcompany.xyz",
      body: `Lilith was a security layer for AI agents. An agent that can call tools can be talked into things you did not intend, and checking inside the agent does not help, because the agent is the thing under attack. So the rules lived outside it. Every tool call was checked against a policy written in Cedar, and on Linux the same policy was enforced in the kernel, so a compromised agent still could not open files or reach hosts it was not allowed to. We delivered it in 2025 and 2026, wrote it up on ${a("https://badcompany.xyz", "badcompany.xyz")}, and the project is finished.`,
    },
    {
      title: "Test engineering",
      meta: "Zeto, 2021",
      body: `Test rigs for medical EEG and ECG hardware: signal paths, timing, and automated tests in C on embedded Linux.`,
    },
  ],

  writing: [
    {
      title: "Deterministic agent security at ms-scale: Lilith-Zero",
      meta: "Medium",
      link: "https://medium.com/@peter_48867/deterministic-agent-security-at-ms-scale-lilith-zero-ab6bff4c3ff0",
      body: `How the open source version checks every MCP tool call, and why it fails closed.`,
    },
    {
      title: "Goethe README",
      meta: "GitHub",
      link: "https://github.com/meshapplied/Goethe#readme",
      body: `The design notes for our ternary mixture-of-experts runtime.`,
    },
  ],

  talks: [
    {
      title: "Claude Code for Security",
      meta: "Claude Community Budapest, May 2026",
      link: "https://luma.com/1dyc02te",
      body: `Policy engines and kernel-level enforcement for AI agents.`,
    },
  ],

  code: [
    {
      title: "gpu-waterz",
      meta: "CUDA",
      link: "https://github.com/peti12352/gpu-waterz",
      body: `A GPU version of waterz, the tool connectomics pipelines use to turn predicted affinities into labelled cells. I built it so that large volumes fit on a 24 GB 3090, then made it fast, and I wanted a CPU alternative as well. On a 5090 it segments a 2.16 billion voxel volume in 3.1 seconds, with segmentation quality (VOI) within 0.02 of stock waterz. Merging is a parallel approximation of the sequential algorithm.

The hardest part was getting the same answer twice. Agglomeration merges regions by the mean of the affinities on their shared boundary, and I summed those with float atomic adds. Float addition is not associative and the GPU adds in whatever order threads arrive, so two identical runs disagreed on about 740,000 of 7.5 million edges, which flips merge decisions and changes the labels. I switched to fixed-point integer accumulation. Integer addition does not care about order, and now the output is byte-identical from run to run.`,
    },
    {
      title: "lean-interval-bounds",
      meta: "Lean 4",
      link: "https://github.com/peti12352/lean-interval-bounds",
      body: `Tactics that prove bounds on exp, log, sin and cos in Lean 4 with Mathlib. There is an <code>approx</code> tactic and a <code>norm_num</code> extension, and every result is checked by the Lean kernel, so you do not have to trust any floating point.`,
    },
    {
      title: "Goethe",
      meta: "meshapplied",
      link: "https://github.com/meshapplied/Goethe",
      body: `A ternary mixture-of-experts runtime for SGLang. It also holds our NVFP4 kernels.`,
    },
    {
      title: "lilith-zero",
      meta: "BadCompany, Rust",
      link: "https://github.com/BadC-mpany/lilith-zero",
      body: `The open source, userspace version of Lilith. It is Rust middleware that checks MCP tool calls against a policy and fails closed when anything is off. It is lighter than the kernel-level product and runs entirely in userspace.`,
    },
    {
      title: "growmesh.io",
      meta: "mesh.",
      link: "https://growmesh.io",
      body: `The site of the Budapest builder community.`,
    },
  ],
};
