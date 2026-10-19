// Static site generator: `node build.mjs` writes every page next to this file.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
const HOT = JSON.parse(readFileSync(new URL("./streetly-hotspots.json", import.meta.url), "utf8"));

import { groomcueDoc } from "./groomcue-doc.mjs";
const SITE = {
  name: "Nikita Bangia",
  role: "UI/UX Designer",
  email: "bangia.nikita@gmail.com",
  linkedin: "https://www.linkedin.com/in/nikitabangia",
  instagram: "https://www.instagram.com/kitta.ni.kitta/",
  resume: "/resume.pdf",
};

const projects = [
  {
    slug: "streetly",
    fig: "streetly",
    homeImg: "/img/streetly-card-v2.webp",
    homeTitle: "STREETLY - UI/UX Design",
    title: "Streetly",
    cover: "/img/streetly-cover.webp",
    pos: "left center",
    blurb:
      "Streetly is an e-bike rental app that helps people compare options and book the nearest ride. The goal was a calm, map-first experience that makes a new kind of commute feel simple and trustworthy.",
    meta: { Duration: "2-3 weeks", Timeline: "May 2026", Role: "UI/UX Designer", Skills: ["Product Design", "UX Research"] },
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
    homeImg: "/img/railway-card-v3.webp",
    homeTitle: "Railway Network - Information &amp; UI Design",
    title: "Railway Network",
    cover: "/img/railway-cover.webp",
    tight: true,
    pos: "center",
    blurb:
      "A visual and interactive exploration of the Central Indian railway network, mapping zones, history, divisions and routes through information design so a complex system becomes easy to understand.",
    meta: { Duration: "2 weeks", Timeline: "March 2026", Role: ["Information Designer", "UI Designer"], "Tools Used": "Figma and Framer" },
    gallery: [
      ["full", "railway-pdf/page-01"],
      ["full", "railway-pdf/page-02"],
      ["full", "railway-pdf/page-03"],
      ["full", "railway-pdf/page-04"],
      ["full", "railway-pdf/page-05"],
      ["full", "railway-pdf/page-06"],
      ["full", "railway-pdf/page-07"],
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
  {
    slug: "dau-ridepod",
    fig: "tap",
    homeImg: "/img/ridepod-card-v2.webp",
    homeTitle: "DAU RidePod - Kiosk UI &amp; Human Factors",
    title: "DAU RidePod",
    cover: "/img/ridepod-card-v2.webp",
    tight: true,
    pos: "center",
    blurb:
      "A self-service e-bike vending kiosk and smart docking system that lets DAU students rent a bike for short trips off campus in under a minute, designed through the lens of human factors in interaction design.",
    meta: { Programme: "M.Des IUxD, DAU", Type: "Team project of four", Focus: ["Interaction Design", "Human Factors"], Course: "Human Factors in Interaction Design" },
    gallery: [
      ["full", "ridepod-pdf/page-01"],
      ["full", "ridepod-pdf/page-02"],
      ["full", "ridepod-pdf/page-03"],
      ["full", "ridepod-pdf/page-04"],
      ["full", "ridepod-pdf/page-05"],
      ["full", "ridepod-pdf/page-06"],
      ["full", "ridepod-pdf/page-07"],
      ["full", "ridepod-pdf/page-08"],
      ["full", "ridepod-pdf/page-09"],
      ["full", "ridepod-pdf/page-10"],
      ["full", "ridepod-pdf/page-11"],
      ["full", "ridepod-pdf/page-12"],
      ["full", "ridepod-pdf/page-13"],
      ["full", "ridepod-pdf/page-14"],
      ["full", "ridepod-pdf/page-15"],
      ["full", "ridepod-pdf/page-16"],
      ["full", "ridepod-pdf/page-17"],
      ["full", "ridepod-pdf/page-18"],
    ],
  },
  {
    slug: "groomcue",
    fig: "tap",
    homeImg: "/img/groomcue-card.webp",
    homeTitle: "GroomCue - Phygital Product Design",
    title: "GroomCue",
    cover: "/img/groomcue-card.webp",
    tight: true,
    pos: "center",
    blurb:
      "A phygital grooming companion for small dogs. GroomCue keeps a dog calm and engaged through light, sound and treats, so the groomer can stay focused on grooming.",
    meta: { Duration: "3 weeks", Timeline: "July/Aug 2026", Role: "Product Designer", Deliverables: "PoC / Prototype" },
    docHtml: groomcueDoc,
    gallery: [],
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
      <div class="mail-row"><a class="serif-link big" href="mailto:${SITE.email}">${SITE.email}</a><button class="copy-btn" type="button" data-copy="${SITE.email}" aria-label="Copy email address"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg><span class="copy-tip" role="status">Copied!</span></button></div>
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
      <a class="serif-link" href="${SITE.resume}" target="_blank" rel="noopener">Resume</a>
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
<script>document.documentElement.className="js";try{history.scrollRestoration="manual"}catch(e){}var K="sy:"+location.pathname;addEventListener("pagehide",function(){try{sessionStorage.setItem(K,scrollY)}catch(e){}});addEventListener("pageshow",function(){var n=performance.getEntriesByType("navigation")[0],y=0;try{if(n&&n.type==="back_forward")y=+sessionStorage.getItem(K)||0}catch(e){}if(location.hash&&!y)return;scrollTo(0,y);if(y)setTimeout(function(){scrollTo(0,y)},350)});</script>
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
    <span class="row"><span class="w">UI/UX</span> ${chip(1, ["lab-studio", "headphones", "bw-profile"])} <span class="w">Designer</span></span>
    <span class="row"><span class="w it">crafting</span> <span class="w ico">${smile1}</span> <span class="w">design</span> <span class="w">solutions</span> ${chip(2, ["park-smile", "street-camera", "cat"])}</span>
    <span class="row"><span class="w">and</span> ${chip(3, ["hills", "beach", "red-kurta"])} <span class="w it">visual</span> <span class="w it">stories</span> <span class="w ico">${smile2}</span></span>
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
    <span class="card-img"><img src="${p.homeImg || p.cover}" alt="${p.title}" loading="lazy" /></span>
    <span class="card-title">${p.homeTitle || p.title}</span>
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
<div class="about-resume" data-reveal><a class="pill pill-lg" href="${SITE.resume}" target="_blank" rel="noopener">View resume</a></div>
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
  "railway-network": { bg: "#F4EBE2", ink: "#1F3A3A", line: "#C8703A", grid: "rgba(31,58,58,0.08)" },
  "dau-ridepod": { bg: "#DCEEF7", ink: "#0B3A57", line: "#0A8FC4", grid: "rgba(11,58,87,0.07)" },
  groomcue: { bg: "#004B87", ink: "#FFFFFF", accent: "#FFC928", line: "#FFC928", grid: "rgba(255,255,255,0.08)" },
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
    themeColor: THEMES[p.slug]?.bg,
    title: `${p.title} — ${SITE.name}`,
    desc: p.blurb.slice(0, 150),
    active: "work",
    bodyClass: "project-page",
    og: p.cover,
    body: `
${THEMES[p.slug] ? `<style>body.case-on{--cream:${THEMES[p.slug].bg};--red:${THEMES[p.slug].accent || THEMES[p.slug].ink};--text:${THEMES[p.slug].ink};--line:${THEMES[p.slug].line};--grid:${THEMES[p.slug].grid}}</style>` : ""}
<a class="pill back-fixed" href="/projects" aria-label="Back to all work">← Back</a>
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
${p.docHtml ? p.docHtml : `<section class="gallery${p.tight ? " tight" : ""}">
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
</section>`}
<div class="back-bottom"><a class="pill pill-lg" href="/projects">All featured Work</a></div>`,
  });

const out = {
  "index.html": home,
  "projects.html": projectsPage,
  "about.html": about,
  "contact.html": contact,
};
for (const p of projects) out[`projects/${p.slug}.html`] = projectPage(p);

mkdirSync("projects", { recursive: true });
for (const [f, html] of Object.entries(out)) writeFileSync(f, html);
console.log("built", Object.keys(out).length, "pages");
