import { useEffect, useState } from "react"
import { Code, EnvelopeSimple, FileText, GithubLogo, GlobeSimple, LinkSimple } from "@phosphor-icons/react"
import { motion } from "motion/react"
import { IrisAsciiArt } from "@/components/IrisAsciiArt"
import { pageContent, type Language } from "@/content"
import hustLogoUrl from "@/assets/HUST_logo.png"
import mairLogoUrl from "@/assets/MAIR_logo.png"

const publicationLinkIcons = {
  paper: FileText,
  code: Code,
  project: GlobeSimple,
  acl: LinkSimple,
}

const siteCopy = {
  en: {
    documentTitle: "MAIR Lab @ HUST",
    brandAria: "MAIR Lab homepage",
    nav: [
      { label: "Home", href: "#/" },
      { label: "About", href: "#/about" },
      { label: "Research", href: "#/research" },
      { label: "Publications", href: "#/publications" },
      { label: "Projects", href: "#/projects" },
      { label: "People", href: "#/people" },
      { label: "Join", href: "#/join" },
    ],
    contact: "Contact",
    languageLabel: "Choose language",
    hero: {
      mairAlt: "MAIR Lab geometric mark",
      hustAlt: "Huazhong University of Science and Technology emblem",
      kicker: "Multimodal Artificial Intelligence Research Lab",
      title: ["Engineering the next frontier of", "multimodal intelligence."],
      intro: [
        "At MAIR Lab, we build multimodal systems that move from perception to generation,",
        "from reasoning to action, and from isolated models to intelligent agents that can",
        "understand and shape complex worlds.",
      ],
      signatureAlt: "MAIR handwritten signature",
      asciiAlt: "Interactive ASCII iris illustration",
    },
    footer: {
      navLabel: "Footer navigation",
      githubAria: "MAIR Lab on GitHub",
      emailAria: "Email MAIR Lab",
      copyright: "© 2025 MAIR Lab @ HUST. All rights reserved.",
    },
  },
  zh: {
    documentTitle: "华中科技大学 MAIR 实验室",
    brandAria: "MAIR 实验室主页",
    nav: [
      { label: "首页", href: "#/" },
      { label: "关于我们", href: "#/about" },
      { label: "研究方向", href: "#/research" },
      { label: "论文发表", href: "#/publications" },
      { label: "研究项目", href: "#/projects" },
      { label: "成员", href: "#/people" },
      { label: "加入我们", href: "#/join" },
    ],
    contact: "联系",
    languageLabel: "选择语言",
    hero: {
      mairAlt: "MAIR 实验室标志",
      hustAlt: "华中科技大学校徽",
      kicker: "华中科技大学多模态人工智能实验室",
      title: ["探索多模态智能的", "下一片前沿。"],
      intro: [
        "MAIR 实验室致力于构建从感知走向生成、从推理走向行动的多模态系统，",
        "推动模型从孤立能力迈向智能体，使其能够理解复杂世界，",
        "并以可靠、可控的方式与世界交互。",
      ],
      signatureAlt: "MAIR 手写签名",
      asciiAlt: "交互式 ASCII 鸢尾花插画",
    },
    footer: {
      navLabel: "页脚导航",
      githubAria: "在 GitHub 上查看 MAIR 实验室",
      emailAria: "给 MAIR 实验室发送邮件",
      copyright: "© 2025 华中科技大学 MAIR 实验室。保留所有权利。",
    },
  },
} as const

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en"
  const stored = window.localStorage.getItem("mair-language")
  if (stored === "en" || stored === "zh") return stored
  return window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"
}

type PageRoute = "home" | "about" | "research" | "publications" | "projects" | "people" | "join"

function getPageRoute(): PageRoute {
  if (typeof window === "undefined") return "home"
  const route = window.location.hash.replace(/^#\/?/, "")
  return route === "about" || route === "research" || route === "publications" || route === "projects" || route === "people" || route === "join"
    ? route
    : "home"
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const [route, setRoute] = useState<PageRoute>(getPageRoute)
  const copy = siteCopy[language]
  const content = pageContent[language]
  const isChinese = language === "zh"
  const displayFont = isChinese
    ? "'MAIR Douyin Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    : "'MAIR Jost Emphasis', 'Inter', sans-serif"

  useEffect(() => {
    document.documentElement.lang = isChinese ? "zh-CN" : "en"
    const routeHref = route === "home" ? "#/" : `#/${route}`
    const currentPage = copy.nav.find((item) => item.href === routeHref)
    document.title = currentPage ? `${currentPage.label} | ${copy.documentTitle}` : copy.documentTitle
    window.localStorage.setItem("mair-language", language)
  }, [copy.documentTitle, copy.nav, isChinese, language, route])

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(getPageRoute())
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    window.addEventListener("hashchange", handleRouteChange)
    return () => window.removeEventListener("hashchange", handleRouteChange)
  }, [])

  return (
    <div className={`latest-page text-black${isChinese ? " is-zh" : ""}`} lang={isChinese ? "zh-CN" : "en"}>
      <header className="px-3 pt-2 sm:px-6 sm:pt-5">
        <nav className="latest-nav mx-auto flex items-center justify-between rounded-full border border-black/10 px-[10px]">
          <a
            href="#/"
            className="latest-brand leading-none text-black no-underline"
            style={{ fontFamily: displayFont }}
            aria-label={copy.brandAria}
          >
            MAIR Lab @ HUST
          </a>

          <div className="hidden items-center gap-[18px] sm:flex">
            {copy.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`latest-nav-link text-black no-underline transition-opacity duration-200 hover:opacity-55${route === (link.href === "#/" ? "home" : link.href.slice(2)) ? " is-active" : ""}`}
                aria-current={route === (link.href === "#/" ? "home" : link.href.slice(2)) ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="latest-nav-actions">
            <motion.a
              href="mailto:mzyth@hust.edu.cn"
              className="latest-contact flex items-center justify-center font-medium text-black no-underline"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {copy.contact}
            </motion.a>
            <span className="latest-nav-actions-divider" aria-hidden="true" />
            <div className="latest-language-switch" role="group" aria-label={copy.languageLabel}>
              <button
                type="button"
                className={`latest-language-option${language === "en" ? " is-active" : ""}`}
                aria-pressed={language === "en"}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={`latest-language-option${language === "zh" ? " is-active" : ""}`}
                aria-pressed={language === "zh"}
                onClick={() => setLanguage("zh")}
              >
                中文
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {route === "home" && <>
        <section className="latest-hero flex flex-col items-center text-center" aria-labelledby="hero-title">
          <div className="latest-hero-copy">
          <div className="latest-lockup flex items-center justify-center">
            <img src={mairLogoUrl} alt={copy.hero.mairAlt} className="latest-mair-logo object-contain" />
            <span className="latest-logo-rule w-px shrink-0 bg-black/25" aria-hidden="true" />
            <img src={hustLogoUrl} alt={copy.hero.hustAlt} className="latest-hust-logo object-contain" />
          </div>

          <p className="latest-kicker font-medium uppercase text-black/95">{copy.hero.kicker}</p>
          <h1 id="hero-title" className="latest-title font-normal text-black" style={{ fontFamily: displayFont }}>
            {copy.hero.title.map((line) => <span key={line} className="block">{line}</span>)}
          </h1>
          <p className="latest-intro font-normal text-black">
            {copy.hero.intro.map((line) => <span key={line} className="block">{line}</span>)}
          </p>
          </div>
          <div className="hero-ascii">
            <IrisAsciiArt label={copy.hero.asciiAlt} />
          </div>
        </section>

        </>}

        {route !== "home" && <div className="latest-content-shell section-page-shell">
          {route === "about" &&
          <section id="about" className="homepage-major-section about-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {content.about.heading}
            </h2>
            <p className="latest-section-copy">{content.about.intro}</p>
            <div className="about-layout">
              <div className="about-narrative">
                {content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <aside className="about-focus">
                <h3>{content.about.focusHeading}</h3>
                <ol>
                  {content.about.focusItems.map((item) => <li key={item}>{item}</li>)}
                </ol>
              </aside>
            </div>
            <div className="about-news" aria-labelledby="news-heading">
              <h3 id="news-heading" className="latest-heading font-medium uppercase">{content.news.heading}</h3>
              {content.news.items.map((item) => (
                <div key={`${item.href}-${item.title}`} className="latest-row grid items-start">
                  <span className="latest-row-type font-medium">{item.type}</span>
                  <div className="latest-row-body">
                    <a href={item.href} target="_blank" rel="noreferrer" className="latest-row-title font-medium no-underline transition-opacity duration-200 hover:opacity-60">
                      {item.title}
                    </a>
                    <p className="latest-row-description" dangerouslySetInnerHTML={{ __html: item.html }} />
                  </div>
                  <time className="latest-row-date text-right font-normal">{item.date}</time>
                </div>
              ))}
            </div>
          </section>
          }

          {route === "research" &&
          <section id="research" className="homepage-major-section research-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {content.research.heading}
            </h2>
            <p className="latest-section-copy">{content.research.intro}</p>
            <div className="research-area-grid">
              {content.research.areas.map((area) => (
                <article key={area.title} className="research-area-card">
                  <h3>{area.title}</h3>
                  <div className="research-area-figure"><img src={area.image} alt={area.imageAlt} /></div>
                  <p dangerouslySetInnerHTML={{ __html: area.html }} />
                </article>
              ))}
            </div>
          </section>
          }

          {route === "join" &&
          <section id="join" className="homepage-major-section join-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {content.join.heading}
            </h2>
            <p className="latest-section-copy join-lead">{content.join.intro}</p>
            <div className="join-opportunity-grid">
              {content.join.opportunities.map((opportunity) => (
                <article key={opportunity.title} className="join-opportunity">
                  <h3>{opportunity.title}</h3>
                  <div className="join-markdown" dangerouslySetInnerHTML={{ __html: opportunity.html }} />
                </article>
              ))}
            </div>
          </section>
          }

          {route === "publications" &&
          <section id="publications" className="homepage-major-section publications-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {content.publications.heading}
            </h2>
            <p className="latest-section-copy">{content.publications.intro}</p>
            <div className="publication-list">
              {content.publications.items.map((item) => (
                <article key={item.citationKey} id={`publication-${item.citationKey}`} className="publication-feature">
                  <a
                    href={item.imageHref}
                    target="_blank"
                    rel="noreferrer"
                    className="publication-figure"
                    aria-label={`${content.publications.openLabel} ${item.title}`}
                  >
                    <img src={item.image} alt={item.imageAlt} />
                  </a>

                  <div className="publication-copy">
                    <h3 className="publication-title">{item.title}</h3>
                    <span className="publication-badge">{item.badge}</span>
                    <p className="publication-authors">{item.authors}</p>
                    <p className="publication-description">{item.description}</p>
                    <div className="publication-links" aria-label={`${item.title} ${content.publications.linksLabel}`}>
                      {item.links.map((link) => {
                        const LinkIcon = publicationLinkIcons[link.kind]
                        return (
                          <a key={link.kind} href={link.href} target="_blank" rel="noreferrer">
                            <LinkIcon className="publication-link-icon" weight="regular" aria-hidden="true" />
                            <span>{content.publications.linkLabels[link.kind]}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          }

          {route === "projects" &&
          <section id="projects" className="homepage-major-section projects-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {content.projects.heading}
            </h2>
            <p className="latest-section-copy">{content.projects.intro}</p>
            <div className="project-list">
              {content.projects.items.map((item) => (
                <article key={item.citationKey} className="project-feature">
                  <a href={item.imageHref} target="_blank" rel="noreferrer" className="project-figure" aria-label={`${content.publications.openLabel} ${item.title}`}>
                    <img src={item.image} alt={item.imageAlt} />
                  </a>
                  <div className="project-copy">
                    <span className="publication-badge">{item.badge}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="publication-links" aria-label={`${item.title} ${content.publications.linksLabel}`}>
                      {item.links.map((link) => {
                        const LinkIcon = publicationLinkIcons[link.kind]
                        return (
                          <a key={link.kind} href={link.href} target="_blank" rel="noreferrer">
                            <LinkIcon className="publication-link-icon" weight="regular" aria-hidden="true" />
                            <span>{content.publications.linkLabels[link.kind]}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          }

          {route === "people" &&
          <section id="people" className="homepage-major-section people-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {content.people.heading}
            </h2>
            <p className="latest-section-copy">{content.people.intro}</p>
            <div className="people-groups">
              {content.people.groups.map((group, index) => (
                <section key={group.title} className="people-group" aria-labelledby={`people-group-${index}`}>
                  <div className="people-group-heading">
                    <span className="people-group-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 id={`people-group-${index}`}>{group.title}</h3>
                  </div>
                  <div className="people-markdown" dangerouslySetInnerHTML={{ __html: group.html }} />
                </section>
              ))}
            </div>
          </section>
          }
        </div>}
      </main>

      <footer className="latest-footer mx-auto">
        <div className="latest-footer-main flex items-center justify-between border-b border-black/15">
          <a href="#/" className="latest-footer-brand text-black no-underline">
            MAIR Lab @ HUST
          </a>
          <div className="flex items-center">
            <nav className="hidden items-center sm:flex" aria-label={copy.footer.navLabel}>
              {copy.nav.map((link) => (
                <a key={link.href} href={link.href} className="latest-footer-link text-black no-underline">{link.label}</a>
              ))}
              <a href="mailto:mzyth@hust.edu.cn" className="latest-footer-link text-black no-underline">{copy.contact}</a>
            </nav>
            <span className="latest-footer-rule w-px bg-black/20" aria-hidden="true" />
            <a href="https://github.com/MAIR-Lab-HUST" className="latest-social-link text-black" aria-label={copy.footer.githubAria}>
              <GithubLogo weight="bold" aria-hidden="true" />
            </a>
            <a href="mailto:mzyth@hust.edu.cn" className="latest-social-link text-black" aria-label={copy.footer.emailAria}>
              <EnvelopeSimple weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="latest-copyright">{copy.footer.copyright}</p>
      </footer>
    </div>
  )
}

export default App
