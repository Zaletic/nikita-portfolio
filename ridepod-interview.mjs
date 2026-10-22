// RidePod: further process. Stakeholder interview with the DAU administration (transcript translated into English).
const lab = (t) => `<div class="rp-lab">${t}</div>`;

const findings = [
  ["01", "Low student demand", "An earlier campus experiment found students were not keen on the service. An MoU with GMC for a service desk near the gate was shelved after a joint meeting with student representatives and the Director."],
  ["02", "Ride-hailing already wins", "A 3 km trip costs about ₹20–22 on a bike-taxi, ₹24 to the hospital, and a local bus starts at ₹40. Ride-hailing also picks up on campus and drops at the door."],
  ["03", "Campus policy", "DAU treats the campus as a home. It follows a non-polluting vehicle policy, using bicycles and electric load carriers internally, and does not want more motorised vehicles."],
  ["04", "Numbers do not add up", "A vendor must recover purchase and maintenance costs. Without steady student use there is no business volume, and cheap alternatives are everywhere."],
];

const directions = [
  ["In-house digital queue management", "A module for the campus cafeterias, built into the official student mobile app. It would automate orders and payments so students do not wait in long lines."],
  ["Campus waste management", "Scientific, eco-friendly ways to reduce, segregate and dispose of waste across campus."],
];

export const ridepodInterview = `
<section class="rp" aria-label="Further process: stakeholder interview">

<div class="rp-hero" data-reveal>
  ${lab("Further process · Stakeholder interview")}
  <h2 class="rp-h rp-xl">Then we asked the administration.</h2>
  <p class="rp-lede">Student research pointed to costly short trips and no food late at night. We had not yet heard DAU&rsquo;s side, so we interviewed Mr. Kirit Pandya, Assistant Administrative Officer.</p>
</div>

<div class="rp-sec rp-split" data-reveal>
  <div>${lab("What students told us")}<h2 class="rp-h">The starting point</h2></div>
  <div class="rp-two">
    <div class="rp-card"><div class="rp-k">Travel</div><p>Trips toward InfoCity or town cost a lot, and vehicles are not readily available.</p></div>
    <div class="rp-card"><div class="rp-k">Late-night food</div><p>The canteen closes at night and students cannot get food, though this sits with hostel management.</p></div>
  </div>
</div>

<div class="rp-sec" data-reveal>
  ${lab("What the administration told us")}
  <h2 class="rp-h">Four reasons the e-bike model would not work</h2>
  <div class="rp-grid">
    ${findings.map(([n, t, d]) => `<article class="rp-card rp-find"><span class="rp-num">${n}</span><h3>${t}</h3><p>${d}</p></article>`).join("")}
  </div>
  <p class="rp-quote">&ldquo;I strongly advise you to pivot to a different model rather than e-bikes.&rdquo;</p>
  <p class="rp-cite">Mr. Kirit Pandya, Assistant Administrative Officer, DAU</p>
</div>

<div class="rp-sec rp-split" data-reveal>
  <div>${lab("Late-night food")}<h2 class="rp-h">Already being solved</h2></div>
  <div>
    <p class="rp-p">The administration plans automated vending kiosks over the next one to two months, so a full canteen does not need to stay open. They will sit in open, easy-to-reach places near the boys&rsquo; hostel, the girls&rsquo; hostel, the central block and the administrative area.</p>
  </div>
</div>

<div class="rp-sec" data-reveal>
  ${lab("Where the administration pointed us")}
  <h2 class="rp-h">Two directions worth developing</h2>
  <div class="rp-two rp-dir">
    ${directions.map(([t, d], i) => `<article class="rp-card rp-find"><span class="rp-num">${String.fromCharCode(65 + i)}</span><h3>${t}</h3><p>${d}</p></article>`).join("")}
  </div>
  <p class="rp-p rp-narrow">Whichever direction we pick, the administration asked for a model that serves the wider campus community: students, staff and visitors.</p>
</div>

<p class="rp-src" data-reveal>Source: interview with the DAU administration, transcript translated into English.</p>
</section>`;
