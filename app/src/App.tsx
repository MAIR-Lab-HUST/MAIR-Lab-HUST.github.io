import { Button } from "@/components/ui/button"

const videoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4"

const navLinks = [
  { label: "Research", href: "#research" },
  { label: "Open Source", href: "#open-source" },
  { label: "Vision", href: "#vision" },
  { label: "Join Us", href: "#join" },
]

const researchVectors = [
  {
    title: "Multimodal Large Language Models",
    description:
      "Building foundation models that perceive, reason, generate, and interact across language, vision, and structured worlds.",
  },
  {
    title: "Unified Understanding & Generation",
    description:
      "Bridging perception, content creation, reasoning, and decision-making into one continuous intelligence loop.",
  },
  {
    title: "Controllable Multimodal Generation",
    description:
      "Developing reliable, human-aligned generation methods for images, videos, and other high-dimensional modalities.",
  },
  {
    title: "World Models & AI for Science",
    description:
      "Modeling, predicting, and intervening in physical and digital systems to accelerate discovery and real-world impact.",
  },
]

const projects = [
  {
    name: "TMPO",
    description:
      "Trajectory Matching Policy Optimization for diverse and efficient diffusion alignment.",
    href: "/TMPO/",
    meta: "Diffusion alignment",
  },
  {
    name: "SciIR",
    description:
      "A large-scale training dataset and benchmark for scientific image reasoning generation.",
    href: "https://github.com/MAIR-Lab-HUST/SciIR",
    meta: "Scientific reasoning",
  },
  {
    name: "MAIR Lab GitHub",
    description:
      "Research projects, open-source codebases, datasets, demos, and reproducible resources.",
    href: "https://github.com/MAIR-Lab-HUST",
    meta: "Open research",
  },
]

const values = [
  "Research curiosity",
  "Long-term commitment",
  "Solid engineering",
  "Independent thinking",
]

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      <header className="relative z-10 px-5 py-5 sm:px-8 sm:py-6">
        <nav className="liquid-glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 sm:px-6">
          <a
            href="#"
            className="text-2xl tracking-tight text-foreground sm:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            aria-label="MAIR Lab homepage"
          >
            MAIR Lab<span className="text-muted-foreground"> @ HUST</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Button
            asChild
            variant="ghost"
            className="h-auto rounded-full border border-white/15 px-5 py-2.5 text-sm text-foreground transition-transform duration-300 hover:scale-[1.03] hover:bg-white/10 hover:text-foreground"
          >
            <a href="mailto:mzyth@hust.edu.cn">Contact</a>
          </Button>
        </nav>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col justify-center px-6 py-16 sm:px-8 lg:py-20">
        <div className="max-w-6xl">
          <p className="animate-fade-rise text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Multimodal Artificial Intelligence Research Lab
          </p>
          <h1
            className="animate-fade-rise-delay mt-6 max-w-6xl text-5xl font-normal leading-[0.95] tracking-[-1.2px] sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Engineering the next frontier of{" "}
            <em className="not-italic text-muted-foreground">
              multimodal intelligence.
            </em>
          </h1>
          <p className="animate-fade-rise-delay-2 mt-7 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            At MAIR Lab, we build multimodal systems that move from perception
            to generation, from reasoning to action, and from isolated models to
            intelligent agents that can understand and shape complex worlds.
          </p>

          <div className="animate-fade-rise-delay-2 mt-11 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              variant="ghost"
              className="liquid-glass h-auto rounded-full px-8 py-4 text-base text-foreground transition-transform duration-300 hover:scale-[1.03] hover:bg-transparent hover:text-foreground"
            >
              <a href="#research">Explore Research</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-auto rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base text-foreground transition-transform duration-300 hover:scale-[1.03] hover:bg-white/10 hover:text-foreground"
            >
              <a href="https://github.com/MAIR-Lab-HUST">View GitHub</a>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className="metric-panel">
            <span>Led by</span>
            <strong>Prof. Zhiyuan Ma</strong>
          </div>
          <div className="metric-panel">
            <span>Base</span>
            <strong>HUST · CS</strong>
          </div>
          <div className="metric-panel">
            <span>Focus</span>
            <strong>MLLM · World Models</strong>
          </div>
        </div>
      </section>

      <section
        id="research"
        className="relative z-10 border-t border-white/10 bg-background/72 px-6 py-24 backdrop-blur-md sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-kicker">Research Vectors</p>
              <h2
                className="mt-4 text-4xl font-normal leading-tight tracking-tight sm:text-6xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                From perception to generation, from models to worlds.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {researchVectors.map((item) => (
                <article key={item.title} className="research-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="open-source"
        className="relative z-10 border-t border-white/10 bg-background/84 px-6 py-24 backdrop-blur-lg sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">Open Source</p>
              <h2
                className="mt-4 text-4xl font-normal leading-tight tracking-tight sm:text-6xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Code, datasets, demos, and systems built in the open.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              We treat reproducible research as infrastructure: every released
              project should make the next experiment easier to understand,
              evaluate, and extend.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <a key={project.name} href={project.href} className="project-card">
                <span>{project.meta}</span>
                <strong>{project.name}</strong>
                <p>{project.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="vision"
        className="relative z-10 border-t border-white/10 bg-background/76 px-6 py-24 backdrop-blur-md sm:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="section-kicker">Our Vision</p>
            <h2
              className="mt-4 text-4xl font-normal leading-tight tracking-tight sm:text-6xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Intelligence should not stop at seeing or saying. It should
              understand, create, reason, and intervene.
            </h2>
          </div>
          <div className="vision-panel">
            <p>
              We push multimodal AI toward systems that can operate across
              structured knowledge, controllable media, scientific discovery,
              and dynamic worlds. The lab's long arc is simple: uncover the
              core capabilities and boundaries of next-generation intelligence.
            </p>
          </div>
        </div>
      </section>

      <section
        id="join"
        className="relative z-10 border-t border-white/10 bg-background px-6 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="join-panel">
            <div>
              <p className="section-kicker">Join MAIR</p>
              <h2
                className="mt-4 text-4xl font-normal leading-tight tracking-tight sm:text-6xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Bring hard problems. Build with discipline. Stay curious.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                We welcome students and collaborators interested in multimodal
                AI, foundation models, generative models, world models, agents,
                and AI for Science.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {values.map((value) => (
                  <div key={value} className="value-chip">
                    {value}
                  </div>
                ))}
              </div>
              <Button
                asChild
                variant="ghost"
                className="liquid-glass h-auto w-fit rounded-full px-8 py-4 text-base text-foreground transition-transform duration-300 hover:scale-[1.03] hover:bg-transparent hover:text-foreground"
              >
                <a href="mailto:mzyth@hust.edu.cn">Email Prof. Zhiyuan Ma</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
