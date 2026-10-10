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
  bio: `I'm a physicist. I work on making inference faster at ${a("https://meshapplied.com", "mesh.applied")}. My thesis is on silicon oxide memristors, in the Halbritter group at BME.

Before this I did some experimental nanophysics, and in 2022 I got third place at the national TDK with an image processing project for astronomy.`,

  now: [
    {
      title: "mesh.applied",
      meta: "2026 to present",
      link: "https://meshapplied.com",
      body: `There are three of us: Matteo, Janos and me. We make inference faster for one specific task at a time, not for LLMs in general. We closed our first deal, and we'll all be in San Francisco for the next two months.

I write inference kernels and speculative drafters.

On one RTX 5090, a 27B model in NVFP4 with the DFlash2 drafter runs at 239 tokens/s for a single stream. With MTP3 it's 174. I measured both by replaying traces from seven real SWE-agent sessions, because agents use long contexts and spend a lot of tokens on reasoning, and chat prompts don't look like that. Seven sessions isn't many, so it's a result on those traces and nothing more.`,
    },
    {
      title: "mesh.",
      meta: "co-founder, 2023 to present",
      link: "https://growmesh.io",
      body: `mesh. is a community of builders and hackers in Budapest. I co-founded it in 2023. Now I run the research and projects side and mentor people.`,
    },
  ],

  research: [
    {
      title: "Resistive switching in SiOx",
      meta: "B.Sc. thesis, BME, 2024 to 2026",
      body: `My thesis is on how a thin film of silicon oxide switches its resistance when current goes through it. I'm comparing two explanations against the noise we measure in the lab. In one, the conducting path forms from oxygen vacancies percolating through the oxide. In the other it's a more filament-like picture.

To simulate it I use LAMMPS with a machine-learned potential to make the glass, put a resistor network on its vacancy sites, and run a kinetic Monte Carlo model on top that grows filaments with Joule heating.

It's early. For one choice of barrier parameters I ran 30 seeds at each of 7 bias levels. Filaments grew at every bias, but they only survived at low bias: all 30 runs were stable at 0.5 to 1.0 V and none were at 2.5 V or above. The noise is still off compared to the lab data, about as much as in the simpler static fit I started from (R² of 0.53).`,
    },
    {
      title: "Generative LEGO",
      meta: "2025, restarted 2026",
      body: `I want to give it a sentence or a photo and get back a LEGO model I can build. It's based on BrickNet (CVPR 2026). I tried this in 2025 and started again this year, with LLM captions and lately diffusion-based generation.

It doesn't work well yet. The best setup is still stock BrickNet with 8 samples per prompt, a judge to pick the best one, and a check for collisions and loose bricks. I once reported a fine-tuned model as better, then re-checked it and took the claim back. And nothing checks yet whether a result would stand up under gravity.`,
    },
  ],

  work: [
    {
      title: "Lilith",
      meta: "BadCompany, 2025 to 2026",
      link: "https://badcompany.xyz",
      body: `At BadCompany I was responsible for technology, and we built Lilith, a security product for AI agents. If an agent can call tools, someone can talk it into doing things you never wanted. Checking inside the agent doesn't help much, because the agent is what's under attack. So the rules sit outside it. Every tool call was checked against a Cedar policy, and on Linux the kernel enforced the same policy, so even a compromised agent couldn't open files or reach hosts it wasn't allowed to. We delivered it, and the project is finished now.`,
    },
    {
      title: "Zeto",
      meta: "2021",
      body: `At Zeto I built test rigs for medical EEG and ECG hardware, with automated tests in C on embedded Linux.`,
    },
  ],

  writing: [
    {
      title: "Deterministic agent security at ms-scale: Lilith-Zero",
      meta: "Medium",
      link: "https://medium.com/@peter_48867/deterministic-agent-security-at-ms-scale-lilith-zero-ab6bff4c3ff0",
      body: `How lilith-zero checks MCP tool calls, and why it blocks by default when something goes wrong.`,
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
      body: `About policy engines and kernel enforcement for AI agents.`,
    },
  ],

  code: [
    {
      title: "gpu-waterz",
      meta: "CUDA",
      link: "https://github.com/peti12352/gpu-waterz",
      body: `waterz turns the affinities a neural network predicts into labelled cells, for connectomics. This is a GPU version. I wanted it to fit big volumes on a 24 GB 3090, to be fast, and to have a CPU alternative too. On a 5090 it does a 2.16 billion voxel volume in 3.1 seconds, and the segmentation quality (VOI) is within 0.02 of stock waterz. The merging is a parallel approximation of the sequential algorithm, not an exact port.

The hardest part was getting the same result twice. Regions get merged by the mean affinity along their shared boundary, and I was summing those with float atomic adds. Float addition isn't associative and the GPU adds in whatever order threads arrive, so two identical runs disagreed on about 740,000 of 7.5 million edges. That flips merge decisions, which changes the labels. Fixed-point integer accumulation fixed it, because integer addition doesn't care about order. Now the output is byte-identical on every run.`,
    },
    {
      title: "lean-interval-bounds",
      meta: "Lean 4",
      link: "https://github.com/peti12352/lean-interval-bounds",
      body: `Lean 4 tactics that prove bounds on exp, log, sin and cos in Mathlib. There's an <code>approx</code> tactic and a <code>norm_num</code> extension. The Lean kernel checks every proof, so you don't have to trust any floating point.`,
    },
    {
      title: "Goethe",
      meta: "meshapplied",
      link: "https://github.com/meshapplied/Goethe",
      body: `Our ternary mixture-of-experts runtime for SGLang. It also has our NVFP4 kernels.`,
    },
    {
      title: "lilith-zero",
      meta: "BadCompany, Rust",
      link: "https://github.com/BadC-mpany/lilith-zero",
      body: `The open source, userspace version of Lilith. It's Rust middleware that checks MCP tool calls against a policy and blocks them by default if something goes wrong. Much lighter than the kernel version.`,
    },
    {
      title: "growmesh.io",
      meta: "mesh.",
      link: "https://growmesh.io",
      body: `The website of mesh., the builder community in Budapest.`,
    },
  ],
};
