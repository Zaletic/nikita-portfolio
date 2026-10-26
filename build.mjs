// Static site generator: `node build.mjs` writes every page next to this file.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
const HOT = JSON.parse(readFileSync(new URL("./streetly-hotspots.json", import.meta.url), "utf8"));

import { groomcueDoc } from "./groomcue-doc.mjs";
import { streetlyDoc } from "./streetly-doc.mjs";
import { dumpSection } from "./dump.mjs";
import { ridepodInterview } from "./ridepod-interview.mjs";
import { vrDoc } from "./vr-doc.mjs";
const SITE = {
  name: "Nikita Bangia",
  role: "UI/UX Designer",
  email: "bangia.nikita@gmail.com",
  linkedin: "https://www.linkedin.com/in/nikitabangia",
  instagram: "https://www.instagram.com/kitta.ni.kitta/",
  resume: "/resume.pdf",
};

const allProjects = [
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
    docHtml: streetlyDoc,
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
    hidden: true,
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
    extraHtml: ridepodInterview,
    fig: "tap",
    homeImg: "/img/ridepod-card-v3.webp",
    homeTitle: "DAU RidePod - Kiosk UI &amp; Human Factors",
    title: "DAU RidePod",
    cover: "/img/ridepod-card-v3.webp",
    tight: true,
    pos: "center",
    blurb:
      "A self-service e-bike vending kiosk and smart docking system that lets DAU students rent a bike for short trips off campus in under a minute, designed through the lens of human factors in interaction design.",
    meta: { Duration: "18 days", Timeline: "April 2026", Role: ["Interaction Designer", "UX Researcher"], Course: "Human Factors in Interaction Design" },
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
    homeImg: "/img/groomcue-card-v2.webp",
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
  {
    slug: "vr-tattoo-studio",
    fig: "tap",
    homeImg: "/img/vr-tattoo-card2.webp",
    homeVideo: "/video/vr-tattoo-loop-v2.mp4",
    homeTitle: "VR Tattoo Studio - Immersive VR Experience",
    title: "VR Tattoo Studio",
    cover: "/img/vr-tattoo-card2.webp",
    tight: true,
    pos: "center",
    blurb:
      "VR Tattoo Studio reimagines the tattoo parlour as an immersive space for cultural learning. Users step from a virtual studio through a portal into the world of a Māori tribe of New Zealand, meeting its culture first-hand, then return carrying a tattoo on their hand as a memory of the journey.",
    meta: { Type: "VR Experience", "Tools Used": "Blender and Unity", Focus: ["Interactive Experience", "Cultural Storytelling"] },
    docHtml: vrDoc,
    gallery: [],
  },
];
const projects = allProjects.filter((p) => !p.hidden);

const nav = (active) => `
<header class="nav">
  <a class="logo" href="/" aria-label="${SITE.name} — home">${SITE.name}</a>
  <nav class="nav-links" aria-label="Main">
    <a class="pill${active === "work" ? "" : ""}" href="/projects">Work</a>
    <a class="pill${active === "about" ? "" : ""}" href="/about">About</a>
    <a class="pill" href="#connect" data-connect>Connect</a>
  </nav>
</header>`;

const footer = `
<footer class="footer" id="connect">
  <div class="footer-top">
    <div>
      <h3 class="footer-title" data-lines>Get in touch today to discuss how I can bring thoughtful design to your next product.</h3>
    </div>
    <div class="footer-photo" data-reveal><img src="/img/footer-portrait.webp" alt="${SITE.name}" loading="lazy" /></div>
  </div>
  <hr class="footer-rule" />
  <div class="footer-cols">
    <div class="footer-mail">
      <div class="mail-row"><a class="serif-link big" href="mailto:${SITE.email}">${SITE.email}</a><button class="copy-btn" type="button" data-copy="${SITE.email}" aria-label="Copy email address"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg><span class="copy-tip" role="status">Copied!</span></button></div>
    </div>
    <div>
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
<link rel="stylesheet" href="/css/style.css?v=vr5" />
</head>
<body class="${bodyClass}"${bodyStyle ? ` style="${bodyStyle}"` : ""}>
${nav(active)}
<main>
${body}
</main>
${footer}
<script>(function(){var h=location.hash;if(h.indexOf("#p-")!==0)return;var e=document.getElementById(h.slice(1));if(!e)return;var y=e.getBoundingClientRect().top+scrollY-innerHeight*0.22;window.scrollTo({top:y,behavior:"instant"});})();</script>
${figs ? `<script>window.__figs={};window.hairline=function(f){window.__figs[f.name]=f}</script>
<script src="/js/hairline-kernel.js" defer></script>
${projects.map((p) => `<script type="module" src="/hairline/${p.fig}.js"></script>`).join("")}
` : ""}<script src="/js/main.js?v=back6" defer></script>
</body>
</html>
`;

const smile1 = `<svg class="smiley" viewBox="0 0 68 68" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" aria-hidden="true"><circle cx="34" cy="34" r="31"/><path d="M23 40c3 8 19 8 22 0"/><path d="M24 24v6M44 24v6"/></svg>`;
const smile2 = `<svg class="smiley" viewBox="0 0 68 68" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" aria-hidden="true"><circle cx="34" cy="34" r="31"/><path d="M18 40c4 10 28 10 32 0"/><path d="M20 28c2-5 8-5 10 0M38 28c2-5 8-5 10 0"/></svg>`;

const chip = (id, imgs) =>
  `<span class="chip" data-chip="${id}">${imgs.map((s, i) => `<img src="/img/${s}.webp" alt=""${i ? "" : ' class="on"'} />`).join("")}</span>`;

// ---------- Home ----------
const icon = (name) =>
  readFileSync(new URL(`./icons/${name}.svg`, import.meta.url), "utf8")
    .replace(/<title>.*?<\/title>/, "")
    .replace("<svg ", '<svg aria-hidden="true" ');
const stackCol = (title, items, withDesc) => `
    <div class="stack-col">
      <h2 class="h-xl" data-lines>${title}</h2>
      <div class="svc-list">${items
        .map(
          ([t, ic, d]) => `
        <div class="svc svc-c" data-reveal>
          <span class="svc-ico">${icon(ic)}</span>
          <div class="svc-t"><span>${t}</span></div>${withDesc ? `
          <p class="svc-d">${d}</p>` : ""}
        </div>`
        )
        .join("")}
      </div>
    </div>`;
const stackSection = (cols) => `<section class="services">
  <div class="services-inner stack-grid">${cols.join("")}
  </div>
</section>`;

const home = page({
  title: `${SITE.name} — ${SITE.role} Portfolio`,
  desc: `${SITE.name} is a ${SITE.role} crafting design solutions and visual stories.`,
  active: "",
  bodyClass: "home",
  body: `
<section class="hero">
  <h1 class="hero-title" aria-label="Product Designer crafting experiences, interactions and visual stories">
    <span class="row"><span class="w">Product</span> ${chip(1, ["chip-lab-plaid", "chip-dau", "chip-nift"])} <span class="w">Designer</span></span>
    <span class="row"><span class="w it">crafting</span> <span class="w ico">${smile1}</span> <span class="w">experiences</span> ${chip(2, ["street-camera", "chip-sushi", "chip-lab-pose"])}</span>
    <span class="row"><span class="w">interactions</span> ${chip(3, ["chip-hillflower", "beach", "hills"])} <span class="w">&amp;</span> <span class="w it">visual</span> <span class="w it">stories</span> <span class="w ico">${smile2}</span></span>
  </h1>
</section>

<section class="work-scatter" aria-label="Selected work">
  ${projects
    .map(
      (p, i) => `
  <a class="card scatter s${[1, 2, 5, 4, 3][i]}" id="p-${p.slug}" href="/projects/${p.slug}" data-grow>
    <span class="card-img">${p.homeVideo ? `<video src="${p.homeVideo}" poster="${p.homeImg}" autoplay muted loop playsinline preload="auto" aria-label="${p.title}"></video>` : `<img src="${p.homeImg || p.cover}" alt="${p.title}" style="object-position:${p.pos}" loading="lazy" />`}</span>
    <span class="card-title">${p.homeTitle || p.title}</span>
  </a>`
    )
    .join("")}
</section>

<div class="show-more"><a class="show-more-link" href="/projects">Show more</a></div>

<section class="am">
  <p class="am-t" data-reveal><span class="am-img" role="img" aria-label="${SITE.name}"></span>I’m <span class="am-n">Nikita</span>. A designer who loves creating and curating, driven by curiosity, Exploring Interactions, experiences and the ideas that live between them.</p>
</section>

${stackSection([
        stackCol("Stack", [
          ["Figma", "figma", "Interface design, prototypes and design systems."],
          ["Framer", "framer", "Turning designs into live, interactive websites."],
          ["Blender", "blender", "3D product visuals and renders for concepts."],
          ["Illustrator", "adobeillustrator", "Illustration, icons and brand graphics."],
          ["Procreate", "procreate", "Sketching, illustration and hand-drawn concepts."],
          ["Unity", "unity", "Building immersive VR experiences and prototypes."],
        ], true),
        stackCol("AI Assistance", [
          ["Claude", "claude", "Writing, analysis and thinking through ideas."],
          ["Claude Code", "claudecode", "Building and shipping working code from prompts."],
          ["ChatGPT", "openai", "Brainstorming, copy drafts and quick research."],
          ["Replit", "replit", "Spinning up and testing app ideas in the browser."],
          ["Lovable", "lovable", "Turning prompts into working app concepts."],
          ["Perplexity", "perplexity", "Sourced answers for research and fact-checking."],
        ], true),
      ])}

${dumpSection()}
`,
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
  <a class="card tile" id="p-${p.slug}" href="/projects/${p.slug}" data-reveal="scale">
    <span class="card-img">${p.homeVideo ? `<video src="${p.homeVideo}" poster="${p.homeImg}" autoplay muted loop playsinline preload="auto" aria-label="${p.title}"></video>` : `<img src="${p.homeImg || p.cover}" alt="${p.title}" loading="lazy" />`}</span>
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
<div class="about-photo" data-reveal="fade"><img src="/img/about-studio.webp" alt="${SITE.name} at work" /></div>
<section class="experience">
  <div class="exp-inner">
    ${[
      ["Education", [
        ["2025 – Now", "Dhirubhai Ambani University", "M.Des, Intelligent User Experience Design", "Gandhinagar, Gujarat. A postgraduate programme in Intelligent User Experience Design, focused on research-led UX, interaction and immersive design. My recent projects, from Streetly and DAU RidePod to GroomCue and the VR Tattoo Studio, come from this work."],
        ["2019 – 2023", "NIFT", "B.Des", "Gandhinagar, Gujarat. An undergraduate degree in design at the National Institute of Fashion Technology, where I built a foundation in textiles, colour, pattern and weave, as seen in the swatches in my Artsy, Crafty Dump."],
      ]],
      ["Experience", [
        ["2024", "Lynx Designers &amp; Creators", "Graphic Designer", "At Lynx Designers &amp; Creators, I worked on graphic design and packaging for gifting products, creating CADs, digital prints, and print-ready artwork. I also developed product mockups and portfolio documentation while researching design trends to shape market-relevant collections. My work involved collaborating with the design team and using Adobe Illustrator, Photoshop, InDesign, and Procreate."],
      ]],
    ]
      .map(
        ([h, rows]) => `<div class="exp-group"><h2 class="h-xl" data-lines>${h}</h2>
    <div class="exp-list">
      ${rows.map(([a, b, c, d]) => `<div class="exp-item" data-reveal><button class="exp-row" type="button" aria-expanded="false"><span class="exp-plus" aria-hidden="true">+</span><p>${a}</p><p>${b}</p><p>${c}</p></button><div class="exp-more"><div><p>${d}</p></div></div></div>`).join("")}
    </div></div>`
      )
      .join("")}
  </div>
</section>`,
});

// ---------- Project pages ----------
const THEMES = {
  streetly: { bg: "#A8CDA9", ink: "#29471A", line: "#29471A", grid: "rgba(255,255,255,0.28)" },
  "railway-network": { bg: "#F4EBE2", ink: "#1F3A3A", line: "#C8703A", grid: "rgba(31,58,58,0.08)" },
  "dau-ridepod": { bg: "#DCEEF7", ink: "#0B3A57", line: "#0A8FC4", grid: "rgba(11,58,87,0.07)" },
  "vr-tattoo-studio": { bg: "#1C1714", ink: "#F3E7D6", accent: "#E8793B", line: "#E8793B", grid: "rgba(243,231,214,0.07)" },
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
<div class="proj-wrap">
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
${p.extraHtml || ""}
<div class="back-bottom"><a class="pill pill-lg" href="/projects">All featured Work</a></div>
<div class="back-dock"><a class="pill back-fixed" href="/projects" aria-label="Back to all work">← Back</a></div>
</div>`,
  });

const out = {
  "index.html": home,
  "projects.html": projectsPage,
  "about.html": about,
};
for (const p of projects) out[`projects/${p.slug}.html`] = projectPage(p);

mkdirSync("projects", { recursive: true });
for (const [f, html] of Object.entries(out)) writeFileSync(f, html);
console.log("built", Object.keys(out).length, "pages");
