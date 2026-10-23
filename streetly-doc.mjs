// Streetly case study as a native, scrollable document (not slide images).
const I = (f, alt = "", cls = "") => `<img class="${cls}" src="/img/streetly/${f}.webp" alt="${alt}" loading="lazy" />`;
const lab = (t) => `<div class="s-lab">${t}</div>`;
const PROTOTYPE =
  "https://www.figma.com/proto/rvhsfg03eP5YToJJdNV4sP/main-E-Bike-rental---Streetly?node-id=46-1085&viewport=199%2C220%2C0.16&t=Y48qt2iz9rvZYHWS-1&scaling=scale-down&content-scaling=fixed&page-id=46%3A1084".replace(/&/g, "&amp;");

const roadmap = ["Problem discovery", "Research & insights", "Empathy mapping", "Information architecture", "User flow", "Low-fi wireframes", "Visual design", "Prototype"];

const insights = [
  ["Know before you ride", "Users need to assess whether a bike has sufficient battery for their intended journey before booking.", "Display battery status and estimated riding range on the bike details screen, before users commit to a booking."],
  ["Compare without switching", "Finding and comparing rental options across separate provider platforms adds friction to the discovery process.", "Bring multiple providers into one discovery experience, making availability, pricing, and range easier to compare."],
  ["Know what you'll pay", "Users need clarity on ride costs and available payment options to make informed booking decisions.", "Show a transparent fare breakdown, including the selected ride duration and applicable charges, before payment."],
];

const notes = {
  says: [
    ["Borrowing pressure", "“I would have to think about other person's schedule first, I'll have to come back fast”"],
    ["Time wastage", "“I don't want to waste time at petrol pumps; I just want to sit on my bike and leave”"],
    ["Flexible payment", "“Preference for ‘pay per ride’ or paying strictly for time used”"],
    ["Information needs", "“Must see battery levels and estimated run-time before renting”"],
  ],
  does: [
    ["Travel frequency", "Daily or 2-3 times weekly for college, PG or errands"],
    ["Mode of transport", "Relies on Rapido, Uber, shuttles, personal vehicle or walking"],
    ["App trials", "Downloads rental apps during campus events but often deletes them if they are “not that helpful”"],
  ],
  thinks: [
    ["Independence", "Desires freedom from relying on Rapido / Ola / Uber"],
    ["Cost effective", "E-bikes are a “cost cutting” alternative to petrol"],
    ["Efficiency", "Transport must save time and avoid traffic or petrol pump queues"],
    ["Trial period", "Believes they should get a “free trial” or “one kilometer free” before committing to a subscription"],
  ],
  feels: [
    ["Unaware", "Feels a “lack of awareness” about available rental options in the area"],
    ["Anxious", "Concerned about traffic, safety and time constraints"],
    ["Pressured", "Feeling rushed to return borrowed vehicles like a friend's"],
    ["Hesitant", "Unwilling to use services if awareness is low or apps are unhelpful"],
  ],
};
const quad = (title, key, cls) =>
  `<div class="s-quad ${cls}"><h3>${title}</h3><div class="s-notes">${notes[key].map(([h, p]) => `<div class="s-note"><b>${h}</b><p>${p}</p></div>`).join("")}</div></div>`;

const swatches = [
  ["Forest Green", "#29471A", "#29471A"],
  ["Light Blue", "#BCD8ED", "#BCD8ED"],
  ["Mint Green", "#A8CDA9", "#A8CDA9"],
  ["Grey", "#C6C5C4", "#C6C5C4"],
  ["Creme", "#F6F0E7", "#F6F0E7"],
];

const icon = {
  explore: `<svg viewBox="0 0 24 24"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z M9 4v14 M15 6v14"/></svg>`,
  bike: `<svg viewBox="0 0 24 24"><circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-7h5l3 7M10 9l-1-2h-2M13 9l-2 7"/></svg>`,
  wallet: `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16 14.5h2"/></svg>`,
  profile: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18c1.5-3 9.5-3 11 0"/></svg>`,
};

const phones = (arr) => arr.map(([f, t, p]) => `<figure class="s-phone">${I(f, t)}<figcaption><b>${t}</b>${p}</figcaption></figure>`).join("");

export const streetlyDoc = `
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<div class="sdoc">

<section class="s-hero" data-reveal>
  <div class="s-hero-copy">
    ${lab("Concept project · UI/UX design")}
    <h2 class="s-wordmark">Streetly</h2>
    <p class="s-tag">Helps you <span>compare.</span> <span>choose.</span> <span>ride.</span></p>
    <p class="s-lede">A mobile app that brings every e-bike rental provider into one map, so commuters can compare bikes, pricing and battery levels and book the right ride without switching apps.</p>
  </div>
  <div class="s-hero-phone">${I("01-cover-phone", "The Streetly app showing a live map of nearby e-bikes")}</div>
</section>

<section class="s-sec s-split" data-reveal>
  <div>
    ${lab("01 · Overview")}<h2 class="s-h">One platform for every e-bike nearby</h2>
    <p class="s-p">Streetly is a mobile application that simplifies the process of renting e-bikes by bringing multiple rental providers onto a single platform. Instead of downloading and comparing several provider-specific apps or websites, users can discover nearby bikes, compare availability, pricing, battery levels and features, and book the option that suits them best.</p>
  </div>
  <div class="s-phone-one">${I("02-overview-phone", "Streetly home screen")}</div>
</section>

<section class="s-sec" data-reveal>
  ${lab("The process")}<h2 class="s-h">Project roadmap</h2>
  <ol class="s-road">${roadmap.map((r, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span>${r}</li>`).join("")}</ol>
</section>

<section class="s-sec s-split s-mapbg" data-reveal>
  <div>
    ${lab("02 · Problem")}<h2 class="s-h">Rentals are fragmented, and so is the search</h2>
    <p class="s-p">Urban commuters increasingly rely on e-bike rentals for short-distance travel, but existing services are fragmented and provider-specific. Users struggle to find available bikes, compare options and understand pricing across platforms. This creates unnecessary friction, making rentals less efficient and more time-consuming.</p>
  </div>
  <ul class="s-points">
    <li><span>01</span>Existing platforms are fragmented</li>
    <li><span>02</span>Users face challenges locating and comparing rental services around them</li>
    <li><span>03</span>Limited flexibility in booking</li>
  </ul>
</section>

<section class="s-sec" data-reveal>
  <div class="s-split s-top">
    <div>${lab("03 · Research")}<h2 class="s-h">Understanding the commuter</h2></div>
    <p class="s-p">Before designing Streetly, I explored how people navigate short-distance travel, what influences their choice of transport and what they need to know before renting an e-bike. Interviews, surveys and secondary research framed the opportunity: making e-bike rental options easier to discover, compare and book.</p>
  </div>
  <div class="s-stats"><div><b>60</b><span>survey respondents</span></div><div><b>8–10</b><span>interview participants</span></div><p>The research covered travel frequency, rental discovery, pricing preferences and the information users need before booking a ride.</p></div>
  <figure class="s-board">${I("03-storyboard", "Storyboard: a commuter struggles to compare e-bike rentals across several apps")}<figcaption>Storyboard: the fragmented e-bike rental experience</figcaption></figure>
  <div class="s-grid3">
    ${insights.map(([h, p, d], i) => `<div class="s-card"><div class="s-num">0${i + 1}</div><h3>${h}</h3><p>${p}</p><div class="s-k">Design implication</div><p>${d}</p></div>`).join("")}
  </div>
</section>

<section class="s-sec" data-reveal>
  ${lab("04 · Empathy")}<h2 class="s-h">Empathy mapping</h2>
  <p class="s-p s-narrow">Understanding users' thoughts, behaviours and emotions to find opportunities for a more seamless rental experience.</p>
  <div class="s-empathy">
    ${quad("Says", "says", "q-says")}${quad("Does", "does", "q-does")}${quad("Thinks", "thinks", "q-thinks")}${quad("Feels", "feels", "q-feels")}
  </div>
  <div class="s-grid3 s-learn">
    <div class="s-card dark"><div class="s-k">Insight</div><p>Users need transparent information (battery, pricing, availability) before booking.</p></div>
    <div class="s-card dark"><div class="s-k">Insight</div><p>Switching between multiple rental apps creates unnecessary friction.</p></div>
    <div class="s-card dark"><div class="s-k">Insight</div><p>Speed and flexibility matter more than brand loyalty.</p></div>
  </div>
</section>

<section class="s-sec" data-reveal>
  ${lab("05 · Structure")}<h2 class="s-h">Information architecture</h2>
  <p class="s-p s-narrow">A clear structure designed to simplify navigation and streamline the booking experience.</p>
  <div class="s-img s-white">${I("04-information-architecture", "Information architecture of the Streetly app")}</div>
  <h3 class="s-sub">User flow: booking a ride</h3>
  <p class="s-p s-narrow">The primary booking journey, from discovering nearby bikes to starting a ride.</p>
  <div class="s-img s-white s-flow">${I("05-user-flow", "User flow for booking a ride")}</div>
</section>

<section class="s-sec" data-reveal>
  ${lab("06 · Visual design")}<h2 class="s-h">Calm, clear and map-first</h2>
  <div class="s-split s-top s-mood">
    <figure class="s-img s-white">${I("06-moodboard", "Moodboard with muted greens, glass and concrete")}</figure>
    <figure class="s-img s-white">${I("07-wireframes", "Eight low-fidelity wireframe iterations")}<figcaption>Design evolution: low-fi wireframes</figcaption></figure>
  </div>
  <div class="s-system">
    <div class="s-type">
      <div class="s-big">Manrope</div>
      <p>Chosen for its clean geometry, excellent readability and modern character. Its balanced letterforms keep the interface clear while complementing Streetly's simple, user-friendly experience.</p>
      <div class="s-weights"><span style="font-weight:300">Manrope Light</span><span style="font-weight:400">Manrope Regular</span><span style="font-weight:500">Manrope Medium</span><span style="font-weight:600">Manrope Semibold</span><span style="font-weight:800">Manrope Bold</span></div>
    </div>
    <div class="s-swatches">${swatches.map(([n, h, c]) => `<div style="--c:${c}"><i></i><b>${n}</b><span>${h}</span></div>`).join("")}</div>
    <div class="s-ui">
      <div class="s-bn"><div class="on">${icon.explore}<span>Explore</span></div><div>${icon.bike}<span>Bookings</span></div><div>${icon.wallet}<span>Wallet</span></div><div>${icon.profile}<span>Profile</span></div></div>
      <div class="s-btns"><span class="main">Continue →</span><span class="soft">Active</span></div>
    </div>
  </div>
</section>

<section class="s-sec s-solution" data-reveal>
  <div class="s-hand">${I("08-hand-with-phone", "A hand holding a phone showing the Streetly booking screen")}</div>
  <div>
    ${lab("07 · Solution")}<h2 class="s-h">Compare. Choose. Ride.</h2>
    <p class="s-p">A unified e-bike rental platform that brings multiple service providers into one seamless experience. Users can discover nearby bikes, compare pricing and battery levels, and book the most suitable ride without switching between apps.</p>
    <ul class="s-ticks"><li>Compare multiple rental providers in one app</li><li>View live bike availability, battery levels and pricing before booking</li><li>Book the best ride in just a few taps</li></ul>
  </div>
</section>

<section class="s-sec" data-reveal>
  ${lab("08 · The screens")}<h2 class="s-h">Explore &amp; compare</h2>
  <div class="s-pair">
    ${phones([
      ["09-explore-map", "Explore", "A live map of nearby e-bike providers, so users can quickly discover and compare available options."],
      ["10-provider-details", "Provider details", "Availability, amenities, battery status and bike models to support informed booking decisions."],
    ])}
  </div>
  <h2 class="s-h s-gap">Choose &amp; schedule</h2>
  <div class="s-pair">
    ${phones([
      ["11-booking", "Booking", "Select a preferred bike, ride duration and reservation time with a simple, flexible interface."],
      ["12-payment", "Payment", "A transparent fare breakdown and multiple payment options for a smooth, confident booking."],
    ])}
  </div>
  <h2 class="s-h s-gap">After you book</h2>
  <div class="s-four">
    ${phones([
      ["13-booking-confirmed", "Confirmed", "A clear reservation summary with pickup details, a countdown timer and quick actions."],
      ["14-bookings", "Bookings", "Easy access to active and past reservations, so users can track and manage rides."],
      ["15-past-bookings", "Past bookings", "Revisit previous rides, view booking history and quickly rebook frequent trips."],
      ["16-profile", "Profile", "Personal information, verified documents, emergency contacts and support in one place."],
    ])}
  </div>
</section>

<section class="s-sec s-proto" data-reveal>
  ${lab("09 · Prototype")}<h2 class="s-h">Interactive prototype</h2>
  <p class="s-p s-narrow">Experience the complete Streetly journey, from discovering nearby providers to booking and managing a ride.</p>
  <a class="s-btn" href="${PROTOTYPE}" target="_blank" rel="noopener">Open the interactive prototype <span>↗</span></a>
</section>

</div>`;
