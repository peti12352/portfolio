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
  bio: `I'm a physicist. Currently I work on making <em>inference faster</em> at ${a("https://meshapplied.com", "mesh.applied")} (see below for details).

I'm also working on my thesis which is about numerically modelling SiO<sub>x</sub> (silicon oxide) memristors (<em>a resistance that has memory</em>, meaning its resistance depends on applied current or voltage applied in the past; they can be used as units of non volatile memory or even (if arranged in a crossbar array structure) as matrix-vector multiplicator unit exploiting simple Kirchhoff's and Ohm's law) in the ${a("https://nanoelectronics.physics.bme.hu/", "nanojunctions")} group at Budapest University of Technology.

I also co-founded ${a("https://growmesh.io", "mesh.")} in 2023 (builder community and space based in Budapest). Earlier I worked on several projects in high school, including processing of astronomical data (e.g. false coloring Hubble/Webb based images). I also worked at ${a("https://zeto-inc.com", "Zeto.eu")}, where I had to develop testing software and an EEG emulator in C and using a Raspberry 2.`,

  now: [
    {
      title: "mesh.applied",
      meta: "2026 to present",
      link: "https://meshapplied.com",
      body: `We (${a("https://www.linkedin.com/in/matteo-horvath-02273b115/", "Matteo")}, ${a("https://www.linkedin.com/in/janos-mozer/", "Janos")} and me, Petya) make <em>inference faster</em> for specialized tasks (like building GTA7 game engine backends using agents from an imperfect specification, or using agents to design experiments and generate hypotheses in a research lab in experimental physics, etc.). We closed our first deal (we built a cluster and optimized it for local inference). <u>We'll all be in San Francisco for the next 2 months.</u>

We use various techniques (mainly machine learning based, algorithmic, systems engineering) to build an automated framework for the 3 layers of <strong><em>useful</em></strong> inference:

1. the lowest level: quantizations, kernels, computational graph optimizations, KV cache and prefill optimizations, speculative decoding algorithms and drafters, etc.

(a) to make it fit on the wanted hardware if possible while keeping relevant retention high;

(b) to maximize tok/s for the wanted batch size B (concurrency, meaning how many simultaneous users are asking for forward passes) and context/input lengths;

2. scheduling and routing (e.g. task difficulty based LLM or inference time effort choice) to serve users efficiently, minimize dead time, and maximize overlapping processes;

3. the output and harness level, to drastically decrease domain specific time per task.

Additionally we have some experiments and to this date immature prototypes:

1. diffusion based main architectures for building faster hierarchical coding agents;

2. adaptive techniques augmenting the inference engine and the main LLM model for further decreasing time per task post deployment;

3. only very simple prototypes so far: optimizing VLMs and VLAs for fast and scalable feedback when training robotic actions in simulators.`,
    },
    {
      title: "mesh.",
      meta: "co-founder, 2023 to present",
      link: "https://growmesh.io",
      body: `mesh. is a community of builders and hackers in Budapest. I co-founded it in 2023. I mainly work on and lead the research projects here.`,
    },
  ],

  research: [
    {
      title: "Resistive switching in SiOx",
      meta: "B.Sc. thesis, BME, 2024 to 2026",
      body: `My thesis is how a thin SiO<sub>x</sub> film switches resistance when current is applied (what structural change and physical laws explain the change most accurately and predict the empirically measured noise spectrum).

1. resistor-network models for that noise

(a) a static Kirchhoff network on vacancy sites, with trap-assisted tunneling conductances, fitted against empirical noise data

(b) a dynamic layer on the same graph, kinetic Monte Carlo with field-driven vacancy motion and Joule heating, to see which filament configurations actually survive under bias

2. atomistic simulations to supply the geometry

LAMMPS with an ACE interatomic potential (Si-O) to melt-quench amorphous SiO<sub>x</sub> with controlled oxygen deficiency, avoiding the spurious silicon nanowire artifact that older reactive force fields (like ReaxFF) tend to produce

we used the generated vacancy positions from those cells and fed them into the networks in (1)`,
    },
  ],

  work: [
    {
      title: "Lilith",
      meta: "BadCompany, 2025 to 2026",
      link: "https://badcompany.xyz",
      body: `At BadCompany I was responsible for technology, and we built Lilith, a security product for AI agents. If an agent can call tools, it <em>will eventually do things it has access to</em>. Thus we need a way to define these boundaries in a finegrained and seamless (non annoying) way. So we built a robust and scalable solution sitting below the agents.

Lilith has two parts:

1. a policy engine providing an expressive, finegrained and interoperable interface for defining policies for various tools and agent integrations (some properties of the policy can be formally verified by Lilith to be obeyed by it before runtime!);

2. a kernel level policy enforcer which is unbypassable from userspace (where the agents are running), observes all actions, manages secrets and is invisible to the AI agent;

We took inspiration from many products and solutions using kernel extensions (mainly eBPF), like Cilium, and also many userspace solutions.

We are now in a testing phase with the largest bank in Central and Eastern Europe for a full rollout to on the order of 4,000 developers. I led the technology side from the policy language through kernel enforcement and the path to production.`,
    },
    {
      title: "Generative LEGO",
      meta: "2025 -- 2026",
      body: `2025: text or image to a buildable LEGO model (text to image, 3D mesh reconstruction, voxelize, fill with optimal bricks and matched colors). I also trained a YOLO model to detect bricks and built a library to track them.

2026: autoregressive graph-based methods (LLMs) and diffusion-based structure models.`,
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
      body: ``,
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
      body: `Gave a talk on policy engines (and useful properties they need to have) and kernel level enforcement for AI agents.`,
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
      body: `Mainly to make it possible to formalize physics problems in Lean with differential equations which very often have solutions involving transcendental functions (like <code>sin()</code> or <code>cos()</code> for the harmonic oscillator, or the Schrödinger equation with very simple boundary conditions, though those can be written as a complex exponential <code>exp(i*x)</code>, or <code>log()</code> for rocket equations, etc.) or some composition of them.

Lean tactics that prove bounds on <code>exp</code>, <code>log</code>, <code>sin</code> and <code>cos</code> in Mathlib, for goals like <code>a &lt; Real.exp r</code>. They use a Taylor polynomial plus a remainder you can bound (Taylor–Lagrange interval bounds, so the true value sits between two explicit rational numbers). There is an <code>approx</code> tactic and a <code>norm_num</code> extension.

If the tactic closes the goal, the Lean kernel (the small verifier that only accepts valid proof steps) has checked it. I only used exact rational arithmetic (no floating point or <code>native_decide</code> == no untrusted numeric code outside the checker).`,
    },
    {
      title: "Goethe",
      meta: "meshapplied",
      link: "https://github.com/meshapplied/Goethe",
      body: `Our ternary mixture-of-experts runtime for SGLang. It also has our NVFP4 kernels.`,
    },
    {
      title: "lilith-zero",
      meta: "",
      link: "https://github.com/BadC-mpany/lilith-zero",
      body: `The open source, userspace version of Lilith. It's middleware written in pure Rust that checks tool calls against a policy set and enforces them (default fail closed). It's a lightweight and simple solution.`,
    },
    {
      title: "growmesh.io",
      meta: "mesh.",
      link: "https://growmesh.io",
      body: `The website of mesh., a builder community and space in Budapest.`,
    },
  ],
};
