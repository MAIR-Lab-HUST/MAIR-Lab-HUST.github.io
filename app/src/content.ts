import { marked } from "marked"
import { parse as parseToml } from "smol-toml"
import siteToml from "../content/site.toml?raw"
import publicationsBib from "../content/publications.bib?raw"

export type Language = "en" | "zh"
export type PublicationLinkKind = "paper" | "code" | "project" | "acl"

interface MarkdownDocument {
  path: string
  metadata: Record<string, unknown>
  html: string
  inlineHtml: string
}

interface NewsItem {
  order: number
  type: string
  title: string
  date: string
  href: string
  html: string
}

interface ResearchArea {
  order: number
  title: string
  image: string
  imageAlt: string
  html: string
}

interface JoinOpportunity {
  order: number
  title: string
  html: string
}

interface PublicationLink {
  kind: PublicationLinkKind
  href: string
}

interface Publication {
  citationKey: string
  order: number
  title: string
  authors: string
  badge: string
  description: string
  image: string
  imageHref: string
  imageAlt: string
  links: PublicationLink[]
}

interface SectionCopy {
  heading: string
  intro?: string
}

interface PublicationSectionCopy extends SectionCopy {
  openLabel: string
  linksLabel: string
  linkLabels: Record<PublicationLinkKind, string>
}

interface AboutSectionCopy extends SectionCopy {
  paragraphs: string[]
  focusHeading: string
  focusItems: string[]
}

interface PeopleGroup {
  order: number
  title: string
  html: string
}

export interface PageContent {
  news: SectionCopy & { items: NewsItem[] }
  about: Required<AboutSectionCopy>
  research: Required<SectionCopy> & { areas: ResearchArea[] }
  join: Required<SectionCopy> & { opportunities: JoinOpportunity[] }
  publications: PublicationSectionCopy & { items: Publication[] }
  projects: Required<SectionCopy> & { items: Publication[] }
  people: Required<SectionCopy> & { groups: PeopleGroup[] }
}

interface BibEntry {
  citationKey: string
  entryType: string
  fields: Record<string, string>
}

const markdownModules = {
  ...import.meta.glob("../content/news/**/*.md", { eager: true, query: "?raw", import: "default" }),
  ...import.meta.glob("../content/research/**/*.md", { eager: true, query: "?raw", import: "default" }),
  ...import.meta.glob("../content/join/**/*.md", { eager: true, query: "?raw", import: "default" }),
  ...import.meta.glob("../content/people/**/*.md", { eager: true, query: "?raw", import: "default" }),
} as Record<string, string>

const workAssetModules = import.meta.glob("./assets/work/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>

const workAssets = Object.fromEntries(
  Object.entries(workAssetModules).map(([path, url]) => [path.split("/").at(-1), url]),
) as Record<string, string>

function requiredString(value: unknown, context: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing string value: ${context}`)
  }
  return value
}

function requiredNumber(value: unknown, context: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Missing numeric value: ${context}`)
  }
  return value
}

function requiredRecord(value: unknown, context: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Missing table: ${context}`)
  }
  return value as Record<string, unknown>
}

function requiredStringArray(value: unknown, context: string): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Missing string array: ${context}`)
  }
  return value.map((item, index) => requiredString(item, `${context}[${index}]`))
}

function parseMarkdownDocument(path: string, source: string): MarkdownDocument {
  const match = source.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+\r?\n?([\s\S]*)$/)
  if (!match) {
    throw new Error(`${path} must start with TOML front matter wrapped in +++ delimiters`)
  }

  return {
    path,
    metadata: parseToml(match[1]) as Record<string, unknown>,
    html: marked.parse(match[2].trim(), { async: false, gfm: true }),
    inlineHtml: marked.parseInline(match[2].trim(), { async: false, gfm: true }),
  }
}

const markdownDocuments = Object.entries(markdownModules).map(([path, source]) =>
  parseMarkdownDocument(path, source),
)

function documentsFor(section: "news" | "research" | "join" | "people", language: Language) {
  return markdownDocuments.filter(({ path }) =>
    path.includes(`/content/${section}/${language}/`),
  )
}

function assetUrl(filename: unknown, context: string): string {
  const name = requiredString(filename, context)
  const url = workAssets[name]
  if (!url) {
    throw new Error(`${context} references missing app/src/assets/work/${name}`)
  }
  return url
}

function parseNews(language: Language): NewsItem[] {
  return documentsFor("news", language)
    .map(({ path, metadata, inlineHtml }) => ({
      order: requiredNumber(metadata.order, `${path}: order`),
      type: requiredString(metadata.type, `${path}: type`),
      title: requiredString(metadata.title, `${path}: title`),
      date: requiredString(metadata.date, `${path}: date`),
      href: requiredString(metadata.href, `${path}: href`),
      html: inlineHtml,
    }))
    .sort((a, b) => a.order - b.order)
}

function parseResearch(language: Language): ResearchArea[] {
  return documentsFor("research", language)
    .map(({ path, metadata, inlineHtml }) => ({
      order: requiredNumber(metadata.order, `${path}: order`),
      title: requiredString(metadata.title, `${path}: title`),
      image: assetUrl(metadata.image, `${path}: image`),
      imageAlt: requiredString(metadata.image_alt, `${path}: image_alt`),
      html: inlineHtml,
    }))
    .sort((a, b) => a.order - b.order)
}

function parseJoin(language: Language): JoinOpportunity[] {
  return documentsFor("join", language)
    .map(({ path, metadata, html }) => ({
      order: requiredNumber(metadata.order, `${path}: order`),
      title: requiredString(metadata.title, `${path}: title`),
      html,
    }))
    .sort((a, b) => a.order - b.order)
}

function parsePeople(language: Language): PeopleGroup[] {
  return documentsFor("people", language)
    .map(({ path, metadata, html }) => ({
      order: requiredNumber(metadata.order, `${path}: order`),
      title: requiredString(metadata.title, `${path}: title`),
      html,
    }))
    .sort((a, b) => a.order - b.order)
}

function cleanBibText(value: string): string {
  return value
    .replace(/\\([{}])/g, "$1")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function parseBibTeX(source: string): BibEntry[] {
  const entries: BibEntry[] = []
  let cursor = 0

  const skipWhitespace = () => {
    while (cursor < source.length && /\s/.test(source[cursor])) cursor += 1
  }

  const readIdentifier = () => {
    const start = cursor
    while (cursor < source.length && /[A-Za-z0-9_:-]/.test(source[cursor])) cursor += 1
    return source.slice(start, cursor)
  }

  const readValue = (closing: string): string => {
    skipWhitespace()
    const opener = source[cursor]

    if (opener === "{") {
      cursor += 1
      let depth = 1
      let value = ""
      while (cursor < source.length && depth > 0) {
        const character = source[cursor]
        if (character === "\\" && cursor + 1 < source.length) {
          value += character + source[cursor + 1]
          cursor += 2
          continue
        }
        if (character === "{") depth += 1
        if (character === "}") depth -= 1
        if (depth > 0) value += character
        cursor += 1
      }
      if (depth !== 0) throw new Error("Unclosed braced BibTeX value")
      return cleanBibText(value)
    }

    if (opener === '"') {
      cursor += 1
      let value = ""
      while (cursor < source.length && source[cursor] !== '"') {
        if (source[cursor] === "\\" && cursor + 1 < source.length) {
          value += source[cursor] + source[cursor + 1]
          cursor += 2
        } else {
          value += source[cursor]
          cursor += 1
        }
      }
      if (source[cursor] !== '"') throw new Error("Unclosed quoted BibTeX value")
      cursor += 1
      return cleanBibText(value)
    }

    const start = cursor
    while (cursor < source.length && source[cursor] !== "," && source[cursor] !== closing) cursor += 1
    return cleanBibText(source.slice(start, cursor))
  }

  while (cursor < source.length) {
    const at = source.indexOf("@", cursor)
    if (at === -1) break
    cursor = at + 1
    const entryType = readIdentifier().toLowerCase()
    skipWhitespace()

    const opening = source[cursor]
    if (opening !== "{" && opening !== "(") {
      throw new Error(`Invalid BibTeX entry near character ${cursor}`)
    }
    const closing = opening === "{" ? "}" : ")"
    cursor += 1
    skipWhitespace()

    const keyStart = cursor
    while (cursor < source.length && source[cursor] !== "," && source[cursor] !== closing) cursor += 1
    const citationKey = source.slice(keyStart, cursor).trim()
    if (!citationKey || source[cursor] !== ",") {
      throw new Error(`BibTeX entry ${entryType} is missing a citation key or fields`)
    }
    cursor += 1

    const fields: Record<string, string> = {}
    while (cursor < source.length) {
      skipWhitespace()
      if (source[cursor] === closing) {
        cursor += 1
        break
      }
      if (source[cursor] === ",") {
        cursor += 1
        continue
      }

      const field = readIdentifier().toLowerCase()
      if (!field) throw new Error(`Invalid field in BibTeX entry ${citationKey}`)
      skipWhitespace()
      if (source[cursor] !== "=") throw new Error(`BibTeX field ${citationKey}.${field} is missing =`)
      cursor += 1
      fields[field] = readValue(closing)
      skipWhitespace()
      if (source[cursor] === ",") cursor += 1
    }

    entries.push({ citationKey, entryType, fields })
  }

  return entries
}

function parsePublicationLinks(value: unknown, context: string): PublicationLink[] {
  if (!Array.isArray(value)) throw new Error(`${context} must be an array of TOML tables`)
  return value.map((link, index) => {
    const record = requiredRecord(link, `${context}[${index}]`)
    const kind = requiredString(record.kind, `${context}[${index}].kind`) as PublicationLinkKind
    if (!(["paper", "code", "project", "acl"] as string[]).includes(kind)) {
      throw new Error(`${context}[${index}].kind has unsupported value ${kind}`)
    }
    return { kind, href: requiredString(record.href, `${context}[${index}].href`) }
  })
}

const site = requiredRecord(parseToml(siteToml), "site.toml")
const publicationDisplay = requiredRecord(site.publication, "site.toml: publication")
const bibliography = new Map(parseBibTeX(publicationsBib).map((entry) => [entry.citationKey, entry]))

function section(language: Language, name: string): Record<string, unknown> {
  const locale = requiredRecord(site[language], `site.toml: ${language}`)
  return requiredRecord(locale[name], `site.toml: ${language}.${name}`)
}

function parsePublications(language: Language): Publication[] {
  return Object.entries(publicationDisplay)
    .map(([citationKey, rawDisplay]) => {
      const display = requiredRecord(rawDisplay, `site.toml: publication.${citationKey}`)
      const bib = bibliography.get(citationKey)
      if (!bib) throw new Error(`site.toml publication.${citationKey} has no matching publications.bib entry`)

      return {
        citationKey,
        order: requiredNumber(display.order, `publication.${citationKey}.order`),
        title: requiredString(bib.fields.title, `publications.bib: ${citationKey}.title`),
        authors: requiredString(bib.fields.author, `publications.bib: ${citationKey}.author`)
          .split(/\s+and\s+/i)
          .join(", "),
        badge: requiredString(display[`badge_${language}`], `publication.${citationKey}.badge_${language}`),
        description: requiredString(
          display[`description_${language}`],
          `publication.${citationKey}.description_${language}`,
        ),
        image: assetUrl(display.image, `publication.${citationKey}.image`),
        imageHref: requiredString(display.image_href, `publication.${citationKey}.image_href`),
        imageAlt: requiredString(
          display[`image_alt_${language}`],
          `publication.${citationKey}.image_alt_${language}`,
        ),
        links: parsePublicationLinks(display.links, `publication.${citationKey}.links`),
      }
    })
    .sort((a, b) => a.order - b.order)
}

function buildPageContent(language: Language): PageContent {
  const news = section(language, "news")
  const about = section(language, "about")
  const research = section(language, "research")
  const join = section(language, "join")
  const publications = section(language, "publications")
  const projects = section(language, "projects")
  const people = section(language, "people")
  const publicationItems = parsePublications(language)

  return {
    news: {
      heading: requiredString(news.heading, `${language}.news.heading`),
      items: parseNews(language),
    },
    about: {
      heading: requiredString(about.heading, `${language}.about.heading`),
      intro: requiredString(about.intro, `${language}.about.intro`),
      paragraphs: requiredStringArray(about.paragraphs, `${language}.about.paragraphs`),
      focusHeading: requiredString(about.focus_heading, `${language}.about.focus_heading`),
      focusItems: requiredStringArray(about.focus_items, `${language}.about.focus_items`),
    },
    research: {
      heading: requiredString(research.heading, `${language}.research.heading`),
      intro: requiredString(research.intro, `${language}.research.intro`),
      areas: parseResearch(language),
    },
    join: {
      heading: requiredString(join.heading, `${language}.join.heading`),
      intro: requiredString(join.intro, `${language}.join.intro`),
      opportunities: parseJoin(language),
    },
    publications: {
      heading: requiredString(publications.heading, `${language}.publications.heading`),
      intro: requiredString(publications.intro, `${language}.publications.intro`),
      openLabel: requiredString(publications.open_label, `${language}.publications.open_label`),
      linksLabel: requiredString(publications.links_label, `${language}.publications.links_label`),
      linkLabels: {
        paper: requiredString(publications.paper_label, `${language}.publications.paper_label`),
        code: requiredString(publications.code_label, `${language}.publications.code_label`),
        project: requiredString(publications.project_label, `${language}.publications.project_label`),
        acl: requiredString(publications.acl_label, `${language}.publications.acl_label`),
      },
      items: publicationItems,
    },
    projects: {
      heading: requiredString(projects.heading, `${language}.projects.heading`),
      intro: requiredString(projects.intro, `${language}.projects.intro`),
      items: publicationItems.filter((item) =>
        item.links.some((link) => link.kind === "code" || link.kind === "project"),
      ),
    },
    people: {
      heading: requiredString(people.heading, `${language}.people.heading`),
      intro: requiredString(people.intro, `${language}.people.intro`),
      groups: parsePeople(language),
    },
  }
}

export const pageContent: Record<Language, PageContent> = {
  en: buildPageContent("en"),
  zh: buildPageContent("zh"),
}
