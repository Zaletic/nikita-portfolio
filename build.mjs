// Static site generator: `node build.mjs` writes every page next to this file.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
const HOT = JSON.parse(readFileSync(new URL("./streetly-hotspots.json", import.meta.url), "utf8"));

const SITE = {
  name: "Nikita Bangia",
  role: "UI/UX Designer",
  // TODO: replace with the real address / profile links
  email: "hello@nikitabangia.com",
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
};

const projects = [
  {
    slug: "streetly",
    fig: "streetly",
    homeImg: "/img/streetly-card.webp",
    homeTitle: "STREETLY - UI/UX Design",
    title: "Streetly",
    cover: "/img/streetly-cover.webp",
    pos: "left center",
    blurb:
      "Streetly is an e-bike rental app that helps people compare options and book the nearest ride. The goal was a calm, map-first experience that makes a new kind of commute feel simple and trustworthy.",
    meta: { Client: "Streetly (concept)", Timeline: "Case study", Role: "UI/UX Designer", Skills: ["Product Design", "UX Research"] },
    tight: true,
    gallery: [
      ["full", "streetly-pdf/page-01"],
      ["full", "streetly-pdf/page-02"],
      ["full", "streetly-pdf/page-03"],
      ["full", "streetly-pdf/page-04"],
      ["full", "streetly-pdf/page-05"],
      ["full", "streetly-pdf/page-06"],
      ["full", "streetly-pdf/page-07"],
      ["full", "streetly-pdf/page-08"],
      ["full", "streetly-pdf/page-09"],
      ["full", "streetly-pdf/page-10"],
      ["full", "streetly-pdf/page-11"],
      ["full", "streetly-pdf/page-12"],
      ["full", "streetly-pdf/page-13"],
      ["full", "streetly-pdf/page-14"],
      ["full", "streetly-pdf/page-15"],
      ["full", "streetly-pdf/page-16"],
      ["full", "streetly-pdf/page-17"],
      ["full", "streetly-pdf/page-18"],
    ],
    // clickable areas on a page, as % of the page (from the PDF link annotations)
    links: {
      "streetly-pdf/page-18": { href: "https://www.figma.com/proto/rvhsfg03eP5YToJJdNV4sP/main-E-Bike-rental---Streetly?node-id=46-1085&viewport=199%2C220%2C0.16&t=Y48qt2iz9rvZYHWS-1&scaling=scale-down&content-scaling=fixed&page-id=46%3A1084", left: 8.69, top: 11.05, width: 25.4, height: 15.84, label: "Open the Streetly interactive prototype" },
    },
  },
  {
    slug: "railway-network",
    fig: "railway",
    title: "Railway Network",
    cover: "/img/railway-cover.webp",
    pos: "center",
    blurb:
      "A visual and interactive exploration of the Central Indian railway network, mapping zones, history, divisions and routes through information design so a complex system becomes easy to understand.",
    meta: { Client: "Academic project", Timeline: "March 2026", Role: "Information Designer", Skills: ["Information Design", "Research"] },
    gallery: [
      ["full", "railway-01"],
      ["pair", "railway-02", "railway-03"],
      ["full", "railway-04"],
      ["pair", "railway-05", "railway-06"],
      ["full", "railway-07"],
    ],
  },
  {
    slug: "bridging-the-trust-gap",
    fig: "tap",
    title: "Bridging the Trust Gap",
    cover: "/img/trust-cover.webp",
    pos: "center",
    blurb:
      "Understanding and reimagining the experience of public drinking water facilities. The project looks at why people stop trusting shared water points and designs a system that earns that trust back.",
    meta: { Client: "Academic project", Timeline: "Case study", Role: "UX Researcher & Designer", Skills: ["UX Research", "Service Design"] },
    gallery: [
      ["full", "trust-01"],
      ["pair", "trust-02", "trust-03"],
      ["full", "trust-04"],
      ["pair", "trust-10", "trust-11"],
      ["full", "trust-14"],
    ],
  },
];

const nav = (active) => `
<header class="nav">
  <a class="logo" href="/" aria-label="${SITE.name} — home">${SITE.name}</a>
  <nav class="nav-links" aria-label="Main">
    <a class="pill${active === "work" ? "" : ""}" href="/projects">Work</a>
    <a class="pill${active === "about" ? "" : ""}" href="/about">About</a>
    <a class="pill${active === "contact" ? "" : ""}" href="/contact">Contact</a>
  </nav>
</header>`;

const footer = `
<footer class="footer">
  <div class="footer-top">
    <div>
      <h3 class="footer-title" data-lines>Get in touch today to discuss how I can bring thoughtful design to your next product.</h3>
      <a class="pill pill-lg" href="/contact">Drop a line</a>
    </div>
    <div class="footer-photo" data-reveal><img src="/img/mountains.webp" alt="${SITE.name}" loading="lazy" /></div>
  </div>
  <hr class="footer-rule" />
  <div class="footer-cols">
    <div class="footer-mail">
      <p class="label">Email me</p>
      <a class="serif-link big" href="mailto:${SITE.email}">${SITE.email}</a>
    </div>
    <div>
      <p class="label">Website</p>
      <a class="serif-link" href="/projects">Works</a>
      <a class="serif-link" href="/about">About</a>
      <a class="serif-link" href="/contact">Contact</a>
    </div>
    <div>
      <p class="label">Social</p>
      <a class="serif-link" href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
      <a class="serif-link" href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
    </div>
    <div>
      <p class="label">Legal</p>
      <a class="serif-link" href="/legal/privacy-policy">Privacy Policy</a>
      <a class="serif-link" href="/legal/terms-of-use">Terms of Use</a>
      <a class="serif-link" href="/legal/cookie-policy">Cookie Policy</a>
    </div>
  </div>
</footer>`;

const favicon = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#F7F2E6"/><circle cx="32" cy="32" r="21" fill="none" stroke="#F21317" stroke-width="4"/><path d="M23 35c2 5 16 5 18 0" fill="none" stroke="#F21317" stroke-width="4" stroke-linecap="round"/><circle cx="25" cy="27" r="2.6" fill="#F21317"/><circle cx="39" cy="27" r="2.6" fill="#F21317"/></svg>`
)}`;

const page = ({ title, desc, active, body, bodyClass = "", og = "/img/streetly-cover.webp", bodyStyle = "", themeColor = "#F7F2E6", figs = false }) => `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8" />
<script>document.documentElement.className="js"</script>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${desc}" />
<meta name="theme-color" content="${themeColor}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${og}" />
<meta property="og:type" content="website" />
<link rel="icon" href="${favicon}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/css/style.css" />
</head>
<body class="${bodyClass}"${bodyStyle ? ` style="${bodyStyle}"` : ""}>
${nav(active)}
<main>
${body}
</main>
${footer}
${figs ? `<script>window.__figs={};window.hairline=function(f){window.__figs[f.name]=f}</script>
<script src="/js/hairline-kernel.js" defer></script>
${projects.map((p) => `<script type="module" src="/hairline/${p.fig}.js"></script>`).join("")}
` : ""}<script src="/js/main.js" defer></script>
</body>
</html>
`;

const smile1 = `<svg class="smiley" viewBox="0 0 68 68" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" aria-hidden="true"><circle cx="34" cy="34" r="31"/><path d="M23 40c3 8 19 8 22 0"/><path d="M24 24v6M44 24v6"/></svg>`;
const smile2 = `<svg class="smiley" viewBox="0 0 68 68" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" aria-hidden="true"><circle cx="34" cy="34" r="31"/><path d="M18 40c4 10 28 10 32 0"/><path d="M20 28c2-5 8-5 10 0M38 28c2-5 8-5 10 0"/></svg>`;

const chip = (id, imgs) =>
  `<span class="chip" data-chip="${id}">${imgs.map((s, i) => `<img src="/img/${s}.webp" alt=""${i ? "" : ' class="on"'} />`).join("")}</span>`;

// ---------- Home ----------
const home = page({
  title: `${SITE.name} — ${SITE.role} Portfolio`,
  desc: `${SITE.name} is a ${SITE.role} crafting design solutions and visual stories.`,
  active: "",
  bodyClass: "home",
  body: `
<section class="hero">
  <h1 class="hero-title" aria-label="${SITE.role} crafting design solutions and visual stories">
    <span class="row"><span class="w">UI/UX</span> ${chip(1, ["lab-selfie", "mountains", "sushi"])} <span class="w">Designer</span></span>
    <span class="row"><span class="w it">crafting</span> <span class="w ico">${smile1}</span> <span class="w">design</span> <span class="w">solutions</span> ${chip(2, ["nift-convocation", "bougainvillea", "cat"])}</span>
    <span class="row"><span class="w">and</span> ${chip(3, ["daiict-sign", "nift-campus", "lab-selfie"])} <span class="w it">visual</span> <span class="w it">stories</span> <span class="w ico">${smile2}</span></span>
  </h1>
</section>

<section class="work-scatter" aria-label="Selected work">
  ${projects
    .map(
      (p, i) => `
  <a class="card scatter s${i + 1}" href="/projects/${p.slug}" data-grow>
    <span class="card-img"><img src="${p.homeImg || p.cover}" alt="${p.title}" style="object-position:${p.pos}" loading="lazy" /></span>
    <span class="card-title">${p.homeTitle || p.title}</span>
  </a>`
    )
    .join("")}
</section>

<section class="process">
  <h2 class="h-xl" data-lines>Shaping ideas into design solutions.</h2>
  <div class="steps">
    <article class="step st1" data-reveal><span class="num">01</span><div><h3>Understand</h3><p>Dig into the people, the context and the problem through research, conversations and observation before a single screen is drawn.</p></div></article>
    <article class="step st2" data-reveal><span class="num">02</span><div><h3>Define</h3><p>Turn insights into a clear problem statement, user flows and an information architecture the whole product can stand on.</p></div></article>
    <article class="step st3" data-reveal><span class="num">03</span><div><h3>Design</h3><p>Move from wireframes to a polished, considered interface, testing ideas quickly and refining the details that make it feel human.</p></div></article>
    <article class="step st4" data-reveal><span class="num">04</span><div><h3>Deliver</h3><p>Prototype, polish and hand off clean files and documentation so the idea can be built, scaled and maintained.</p></div></article>
  </div>
</section>

<section class="statement">
  <h2 class="h-xl scrub" data-scrub>I approach design with intention and restraint, shaping structure and nuance into systems that feel deeply human. Each project is a process of translating ideas into forms that communicate without excess.</h2>
</section>

<section class="services">
  <div class="services-inner">
    <h2 class="h-xl" data-lines>Services</h2>
    <div class="svc-list">
      ${[
        ["UI/UX Design", "Designing clear, intuitive products and interfaces that balance visual appeal with usability and strong structure."],
        ["Information Design", "Turning complex systems and data into visual explanations that people can read, trust and act on."],
        ["User Research", "Learning from real people through interviews, observation and synthesis to find what actually matters."],
        ["Visual & Brand Design", "Defining visual direction and graphics that help ideas communicate consistently and with purpose."],
      ]
        .map(
          ([t, d], i) => `
      <div class="svc" data-reveal>
        <div class="svc-t"><span>${t}</span><sup>0${i + 1}</sup></div>
        <p class="svc-d">${d}</p>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`,
});

// ---------- Projects ----------
const projectsPage = page({
  title: `Work — ${SITE.name}`,
  desc: `Selected work by ${SITE.name}.`,
  active: "work",
  bodyClass: "work-page",
  body: `
<section class="work-hero"><h1 class="mega" data-fit>Featured Work</h1></section>
<section class="grid2">
  ${projects
    .map(
      (p) => `
  <a class="card tile" href="/projects/${p.slug}" data-reveal="scale">
    <span class="card-img"><img src="${p.cover}" alt="${p.title}" style="object-position:${p.pos}" loading="lazy" /></span>
    <span class="tile-title">${p.title}</span>
  </a>`
    )
    .join("")}
</section>`,
});

// ---------- About ----------
const about = page({
  title: `About — ${SITE.name}`,
  desc: `About ${SITE.name}, a ${SITE.role}.`,
  active: "about",
  bodyClass: "about-page",
  body: `
<section class="about-hero">
  <h1 class="h-xxl right" data-chars>I craft ideas, stories and <em>joyful interactions</em></h1>
</section>
<div class="about-photo" data-reveal="fade"><img src="/img/lab-selfie.webp" alt="${SITE.name} at work" style="object-position:center 35%" /></div>
<section class="about-text">
  <h3 class="h-l scrub" data-scrub>I approach design with a sense of quiet intention. My work lives at the intersection of structure and softness, where clarity is not forced but carefully shaped. I’m interested in how ideas take form, how vision becomes language through systems, visuals and thoughtful decisions that feel considered rather than ornamental.</h3>
</section>
<section class="experience">
  <div class="exp-inner">
    <h2 class="h-xl" data-lines>Experience</h2>
    <div class="exp-list">
      ${[
        ["2024 – Ongoing", "DAIICT, Gandhinagar", "M.Des"],
        ["2024", "Lynx", "Graphic Designer"],
        ["2023", "NIFT", "B.Des"],
      ]
        .map(([a, b, c]) => `<div class="exp-row" data-reveal><p>${a}</p><p>${b}</p><p>${c}</p></div>`)
        .join("")}
    </div>
  </div>
</section>`,
});

// ---------- Contact ----------
const contact = page({
  title: `Contact — ${SITE.name}`,
  desc: `Get in touch with ${SITE.name}.`,
  active: "contact",
  bodyClass: "contact-page",
  body: `
<section class="contact-hero">
  <h1 class="h-xxl center" data-chars>All great ideas are born from a <em>conversation</em></h1>
  <p class="contact-sub" data-reveal>No matter what stage of the process you're in, I recommend getting in touch.</p>
  <form class="form" id="contact-form" novalidate data-reveal>
    <label><span>Name</span><input name="name" type="text" placeholder="Jane Smith" autocomplete="name" required /></label>
    <label><span>Email Address</span><input name="email" type="email" placeholder="jane@email.com" autocomplete="email" required /></label>
    <label><span>How can I help you?</span><textarea name="message" rows="6" placeholder="Write your message here" required></textarea></label>
    <label><span>How did you hear about me?</span>
      <span class="select-wrap"><select name="source"><option value="">Select…</option><option>Google Search</option><option>LinkedIn</option><option>Instagram</option><option>Friends and Family</option></select></span>
    </label>
    <button class="pill pill-lg submit" type="submit">Submit form</button>
    <p class="form-note" role="status" aria-live="polite"></p>
  </form>
</section>`,
});

// ---------- Project pages ----------
const THEMES = {
  streetly: { bg: "#A8CDA9", ink: "#29471A", line: "#29471A", grid: "rgba(255,255,255,0.28)" },
  "railway-network": { bg: "#E8E0D0", ink: "#464646", line: "#C8703A", grid: "rgba(70,70,70,0.10)" },
  "bridging-the-trust-gap": { bg: "#F4F0EC", ink: "#3B3835", line: "#3B3835", grid: "rgba(59,56,53,0.08)" },
};
const hot = (key) =>
  (HOT[key] || [])
    .map((h) => {
      const fw = h.w / 1440, fh = h.h / 810, fl = h.x / 1440, ft = h.y / 810;
      const px = fw >= 1 ? 0 : (fl / (1 - fw)) * 100, py = fh >= 1 ? 0 : (ft / (1 - fh)) * 100;
      return `<i class="hot" aria-hidden="true" style="left:${(fl * 100).toFixed(3)}%;top:${(ft * 100).toFixed(3)}%;width:${(fw * 100).toFixed(3)}%;height:${(fh * 100).toFixed(3)}%;--r:${h.r};background-size:${(100 / fw).toFixed(3)}% ${(100 / fh).toFixed(3)}%;background-position:${px.toFixed(3)}% ${py.toFixed(3)}%;background-image:var(--pg)"></i>`;
    })
    .join("");

const projectPage = (p) =>
  page({
    bodyStyle: THEMES[p.slug] ? `--cream:${THEMES[p.slug].bg};--red:${THEMES[p.slug].ink};--text:${THEMES[p.slug].ink};--line:${THEMES[p.slug].line};--grid:${THEMES[p.slug].grid}` : "",
    themeColor: THEMES[p.slug]?.bg,
    title: `${p.title} — ${SITE.name}`,
    desc: p.blurb.slice(0, 150),
    active: "work",
    bodyClass: "project-page",
    og: p.cover,
    body: `
<section class="proj-head">
  <div class="proj-left">
    <h1 class="h-xxl" data-chars>${p.title}</h1>
    <p class="proj-desc" data-reveal>${p.blurb}</p>
  </div>
  <dl class="proj-meta" data-reveal>
    ${Object.entries(p.meta)
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${[].concat(v).map((x) => `<span>${x}</span>`).join("")}</dd></div>`)
      .join("")}
  </dl>
</section>
<section class="gallery${p.tight ? " tight" : ""}">
  ${p.gallery
    .map((g) =>
      g[0] === "full"
        ? `<figure class="g-full${HOT[g[1].split("-").pop()] && p.slug === "streetly" ? " g-hot" : ""}" data-reveal="${p.tight ? "fade" : "scale"}" style="--pg:url(/img/${g[1]}.webp)"><img src="/img/${g[1]}.webp" alt="${p.title}" loading="lazy" />${p.slug === "streetly" ? hot(g[1].split("-").pop()) : ""}${
            p.links?.[g[1]]
              ? `<a class="g-link" href="${p.links[g[1]].href.replace(/&/g, "&amp;")}" target="_blank" rel="noopener" aria-label="${p.links[g[1]].label}" style="left:${p.links[g[1]].left}%;top:${p.links[g[1]].top}%;width:${p.links[g[1]].width}%;height:${p.links[g[1]].height}%"></a>`
              : ""
          }</figure>`
        : `<div class="g-pair"><figure data-reveal="scale"><img src="/img/${g[1]}.webp" alt="${p.title}" loading="lazy" /></figure><figure data-reveal="scale"><img src="/img/${g[2]}.webp" alt="${p.title}" loading="lazy" /></figure></div>`
    )
    .join("")}
</section>`,
  });

// ---------- Legal ----------
const legal = (slug, title, text) =>
  page({
    title: `${title} — ${SITE.name}`,
    desc: `${title} for ${SITE.name}'s portfolio.`,
    active: "",
    bodyClass: "legal-page",
    body: `<section class="legal"><h1 class="h-xxl" data-chars>${title}</h1><div class="legal-body" data-reveal>${text}</div></section>`,
  });

const out = {
  "index.html": home,
  "projects.html": projectsPage,
  "about.html": about,
  "contact.html": contact,
  "legal/privacy-policy.html": legal(
    "privacy-policy",
    "Privacy Policy",
    `<p>This portfolio is a personal website. It does not use accounts and does not sell or share personal data.</p><p>If you send a message through the contact form, your email app opens with the message prepared; nothing is stored on this site. Basic, anonymous hosting logs may be kept by the hosting provider.</p><p>Questions? Write to <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>`
  ),
  "legal/terms-of-use.html": legal(
    "terms-of-use",
    "Terms of Use",
    `<p>All case studies, images and written content on this site are the work of ${SITE.name} unless stated otherwise, and may not be reused without permission.</p><p>The site is provided as is, for information about ${SITE.name}'s design work.</p>`
  ),
  "legal/cookie-policy.html": legal(
    "cookie-policy",
    "Cookie Policy",
    `<p>This site does not set tracking or advertising cookies. Fonts are loaded from Google Fonts, which may process your IP address to serve the files.</p>`
  ),
};
for (const p of projects) out[`projects/${p.slug}.html`] = projectPage(p);

mkdirSync("projects", { recursive: true });
mkdirSync("legal", { recursive: true });
for (const [f, html] of Object.entries(out)) writeFileSync(f, html);
console.log("built", Object.keys(out).length, "pages");
