// Native (vector/HTML) infographics for the GroomCue case study.

export const ico = {
  sun: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="7" fill="#FFC928"/><g stroke="#FFC928" stroke-width="2.6" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<line x1="20" y1="6" x2="20" y2="10" transform="rotate(${a} 20 20)"/>`).join("")}</g></svg>`,
  sound: `<svg viewBox="0 0 40 40"><path d="M8 16h6l8-6v20l-8-6H8z" fill="#0A3F8C"/><path d="M27 14c3 3 3 9 0 12M31 10c5 5 5 15 0 20" fill="none" stroke="#0A3F8C" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  treat: `<svg viewBox="0 0 40 40"><g fill="#FFC928"><circle cx="9" cy="14" r="4.5"/><circle cx="9" cy="24" r="4.5"/><circle cx="31" cy="16" r="4.5"/><circle cx="31" cy="26" r="4.5"/></g><rect x="9" y="17.5" width="22" height="5.5" rx="2.5" transform="rotate(-14 20 20)" fill="#FFC928"/></svg>`,
  power: `<svg viewBox="0 0 40 40"><path d="M20 8v12" stroke="#0A3F8C" stroke-width="3" stroke-linecap="round"/><path d="M13 13a11 11 0 1014 0" fill="none" stroke="#0A3F8C" stroke-width="3" stroke-linecap="round"/></svg>`,
  paw: `<svg viewBox="0 0 40 40"><g fill="#FFC928"><ellipse cx="20" cy="26" rx="8" ry="6.5"/><circle cx="9" cy="19" r="3.4"/><circle cx="16" cy="12" r="3.4"/><circle cx="24" cy="12" r="3.4"/><circle cx="31" cy="19" r="3.4"/></g></svg>`,
  person: `<svg viewBox="0 0 40 40"><circle cx="20" cy="14" r="6" fill="#0A3F8C"/><path d="M8 34c0-8 5-12 12-12s12 4 12 12z" fill="#0A3F8C"/></svg>`,
};

// The GroomCue device, drawn as vector. side: "front" | "back"
export const device = (side, nums = false) => {
  const n = (x, y, t) =>
    nums ? `<g><circle cx="${x}" cy="${y}" r="11" fill="#0A3F8C"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="600" fill="#fff" font-family="Instrument Sans,sans-serif">${t}</text></g>` : "";
  const body = `<rect x="40" y="250" width="120" height="62" rx="22" fill="#F1F4F8" stroke="#D5DCE6" stroke-width="2"/><rect x="62" y="244" width="76" height="16" rx="8" fill="#E3E8F0"/><rect x="48" y="12" width="104" height="246" rx="52" fill="#fff" stroke="#D5DCE6" stroke-width="2"/>`;
  if (side === "back")
    return `<svg viewBox="0 0 200 330" role="img" aria-label="Back of the GroomCue device">${body}<circle cx="100" cy="140" r="22" fill="#F4F6FA" stroke="#D5DCE6" stroke-width="2"/>${ico.power.replace("<svg ", `<svg x="87" y="127" width="26" height="26" `)}${n(143, 140, "04")}</svg>`;
  const dots = Array.from({ length: 37 }, (_, i) => {
    const ring = i < 1 ? [0, 1, 0] : i < 7 ? [9, 6, i - 1] : i < 19 ? [17, 12, i - 7] : [25, 18, i - 19];
    const a = (ring[2] / ring[1]) * Math.PI * 2;
    return `<circle cx="${(100 + Math.cos(a) * ring[0]).toFixed(1)}" cy="${(130 + Math.sin(a) * ring[0]).toFixed(1)}" r="2"/>`;
  }).join("");
  return `<svg viewBox="0 0 200 330" role="img" aria-label="Front of the GroomCue device">${body}<rect x="62" y="30" width="76" height="210" rx="38" fill="#14181F"/><rect x="82" y="52" width="36" height="36" rx="7" fill="#FFC928"/><rect x="78" y="48" width="44" height="44" rx="10" fill="none" stroke="#FFC928" stroke-opacity=".35" stroke-width="4"/><g fill="#3A4150">${dots}</g><rect x="76" y="196" width="48" height="30" rx="6" fill="#0B0E13" stroke="#3A4150"/><ellipse cx="100" cy="216" rx="11" ry="5" fill="#E8932E"/>${n(28, 70, "01")}${n(28, 130, "02")}${n(28, 211, "03")}</svg>`;
};

const gl = (k) =>
  ({
    plug: `<svg viewBox="0 0 32 32"><path d="M10 6v7M22 6v7M8 13h16v5a8 8 0 01-16 0z" fill="none" stroke="#0A3F8C" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    sw: `<svg viewBox="0 0 32 32"><rect x="6" y="9" width="20" height="14" rx="3" fill="none" stroke="#0A3F8C" stroke-width="2.2"/><rect x="14" y="12" width="8" height="8" rx="1.5" fill="#0A3F8C"/></svg>`,
    fuse: `<svg viewBox="0 0 32 32"><path d="M3 16h6M23 16h6" stroke="#0A3F8C" stroke-width="2.2" stroke-linecap="round"/><rect x="9" y="11" width="14" height="10" rx="5" fill="none" stroke="#0A3F8C" stroke-width="2.2"/></svg>`,
    btn: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="none" stroke="#0A3F8C" stroke-width="2.2"/><circle cx="16" cy="16" r="5" fill="#0A3F8C"/></svg>`,
    sol: `<svg viewBox="0 0 32 32"><rect x="4" y="11" width="16" height="10" rx="2" fill="none" stroke="#0A3F8C" stroke-width="2.2"/><path d="M20 16h8" stroke="#0A3F8C" stroke-width="2.6" stroke-linecap="round"/></svg>`,
    led: `<svg viewBox="0 0 32 32"><rect x="7" y="7" width="18" height="18" rx="4" fill="#FFC928"/><rect x="10" y="10" width="12" height="12" rx="2" fill="#fff" fill-opacity=".55"/></svg>`,
    spk: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="#0A3F8C" stroke-width="2.2"/><circle cx="16" cy="16" r="5" fill="#0A3F8C"/></svg>`,
    chip: `<svg viewBox="0 0 32 32"><rect x="8" y="8" width="16" height="16" rx="2.5" fill="none" stroke="#0A3F8C" stroke-width="2.2"/><path d="M12 4v4M16 4v4M20 4v4M12 24v4M16 24v4M20 24v4M4 12h4M4 16h4M4 20h4M24 12h4M24 16h4M24 20h4" stroke="#0A3F8C" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    sd: `<svg viewBox="0 0 32 32"><path d="M9 5h11l4 4v18H9z" fill="none" stroke="#0A3F8C" stroke-width="2.2" stroke-linejoin="round"/><path d="M13 5v5M16 5v5M19 5v5" stroke="#0A3F8C" stroke-width="2"/></svg>`,
    wire: `<svg viewBox="0 0 32 32"><path d="M4 9c8 0 8 7 12 7s4 7 12 7" fill="none" stroke="#0A3F8C" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    res: `<svg viewBox="0 0 32 32"><path d="M3 16h5l2-5 4 10 4-10 2 5h9" fill="none" stroke="#0A3F8C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    cap: `<svg viewBox="0 0 32 32"><path d="M4 16h8M20 16h8M12 7v18M20 7v18" stroke="#0A3F8C" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    board: `<svg viewBox="0 0 32 32"><rect x="4" y="7" width="24" height="18" rx="2.5" fill="none" stroke="#0A3F8C" stroke-width="2.2"/><path d="M9 11h2M9 15h2M9 19h2M14 11h2M14 15h2M14 19h2M19 11h2M19 15h2M19 19h2" stroke="#0A3F8C" stroke-width="2" stroke-linecap="round"/></svg>`,
    tray: `<svg viewBox="0 0 32 32"><path d="M6 12h20v12H6z" fill="none" stroke="#0A3F8C" stroke-width="2.2" stroke-linejoin="round"/><ellipse cx="16" cy="12" rx="5" ry="2.4" fill="#E8932E"/></svg>`,
  })[k];

const tile = (g, t, s = "") => `<div class="d-tile"><span class="d-g">${g}</span><b>${t}</b>${s ? `<i>${s}</i>` : ""}</div>`;
const flow = (steps) => steps.map((x, i) => `<span class="d-st">${x}</span>${i < steps.length - 1 ? `<span class="d-dn">↓</span>` : ""}`).join("");

export const conceptPanel = `
<div class="d-panel">
  <div class="d-pcol">
    <div class="d-ph">Core concept</div>
    <div class="d-trio">
      <div><span class="d-ic">${ico.sun}</span><b>Light</b><i>Visual stimulation through an integrated LED.</i></div><span class="d-dots">···›</span>
      <div><span class="d-ic">${ico.sound}</span><b>Sound</b><i>Audio adds a second point of engagement.</i></div><span class="d-dots">···›</span>
      <div><span class="d-ic">${ico.treat}</span><b>Treat</b><i>A quick reward, delivered by the groomer.</i></div>
    </div>
    <div class="d-bar"><span class="d-ic sm">${ico.paw}</span>Grooming continues while engagement happens alongside it.</div>
    <div class="d-ph">New ecosystem</div>
    <div class="d-eco">
      <div><span class="d-circ">${ico.person}</span><b>Owner / groomer</b><i>Grooms the dog and triggers rewards with one click.</i></div>
      <span class="d-arr">uses →</span>
      <div><span class="d-circ dev">${device("front")}</span><b>Phygital companion</b><i>Provides light, sound and a treat to engage the dog.</i></div>
      <span class="d-arr">engages →</span>
      <div><span class="d-circ"><img src="/img/groomcue/dog-puppy.webp" alt="" /></span><b>Dog</b><i>Stays focused, receives a reward and feels reassured.</i></div>
    </div>
    <div class="d-pill">Focus &amp; cooperation</div>
    <p class="d-note">The device takes over the role of continuous engagement, while the owner stays focused on grooming.</p>
  </div>
  <div class="d-pcol">
    <div class="d-ph">Visual representation · the device</div>
    <div class="d-views">
      <figure>${device("front", true)}<figcaption>Front · dog-facing side</figcaption></figure>
      <figure>${device("back", true)}<figcaption>Back · groomer-facing side</figcaption></figure>
    </div>
    <ol class="d-key">
      <li><span>01</span><b>LED light</b><i>Yellow and blue visual stimulation captures attention.</i></li>
      <li><span>02</span><b>Speaker</b><i>Integrated audio keeps the dog engaged.</i></li>
      <li><span>03</span><b>Treat dispenser</b><i>The treat outlet sits just above the tray for easy delivery.</i></li>
      <li><span>04</span><b>Main power</b><i>Simple on/off control.</i></li>
    </ol>
  </div>
</div>`;

export const electronics = `
<div class="d-panel d-lay">
  <div class="d-layer l1">
    <div class="d-lh"><span>01</span><b>Physical layer</b><i>The tangible components that power, sense and create physical outputs.</i></div>
    <div class="d-lb">
      <div class="d-grp"><div class="d-gh">Power</div><div class="d-row">${tile(gl("plug"), "12V DC 3A adapter")}<span class="d-ar">→</span>${tile(gl("sw"), "On/off rocker switch")}<span class="d-ar">→</span>${tile(gl("fuse"), "Fuse + holder")}</div></div>
      <div class="d-grp"><div class="d-gh">Input</div><div class="d-row">${tile(gl("btn"), "R13-507 push button", "Treat dispense")}</div></div>
      <div class="d-grp"><div class="d-gh">Actuation</div><div class="d-row">${tile(gl("sol"), "JF-0530B 12V push-pull solenoid")}<span class="d-ar">→</span>${tile(gl("tray"), "Treat dispensing mechanism")}</div></div>
      <div class="d-grp"><div class="d-gh">Sensory output</div><div class="d-row">${tile(gl("led"), "WS2812B RGB LED module")}<span class="d-ar">→</span>${tile(gl("spk"), "Speaker", "Audio output")}</div></div>
      <div class="d-grp wide"><div class="d-gh">Support &amp; connection</div><div class="d-row">${tile(gl("board"), "830-point solderless breadboard")}${tile(gl("wire"), "Dupont wires")}${tile(gl("plug"), "JST-XH connectors")}${tile(gl("res"), "Resistors", "330Ω, 1kΩ")}${tile(gl("cap"), "470µF 50V capacitor")}</div></div>
    </div>
  </div>
  <div class="d-layer l2">
    <div class="d-lh"><span>02</span><b>Digital / control layer</b><i>The brain of the system: it processes input and controls all outputs.</i></div>
    <div class="d-lb"><div class="d-row">
      ${tile(gl("btn"), "Push button", "User input")}<span class="d-ar">→</span>
      ${tile(gl("chip"), "Arduino Uno R3", "Main controller")}<span class="d-ar">→</span>
      <div class="d-sig"><b>Control signals</b><i>Solenoid</i><i>LED</i><i>DFPlayer</i></div><span class="d-ar">→</span>
      ${tile(gl("chip"), "DFPlayer Mini MP3 module", "Audio controller")}<span class="d-ar">⇠</span>
      ${tile(gl("sd"), "SD card", "Stores audio files")}
    </div></div>
  </div>
  <div class="d-layer l3">
    <div class="d-lh"><span>03</span><b>Integration / experience layer</b><i>How everything works together to create a seamless grooming experience.</i></div>
    <div class="d-lb">
      <div class="d-sys"><div class="d-gh">1 · Treat system</div>${flow(["Groomer presses button", "Arduino receives command", "Solenoid activates", "Treat is dispensed"])}</div>
      <div class="d-sys"><div class="d-gh">2 · Light system</div>${flow(["Arduino controls LED", "WS2812B lights up", "Yellow / blue light", "Visual engagement"])}</div>
      <div class="d-sys"><div class="d-gh">3 · Sound system</div>${flow(["Arduino triggers DFPlayer", "DFPlayer plays audio", "Audio comes through speaker", "Auditory engagement"])}</div>
      <div class="d-sys end"><span class="d-circ"><img src="/img/groomcue/dog-puppy.webp" alt="" /></span><b>Dog engages</b><i>Positive association</i><i>Grooming continues smoothly</i></div>
    </div>
  </div>
  <div class="d-wf"><b>System workflow</b>
    <span>User action<i>Button press</i></span><em>→</em><span>Digital processing<i>Arduino</i></span><em>→</em><span>Outputs activated<i>Treat, light, sound</i></span><em>→</em><span>Dog engaged &amp; rewarded</span><em>→</em><span>Grooming experience enhanced</span>
  </div>
</div>`;
