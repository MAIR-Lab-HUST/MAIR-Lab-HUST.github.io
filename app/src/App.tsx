import { EnvelopeSimple, GithubLogo } from "@phosphor-icons/react"
import { motion } from "motion/react"
import hustLogoUrl from "@/assets/HUST_logo.png"
import mairLogoUrl from "@/assets/MAIR_logo.png"
import specImageUrl from "@/assets/signature-spine-spec.jpg"
import videoUrl from "@/assets/track-video.mp4"
import i2eParadigmUrl from "@/assets/work/i2e-paradigm.png"
import sciirDatasetUrl from "@/assets/work/sciir-dataset.png"
import sciirOverviewUrl from "@/assets/work/sciir-overview.png"
import tmpoComparisonUrl from "@/assets/work/tmpo-comparison.png"
import tmpoDemoUrl from "@/assets/work/tmpo-demo.png"

const navLinks = [
  { label: "Research", href: "#research" },
  { label: "Join Us", href: "#join" },
  { label: "Publications", href: "#publications" },
]

const newsItems = [
  {
    type: "News:",
    title: "SciIR Accepted to ECCV 2026",
    date: "June 2026",
    href: "https://github.com/MAIR-Lab-HUST/SciIR",
  },
  {
    type: "News:",
    title: "TMPO Preprint Released",
    date: "May 2026",
    href: "https://arxiv.org/abs/2605.10983",
  },
  {
    type: "News:",
    title: "I2E Released: From Image Pixels to Actionable Interactive Environments",
    date: "January 2026",
    href: "https://arxiv.org/abs/2601.03741",
  },
]

const researchAreas = [
  {
    title: "Multimodal Generation",
    description:
      "Building generative models that connect language, vision, and structured reasoning across diverse creative tasks.",
    image: tmpoDemoUrl,
    imageAlt: "A grid of diverse text-to-image generations from TMPO",
  },
  {
    title: "Interactive Environments",
    description:
      "Turning visual content into actionable worlds that agents can understand, edit, and interact with.",
    image: i2eParadigmUrl,
    imageAlt: "I2E image-to-environment paradigm",
  },
  {
    title: "Diffusion Alignment",
    description:
      "Aligning diffusion models with human intent while preserving diversity, efficiency, and reliable generation quality.",
    image: tmpoComparisonUrl,
    imageAlt: "TMPO comparison of diffusion alignment methods",
  },
  {
    title: "Scientific Visual Intelligence",
    description:
      "Developing models that restore, interpret, and reason over scientific figures without losing their semantic meaning.",
    image: sciirDatasetUrl,
    imageAlt: "SciIR scientific image restoration data construction pipeline",
  },
]

const publications = [
  {
    badge: "Paper · ECCV 2026",
    date: "June 2026",
    title: "SciIR: Towards Scientific Image Restoration",
    authors:
      "Zhiyuan Ma, Zhengfeng Shi, Yuning An, Peize Li, Jiabao Wei, Ruijie Li, Junhao Xiao, Jianjun Li, Bowen Zhou",
    description:
      "A unified study of scientific image restoration spanning data, evaluation, and reasoning-aware models for figures whose correctness matters as much as visual quality.",
    image: sciirOverviewUrl,
    imageAlt: "Overview of the SciIR dataset, benchmark, and scientific image restoration task",
    imageHref: "https://sci-ir.vercel.app/sciir.html",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2606.30124" },
      { label: "Code", href: "https://github.com/MAIR-Lab-HUST/SciIR" },
      { label: "Project", href: "https://sci-ir.vercel.app/sciir.html" },
    ],
  },
  {
    badge: "Paper · Preprint 2026",
    date: "May 2026",
    title: "TMPO: Trajectory Matching Policy Optimization for Diverse and Efficient Diffusion Alignment",
    authors:
      "Jiaming Li, Chenyu Zhu, Nanxi Yi, Youjun Bao, Li Sun, Quanying Lv, Xiang Fang, Daizong Liu, Jianjun Li, Kun He, Bowen Zhou, Zhiyuan Ma",
    description:
      "TMPO aligns diffusion trajectories at the distribution level, improving sample diversity while reducing the training cost of reward-guided generation.",
    image: tmpoComparisonUrl,
    imageAlt: "Comparison of diffusion alignment methods and their generated image diversity",
    imageHref: "https://arxiv.org/abs/2605.10983",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2605.10983" },
      { label: "Code", href: "https://github.com/MAIR-Lab-HUST/TMPO" },
      { label: "Project", href: "https://mair-lab-hust.github.io/TMPO/" },
    ],
  },
  {
    badge: "Paper · ACL 2026",
    date: "January 2026",
    title: "I2E: From Image Pixels to Actionable Interactive Environments for Text-Guided Image Editing",
    authors:
      "Jinghan Yu, Junhao Xiao, Chenyu Zhu, Jiaming Li, Jia Li, Hanming Deng, Xirui Wang, Guoli Jia, Jianjun Li, Zhiyuan Ma, Xiang Bai, Bowen Zhou",
    description:
      "A Decompose-then-Action framework that turns edited pixels into structured, physics-aware environments that remain interactive after generation.",
    image: i2eParadigmUrl,
    imageAlt: "I2E paradigm comparing pixel redraws with structured interactive environment editing",
    imageHref: "https://image2env.github.io/",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2601.03741" },
      { label: "Project", href: "https://image2env.github.io/" },
      { label: "ACL", href: "https://aclanthology.org/2026.acl-long.2076/" },
    ],
  },
]

function SpecCrop({ className, label }: { className: string; label: string }) {
  return (
    <div className={`spec-crop ${className}`} role="img" aria-label={label}>
      <img src={specImageUrl} alt="" aria-hidden="true" />
    </div>
  )
}

function App() {
  return (
    <div className="latest-page text-black">
      <header className="px-3 pt-2 sm:px-6 sm:pt-5">
        <nav className="latest-nav mx-auto flex items-center justify-between rounded-full border border-black/10 px-[10px]">
          <a
            href="#"
            className="latest-brand leading-none text-black no-underline"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            aria-label="MAIR Lab homepage"
          >
            MAIR Lab @ HUST
          </a>

          <div className="hidden items-center gap-[18px] sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="latest-nav-link text-black no-underline transition-opacity duration-200 hover:opacity-55"
              >
                {link.label}
              </a>
            ))}
          </div>

          <motion.a
            href="mailto:mzyth@hust.edu.cn"
            className="latest-contact flex items-center justify-center rounded-full border border-black/10 font-medium text-black no-underline"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Contact
          </motion.a>
        </nav>
      </header>

      <main>
        <section className="latest-hero flex flex-col items-center text-center" aria-labelledby="hero-title">
          <div className="latest-lockup flex items-center justify-center">
            <img
              src={mairLogoUrl}
              alt="MAIR Lab geometric mark"
              className="latest-mair-logo object-contain"
            />
            <span className="latest-logo-rule w-px shrink-0 bg-black/25" aria-hidden="true" />
            <img
              src={hustLogoUrl}
              alt="Huazhong University of Science and Technology emblem"
              className="latest-hust-logo object-contain"
            />
          </div>

          <p className="latest-kicker font-semibold uppercase text-black/95">
            Multimodal Artificial Intelligence Research Lab
          </p>

          <h1
            id="hero-title"
            className="latest-title font-normal text-black"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span className="block">Engineering the next frontier of</span>
            <span className="block">multimodal intelligence.</span>
          </h1>

          <p className="latest-intro font-normal text-black">
            <span className="block">
              At MAIR Lab, we build multimodal systems that move from perception to generation,
            </span>
            <span className="block">
              from reasoning to action, and from isolated models to intelligent agents that can
            </span>
            <span className="block">understand and shape complex worlds.</span>
          </p>

          <SpecCrop className="latest-signature-crop" label="MAIR handwritten signature" />

          <div className="latest-video relative shrink-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onCanPlay={(event) => {
                void event.currentTarget.play().catch(() => undefined)
              }}
              className="absolute inset-0 h-full w-full object-cover object-bottom"
              aria-hidden="true"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="latest-video-fade pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        <section className="latest-shell" aria-labelledby="news-heading">
          <h2 id="news-heading" className="latest-heading font-semibold uppercase">
            News
          </h2>
          <div>
            {newsItems.map((item) => (
              <div key={item.title} className="latest-row grid items-center">
                <span className="latest-row-type font-medium">{item.type}</span>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="latest-row-title truncate font-medium no-underline transition-opacity duration-200 hover:opacity-60"
                >
                  {item.title}
                </a>
                <time className="latest-row-date text-right font-normal">{item.date}</time>
              </div>
            ))}
          </div>
        </section>

        <div className="latest-content-shell">
          <section id="research" className="homepage-major-section research-section scroll-mt-8">
            <h2
              className="latest-section-title font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Research
            </h2>
            <p className="latest-section-copy">
              We investigate multimodal systems that perceive, generate, reason, and act—turning
              frontier research into reliable intelligence for complex real-world settings.
            </p>

            <div className="research-area-grid">
              {researchAreas.map((area) => (
                <article key={area.title} className="research-area-card">
                  <h3 style={{ fontFamily: "'Instrument Serif', serif" }}>{area.title}</h3>
                  <div className="research-area-figure">
                    <img src={area.image} alt={area.imageAlt} />
                  </div>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="join" className="homepage-major-section join-section scroll-mt-8">
            <h2
              className="latest-section-title font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Join Us
            </h2>
            <p className="latest-section-copy">
              We are a diverse and collaborative team. We are always looking for passionate
              researchers and engineers to join us.
            </p>
            <a className="join-contact-link" href="mailto:mzyth@hust.edu.cn">
              Contact the lab <span aria-hidden="true">↗</span>
            </a>
          </section>

          <section
            id="publications"
            className="homepage-major-section publications-section scroll-mt-8"
          >
            <h2
              className="latest-section-title font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Publications
            </h2>
            <p className="latest-section-copy">
              Recent publications from the lab, ordered from newest to oldest.
            </p>

            <div className="publication-list">
              {publications.map((item, index) => (
                <article
                  key={item.title}
                  id={`publication-${index + 1}`}
                  className="publication-feature"
                >
                  <a
                    href={item.imageHref}
                    target="_blank"
                    rel="noreferrer"
                    className="publication-figure"
                    aria-label={`Open ${item.title}`}
                  >
                    <img src={item.image} alt={item.imageAlt} />
                  </a>

                  <div className="publication-copy">
                    <h3
                      className="publication-title"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {item.title}
                    </h3>
                    <span className="publication-badge">{item.badge}</span>
                    <p className="publication-authors">{item.authors}</p>
                    <p className="publication-description">{item.description}</p>
                    <div className="publication-links" aria-label={`${item.title} links`}>
                      {item.links.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                          <span>{link.label}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>

      <footer className="latest-footer mx-auto">
        <div className="latest-footer-main flex items-center justify-between border-b border-black/15">
          <a
            href="#"
            className="latest-footer-brand text-black no-underline"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            MAIR Lab @ HUST
          </a>

          <div className="flex items-center">
            <nav className="hidden items-center sm:flex" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="latest-footer-link text-black no-underline">
                  {link.label}
                </a>
              ))}
              <a href="mailto:mzyth@hust.edu.cn" className="latest-footer-link text-black no-underline">
                Contact
              </a>
            </nav>
            <span className="latest-footer-rule w-px bg-black/20" aria-hidden="true" />
            <a
              href="https://github.com/MAIR-Lab-HUST"
              className="latest-social-link text-black"
              aria-label="MAIR Lab on GitHub"
            >
              <GithubLogo weight="bold" aria-hidden="true" />
            </a>
            <a
              href="mailto:mzyth@hust.edu.cn"
              className="latest-social-link text-black"
              aria-label="Email MAIR Lab"
            >
              <EnvelopeSimple weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="latest-copyright">© 2025 MAIR Lab @ HUST. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
