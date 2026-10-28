// Railway Network case study as a native page, reusing the illustrations from the original slides.
const lab = (t) => `<div class="rw-lab">${t}</div>`;
const I = (f, alt, cls = "") => `<img class="${cls}" src="/img/railway/${f}.webp" alt="${alt}" loading="lazy" />`;

const stops = [
  ["Zones", "The network is split into 17 railway zones, each with its own headquarters and a set of divisions."],
  ["History", "It began with the first train on the Indian subcontinent in 1853, a 33 km run from Bombay to Thane."],
  ["Divisions", "Central Railway is organised into five divisions: Mumbai, Bhusawal, Nagpur, Solapur and Pune."],
  ["Routes", "Routes link 499 stations across 4,385 route kilometres, drawn as a clear line diagram."],
  ["Passenger Load", "Around 6 lakh passengers travel every day, so busy corridors need to read at a glance."],
  ["Safety", "A closing section keeps safety information close to the routes people actually travel."],
];

const layers = ["Stations", "Routes", "Divisions", "Geography", "Context"];

export const railwayDoc = `
<div class="rw">

<section class="rw-hero" data-reveal>
  ${lab("Information design · Case study")}
  <div class="rw-hero-grid">
    <div>
      <h2 class="rw-h rw-xl">A railway map you can read in one scroll.</h2>
      <p class="rw-p">Routes, divisions and zones all compete for attention. This project turns them into a calm, layered website for the Central Indian railway network.</p>
    </div>
    <div class="rw-net">${I("network", "Network of connected stations", "rw-net-img")}</div>
  </div>
</section>

<section class="rw-sec rw-brief" data-reveal>
  <div class="rw-split">
    <div>${lab("Brief")}<h2 class="rw-h">Mapping the Central Indian Railway Network</h2></div>
    <div>
      <h3 class="rw-sub">Project objective</h3>
      <p class="rw-p">To explore how railway network information can be transformed into a clear, structured and visually engaging digital experience using information design.</p>
      <p class="rw-p">By combining geographical mapping, structured data and visual representation, I explored ways to make the network easier to navigate and understand. The outcome is a website concept that brings railway information into one unified visual experience.</p>
    </div>
  </div>
  <div class="rw-hills" aria-hidden="true">${I("hills2", "")}</div>
</section>

<section class="rw-sec" data-reveal>
  <div class="rw-split">
    <div>${lab("Design challenge")}<h2 class="rw-h">Making complex data easier to understand.</h2></div>
    <div>
      <p class="rw-p">Railway information exists across geographical and administrative layers. Routes connect stations, divisions organise operations, and larger networks link regions. Showing all of it in one view becomes overwhelming when every piece competes for attention.</p>
      <p class="rw-p"><strong>The challenge</strong> was to translate this complexity into a coherent visual language that communicates the structure of the network while keeping the information organised and approachable.</p>
    </div>
  </div>
  <div class="rw-rail" aria-hidden="true">
    <div class="rw-train"><span class="rw-smoke"></span>${I("train", "")}</div>
    <div class="rw-track"></div>
  </div>
</section>

<section class="rw-sec" data-reveal>
  ${lab("Research and understanding")}
  <h2 class="rw-h">Understanding the network.</h2>
  <p class="rw-p rw-narrow">Before the visual direction, I looked into the structure of the network: its geographical spread, divisions, routes and history.</p>
  <div class="rw-res">
    <figure>${I("about", "Central Railway about page")}<figcaption><b>The same story, in 3D.</b> Alongside the website, I built this tabletop model of Mumbai CST for the same Information Design module. Data became objects you can read at a glance: ticket stacks for divisions, a staircase for passenger counts, and bags left on the tracks for accidents. The bags look scarred and wrecked on purpose, as if they had survived a crash themselves.</figcaption></figure>
    <figure>${I("geo", "Map of the Central Railway zone")}<figcaption><b>The same story, in 3D.</b> Alongside the website, I built this tabletop model of Mumbai CST for the same Information Design module. Data became objects you can read at a glance: ticket stacks for divisions, a staircase for passenger counts, and bags left on the tracks for accidents. The bags look scarred and wrecked on purpose, as if they had survived a crash themselves.</figcaption></figure>
    <figure>${I("table", "List of zones and divisions")}<figcaption><b>The same story, in 3D.</b> Alongside the website, I built this tabletop model of Mumbai CST for the same Information Design module. Data became objects you can read at a glance: ticket stacks for divisions, a staircase for passenger counts, and bags left on the tracks for accidents. The bags look scarred and wrecked on purpose, as if they had survived a crash themselves.</figcaption></figure>
    <figure>${I("cmap", "Central Railway system map")}<figcaption><b>The same story, in 3D.</b> Alongside the website, I built this tabletop model of Mumbai CST for the same Information Design module. Data became objects you can read at a glance: ticket stacks for divisions, a staircase for passenger counts, and bags left on the tracks for accidents. The bags look scarred and wrecked on purpose, as if they had survived a crash themselves.</figcaption></figure>
    <figure>${I("divisions", "The five divisions")}<figcaption><b>The same story, in 3D.</b> Alongside the website, I built this tabletop model of Mumbai CST for the same Information Design module. Data became objects you can read at a glance: ticket stacks for divisions, a staircase for passenger counts, and bags left on the tracks for accidents. The bags look scarred and wrecked on purpose, as if they had survived a crash themselves.</figcaption></figure>
    <figure class="rw-layers-fig">
      <div class="rw-layers-box">${I("layers2", "Layers of information")}
        <ul class="rw-layers">${layers.map((l, i) => `<li data-l="${i}">${l}</li>`).join("")}</ul>
      </div>
      <figcaption><b>The same story, in 3D.</b> Alongside the website, I built this tabletop model of Mumbai CST for the same Information Design module. Data became objects you can read at a glance: ticket stacks for divisions, a staircase for passenger counts, and bags left on the tracks for accidents. The bags look scarred and wrecked on purpose, as if they had survived a crash themselves.</figcaption>
    </figure>
  </div>
</section>

<section class="rw-sec" data-reveal>
  ${lab("Information architecture")}
  <h2 class="rw-h">Organizing the information.</h2>
  <p class="rw-p rw-narrow">One scroll, six sections. Pick a stop and the train takes you there.</p>
  <div class="rw-ia" data-ia>
    <div class="rw-line"><span class="rw-line-fill"></span>
    </div>
    <ol class="rw-stops">
      ${stops.map(([n], i) => `<li><button type="button" class="rw-stop${i === 0 ? " on" : ""}" data-i="${i}"><span class="rw-dot"></span><em>0${i + 1}</em><b>${n}</b></button></li>`).join("")}
    </ol>
    <div class="rw-card" aria-live="polite"><h3>${stops[0][0]}</h3><p>${stops[0][1]}</p></div>
    <script type="application/json" class="rw-data">${JSON.stringify(stops)}</script>
  </div>
</section>

<section class="rw-sec" data-reveal>
  <div class="rw-split">
    <div>${lab("Visual exploration")}<h2 class="rw-h">Initial exploration.</h2>
      <p class="rw-p">The exploration focused on how these elements could be represented consistently, while keeping a clear distinction between the layers of information.</p>
      <p class="rw-p">This stage established a visual direction for the website, considering how layout, hierarchy, mapping and graphical elements could work together.</p>
    </div>
    <div class="rw-sketch">${I("sketches", "Hand sketches of route comparison, division map and layouts")}</div>
  </div>
</section>

<section class="rw-sec rw-end" data-reveal>
  <div class="rw-end-grid">
    <div class="rw-end-copy">
      ${lab("The website")}
      <h2 class="rw-h">The final website.</h2>
      <p class="rw-p rw-narrow">The website is the primary outcome of the project: a digital space for presenting the railway network through maps, structured information and visual exploration.</p>
      <p class="rw-tools">Tools used <span>Figma</span><span>Framer</span></p>
      <p><a class="pill pill-lg rw-live" href="https://central-railway.framer.website/" target="_blank" rel="noopener">View live website ↗</a></p>
    </div>
    <figure class="rw-model">
      <img src="/img/dump-railway-model-2.webp" width="1400" height="1050" alt="Handmade tabletop model of Mumbai CST station showing Central Railway divisions, passengers onboard and accident data" loading="lazy">
      <figcaption><b>The same story, in 3D.</b> Alongside the website, I built this tabletop model of Mumbai CST for the same Information Design module. Data became objects you can read at a glance: ticket stacks for divisions, a staircase for passenger counts, and bags left on the tracks for accidents. The bags look scarred and wrecked on purpose, as if they had survived a crash themselves.</figcaption>
    </figure>
  </div>
</section>

</div>`;
