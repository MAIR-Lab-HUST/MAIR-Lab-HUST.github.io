import { useEffect, useState } from "react"
import { Code, EnvelopeSimple, FileText, GithubLogo, GlobeSimple, GraduationCap, House, LinkSimple } from "@phosphor-icons/react"
import { motion } from "motion/react"
import { marked } from "marked"
import { HomepageAsciiBackground } from "@/components/IrisAsciiArt"
import { pageContent, type Language } from "@/content"
import hustLogoUrl from "@/assets/HUST_logo.png"
import mairLogoUrl from "@/assets/MAIR_logo.png"

const publicationLinkIcons = {
  paper: FileText,
  code: Code,
  project: GlobeSimple,
  acl: LinkSimple,
}

const isPreprintBadge = (badge: string) => /预印本|preprint/i.test(badge)

const formatPublicationBadge = (badge: string) => {
  if (isPreprintBadge(badge)) {
    const year = badge.match(/\b20\d{2}\b/)?.[0]
    return year ? `Preprint ${year}` : "Preprint"
  }
  const separatorIndex = badge.indexOf("·")
  return separatorIndex >= 0 ? badge.slice(separatorIndex + 1).trim() : badge
}

const renderBoldMarkdown = (text: string) => text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
  part.startsWith("**") && part.endsWith("**")
    ? <strong key={index}>{part.slice(2, -2)}</strong>
    : part,
)

const siteCopy = {
  en: {
    documentTitle: "MAIR Lab @ HUST",
    brandAria: "MAIR Lab homepage",
    nav: [
      { label: "Home", href: "#/" },
      { label: "About", href: "#/research" },
      { label: "Publications", href: "#/publications" },
      { label: "Projects", href: "#/projects" },
      { label: "People", href: "#/people" },
      { label: "Join", href: "#/join" },
    ],
    languageLabel: "Choose language",
    hero: {
      mairAlt: "MAIR Lab geometric mark",
      hustAlt: "Huazhong University of Science and Technology emblem",
      kicker: "Multimodal Artificial Intelligence\nResearch Lab",
      title: ["M|Multimodal", "A|Artificial", "I|Intelligence", "R|Research"],
      intro: [
        "At MAIR Lab, we build multimodal systems that move from perception to generation,",
        "from reasoning to action, and from isolated models to intelligent agents that can",
        "understand and shape complex worlds.",
      ],
      signatureAlt: "MAIR handwritten signature",
      asciiAlt: "Interactive ASCII sunflower landscape background",
    },
    footer: {
      navLabel: "Footer navigation",
      githubAria: "MAIR Lab on GitHub",
      emailAria: "Email MAIR Lab",
      copyright: "© Huazhong University of Science and Technology MAIR Lab Since 2025. All rights reserved.",
    },
  },
  zh: {
    documentTitle: "华中科技大学 MAIR 实验室",
    brandAria: "MAIR 实验室主页",
    nav: [
      { label: "首页", href: "#/" },
      { label: "关于与研究", href: "#/research" },
      { label: "论文发表", href: "#/publications" },
      { label: "研究项目", href: "#/projects" },
      { label: "成员", href: "#/people" },
      { label: "加入我们", href: "#/join" },
    ],
    languageLabel: "选择语言",
    hero: {
      mairAlt: "MAIR 实验室标志",
      hustAlt: "华中科技大学校徽",
      kicker: "华中科技大学\n多模态人工智能实验室",
      title: ["M|Multimodal", "A|Artificial", "I|Intelligence", "R|Research"],
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
      copyright: "© 华中科技大学 MAIR Lab Since 2025。保留所有权利。",
    },
  },
} as const

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "zh"
  const stored = window.localStorage.getItem("mair-language")
  if (stored === "en" || stored === "zh") return stored
  return "zh"
}

type PageRoute = "home" | "about" | "research" | "publications" | "projects" | "people" | "join"

function getPageRoute(): PageRoute {
  if (typeof window === "undefined") return "home"
  const pathnameRoute = window.location.pathname.replace(/^\/+|\/+$/g, "")
  const hashRoute = window.location.hash.replace(/^#\/?/, "")
  const route = pathnameRoute || hashRoute
  return route === "about" || route === "research" || route === "publications" || route === "projects" || route === "people" || route === "join"
    ? route
    : "home"
}

function getRoutePath(route: PageRoute) {
  if (route === "home") return "/"
  if (route === "research") return "/about"
  return `/${route}`
}

function getCanonicalHref(href: string) {
  const legacyRoute = href.replace(/^#\/?/, "")
  if (!legacyRoute) return "/"
  return legacyRoute === "research" ? "/about" : `/${legacyRoute}`
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const [route, setRoute] = useState<PageRoute>(getPageRoute)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const copy = siteCopy[language]
  const content = pageContent[language]
  const isChinese = language === "zh"
  const displayFont = "'MAIR Jost Emphasis', 'MAIR Douyin Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif"

  useEffect(() => {
    document.documentElement.lang = isChinese ? "zh-CN" : "en"
    const routeHref = getRoutePath(route)
    const currentPage = copy.nav.find((item) => getCanonicalHref(item.href) === routeHref)
    document.title = currentPage ? `${currentPage.label} | ${copy.documentTitle}` : copy.documentTitle
    window.localStorage.setItem("mair-language", language)
  }, [copy.documentTitle, copy.nav, isChinese, language, route])

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(getPageRoute())
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    window.addEventListener("popstate", handleRouteChange)
    window.addEventListener("hashchange", handleRouteChange)
    return () => {
      window.removeEventListener("popstate", handleRouteChange)
      window.removeEventListener("hashchange", handleRouteChange)
    }
  }, [])

  return (
    <div className={`latest-page text-black${isChinese ? " is-zh" : ""}${route === "home" ? " is-home" : ""}`} lang={isChinese ? "zh-CN" : "en"}>
      {route === "home" && <HomepageAsciiBackground label={copy.hero.asciiAlt} language={language} />}
      <header className="px-3 pt-2 sm:px-6 sm:pt-5">
        <nav className="latest-nav mx-auto flex items-center justify-between rounded-full border border-black/10 px-[10px]">
          <a
            href="/"
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
                href={getCanonicalHref(link.href)}
                className={`latest-nav-link text-black no-underline transition-opacity duration-200 hover:opacity-55${getRoutePath(route) === getCanonicalHref(link.href) ? " is-active" : ""}`}
                aria-current={getRoutePath(route) === getCanonicalHref(link.href) ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="latest-nav-actions">
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
          <button type="button" className={`mobile-menu-toggle${mobileMenuOpen ? " is-open" : ""}`} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>
            <span /><span /><span />
          </button>
        </nav>
        <div className={`mobile-menu${mobileMenuOpen ? " is-open" : ""}`} aria-hidden={!mobileMenuOpen}>
          {copy.nav.map((link) => <a key={link.href} href={getCanonicalHref(link.href)} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>)}
        </div>
      </header>

      <main key={route} className="page-transition">
        {route === "home" && <>
        <section className="latest-hero flex flex-col items-center text-center" aria-labelledby="hero-title">
          <div className="latest-hero-copy">
          <div className="latest-lockup flex items-center justify-center">
            <img src={mairLogoUrl} alt={copy.hero.mairAlt} className="latest-mair-logo object-contain" />
            <span className="latest-logo-rule w-px shrink-0 bg-black/25" aria-hidden="true" />
            <img src={hustLogoUrl} alt={copy.hero.hustAlt} className="latest-hust-logo object-contain" />
          </div>

          <h1 id="hero-title" className="latest-title font-normal text-black hero-acronym-title" style={{ fontFamily: displayFont }}>
            {copy.hero.title.map((line) => {
              const [letter, word] = line.split("|")
              return <span key={line} className="hero-acronym-line"><strong><b>{letter}</b>{word.slice(1)}</strong></span>
            })}
          </h1>
          <p className="latest-intro font-normal text-black">
            {copy.hero.intro.map((line) => <span key={line} className="block">{line}</span>)}
          </p>
          {route === "home" && <div className="home-hero-actions">
            <a href="https://github.com/MAIR-Lab-HUST" target="_blank" rel="noreferrer" className="home-hero-action home-hero-action-english">
              <GithubLogo weight="bold" aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a href="mailto:mzyth@hust.edu.cn" className="home-hero-action home-hero-action-english">
              <EnvelopeSimple weight="bold" aria-hidden="true" />
              <span>mzyth@hust.edu.cn</span>
            </a>
          </div>}
          </div>
        </section>

        </>}

        {route !== "home" && <div className="latest-content-shell section-page-shell">
          {(route === "about" || route === "research") &&
          <section id="about" className="homepage-major-section about-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {content.about.heading}
            </h2>
            <div className="about-layout about-layout-single">
              <div className="about-narrative">
                {content.about.paragraphs.map((paragraph) => {
                  const isBullet = paragraph.startsWith("* ")
                  const text = isBullet ? paragraph.slice(2) : paragraph
                  return <p key={paragraph} className={isBullet ? "about-narrative-bullet" : undefined}>{renderBoldMarkdown(text)}</p>
                })}
              </div>
            </div>
            <div className="about-news" aria-labelledby="news-heading">
              <h3 id="news-heading" className="latest-heading font-medium uppercase">{content.news.heading}</h3>
              {content.news.items.map((item) => (
                <div key={`${item.href}-${item.title}`} className="latest-row grid items-start">
                  <time className="latest-row-date font-normal">{item.date}</time>
                  <div className="latest-row-body">
                    <span className="latest-row-tag">{item.type.replace(/:$/, "")}</span>
                    <a href={item.href} target="_blank" rel="noreferrer" className="latest-row-title font-medium no-underline transition-opacity duration-200 hover:opacity-60">
                      {item.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
          }

          {(route === "about" || route === "research") &&
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
                  <h3 dangerouslySetInnerHTML={{ __html: marked.parseInline(opportunity.title, { async: false }) }} />
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
                    <span className={`publication-badge ${isPreprintBadge(item.badge) ? "is-preprint" : "is-accepted"}`}>
                      {formatPublicationBadge(item.badge)}
                    </span>
                    <p className="publication-authors">
                      {item.authors.map((author, index) => <span key={`${author.name}-${index}`} className={author.isLabAuthor ? "publication-author lab-author" : "publication-author"}>
                        {index > 0 ? ", " : ""}{author.name}
                      </span>)}
                    </p>
                    <p className="publication-description">{item.description}</p>
                    <div className="publication-links" aria-label={`${item.title} ${content.publications.linksLabel}`}>
                      {item.links.map((link) => {
                        const LinkIcon = publicationLinkIcons[link.kind]
                        return (
                          <a key={link.kind} className={`publication-link publication-link-${link.kind}`} href={link.href} target="_blank" rel="noreferrer">
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
              {content.projects.items.filter((item) => item.citationKey === "sciir").map((item) => (
                <article key={item.citationKey} className="project-feature">
                  <a href={item.imageHref} target="_blank" rel="noreferrer" className="project-figure" aria-label={`${content.publications.openLabel} ${item.title}`}>
                    <img src={item.image} alt={item.imageAlt} />
                  </a>
                  <div className="project-copy">
                    <span className={`publication-badge ${isPreprintBadge(item.badge) ? "is-preprint" : "is-accepted"}`}>
                      {formatPublicationBadge(item.badge)}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="publication-links" aria-label={`${item.title} ${content.publications.linksLabel}`}>
                      {item.links.map((link) => {
                        const LinkIcon = publicationLinkIcons[link.kind]
                        return (
                          <a key={link.kind} className={`publication-link publication-link-${link.kind}`} href={link.href} target="_blank" rel="noreferrer">
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
            <article className="people-pi-card">
              <a href={content.people.principalInvestigator.homepage} target="_blank" rel="noreferrer" className="people-pi-portrait-link" aria-label={content.people.principalInvestigator.name}>
                <img className="people-pi-portrait" src={content.people.principalInvestigator.image} alt={content.people.principalInvestigator.imageAlt} />
              </a>
              <div className="people-pi-copy">
                <h3>{content.people.principalInvestigator.name}</h3>
                <p className="people-pi-role">{content.people.principalInvestigator.role}</p>
                <p>{content.people.principalInvestigator.institution}</p>
                <p>{content.people.principalInvestigator.research}</p>
                <a className="people-pi-email" href={`mailto:${content.people.principalInvestigator.email}`}>{content.people.principalInvestigator.email}</a>
                <div className="people-pi-links" aria-label={`${content.people.principalInvestigator.name} links`}>
                  {content.people.principalInvestigator.homepage && <a href={content.people.principalInvestigator.homepage} target="_blank" rel="noreferrer" aria-label="Homepage" title="Homepage"><House weight="regular" aria-hidden="true" /></a>}
                  {content.people.principalInvestigator.scholar && <a href={content.people.principalInvestigator.scholar} target="_blank" rel="noreferrer" aria-label="Google Scholar" title="Google Scholar"><GraduationCap weight="regular" aria-hidden="true" /></a>}
                  {content.people.principalInvestigator.github && <a href={content.people.principalInvestigator.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><GithubLogo weight="regular" aria-hidden="true" /></a>}
                  <a href={`mailto:${content.people.principalInvestigator.email}`} aria-label="Email" title="Email"><EnvelopeSimple weight="regular" aria-hidden="true" /></a>
                </div>
              </div>
            </article>
            <div className="people-groups">
              {content.people.groups.filter((group) => group.members.length > 0).map((group) => (
                <section key={group.id} className="people-group" aria-labelledby={`people-group-${group.id}`}>
                  <h3 id={`people-group-${group.id}`}>{group.title}</h3>
                  <div className="people-member-grid">
                    {group.members.map((member, memberIndex) => (
                      <article key={`${group.id}-${member.name}-${memberIndex}`} className={`people-member${member.placeholder ? " is-placeholder" : ""}`}>
                        <img className="people-member-photo" src={member.photo} alt={member.photoAlt} />
                        <div className="people-member-copy">
                          <h4>{member.name}</h4>
                          <p className="people-member-meta">{member.meta}</p>
                          <p className="people-member-research">{member.research}</p>
                          {member.intern && <p className="people-member-intern">{member.intern}</p>}
                          {(member.homepage || member.scholar || member.github) && <div className="people-member-links" aria-label={`${member.name} links`}>
                            {member.homepage && <a href={member.homepage} target="_blank" rel="noreferrer" aria-label={`${member.name} homepage`} title="Homepage"><House weight="regular" aria-hidden="true" /></a>}
                            {member.scholar && <a href={member.scholar} target="_blank" rel="noreferrer" aria-label={`${member.name} Google Scholar`} title="Google Scholar"><GraduationCap weight="regular" aria-hidden="true" /></a>}
                            {member.github && <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} GitHub`} title="GitHub"><GithubLogo weight="regular" aria-hidden="true" /></a>}
                          </div>}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
          }
        </div>}
      </main>

    </div>
  )
}

export default App
