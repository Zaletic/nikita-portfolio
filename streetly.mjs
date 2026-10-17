// Streetly case study: every word and diagram is live HTML/SVG, only the app screens and illustrations are images.
const I = (n) => `/img/streetly/${n}.webp`;

const sec = (no, title, inner, cls = "") => `
<section class="cs-sec ${cls}">
  <div class="cs-head">
    <span class="cs-no" data-reveal="fade">${no}</span>
    <h2 class="cs-title" data-lines>${title}</h2>
  </div>
  ${inner}
</section>`;

// ---------- roadmap (pills on a wavy dashed path) ----------
const steps = [
  ["Problem Discovery", 280, 530],
  ["Research & Insights", 467, 803],
  ["Empathy Mapping", 715, 529],
  ["Information Architecture", 903, 882],
  ["User Flow", 1112, 573],
  ["Lo-Fi Wireframes", 1320, 825],
  ["Visual Design", 1528, 545],
  ["Prototype", 1719, 767],
];
const RX = 170, RY = 470, RW = 1660, RH = 480;
const pts = steps.map(([t, x, y]) => [t, x - RX, y - RY]);
let d = `M${pts[0][1]} ${pts[0][2]}`;
for (let i = 1; i < pts.length; i++) {
  const [, x0, y0] = pts[i - 1], [, x1, y1] = pts[i];
  const k = (x1 - x0) * 0.55;
  d += ` C${x0 + k} ${y0} ${x1 - k} ${y1} ${x1} ${y1}`;
}
const roadmap = `
<div class="road" data-reveal="fade">
  <svg class="road-line" viewBox="0 0 ${RW} ${RH}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" pathLength="1" /></svg>
  <ol class="road-list">
    ${pts
      .map(
        ([t, x, y], i) =>
          `<li class="road-pill" style="left:${((x / RW) * 100).toFixed(2)}%;top:${((y / RH) * 100).toFixed(2)}%;--i:${i}"><span class="road-n">0${i + 1}</span>${t}</li>`
      )
      .join("")}
  </ol>
</div>`;

// ---------- empathy map ----------
const empathy = [
  ["Says", "#A8CDA9", [
    ["Borrowing Pressure", "“I would have to think about other person’s schedule first, I’ll have to come back fast”"],
    ["Time Wastage", "“I don’t want to waste time at petrol pumps; I just want to sit my bike and leave”"],
    ["Flexible Payment", "“Preference for ‘pay per ride’ or paying strictly for time used”"],
    ["Information Needs", "“Must see battery levels and estimated run-time before renting”"],
  ]],
  ["Does", "#D9B8EE", [
    ["Travel Frequency", "Daily or 2-3 times weekly for college, PG or errands"],
    ["Mode of Transport", "Relies on Rapido, Uber, Shuttles, personal vehicle or walking"],
    ["App Trials", "Downloads rental apps during campus events but often deletes them if they are “not that helpful”"],
  ]],
  ["Thinks", "#BCD8ED", [
    ["Independence", "Desires freedom from relying on Rapido / Ola / Uber"],
    ["Cost Effective", "E-bikes are a “cost cutting” alternative to petrol"],
    ["Efficiency", "Transport must save time and avoid traffic or petrol pump queue"],
    ["Trial Period", "Believes they should get a “free trial” or “one kilometer free” before committing to a subscription"],
  ]],
  ["Feels", "#F4DC8A", [
    ["Unaware", "Feels a “lack of awareness” about available rental options in the area"],
    ["Anxious", "Concerned about traffic, safety and time constraints"],
    ["Pressured", "Feeling rushed to return borrowed vehicles to friends"],
    ["Hesitant", "Unwilling to use services if awareness is low or apps are unhelpful"],
  ]],
];

// ---------- app icons for the design-system block ----------
const ico = {
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/></svg>`,
  bike: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="16.5" r="3"/><circle cx="18" cy="16.5" r="3"/><path d="M6 16.5l3.5-6h5l3.5 6M9.5 10.5L8.5 8H7M14.5 10.5l-1-3.5H15"/></svg>`,
  wallet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 7.5A2.5 2.5 0 016.5 5H18v3"/><rect x="3.5" y="7.5" width="17" height="12" rx="2.5"/><path d="M16 13.5h4.5v3H16a1.5 1.5 0 010-3z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18c1.5-2.5 3.2-3.5 5.5-3.5s4 1 5.5 3.5"/></svg>`,
};

const phone = (img, alt, speed) =>
  `<div class="ph" data-reveal><img src="${I(img)}" alt="${alt}" loading="lazy" ${speed ? `data-speed="${speed}"` : ""} /></div>`;

export const streetlyBody = (p) => `
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

<div class="cs">

<div class="cs-hero" data-reveal="scale">
  <img class="cs-hero-map" src="${I("map")}" alt="" />
  <div class="cs-hero-copy">
    <p class="cs-hero-small">Streetly helps you</p>
    <p class="cs-hero-big">Compare.<br />Choose.<br />Ride.</p>
  </div>
  <img class="cs-hero-phone" src="${I("cover-phone")}" alt="The Streetly app on a phone" data-speed="0.05" />
</div>

${sec("01", "Overview", `
<div class="cs-split">
  <div class="cs-text">
    <p class="cs-lead scrub" data-scrub>Streetly is a mobile application that simplifies the process of renting e-bikes by bringing multiple rental providers onto a single platform.</p>
    <p class="cs-p" data-reveal>Instead of downloading and comparing several provider-specific apps and websites, users can discover nearby bikes, compare availability, pricing, battery levels and features, and book the option that best suits their needs.</p>
  </div>
  <div class="cs-aside ph-wrap">${phone("overview-phone", "Streetly explore screen", 0.04)}</div>
</div>`)}

${sec("02", "Project Roadmap", roadmap, "cs-road")}

${sec("03", "Problem Statement", `
<div class="cs-offset">
  <p class="cs-lead scrub" data-scrub>Urban commuters increasingly rely on e-bike rentals for short-distance travel, but existing services are fragmented and provider-specific.</p>
  <p class="cs-p" data-reveal>Users struggle to find available bikes, compare options, and understand pricing across different platforms. This fragmented experience creates unnecessary friction, making rentals less efficient and more time-consuming.</p>
  <ul class="cs-rows">
    <li data-reveal><span>01</span><p>Existing platforms are fragmented</p></li>
    <li data-reveal><span>02</span><p>Users face challenges locating and comparing rental services around</p></li>
    <li data-reveal><span>03</span><p>Limited flexibility in booking</p></li>
  </ul>
</div>`)}

${sec("04", "Understanding the Commuter", `
<div class="cs-split cs-split-rev">
  <figure class="cs-board" data-reveal="scale"><img src="${I("storyboard")}" alt="Storyboard of a commuter, Riya, searching across rental apps and wishing for one platform" loading="lazy" /></figure>
  <div class="cs-text">
    <p class="cs-p" data-reveal>Before designing Streetly, I explored how people navigate short-distance travel, what influences their choice of transport, and what they need to know before renting an e-bike.</p>
    <p class="cs-p" data-reveal>Through interviews, surveys, and secondary research, I explored the challenges around discovering rental options, evaluating costs, and making quick, informed travel decisions.</p>
    <p class="cs-p" data-reveal>The research helped frame the opportunity for Streetly: making e-bike rental options easier to discover, compare, and book.</p>
  </div>
</div>`)}

${sec("05", "Insights", `
<div class="cs-offset">
  <p class="cs-p cs-intro" data-reveal>To understand commuting habits, transport preferences, and expectations around e-bike rentals. The research explored travel frequency, rental discovery, pricing preferences, and the information users need before booking a ride.</p>
  <div class="cs-facts" data-reveal><p><b>60</b> Survey respondents</p><p><b>8-10</b> Interview participants</p></div>
</div>
<div class="cs-cols">
  ${[
    ["Know before you ride", "Users need to assess whether a bike has sufficient battery for their intended journey before booking.", "Display battery status and estimated riding range on the bike details screen, before users commit to a booking."],
    ["Compare without switching", "Finding and comparing rental options across separate provider platforms adds friction to the discovery process.", "Bring multiple providers into one discovery experience, making availability, pricing, and range easier to compare."],
    ["Know what you’ll pay", "Users need clarity on ride costs and available payment options to make informed booking decisions.", "Showing a transparent fare breakdown, including the selected ride duration and applicable charges, before payment."],
  ]
    .map(
      ([h, a, b]) => `
  <article class="cs-col" data-reveal>
    <h3>${h}</h3><p>${a}</p>
    <h4>Design implication</h4><p>${b}</p>
  </article>`
    )
    .join("")}
</div>`)}

${sec("06", "Empathy Mapping", `
<div class="cs-offset"><p class="cs-p cs-intro" data-reveal>Understanding users’ thoughts, behaviors, and emotions to identify opportunities for a more seamless rental experience.</p></div>
<div class="emp">
  ${empathy
    .map(
      ([h, c, cards]) => `
  <div class="emp-q" style="--dot:${c}">
    <h3 class="emp-h" data-reveal>${h}</h3>
    <div class="emp-cards">
      ${cards.map(([t, x]) => `<article class="emp-card" data-reveal><h4>${t}</h4><p>${x}</p></article>`).join("")}
    </div>
  </div>`
    )
    .join("")}
</div>
<div class="emp-ins">
  <p class="emp-ins-t" data-reveal>Insights</p>
  <p data-reveal><b>Users need transparent information</b> (battery, pricing, availability) before booking.</p>
  <p data-reveal><b>Switching between multiple rental apps</b> creates unnecessary friction.</p>
  <p data-reveal><b>Speed and flexibility</b> matter more than brand loyalty.</p>
</div>`)}

${sec("07", "Information Architecture", `
<div class="cs-offset"><p class="cs-p cs-intro" data-reveal>A clear structure designed to simplify navigation and streamline the booking experience.</p></div>
<figure class="cs-diagram" data-reveal="scale"><img src="${I("ia")}" alt="Information architecture: Home branches into Profile, Explore, Bookings and Wallet" loading="lazy" /></figure>`)}

${sec("08", "User Flow", `
<div class="cs-offset"><p class="cs-p cs-intro" data-reveal>This user flow maps the primary booking journey, illustrating each step from discovering nearby bikes to starting a ride.</p></div>
<figure class="cs-diagram cs-diagram-tall" data-reveal="scale"><img src="${I("user-flow")}" alt="User flow for booking a ride, from the live map to ride started" loading="lazy" /></figure>`)}

${sec("09", "Moodboard", `
<div class="mood" data-reveal>
  <div class="mood-col mc1">
    <figure style="aspect-ratio:262/329"><img src="${I("mood-phone")}" alt="" loading="lazy" /></figure>
    <figure style="aspect-ratio:276/581"><img src="${I("mood-app")}" alt="" loading="lazy" /></figure>
  </div>
  <div class="mood-col mc2">
    <figure style="aspect-ratio:603/706"><img src="${I("mood-train")}" alt="" loading="lazy" /></figure>
    <figure style="aspect-ratio:580/561"><img src="${I("mood-map")}" alt="" loading="lazy" /></figure>
  </div>
  <div class="mood-col mc3">
    <figure style="aspect-ratio:574/526"><img src="${I("mood-coffee")}" alt="" loading="lazy" /></figure>
    <figure style="aspect-ratio:589/734"><img src="${I("mood-building")}" alt="" loading="lazy" /></figure>
  </div>
</div>`)}

${sec("10", "Typography &amp; Color", `
<div class="ds">
  <div class="ds-type" data-reveal>
    <p class="ds-name">Manrope</p>
    <p class="ds-note">It was chosen for its clean geometry, excellent readability, and modern character. Its balanced letterforms ensure clarity across the interface while complementing Streetly’s simple and user-friendly experience.</p>
  </div>
  <div class="ds-spec" data-reveal>
    <p class="ds-aa">Aa</p>
    <ul class="ds-weights">
      <li style="font-weight:300">Manrope Light</li><li style="font-weight:400">Manrope Regular</li><li style="font-weight:500">Manrope Medium</li><li style="font-weight:600">Manrope Semibold</li><li style="font-weight:700">Manrope Bold</li>
    </ul>
    <p class="ds-glyphs">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />1234567890!@#$%^&amp;*()_+</p>
  </div>
  <div class="ds-palette" data-reveal>
    ${[
      ["Forest Green", "#29471A", "#29471A"],
      ["Light Blue", "#BCD8ED", "#BCD8ED"],
      ["Mint Green", "#A8CDA9", "#A8CDA9"],
      ["Grey", "#C6C5C4", "#C6C5C4"],
      ["Creme", "#F6F0E7", "#F6F0E7"],
    ]
      .map(([n, h, c]) => `<div class="sw"><span class="sw-c" style="background:${c}"></span><p>${n}</p><p class="sw-h">${h}</p></div>`)
      .join("")}
  </div>
  <div class="ds-comp" data-reveal>
    <p class="ds-lab">Buttons</p>
    <div class="ds-btns">
      <button class="app-btn" type="button">Continue <svg viewBox="0 0 28 10" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M0 5h26M22 1l4 4-4 4"/></svg></button>
      <button class="app-btn app-btn-soft" type="button">Active</button>
    </div>
    <p class="ds-lab">Bottom Navigation</p>
    <div class="app-nav" role="tablist">
      ${[["map", "Explore"], ["bike", "Bookings"], ["wallet", "Wallet"], ["user", "Profile"]]
        .map(([k, t], i) => `<button type="button" class="app-tab${i === 0 ? " on" : ""}" role="tab" aria-selected="${i === 0}">${ico[k]}<span>${t}</span></button>`)
        .join("")}
    </div>
  </div>
</div>`)}

${sec("11", "Design Evolution", `
<div class="cs-offset"><p class="cs-p cs-intro" data-reveal>Low-fi wireframes.</p></div>
<figure class="cs-diagram" data-reveal="scale"><img src="${I("wireframes")}" alt="Eight hand-drawn low-fidelity wireframes of the Streetly screens" loading="lazy" /></figure>`)}

${sec("12", "The Solution", `
<div class="cs-split">
  <div class="ph-wrap ph-hand">${phone("hand-phone", "Hand holding a phone showing the Streetly provider details screen", 0.04)}</div>
  <div class="cs-text">
    <p class="cs-lead scrub" data-scrub>A unified e-bike rental platform that brings multiple service providers into one seamless experience.</p>
    <p class="cs-p" data-reveal>Users can easily discover nearby bikes, compare pricing, availability, and battery levels, and book the most suitable ride without switching between multiple apps.</p>
    <ul class="cs-rows">
      <li data-reveal><span>01</span><p>Compare multiple rental providers in one app.</p></li>
      <li data-reveal><span>02</span><p>View live bike availability, battery levels, and pricing before booking.</p></li>
      <li data-reveal><span>03</span><p>Book the best ride in just a few taps with a seamless rental experience.</p></li>
    </ul>
  </div>
</div>`)}

${sec("13", "Explore &amp; Compare", `
<div class="scr scr-2">
  <p class="scr-cap scr-l" data-reveal><b>The Explore screen</b> provides a live map of nearby e-bike providers, enabling users to quickly discover and compare available options.</p>
  ${phone("s-explore", "Streetly explore screen with a live map of nearby providers")}
  ${phone("s-provider", "Streetly provider details screen for Rhyno Rides")}
  <p class="scr-cap scr-r" data-reveal><b>Provider Details screen</b> presents key information such as availability, amenities, battery status, and bike models to support informed booking decisions.</p>
</div>`)}

${sec("14", "Choose &amp; Schedule", `
<div class="scr scr-2">
  <p class="scr-cap scr-l" data-reveal><b>The booking screen</b> allows users to select their preferred bike, ride duration, and reservation time with a simple and flexible interface.</p>
  ${phone("s-booking", "Streetly booking details screen")}
  ${phone("s-payment", "Streetly payment screen with fare breakdown")}
  <p class="scr-cap scr-r" data-reveal><b>The payment screen</b> provides a transparent fare breakdown and multiple payment options, ensuring a smooth and confident booking experience.</p>
</div>`)}

${sec("15", "After the Booking", `
<div class="scr scr-4">
  <div class="scr-i">${phone("s-confirmed", "Streetly booking confirmed screen")}<p class="scr-cap" data-reveal>Once the booking is confirmed, users receive a clear <b>reservation summary</b> with pickup details, countdown timer, and quick actions</p></div>
  <div class="scr-i">${phone("s-bookings", "Streetly active bookings screen")}<p class="scr-cap" data-reveal><b>The Bookings screen</b> provides easy access to active and past reservations, allowing users to track and manage their rides effortlessly.</p></div>
  <div class="scr-i">${phone("s-past", "Streetly past bookings screen")}<p class="scr-cap" data-reveal><b>The Past Bookings screen</b> allows users to revisit previous rides, view booking history, and quickly rebook frequent trips</p></div>
  <div class="scr-i">${phone("s-profile", "Streetly profile screen")}<p class="scr-cap" data-reveal><b>The Profile screen</b> centralizes personal information, verified documents, emergency contacts, and support services for a secure and personalized experience.</p></div>
</div>`)}

<div class="cs-end" data-reveal>
  <p class="cs-end-t">See it in motion.</p>
  <a class="pill pill-lg" href="${p.prototype}" target="_blank" rel="noopener">View the prototype</a>
</div>

</div>`;
