/* ==========================================================================
   SkeletonStructure — script
   1. Template data (edit this to add real repositories)
   2. Card rendering
   3. Scroll reveal + footer year
   ========================================================================== */

/* 1. TEMPLATE DATA
   --------------------------------------------------------------------------
   Every entry below is an illustrative placeholder.
   To publish a real template, set `repo` to its GitHub URL, e.g.
     repo: "https://github.com/SkeletonStructure/<repository-name>"
   The card will automatically drop its "Placeholder" label and gain a
   "View source" link. Update `tags` and `description` to match reality.
   Add or remove objects freely; the grid adapts. */
const TEMPLATES = [
  {
    name: "Minimal Portfolio",
    description: "A quiet, fast showcase for your work, with clear structure and room to grow.",
    tags: ["HTML", "CSS"],
    repo: null,
  },
  {
    name: "Personal Website",
    description: "A simple home on the web: about, writing, and ways to get in touch.",
    tags: ["HTML", "CSS", "JavaScript"],
    repo: null,
  },
  {
    name: "Documentation Site",
    description: "Organized, searchable docs for a project, written in plain Markdown.",
    tags: ["Markdown", "HTML", "CSS"],
    repo: null,
  },
  {
    name: "Landing Page",
    description: "A focused single page to introduce a project, product, or idea.",
    tags: ["HTML", "CSS", "JavaScript"],
    repo: null,
  },
  {
    name: "Developer Blog",
    description: "A readable, low-maintenance blog with posts written as simple files.",
    tags: ["Markdown", "HTML", "CSS"],
    repo: null,
  },
  {
    name: "Simple Web Application",
    description: "A small, well-organized app skeleton with sensible conventions built in.",
    tags: ["JavaScript", "Server", "Database"],
    repo: null,
  },
];

/* 2. CARD RENDERING */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderTemplate(t, index) {
  const card = el("article", "card reveal");
  card.style.setProperty("--d", `${(index % 3) * 0.06}s`);

  card.append(el("span", "card__status", t.repo ? "Template" : "Placeholder"));
  card.append(el("h3", "", t.name));
  card.append(el("p", "", t.description));

  const tags = el("ul", "tags");
  tags.setAttribute("aria-label", "Technologies");
  t.tags.forEach((tag) => tags.append(el("li", "", tag)));
  card.append(tags);

  if (t.repo) {
    const link = el("a", "card__action");
    link.href = t.repo;
    link.rel = "noopener";
    link.append(`View source for ${t.name} `);
    const arrow = el("span", "", "→");
    arrow.setAttribute("aria-hidden", "true");
    link.append(arrow);
    card.append(link);
  } else {
    card.append(el("span", "card__action", "Source coming soon"));
  }
  return card;
}

const grid = document.getElementById("template-grid");
if (grid) {
  grid.append(...TEMPLATES.map(renderTemplate));
}

/* 3. SCROLL REVEAL + FOOTER YEAR */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );
  revealTargets.forEach((node) => observer.observe(node));
} else {
  revealTargets.forEach((node) => node.classList.add("in"));
}
