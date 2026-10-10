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
  bio: `I'm a physicist. Right now I work on making inference faster at ${a("https://meshapplied.com", "mesh.applied")}, and on my thesis about silicon oxide memristors in the Halbritter group at BME.

Before this I did some experimental nanophysics, got third place at the national TDK in 2022 with an astronomy image processing project, and tested EEG hardware at Zeto.`,

  now: [
    {
      title: "mesh.applied",
      meta: "2026 to present",
      link: "https://meshapplied.com",
      body: `Matteo, Janos and I run mesh.applied. We speed up inference for one particular task rather than for LLMs in general. We closed our first deal, and the three of us will be in San Francisco for the next two months.

I work on decoding: kernels and speculative drafters, mostly, plus the benchmarks that tell us whether a change did anything.

Latest number. On one RTX 5090, a 27B model in NVFP4 with the DFlash2 drafter generates 239 tokens/s for a single stream. With MTP3 it generates 174. I got these by replaying traces from seven real SWE-agent sessions. Agent traffic has long contexts and a lot of reasoning tokens, so I didn't want to benchmark on chat prompts. Seven sessions is small, so treat it as a result on those traces.`,
    },
    {
      title: "mesh.",
      meta: "co-founder, 2023 to present",
      link: "https://growmesh.io",
      body: `mesh. is a builder and hacker community in Budapest. I co-founded it in 2023 and now look after the research and projects side, which mostly means mentoring.`,
    },
  ],

  research: [
    {
      title: "Resistive switching in SiOx",
      meta: "B.Sc. thesis, BME, 2024 to 2026",
      body: `My thesis is about how a thin film of silicon oxide switches its resistance when you push current through it. There are two competing explanations. In one, the conducting path forms from oxygen vacancies percolating through the oxide. The other is a more filament-like picture. I'm trying to find out which one reproduces the resistance noise measured in the lab.

The simulation is a stack. LAMMPS with a machine-learned potential makes the glass, a resistor network sits on its vacancy sites, and on top of that a kinetic Monte Carlo model grows filaments with Joule heating.

It's early. One result: for one choice of barrier parameters I ran 30 seeds at each of 7 bias levels. Filaments grew at every bias but only survived at low bias. All 30 runs were stable at 0.5 to 1.0 V, and none were at 2.5 V or above. Against the measured noise the model is still off, by roughly as much as the static fit it starts from (R² of 0.53).`,
    },
    {
      title: "Generative LEGO",
      meta: "2025, restarted 2026",
      body: `The goal is text or a photo in, a LEGO model you can build out. It's based on BrickNet (CVPR 2026). I first tried this in 2025 and restarted it this year, with LLM captions and lately diffusion-based generation.

It doesn't work well yet. The best setup is still the stock BrickNet checkpoint with 8 samples per prompt, a judge to pick the best one, and a check for collisions and loose bricks. I once reported a fine-tuned model as better, then re-checked and retracted it. Nothing tests yet whether a result would stand up under gravity. The details are in the research log.`,
    },
  ],

  work: [
    {
      title: "Lilith",
      meta: "BadCompany, CTO, 2025 to 2026",
      link: "https://badcompany.xyz",
      body: `At BadCompany I was CTO and we built Lilith, a security product for AI agents. The trouble with agents that call tools is that someone can talk them into things you never wanted, and a check inside the agent doesn't help much, because the agent is what's being attacked. So we put the rules outside it. Each tool call was checked against a Cedar policy, and on Linux the kernel enforced the same policy, so even a compromised agent couldn't open files or reach hosts it wasn't allowed to. We delivered it over 2025 and 2026 and wrote it up on ${a("https://badcompany.xyz", "badcompany.xyz")}. It's finished.`,
    },
    {
      title: "Zeto",
      meta: "2021",
      body: `I built test rigs for medical EEG and ECG hardware, with automated tests in C on embedded Linux.`,
    },
  ],

  writing: [
    {
      title: "Deterministic agent security at ms-scale: Lilith-Zero",
      meta: "Medium",
      link: "https://medium.com/@peter_48867/deterministic-agent-security-at-ms-scale-lilith-zero-ab6bff4c3ff0",
      body: `About lilith-zero: how it checks MCP tool calls, and why it denies by default when something goes wrong.`,
    },
    {
      title: "Goethe README",
      meta: "GitHub",
      link: "https://github.com/meshapplied/Goethe#readme",
      body: `Design notes for our ternary mixture-of-experts runtime.`,
    },
  ],

  talks: [
    {
      title: "Claude Code for Security",
      meta: "Claude Community Budapest, May 2026",
      link: "https://luma.com/1dyc02te",
      body: `On policy engines and kernel enforcement for AI agents.`,
    },
  ],

  code: [
    {
      title: "gpu-waterz",
      meta: "CUDA",
      link: "https://github.com/peti12352/gpu-waterz",
      body: `waterz turns a network's predicted affinities into labelled cells for connectomics. This is a GPU version of it. I wanted three things: big volumes that fit on a 24 GB 3090, speed, and a CPU alternative. On a 5090 it handles a 2.16 billion voxel volume in 3.1 seconds, with segmentation quality (VOI) within 0.02 of stock waterz. The merging is a parallel approximation of the sequential algorithm.

The hard part was getting the same answer twice. Regions get merged by the mean affinity along their shared boundary, and I was summing those with float atomic adds. Float addition isn't associative and the GPU adds in whatever order threads arrive, so two identical runs disagreed on about 740,000 of 7.5 million edges. That flips merge decisions and changes the labels. Switching to fixed-point integer accumulation fixed it. Integer addition doesn't care about order, so the output is now byte-identical on every run.`,
    },
    {
      title: "lean-interval-bounds",
      meta: "Lean 4",
      link: "https://github.com/peti12352/lean-interval-bounds",
      body: `Tactics for proving bounds on exp, log, sin and cos in Lean 4 with Mathlib: an <code>approx</code> tactic and a <code>norm_num</code> extension. The Lean kernel checks every proof, so no floating point is trusted.`,
    },
    {
      title: "Goethe",
      meta: "meshapplied",
      link: "https://github.com/meshapplied/Goethe",
      body: `Our ternary mixture-of-experts runtime for SGLang. The NVFP4 kernels live there too.`,
    },
    {
      title: "lilith-zero",
      meta: "BadCompany, Rust",
      link: "https://github.com/BadC-mpany/lilith-zero",
      body: `The open source, userspace version of Lilith. It's Rust middleware that checks MCP tool calls against a policy and denies by default when something goes wrong. It's lighter than the kernel product.`,
    },
    {
      title: "growmesh.io",
      meta: "mesh.",
      link: "https://growmesh.io",
      body: `The website of mesh., the Budapest builder community.`,
    },
  ],
};
