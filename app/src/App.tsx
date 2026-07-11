import { useEffect, useState } from "react"
import { Code, EnvelopeSimple, FileText, GithubLogo, GlobeSimple, LinkSimple } from "@phosphor-icons/react"
import { motion } from "motion/react"
import hustLogoUrl from "@/assets/HUST_logo.png"
import mairLogoUrl from "@/assets/MAIR_logo.png"
import specImageUrl from "@/assets/signature-spine-spec.jpg"
import videoUrl from "@/assets/track-video.mp4"
import i2eMethodUrl from "@/assets/work/i2e-method.png"
import sciirOverviewUrl from "@/assets/work/sciir-overview.png"
import tmpoMethodUrl from "@/assets/work/tmpo-method.png"
import multimodalIntelligencePixelUrl from "@/assets/work/multimodal-intelligence-pixel.png"
import physicalIntelligencePixelUrl from "@/assets/work/physical-intelligence-pixel.png"
import ai4SciencePixelUrl from "@/assets/work/ai4science-pixel.png"

type Language = "en" | "zh"

const newsHrefs = [
  "https://github.com/MAIR-Lab-HUST/SciIR",
  "https://arxiv.org/abs/2605.10983",
  "https://arxiv.org/abs/2601.03741",
]

const researchAssets = [
  { image: multimodalIntelligencePixelUrl },
  { image: physicalIntelligencePixelUrl },
  { image: ai4SciencePixelUrl },
]

const publicationAssets = [
  {
    image: sciirOverviewUrl,
    imageHref: "https://sci-ir.vercel.app/sciir.html",
    links: [
      { key: "paper", href: "https://arxiv.org/abs/2606.30124" },
      { key: "code", href: "https://github.com/MAIR-Lab-HUST/SciIR" },
      { key: "project", href: "https://sci-ir.vercel.app/sciir.html" },
    ],
  },
  {
    image: tmpoMethodUrl,
    imageHref: "https://arxiv.org/abs/2605.10983",
    links: [
      { key: "paper", href: "https://arxiv.org/abs/2605.10983" },
      { key: "code", href: "https://github.com/MAIR-Lab-HUST/TMPO" },
      { key: "project", href: "https://mair-lab-hust.github.io/TMPO/" },
    ],
  },
  {
    image: i2eMethodUrl,
    imageHref: "https://image2env.github.io/",
    links: [
      { key: "paper", href: "https://arxiv.org/abs/2601.03741" },
      { key: "project", href: "https://image2env.github.io/" },
      { key: "acl", href: "https://aclanthology.org/2026.acl-long.2076/" },
    ],
  },
]

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
      { label: "Research", href: "#research" },
      { label: "Join Us", href: "#join" },
      { label: "Publications", href: "#publications" },
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
    },
    news: {
      heading: "News",
      items: [
        {
          type: "News:",
          title: "🎉 SciIR Accepted to ECCV 2026",
          description: "SciIR, our latest research work, has been accepted to ECCV 2026.",
          date: "June 2026",
        },
        {
          type: "News:",
          title: "📄 TMPO Preprint Released",
          description: "The preprint of TMPO is now available on arXiv.",
          date: "May 2026",
        },
        {
          type: "News:",
          title: "🚀 I2E Released: From Image Pixels to Actionable Interactive Environments",
          description:
            "We are excited to announce the release of I2E, a novel framework that transforms image pixels into actionable and interactive 3D environments.",
          date: "January 2026",
        },
      ],
    },
    research: {
      heading: "Research",
      intro:
        "We investigate multimodal systems that perceive, generate, reason, and act, turning frontier research into reliable intelligence for complex real-world settings.",
      areas: [
        {
          title: "Multimodal Intelligence",
          description:
            "Advancing multimodal understanding and generation, post-training for multimodal models, and new unified paradigms that continually push model capabilities.",
          imageAlt: "A grid of diverse text-to-image generations from TMPO",
        },
        {
          title: "Physical Intelligence",
          description:
            "Studying world models and vision-language-action systems so machines can understand and interact with the physical world.",
          imageAlt: "I2E image-to-environment paradigm",
        },
        {
          title: "AI4Science",
          description:
            "Applying frontier AI architectures to biology and medicine, enabling AI to accelerate scientific research.",
          imageAlt: "SciIR scientific image restoration data construction pipeline",
        },
      ],
    },
    join: {
      heading: "Join Us",
      lead:
        "MAIR Lab welcomes motivated researchers at all levels, including Ph.D. and Master's students, undergraduate research interns, and research engineers.",
      graduate: {
        index: "01 / Graduate Applicants",
        heading: "For Graduate Applicants",
        intro:
          "We welcome applications and inquiries for Fall 2026 graduate study. Students will work on challenging problems in multimodal intelligence, interactive environments, diffusion alignment, and scientific visual intelligence.",
        listHeading: "What we value",
        items: [
          {
            strong: "Strong academic preparation.",
            text: "Solid foundations in computer science, mathematics, or related disciplines; prior research is a plus.",
          },
          {
            strong: "Passion and perseverance.",
            text: "Genuine enthusiasm for solving hard problems, paired with creativity and the resilience to embrace uncertainty.",
          },
          {
            strong: "Self-motivated learning.",
            text: "The ability to quickly learn new research directions, tools, and techniques.",
          },
          {
            strong: "Programming and communication.",
            text: "Strong implementation skills and sufficient English for academic reading, writing, and collaboration.",
          },
        ],
      },
      internship: {
        index: "02 / Research Internships",
        heading: "Research Internship Opportunities",
        intro:
          "We offer research internships for highly motivated undergraduate students who want hands-on experience with frontier AI research. Interns may participate on-site or remotely depending on the project and supervision arrangement.",
        topicsHeading: "Research topics",
        topics: [
          "Multimodal generation and understanding",
          "Interactive environments and embodied intelligence",
          "Diffusion alignment and generative-model post-training",
          "Scientific image restoration and visual reasoning",
        ],
        benefitsHeading: "As a research intern, you will",
        benefits: [
          "Receive hands-on mentorship and access to lab research resources.",
          "Work on focused projects with the potential for academic publication.",
          "Build research, engineering, and communication skills through close collaboration with the team.",
        ],
      },
      apply: {
        label: "How to apply",
        heading: "Tell us what you want to explore.",
        text: "Please send your CV, research interests, representative work or project links, and your expected start date or internship timeline to the lab. For internship applications, use the subject line “Research Internship · Name · University”.",
        link: "Email your application",
        subject: "Research Application - Name - University",
      },
    },
    publications: {
      heading: "Publications",
      intro: "Recent publications from the lab, ordered from newest to oldest.",
      openLabel: "Open",
      linksLabel: "links",
      linkLabels: { paper: "Paper", code: "Code", project: "Project", acl: "ACL" },
      items: [
        {
          badge: "Paper · ECCV 2026",
          title: "SciIR: A Large-scale Training Dataset and Benchmark for Scientific Image Reasoning Generation",
          authors:
            "Zhiyuan Ma, Zhengfeng Shi, Yuning An, Peize Li, Jiabao Wei, Ruijie Li, Junhao Xiao, Jianjun Li, Bowen Zhou",
          description:
            "A unified study of scientific image restoration spanning data, evaluation, and reasoning-aware models for figures whose correctness matters as much as visual quality.",
          imageAlt:
            "Overview of the SciIR dataset, benchmark, and scientific image restoration task",
        },
        {
          badge: "Paper · Preprint 2026",
          title:
            "TMPO: Trajectory Matching Policy Optimization for Diverse and Efficient Diffusion Alignment",
          authors:
            "Jiaming Li, Chenyu Zhu, Nanxi Yi, Youjun Bao, Li Sun, Quanying Lv, Xiang Fang, Daizong Liu, Jianjun Li, Kun He, Bowen Zhou, Zhiyuan Ma",
          description:
            "TMPO aligns diffusion trajectories at the distribution level, improving sample diversity while reducing the training cost of reward-guided generation.",
          imageAlt: "Comparison of diffusion alignment methods and their generated image diversity",
        },
        {
          badge: "Paper · ACL 2026",
          title:
            "I2E: From Image Pixels to Actionable Interactive Environments for Text-Guided Image Editing",
          authors:
            "Jinghan Yu, Junhao Xiao, Chenyu Zhu, Jiaming Li, Jia Li, Hanming Deng, Xirui Wang, Guoli Jia, Jianjun Li, Zhiyuan Ma, Xiang Bai, Bowen Zhou",
          description:
            "A Decompose-then-Action framework that turns edited pixels into structured, physics-aware environments that remain interactive after generation.",
          imageAlt:
            "I2E paradigm comparing pixel redraws with structured interactive environment editing",
        },
      ],
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
      { label: "研究方向", href: "#research" },
      { label: "加入我们", href: "#join" },
      { label: "论文发表", href: "#publications" },
    ],
    contact: "联系",
    languageLabel: "选择语言",
    hero: {
      mairAlt: "MAIR 实验室标志",
      hustAlt: "华中科技大学校徽",
      kicker: "多模态人工智能研究实验室",
      title: ["探索多模态智能的", "下一片前沿。"],
      intro: [
        "MAIR 实验室致力于构建从感知走向生成、从推理走向行动的多模态系统，",
        "推动模型从孤立能力迈向智能体，使其能够理解复杂世界，",
        "并以可靠、可控的方式与世界交互。",
      ],
      signatureAlt: "MAIR 手写签名",
    },
    news: {
      heading: "实验室动态",
      items: [
        {
          type: "动态：",
          title: "🎉 SciIR 被 ECCV 2026 接收",
          description: "SciIR 是实验室最新研究成果，已被 ECCV 2026 接收。",
          date: "2026 年 6 月",
        },
        {
          type: "动态：",
          title: "📄 TMPO 预印本正式发布",
          description: "TMPO 的预印本现已发布于 arXiv。",
          date: "2026 年 5 月",
        },
        {
          type: "动态：",
          title: "🚀 I2E 发布：从图像像素到可执行的交互环境",
          description: "我们很高兴发布 I2E：一个将图像像素转化为可执行、可交互三维环境的新框架。",
          date: "2026 年 1 月",
        },
      ],
    },
    research: {
      heading: "研究方向",
      intro:
        "我们研究能够感知、生成、推理与行动的多模态系统，将前沿成果转化为面向复杂真实场景的可靠智能。",
      areas: [
        {
          title: "多模态智能",
          description: "在这里，我们关注多模态理解、生成，多模态模型后训练以及统一生成与理解模型新范式，不断推进现有模型的能力边界。",
          imageAlt: "TMPO 生成的多样化文生图结果",
        },
        {
          title: "物理智能",
          description: "在这里，我们关注世界模型、VLA，让机器在物理世界中具有理解和交互的能力。",
          imageAlt: "I2E 图像到环境范式",
        },
        {
          title: "科学智能",
          description: "在这里，我们关注前沿 AI 架构在生物学、医学领域的应用，让 AI 赋能科学研究。",
          imageAlt: "SciIR 科学图像修复数据构建流程",
        },
      ],
    },
    join: {
      heading: "加入我们",
      lead:
        "MAIR 实验室欢迎不同阶段的优秀研究者加入，包括博士生、硕士生、本科研究实习生与科研工程师。",
      graduate: {
        index: "01 / 研究生申请",
        heading: "研究生申请",
        intro:
          "我们开放 2026 年秋季研究生申请与咨询。加入团队后，你将围绕多模态智能、交互环境、扩散模型对齐和科学视觉智能等方向探索具有挑战性的研究问题。",
        listHeading: "我们看重",
        items: [
          {
            strong: "扎实的学术基础。",
            text: "具备计算机、数学或相关学科基础；有科研经历者优先。",
          },
          {
            strong: "热情与韧性。",
            text: "愿意持续攻克困难问题，并以创造力和耐心面对研究中的不确定性。",
          },
          {
            strong: "主动学习能力。",
            text: "能够快速进入新的研究方向，掌握所需工具与方法。",
          },
          {
            strong: "编程与沟通能力。",
            text: "具备良好的工程实现能力，以及满足学术阅读、写作和合作需要的英语能力。",
          },
        ],
      },
      internship: {
        index: "02 / 科研实习",
        heading: "科研实习机会",
        intro:
          "我们面向希望参与前沿人工智能研究的优秀本科生开放科研实习。根据项目与指导安排，实习可在线下或远程进行。",
        topicsHeading: "研究主题",
        topics: [
          "多模态生成与理解",
          "交互环境与具身智能",
          "扩散模型对齐与生成模型后训练",
          "科学图像修复与视觉推理",
        ],
        benefitsHeading: "你将获得",
        benefits: [
          "实验室成员的一对一科研指导与相关研究资源。",
          "参与聚焦研究项目，并争取高水平论文发表的机会。",
          "在紧密合作中提升科研、工程实现与学术沟通能力。",
        ],
      },
      apply: {
        label: "申请方式",
        heading: "告诉我们你想探索什么。",
        text: "请将个人简历、研究兴趣、代表性成果或项目链接，以及预计入组时间或实习周期发送至实验室邮箱。申请科研实习时，邮件主题请注明“科研实习 · 姓名 · 学校”。",
        link: "发送申请邮件",
        subject: "科研申请 - 姓名 - 学校",
      },
    },
    publications: {
      heading: "论文发表",
      intro: "实验室近期论文，按发布时间从新到旧排列。",
      openLabel: "打开",
      linksLabel: "相关链接",
      linkLabels: { paper: "论文", code: "代码", project: "项目", acl: "ACL" },
      items: [
        {
          badge: "论文 · ECCV 2026",
          title: "SciIR: A Large-scale Training Dataset and Benchmark for Scientific Image Reasoning Generation",
          authors:
            "Zhiyuan Ma, Zhengfeng Shi, Yuning An, Peize Li, Jiabao Wei, Ruijie Li, Junhao Xiao, Jianjun Li, Bowen Zhou",
          description:
            "围绕科学图像修复的数据、评测与推理感知模型开展系统研究，使图像在提升视觉质量的同时保持科学内容的正确性。",
          imageAlt: "SciIR 数据集、基准与科学图像修复任务概览",
        },
        {
          badge: "论文 · 预印本 2026",
          title:
            "TMPO: Trajectory Matching Policy Optimization for Diverse and Efficient Diffusion Alignment",
          authors:
            "Jiaming Li, Chenyu Zhu, Nanxi Yi, Youjun Bao, Li Sun, Quanying Lv, Xiang Fang, Daizong Liu, Jianjun Li, Kun He, Bowen Zhou, Zhiyuan Ma",
          description:
            "TMPO 在分布层面对齐扩散轨迹，在提升样本多样性的同时，降低奖励引导生成的训练成本。",
          imageAlt: "扩散模型对齐方法及其生成多样性对比",
        },
        {
          badge: "论文 · ACL 2026",
          title:
            "I2E: From Image Pixels to Actionable Interactive Environments for Text-Guided Image Editing",
          authors:
            "Jinghan Yu, Junhao Xiao, Chenyu Zhu, Jiaming Li, Jia Li, Hanming Deng, Xirui Wang, Guoli Jia, Jianjun Li, Zhiyuan Ma, Xiang Bai, Bowen Zhou",
          description:
            "提出“分解后行动”框架，将编辑后的图像像素转化为结构化、符合物理规律且可继续交互的环境。",
          imageAlt: "I2E 像素重绘与结构化交互环境编辑范式对比",
        },
      ],
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

function SpecCrop({ className, label }: { className: string; label: string }) {
  return (
    <div className={`spec-crop ${className}`} role="img" aria-label={label}>
      <img src={specImageUrl} alt="" aria-hidden="true" />
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const copy = siteCopy[language]
  const isChinese = language === "zh"
  const displayFont = isChinese
    ? "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif"
    : "'Instrument Serif', serif"

  useEffect(() => {
    document.documentElement.lang = isChinese ? "zh-CN" : "en"
    document.title = copy.documentTitle
    window.localStorage.setItem("mair-language", language)
  }, [copy.documentTitle, isChinese, language])

  return (
    <div className={`latest-page text-black${isChinese ? " is-zh" : ""}`} lang={isChinese ? "zh-CN" : "en"}>
      <header className="px-3 pt-2 sm:px-6 sm:pt-5">
        <nav className="latest-nav mx-auto flex items-center justify-between rounded-full border border-black/10 px-[10px]">
          <a
            href="#"
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
                className="latest-nav-link text-black no-underline transition-opacity duration-200 hover:opacity-55"
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
        <section className="latest-hero flex flex-col items-center text-center" aria-labelledby="hero-title">
          <div className="latest-lockup flex items-center justify-center">
            <img src={mairLogoUrl} alt={copy.hero.mairAlt} className="latest-mair-logo object-contain" />
            <span className="latest-logo-rule w-px shrink-0 bg-black/25" aria-hidden="true" />
            <img src={hustLogoUrl} alt={copy.hero.hustAlt} className="latest-hust-logo object-contain" />
          </div>

          <p className="latest-kicker font-semibold uppercase text-black/95">{copy.hero.kicker}</p>

          <h1
            id="hero-title"
            className="latest-title font-normal text-black"
            style={{ fontFamily: displayFont }}
          >
            {copy.hero.title.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>

          <p className="latest-intro font-normal text-black">
            {copy.hero.intro.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>

          <SpecCrop className="latest-signature-crop" label={copy.hero.signatureAlt} />

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

        <section id="news" className="latest-shell scroll-mt-24" aria-labelledby="news-heading">
          <h2 id="news-heading" className="latest-heading font-semibold uppercase">{copy.news.heading}</h2>
          <div>
            {copy.news.items.map((item, index) => (
              <div key={newsHrefs[index]} className="latest-row grid items-start">
                <span className="latest-row-type font-medium">{item.type}</span>
                <div className="latest-row-body">
                  <a
                    href={newsHrefs[index]}
                    target="_blank"
                    rel="noreferrer"
                    className="latest-row-title font-medium no-underline transition-opacity duration-200 hover:opacity-60"
                  >
                    {item.title}
                  </a>
                  <p className="latest-row-description">{item.description}</p>
                </div>
                <time className="latest-row-date text-right font-normal">{item.date}</time>
              </div>
            ))}
          </div>
        </section>

        <div className="latest-content-shell">
          <section id="research" className="homepage-major-section research-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {copy.research.heading}
            </h2>
            <p className="latest-section-copy">{copy.research.intro}</p>

            <div className="research-area-grid">
              {copy.research.areas.map((area, index) => (
                <article key={area.title} className="research-area-card">
                  <h3 style={{ fontFamily: displayFont }}>{area.title}</h3>
                  <div className="research-area-figure">
                    <img src={researchAssets[index].image} alt={area.imageAlt} />
                  </div>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="join" className="homepage-major-section join-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {copy.join.heading}
            </h2>
            <p className="latest-section-copy join-lead">{copy.join.lead}</p>

            <div className="join-opportunity-grid">
              <article className="join-opportunity">
                <h3 style={{ fontFamily: displayFont }}>{copy.join.graduate.heading}</h3>
                <p>{copy.join.graduate.intro}</p>
                <ul>
                  {copy.join.graduate.items.map((item) => (
                    <li key={item.strong}><strong>{item.strong}</strong> {item.text}</li>
                  ))}
                </ul>
                <p className="join-contact">
                  {copy.join.apply.text}{" "}
                  <a
                    className="join-inline-contact"
                    href={`mailto:mzyth@hust.edu.cn?subject=${encodeURIComponent(copy.join.apply.subject)}`}
                  >
                    {copy.join.apply.link} <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </article>

              <article className="join-opportunity">
                <h3 style={{ fontFamily: displayFont }}>{copy.join.internship.heading}</h3>
                <p>{copy.join.internship.intro}</p>
                <p><strong>{copy.join.internship.topicsHeading}: </strong>{copy.join.internship.topics.join(" · ")}</p>
                <p><strong>{copy.join.internship.benefitsHeading}: </strong>{copy.join.internship.benefits.join(" ")}</p>
                <p className="join-contact">
                  {copy.join.apply.text}{" "}
                  <a
                    className="join-inline-contact"
                    href={`mailto:mzyth@hust.edu.cn?subject=${encodeURIComponent(copy.join.apply.subject)}`}
                  >
                    {copy.join.apply.link} <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </article>
            </div>
          </section>

          <section id="publications" className="homepage-major-section publications-section scroll-mt-8">
            <h2 className="latest-section-title font-normal" style={{ fontFamily: displayFont }}>
              {copy.publications.heading}
            </h2>
            <p className="latest-section-copy">{copy.publications.intro}</p>

            <div className="publication-list">
              {copy.publications.items.map((item, index) => (
                <article key={item.title} id={`publication-${index + 1}`} className="publication-feature">
                  <a
                    href={publicationAssets[index].imageHref}
                    target="_blank"
                    rel="noreferrer"
                    className="publication-figure"
                    aria-label={`${copy.publications.openLabel} ${item.title}`}
                  >
                    <img src={publicationAssets[index].image} alt={item.imageAlt} />
                  </a>

                  <div className="publication-copy">
                    <h3 className="publication-title">{item.title}</h3>
                    <span className="publication-badge">{item.badge}</span>
                    <p className="publication-authors">{item.authors}</p>
                    <p className="publication-description">{item.description}</p>
                    <div className="publication-links" aria-label={`${item.title} ${copy.publications.linksLabel}`}>
                      {publicationAssets[index].links.map((link) => {
                        const LinkIcon = publicationLinkIcons[link.key as keyof typeof publicationLinkIcons]

                        return (
                          <a key={link.key} href={link.href} target="_blank" rel="noreferrer">
                            <LinkIcon className="publication-link-icon" weight="regular" aria-hidden="true" />
                            <span>{copy.publications.linkLabels[link.key as keyof typeof copy.publications.linkLabels]}</span>
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
        </div>
      </main>

      <footer className="latest-footer mx-auto">
        <div className="latest-footer-main flex items-center justify-between border-b border-black/15">
          <a href="#" className="latest-footer-brand text-black no-underline" style={{ fontFamily: displayFont }}>
            MAIR Lab @ HUST
          </a>

          <div className="flex items-center">
            <nav className="hidden items-center sm:flex" aria-label={copy.footer.navLabel}>
              {copy.nav.map((link) => (
                <a key={link.href} href={link.href} className="latest-footer-link text-black no-underline">
                  {link.label}
                </a>
              ))}
              <a href="mailto:mzyth@hust.edu.cn" className="latest-footer-link text-black no-underline">
                {copy.contact}
              </a>
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
