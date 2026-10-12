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
      meta: "",
      link: "https://github.com/meshapplied/Goethe#readme",
      body: `The design notes for our ternary mixture-of-experts runtime.`,
    },
  ],

  talks: [
    {
      title: "Talk at Claude Security",
      meta: "Anthropic Claude Community Budapest, May 2026",
      link: "https://luma.com/1dyc02te",
      body: `Gave a talk on policy engines (and useful properties they need to have) and kernel level enforcement for AI agents.`,
    },
  ],

  code: [
    {
      title: "gpu-waterz",
      meta: "",
      link: "https://github.com/peti12352/gpu-waterz",
      body: `Connectomics pipelines consist of:

1. inference on EM volumes (electron-microscopy image stacks of tissue, e.g. brain at nanoscale resolution): a CNN predicts <em>affinities</em> on voxel faces (how likely (==probability of) two neighboring voxels being the same cell);

2. segmentation (decode affinities to labels): watershed to form superpixels, then merge neighbors while mean affinity on the shared boundary stays above a threshold, so every voxel gets an integer segment ID (which cell or fragment it belongs to).

Usually the second step is done by the algorithms (mainly watershed) implemented in the ${a("https://github.com/funkey/waterz", "waterz")} library (CPU based). gpu-waterz is step 2 on GPU: CUDA watershed and contact-mean agglomeration, numpy and torch API; it is not a CPU fallback product.

Watershed, in one sentence intuitively: each voxel “rolls” to whichever neighbor is most strongly predicted to be the same cell, and keeps going until it lands in a small basin; you end up with a huge number of tiny fragments, not finished neurons. More precisely, on the voxel grid you have an affinity on every face between neighbors; watershed builds a directed forest by sending each voxel along the highest-affinity outgoing face (greedy ascent on that field) until you hit a cycle or a local plateau. All voxels that drain to the same attractor share one seed label. Weak faces act as dams. That oversegmentation is deliberate: the later merge step is what fuses those seeds into segments that match the biology.

${a("https://cremi.org/", "CREMI")} is the standard MICCAI benchmark for neuron segmentation from EM: public volumes with expert ground-truth labels. I benchmark on sample A (validation crop), tiled to 2.16 billion voxels at affinity threshold 0.3. Quality is measured with <em>VOI</em> (variation of information), an information-theoretic distance between two segmentations (lower is better). It splits into a <em>split</em> term (extra fragments vs ground truth) and a <em>merge</em> term (distinct cells wrongly fused); connectomics papers usually report both. On 1× RTX 5090 the full gpu-waterz decode is about <strong>3.1 s</strong> (affinities already in VRAM). Stock <code>waterz.agglomerate</code> on the same HDF5 is about <strong>9.4 min</strong> on the CPU, roughly <strong>180×</strong> wall clock on the same machine. Split and merge VOI match stock waterz on that CREMI-A setup (fragment IDs do not need to match).

The slow part of waterz is not the watershed. Step 2 is a priority queue on region-graph edges: take the pair with the highest contact-mean affinity on their shared face, merge them, recompute every neighbor mean on the contracted graph, repeat. That loop is serial; one GPU thread per pop still waits on the last update. Many GPU segmenters dodge that by freezing the original voxel edges and never refreshing means after a merge (Kruskal / mutex / GASP-style pipelines). They can be fast, but they are not the same objective as waterz, and on the same CREMI-A crop they do not reach the split/merge VOI that stock waterz gets.

I kept waterz’s contact-mean statistic and thresholding, but not the heap order. Instead merges use ${a("https://papers.nips.cc/paper_files/paper/2022/file/909de96145d97514b143dfde03e6cd2b-Paper-Conference.pdf", "ParHAC")} (Parallel Hierarchical Agglomerative Clustering, NeurIPS 2022): a parallel substitute for “always merge the current best edge.” Each round builds a <em>matching</em> on the region graph, a set of edges with no shared fragment, so those unions cannot conflict. An edge is eligible if it is <em>(1+ε)-heavy</em>: its contact-mean is within a factor (1+ε) of the strongest edge still incident on each endpoint (the serial heap would only take the global max one edge at a time). All matched pairs merge in parallel; then contact-means are recomputed on the contracted graph, same as after one heap step, and the next round starts. Small ε ≈ fewer, safer parallel merges; large ε ≈ more throughput but you may fuse pairs the heap would not have touched yet, and merge mistakes tend to hurt more than leaving an extra split. The ε used in the repo still matches stock waterz on CREMI-A split/merge VOI (fragment IDs need not match). Float <code>atomicAdd</code> on face sums once made identical affinities give different labels run to run; integer accumulation fixed that so reruns are byte-identical.`,
    },
    {
      title: "lean-interval-bounds",
      meta: "",
      link: "https://github.com/peti12352/lean-interval-bounds",
      body: `Mainly to make it possible to formalize physics problems in Lean with differential equations which very often have solutions involving transcendental functions (like <code>sin()</code> or <code>cos()</code> for the harmonic oscillator, or the Schrödinger equation with very simple boundary conditions, though those can be written as a complex exponential <code>exp(i*x)</code>, or <code>log()</code> for rocket equations, etc.) or some composition of them.

Lean tactics that prove bounds on <code>exp</code>, <code>log</code>, <code>sin</code> and <code>cos</code> in Mathlib, for goals like <code>a &lt; Real.exp r</code>. They use a Taylor polynomial plus a remainder you can bound (Taylor–Lagrange interval bounds, so the true value sits between two explicit rational numbers). There is an <code>approx</code> tactic and a <code>norm_num</code> extension.

If the tactic closes the goal, the Lean kernel (the small verifier that only accepts valid proof steps) has checked it. I only used exact rational arithmetic (no floating point or <code>native_decide</code> == no untrusted numeric code outside the checker).`,
    },
    {
      title: "Goethe",
      meta: "",
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
