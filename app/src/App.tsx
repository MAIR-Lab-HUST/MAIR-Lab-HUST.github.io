import { EnvelopeSimple, GithubLogo } from "@phosphor-icons/react"
import { motion } from "motion/react"
import hustLogoUrl from "@/assets/HUST_logo.png"
import mairLogoUrl from "@/assets/MAIR_logo.png"
import specImageUrl from "@/assets/signature-spine-spec.jpg"
import videoUrl from "@/assets/track-video.mp4"

const navLinks = [
  { label: "Research", href: "#research" },
  { label: "Open Source", href: "#open-source" },
  { label: "Vision", href: "#vision" },
  { label: "Join Us", href: "#join" },
]

const latestItems = [
  {
    type: "Paper:",
    title: "I2E: From Image Pixels to Actionable Interactive Environments for Text-Guided Image Editing",
    date: "ACL 2026",
    href: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=pJRStG4AAAAJ&sortby=pubdate&citation_for_view=pJRStG4AAAAJ:abG-DnoFyZgC",
  },
  {
    type: "Code:",
    title: "TMPO",
    date: "May 2026",
    href: "https://github.com/MAIR-Lab-HUST/TMPO",
  },
  {
    type: "News:",
    title: "SciIR Accepted to ECCV 2026",
    date: "June 2026",
    href: "https://github.com/MAIR-Lab-HUST/SciIR",
  },
]

const sections = [
  {
    id: "research",
    title: "Research",
    copy: "We investigate foundation models that perceive, reason, and act across modalities and tasks—advancing the state of the art and solving real-world problems.",
  },
  {
    id: "open-source",
    title: "Open Source",
    copy: "We release high-quality code, models, and datasets to empower the community and accelerate progress together.",
  },
  {
    id: "vision",
    title: "Vision",
    copy: "Our vision is a future where multimodal intelligence understands the world deeply and acts responsibly to augment human potential.",
  },
  {
    id: "publications",
    title: "Publications / News",
    copy: "Explore our latest publications, technical reports, and news updates.",
  },
  {
    id: "join",
    title: "Team / Join Us",
    copy: "We are a diverse and collaborative team. We are always looking for passionate researchers and engineers to join us.",
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
              className="latest-hust-logo object-fill"
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

        <section className="latest-shell" aria-labelledby="latest-heading">
          <h2 id="latest-heading" className="latest-heading font-semibold uppercase">
            Latest
          </h2>
          <div>
            {latestItems.map((item) => (
              <div key={item.type} className="latest-row grid items-center">
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
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="latest-info-section scroll-mt-8">
              <h2
                className="latest-section-title font-normal"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {section.title}
              </h2>
              <p className="latest-section-copy">{section.copy}</p>
            </section>
          ))}
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
