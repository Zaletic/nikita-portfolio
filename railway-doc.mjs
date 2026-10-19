// Railway Network case study as a native, scrollable document (same family as GroomCue).
const I = (f, alt = "", cls = "") => `<img class="${cls}" src="/img/railway/${f}.webp" alt="${alt}" loading="lazy" />`;
const lab = (t) => `<div class="d-lab">${t}</div>`;

// ---- Illustration 1: cover network (a few highlighted stations on a faint web)
const nodes = [
  [210, 40, 0], [60, 190, 0], [160, 120, 0], [150, 400, 0], [20, 330, 0], [330, 300, 0],
  [250, 440, 0], [440, 190, 0], [450, 330, 0], [370, 560, 0], [520, 590, 0], [560, 250, 0],
  [100, 520, 0], [300, 640, 0], [610, 400, 0], [640, 120, 0],
  [90, 240, 1], [260, 190, 2], [370, 250, 1], [510, 160, 1], [390, 400, 1],
];
const edges = [[0, 2], [2, 1], [1, 4], [4, 12], [12, 13], [13, 9], [9, 10], [10, 14], [14, 8], [8, 7], [7, 11], [11, 15], [3, 6], [6, 9], [3, 5], [5, 8], [2, 5], [7, 15]];
const bold = [[16, 17], [17, 18], [18, 19], [19, 20], [20, 16], [17, 20]];
const net = `<svg class="r-net" viewBox="0 0 680 700" fill="none" role="img" aria-label="A web of stations with a few highlighted routes">
  ${edges.map(([a, b]) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="#B9AEA2" stroke-width="1.4"/>`).join("")}
  ${bold.map(([a, b]) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="#1F3A3A" stroke-width="2"/>`).join("")}
  ${nodes.map(([x, y, t]) => `<circle cx="${x}" cy="${y}" r="${t ? 11 : 8}" fill="${t === 2 ? "#C8703A" : t === 1 ? "#1F3A3A" : "#C9BFB4"}"/>`).join("")}
</svg>`;

// ---- Illustration 2: schematic line map of the five divisions (transit-map style, not to scale)
const dv = (x, y, name, dy) =>
  `<circle cx="${x}" cy="${y}" r="13" fill="#F4EBE2" stroke="#1F3A3A" stroke-width="4"/><text x="${x}" y="${y + dy}" text-anchor="middle" class="r-st">${name}</text>`;
const lineMap = `<svg class="r-map" viewBox="0 0 760 460" fill="none" role="img" aria-label="Schematic map: Mumbai connects to Pune and Solapur in the south-east, and to Bhusawal and Nagpur in the north-east">
  <path d="M120 300 L215 240 L330 150 L470 150 L600 90 L700 90" stroke="#76A8B2" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M120 300 L215 240 L260 320 L400 380 L560 380" stroke="#C8703A" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="215" cy="240" r="6" fill="#F4EBE2" stroke="#1F3A3A" stroke-width="2.5"/><text x="200" y="222" text-anchor="end" class="r-sm">Kalyan</text>
  ${dv(120, 300, "Mumbai CSMT", 44)}
  ${dv(330, 150, "Bhusawal", -24)}
  ${dv(600, 90, "Nagpur", -24)}
  ${dv(260, 320, "Pune", 44)}
  ${dv(560, 380, "Solapur", 44)}
  <g transform="translate(24 20)"><rect width="190" height="66" rx="10" fill="#FBF6F0" stroke="#E3D5C6"/>
    <line x1="16" y1="24" x2="48" y2="24" stroke="#76A8B2" stroke-width="8" stroke-linecap="round"/><text x="60" y="29" class="r-sm">Towards Nagpur</text>
    <line x1="16" y1="48" x2="48" y2="48" stroke="#C8703A" stroke-width="8" stroke-linecap="round"/><text x="60" y="53" class="r-sm">Towards Solapur</text></g>
  <text x="24" y="446" class="r-sm" opacity=".8">Schematic, not to scale</text>
</svg>`;

// ---- Illustration 3: the five layers of information as an exploded stack
const rh = (cx, cy, w = 150, h = 56) => `${cx - w},${cy} ${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h}`;
const layers = [["Stations", 70], ["Routes", 150], ["Divisions", 230], ["Geography", 310], ["Context", 390]];
const cx = 190;
const stack = `<svg class="r-stack" viewBox="0 0 640 470" fill="none" role="img" aria-label="Five stacked layers: stations, routes, divisions, geography, context">
  <defs><clipPath id="rhd"><polygon points="${rh(cx, 230)}"/></clipPath></defs>
  <g stroke="#1F3A3A" stroke-opacity=".28" stroke-dasharray="3 5"><line x1="${cx - 150}" y1="70" x2="${cx - 150}" y2="390"/><line x1="${cx + 150}" y1="70" x2="${cx + 150}" y2="390"/></g>
  <polygon points="${rh(cx, 390)}" fill="#C9B79B"/><path d="M${cx - 90} 395 q30 -26 60 -4 t70 -12 M${cx - 40} 410 q40 -14 80 0" stroke="#8C7B5C" stroke-width="2"/>
  <polygon points="${rh(cx, 310)}" fill="#EADFCD" stroke="#B9AEA2" stroke-width="2"/><path d="M${cx - 100} 312 L${cx - 30} 290 L${cx + 40} 306 L${cx + 100} 288" stroke="#B9AEA2" stroke-width="2"/>
  <g clip-path="url(#rhd)"><polygon points="${rh(cx, 230)}" fill="#E7B58A"/>
    <polygon points="${cx},174 ${cx + 150},230 ${cx + 40},230 ${cx},200" fill="#9FC0C6"/><polygon points="${cx - 150},230 ${cx - 40},230 ${cx - 10},286 ${cx},286" fill="#C9D3A4"/><polygon points="${cx + 40},230 ${cx + 150},230 ${cx},286" fill="#E3C58A"/></g>
  <polygon points="${rh(cx, 230)}" stroke="#1F3A3A" stroke-opacity=".4" stroke-width="2"/>
  <polygon points="${rh(cx, 150)}" fill="#F7EFE4" stroke="#B9AEA2" stroke-width="2"/><path d="M${cx - 110} 154 L${cx - 40} 130 L${cx + 10} 150 L${cx + 70} 120 L${cx + 120} 140 M${cx - 40} 130 L${cx - 20} 170 M${cx + 10} 150 L${cx + 50} 176" stroke="#C8703A" stroke-width="3" stroke-linecap="round"/>
  <polygon points="${rh(cx, 70)}" fill="#FBF6F0" stroke="#B9AEA2" stroke-width="2"/>
  ${[[-70, 74], [-30, 58], [10, 80], [50, 64], [90, 72], [-10, 66], [30, 50], [-50, 84], [70, 84]].map(([dx, y]) => `<circle cx="${cx + dx}" cy="${y}" r="4" fill="#1F3A3A"/>`).join("")}
  ${layers.map(([n, y], i) => `<line x1="${cx + 150}" y1="${y}" x2="${cx + 215}" y2="${y}" stroke="#1F3A3A" stroke-opacity=".4"/><circle cx="${cx + 215}" cy="${y}" r="5" fill="${["#1F3A3A", "#C8703A", "#E3A24A", "#B9AEA2", "#76A8B2"][i]}"/><text x="${cx + 232}" y="${y + 6}" class="r-lay">${n}</text>`).join("")}
</svg>`;

const board = [
  ["1853", "First train", "16 April, from Boribunder to Thane, a modest 33 km."],
  ["1951", "Central Railway formed", "Carved out of the erstwhile GIP Railway on 5 November."],
  ["4,385", "Route kilometres", "The network as laid out on the map."],
  ["7,858", "Running track kilometres", "Every track that trains actually run on."],
  ["499", "Stations", "Spread across five divisions."],
];
const ia = ["Zones", "History", "Divisions", "Routes", "Passenger Load", "Safety"];

const LIVE_URL = ""; // set when the live website link is known

export const railwayDoc = `
<div class="doc rw">

<section class="d-hero r-hero" data-reveal>
  <div>
    ${lab("Information design · Case study")}
    <h2 class="d-h d-xl">A sprawling network, <em>made easy to read.</em></h2>
    <p class="d-lede">A visual and interactive exploration of the Central Indian railway network, mapping zones, history, divisions and routes through information design.</p>
  </div>
  <div class="r-netwrap">${net}</div>
</section>

<section class="d-sec" data-reveal>
  ${lab("01 · Brief")}
  <div class="d-split d-top">
    <h2 class="d-h">Mapping the Central Indian Railway Network</h2>
    <div>
      <p class="r-obj"><span>Project objective</span>To explore how railway network information can be transformed into a clear, structured, and visually engaging digital experience using information design.</p>
      <p class="d-p">The project explores how railway network information can be organised and communicated through an <b>interactive digital experience</b>. By combining geographical mapping, structured data, and visual representation, I explored ways to make the network easier to navigate and understand.</p>
      <p class="d-p">The outcome is a website concept that brings railway information into a unified visual experience.</p>
    </div>
  </div>
  <div class="r-scene">${I("landscape", "Illustration of hills, trees and a viaduct")}</div>
</section>

<section class="d-sec" data-reveal>
  ${lab("02 · Design challenge")}<h2 class="d-h">Making complex data easier to understand</h2>
  <div class="d-split d-top">
    <p class="d-p">Railway information exists across different geographical and administrative layers. Presenting these relationships in a single view can become visually overwhelming when every piece of information competes for attention.</p>
    <ol class="d-list r-list"><li><span>01</span>Routes connect stations</li><li><span>02</span>Divisions organise railway operations</li><li><span>03</span>Larger networks link different regions</li></ol>
  </div>
  <p class="d-quote r-q"><b>The challenge:</b> translate this complexity into a coherent visual language that communicates the structure of the network while keeping the information organised and approachable.</p>
  <div class="r-train">${I("train", "A steam train on a track")}</div>
</section>

<section class="d-sec" data-reveal>
  ${lab("03 · Research and understanding")}<h2 class="d-h">Understanding the network</h2>
  <p class="d-p d-narrow">Before exploring the visual direction, I looked into the structure of the railway network, including its geographical spread, railway divisions, routes, and historical context.</p>
  <div class="r-boardwrap">
    <div class="r-board" role="table" aria-label="Central Railway at a glance">
      <div class="r-bh"><span>Central Railway</span><span>At a glance</span></div>
      ${board.map(([n, t, d]) => `<div class="r-row" role="row"><b>${n}</b><div><strong>${t}</strong><i>${d}</i></div></div>`).join("")}
    </div>
    <div class="r-mapcard"><div class="d-k">Five divisions</div>${lineMap}<p class="r-src">Source: Central Railway, public information</p></div>
  </div>
  <div class="d-split r-layers">
    <div class="r-shot">${stack}</div>
    <div>
      <h3 class="d-sub r-sub">Types of information</h3>
      <p class="d-p">The network consists of different layers of information that needed to be organised and represented: stations, routes, divisions, the geography they sit on, and the wider context around them.</p>
    </div>
  </div>
  <h3 class="d-sub">What I referred to</h3>
  <div class="r-src3">
    <figure><div class="r-pic">${I("zones-table", "Table listing railway zones and divisions")}</div><figcaption>A portion of organised data used for mapping the network.</figcaption></figure>
    <figure><div class="r-pic">${I("system-map", "Official Central Railway system map")}</div><figcaption>Official railway maps, division details and public data used to understand the structure.</figcaption></figure>
    <figure><div class="r-pic">${I("geo-map", "Map of the states Central Railway covers")}</div><figcaption><b>Geographical context:</b> Central Railway spans multiple states and connects with other railway zones.</figcaption></figure>
  </div>
</section>

<section class="d-sec" data-reveal>
  ${lab("04 · Information architecture")}<h2 class="d-h">One scroll, six sections</h2>
  <ol class="r-line">${ia.map((s, i) => `<li><span class="r-no">0${i + 1}</span><i class="r-dot"></i><b>${s}</b></li>`).join("")}</ol>
</section>

<section class="d-sec" data-reveal>
  ${lab("05 · Visual exploration")}<h2 class="d-h">Initial exploration</h2>
  <div class="d-split d-top">
    <div>
      <p class="d-p">The exploration focused on how these elements could be represented consistently, while maintaining a clear distinction between the different layers of information.</p>
      <p class="d-p">This stage helped establish a visual direction for the website, considering how layout, hierarchy, mapping, and graphical elements could work together.</p>
    </div>
    <div class="d-img r-sk">${I("sketches", "Hand sketches: route comparison, division-based maps and website layouts")}</div>
  </div>
</section>

<section class="d-sec r-site" data-reveal>
  ${lab("06 · The website")}<h2 class="d-h">Check out the final website</h2>
  <p class="d-p d-narrow">The website is the primary outcome of the project: a digital space for presenting the railway network through maps, structured information, and visual exploration.</p>
  <div class="r-tools"><span>Tools used</span><b>Figma</b><b>Framer</b></div>
  ${LIVE_URL ? `<a class="r-btn" href="${LIVE_URL}" target="_blank" rel="noopener">View live website <span aria-hidden="true">↗</span></a>` : ""}
</section>

</div>`;
