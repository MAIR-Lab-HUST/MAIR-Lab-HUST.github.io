# Homepage content

The homepage sections are generated from this directory at Vite build time.

- `site.toml` controls section headings, localized labels, publication display metadata, images, and links.
- `news/<language>/*.md` contains one news item per file.
- `research/<language>/*.md` contains one research area per file.
- `join/<language>/*.md` contains one join-us opportunity per file.
- `people/people.json` is the single source of truth for the People page. It controls the principal investigator, member groups, photos, localized names, research directions, optional internship notes, and optional homepage / Scholar / GitHub links.
- `publications.bib` contains standard publication titles, authors, venues, years, and URLs. Publication display metadata is keyed by the same BibTeX citation key under `[publication.<key>]` in `site.toml`.

Markdown files use TOML front matter between `+++` delimiters. Add or delete a file to add or delete an item; `order` controls its position. Keep matching English and Chinese files when both languages should show the same set of entries.

## Editing People

Add member photos to `app/src/assets/work`, then add an object to a group's `members` array in `people/people.json`:

```json
{
  "name_en": "Member Name",
  "name_zh": "成员姓名",
  "photo": "member-name.jpg",
  "photo_alt_en": "Portrait of Member Name",
  "photo_alt_zh": "成员姓名肖像",
  "meta_en": "Ph.D. · 2024",
  "meta_zh": "博士生 · 2024",
  "research_en": "Multimodal Understanding · World Models",
  "research_zh": "多模态理解 · 世界模型",
  "intern_en": "Research Intern · Organization",
  "intern_zh": "研究实习 · 机构名称",
  "homepage": "https://example.com/",
  "scholar": "https://scholar.google.com/",
  "github": "https://github.com/username"
}
```

`intern_en`, `intern_zh`, `homepage`, `scholar`, and `github` may be empty strings; empty values are not rendered. `meta_en` and `meta_zh` are the identity line below a member name, such as `Ph.D. · 2024`. Groups with no members are hidden. The four current example members have `"placeholder": true` so they can be found and replaced easily.
