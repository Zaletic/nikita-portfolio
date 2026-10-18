// GroomCue case study as a native, scrollable document (not slide images).
const I = (f, alt = "", cls = "") => `<img class="${cls}" src="/img/groomcue/${f}.webp" alt="${alt}" loading="lazy" />`;
import { conceptPanel, electronics } from "./groomcue-parts.mjs";
const lab = (t) => `<div class="d-lab">${t}</div>`;

const ecosystem = [
  ["Safety", ["Location", "Hazards", "Escape", "Outdoors"]],
  ["Health", ["Vet care", "Medication", "Symptoms", "Recovery"]],
  ["Nutrition", ["Feeding", "Hydration", "Diet", "Weight"]],
  ["Hygiene", ["Grooming", "Litter", "Cleaning", "Coat care"]],
  ["Well-being", ["Play", "Interaction", "Stimulation", "Companionship"]],
  ["Behaviour & emotion", ["Sleep", "Anxiety", "Activity & habits", "Social behaviour"]],
];

export const groomcueDoc = `
<div class="doc">

<section class="d-hero" data-reveal>
  ${lab("Phygital design · Case study")}
  <h2 class="d-h d-xl">Keeping a dog calm while the groomer keeps both hands busy.</h2>
  <p class="d-lede">GroomCue is a small countertop device that holds a dog's attention with light, sound and a treat, so grooming stays calm and the groomer stays focused.</p>
  <div class="d-img d-wide">${I("../groomcue-card", "A groomer brushing a dog that is engaged by the GroomCue device")}</div>
</section>

<section class="d-sec" data-reveal>
  <div class="d-split">
    <div>${lab("01 · Context")}<h2 class="d-h">The pet-care landscape</h2></div>
    <p class="d-p">Modern pet care goes beyond food and shelter. It covers safety, health, hygiene, activity and emotional well-being. Mapping how these areas connect shows where physical products and digital technology can work together for pets and their owners.</p>
  </div>
  <div class="d-tree">
    <div class="d-root">Pet-care landscape</div>
    <div class="d-cols">
      ${ecosystem.map(([h, items]) => `<div class="d-col"><div class="d-head">${h}</div>${items.map((i) => `<div class="d-leaf">${i}</div>`).join("")}</div>`).join("")}
    </div>
  </div>
</section>

<section class="d-sec" data-reveal>
  <div class="d-split d-top">
    <div>
      ${lab("The brand")}<h2 class="d-h">Petverse</h2>
      <p class="d-p">An Indian smart pet-care brand that designs technology-driven products to make everyday pet parenting simpler and more reliable: automatic feeders, smart water fountains, self-cleaning litter boxes and grooming tools.</p>
      <div class="d-pair">
        <div class="d-card"><div class="d-k">Vision</div><p>A world where caring for your pet feels as natural and effortless as loving them.</p></div>
        <div class="d-card"><div class="d-k">Mission</div><p>To make premium pet care accessible, intuitive and enjoyable by combining thoughtful design with smart technology.</p></div>
      </div>
      <div class="d-chips">${["Calm", "Trust", "Care", "Joy", "Safety"].map((c) => `<span>${c}</span>`).join("")}</div>
    </div>
    <div class="d-img d-tall">${I("petverse", "Petverse grooming products")}</div>
  </div>
</section>

<section class="d-sec" data-reveal>
  ${lab("Benchmark")}<h2 class="d-h">Dyson Pet Grooming Kit</h2>
  <p class="d-p d-narrow">Dyson treats grooming as an extension of an existing household ecosystem, with premium ergonomics, minimal form and effortless integration. It has no smart connectivity and relies on the vacuum for power.</p>
  <div class="d-split d-top">
    <div class="d-grid2">
      ${[["Smart features", "Removes loose hair straight into the vacuum, with trigger-controlled suction."], ["Ease of use", "Quick-release attachments and a lightweight, one-handed brush."], ["Pet comfort", "Angled stainless-steel bristles reach the undercoat gently without stress."], ["Maintenance", "Hair goes into the vacuum bin, with a washable attachment and little manual cleaning."]]
        .map(([a, b]) => `<div class="d-card"><div class="d-k">${a}</div><p>${b}</p></div>`).join("")}
    </div>
    <div class="d-img d-tall d-dark">${I("dyson-kit", "Dyson pet grooming kit")}</div>
  </div>
  <div class="d-img d-white">${I("dyson-eco", "Dyson pet grooming kit ecosystem map")}</div>
</section>

<section class="d-sec" data-reveal>
  ${lab("02 · Research")}<h2 class="d-h">Grooming alone takes more than two hands</h2>
  <p class="d-quote">“I need both hands free but I only have two.”</p>
  <div class="d-grid2 d-charts">
    <figure>${I("chart-effort", "Survey: which pet-care tasks need the most effort")}<figcaption>Which parts of the care routine need the most effort (15 responses)</figcaption></figure>
    <figure>${I("chart-activities", "Survey: regular pet-care activities")}<figcaption>Activities done on a regular basis (15 responses)</figcaption></figure>
  </div>
  <div class="d-grid3">
    <div class="d-card"><div class="d-num">01</div><h3>Grooming is hard</h3><p>It's the second most difficult pet-care task, after health monitoring.</p></div>
    <div class="d-card"><div class="d-num">02</div><h3>Grooming alone is difficult</h3><p>Owners must manage the dog while handling grooming tools at the same time.</p></div>
    <div class="d-card"><div class="d-num">03</div><h3>Both hands are occupied</h3><p>One hand holds the tool; the other is needed to hold, calm, reposition or reward the dog.</p></div>
  </div>
</section>

<section class="d-sec" data-reveal>
  ${lab("Users")}<h2 class="d-h">Primary and secondary users</h2>
  <div class="d-split d-top">
    <div class="d-stack">
      <div class="d-card"><div class="d-k">Dog · primary user (Laila, a Shih Tzu)</div>
        <ul><li>Receives care from the parent</li><li>Responds to touch, voice and rewards</li><li>Seeks attention and reassurance</li><li>Moves and reacts based on comfort and interest</li><li>Associates rewards with desired behaviour</li></ul></div>
      <div class="d-card"><div class="d-k">Owner or groomer · secondary user (Riddhi)</div>
        <ul><li>Grooms, handles and positions the dog</li><li>Uses voice, touch and treats to communicate</li><li>Rewards cooperative behaviour</li><li>Creates a sense of safety and reassurance</li></ul></div>
    </div>
    <div class="d-img d-photo">${I("owner", "Riddhi with her two dogs")}</div>
  </div>
</section>

<section class="d-sec" data-reveal>
  ${lab("The existing ecosystem")}<h2 class="d-h">Why does grooming become stressful?</h2>
  <p class="d-p d-narrow">Grooming is a loop, not a line: prepare, position, groom, manage, reward, continue. Each time the dog gets restless the owner has to stop, reward and refocus, and the cycle repeats many times in one session.</p>
  <div class="d-img d-white">${I("existing-eco", "Existing grooming journey from preparing to repeating the cycle")}</div>
  <div class="d-grid2">
    <div class="d-card"><div class="d-k">The reality</div><p>Grooming and engagement compete for the owner's attention. Treats and sounds help, but they are manual, inconsistent and interrupt the flow.</p></div>
    <div class="d-card"><div class="d-k">What both need</div><p><b>The dog:</b> calm, comfort and something to focus on.<br><b>The owner:</b> to groom effectively without constant interruption.</p></div>
  </div>
</section>

<section class="d-sec d-opp" data-reveal>
  <div>
    ${lab("03 · Opportunity")}<h2 class="d-h">Where the problem sits</h2>
    <ol class="d-list"><li><span>01</span>Attention is difficult to sustain</li><li><span>02</span>Rewarding requires the groomer's attention</li><li><span>03</span>Grooming and engagement compete for the same attention</li></ol>
  </div>
  <div class="d-peek">
    ${I("dog-black", "A black dog looking up", "d-cut")}
    <div class="d-hmw"><div class="d-k">How might we</div><p>keep the dogs engaged during grooming without adding another task for the groomer?</p></div>
  </div>
</section>

<section class="d-sec" data-reveal>
  ${lab("What the research says")}<h2 class="d-h">Sound and colour can hold a dog's attention</h2>
  <div class="d-grid3 d-studies">
    <div class="d-card"><div class="d-k">Music during grooming</div><h3>Calmer behaviour</h3><p>Krupa et al., 2025 observed 15 companion dogs during bathing, drying, clipping and nail trimming. Dogs were calmer when classical music was played than with no music.</p></div>
    <div class="d-card"><div class="d-k">Different music genres</div><h3>Less stress</h3><p>Bowman et al., 2017 exposed 38 kennelled dogs to classical, soft rock, reggae, pop and Motown. Music led to more resting and less standing, with some genres stronger. <a href="https://pubmed.ncbi.nlm.nih.gov/28093218/" target="_blank" rel="noopener">Read the paper</a></p></div>
    <div class="d-card"><div class="d-k">How dogs see colour</div><h3>Yellow gets noticed</h3><p>Roy et al., 2025 found dogs approached a yellow object first, even when a grey one held food. Blue and yellow sit in their sensitive range. <a href="https://link.springer.com/article/10.1007/s10071-025-01984-9" target="_blank" rel="noopener">Read the paper</a></p></div>
  </div>
  <div class="d-dogs">${I("dog-headphones", "A dog wearing headphones", "d-cut")}${I("dog-play", "A dog running with a ball", "d-framed")}<p class="d-quote d-small">Yellow can attract the attention of Indian free-ranging dogs.</p></div>
</section>

<section class="d-sec" data-reveal>
  ${lab("04 · Concept")}<h2 class="d-h">Light, sound and a treat</h2>
  <p class="d-p d-narrow">GroomCue sits beside the dog and does the job of continuous engagement, so the groomer doesn't have to. Grooming carries on while engagement happens alongside it.</p>
  ${conceptPanel}
  <div class="d-peek d-peek2">
    ${I("dog-dachshund", "A dachshund peeking over a card", "d-cut")}
    <div class="d-specs">
      ${[["Treat outlet", "Gravity-fed single treat release"], ["Push button", "Manual release trigger"], ["Adjustable height", "Two-position telescopic stem"], ["Audio cue", "Directional speaker"], ["LED ring cue", "Amber 12-dot attention circle"]]
        .map(([a, b]) => `<div><div class="d-k">${a}</div><p>${b}</p></div>`).join("")}
    </div>
  </div>
  <h3 class="d-sub">Form exploration</h3>
  <div class="d-sketches">
    <div class="d-img d-big">${I("form-sketch", "Sketches exploring the form of the device")}</div>
    <div class="d-img">${I("form-small-1", "Bone-shaped device sketch")}</div>
    <div class="d-img">${I("form-small-2", "Stem and base device sketch")}</div>
  </div>
</section>

<section class="d-sec" data-reveal>
  ${lab("05 · Prototype")}<h2 class="d-h">The electronics behind it</h2>
  <p class="d-p d-narrow">An Arduino controls three outputs: an LED that glows yellow and blue, a speaker that plays calming audio, and a solenoid that releases a treat when the groomer presses the button.</p>
  ${electronics}
  <div class="d-img d-white d-narrowimg">${I("circuit", "Circuit diagram")}</div>
</section>

<section class="d-sec" data-reveal>
  ${lab("06 · What's next")}<h2 class="d-h">Future versions and roadmap</h2>
  <div class="d-grid3">
    <div class="d-card"><div class="d-k">Today · GroomCue</div><h3>Assisted engagement</h3><p>Light, sound and a treat: one-click treat dispensing, yellow and blue LED, integrated audio and adjustable height, all controlled by the groomer.</p></div>
    <div class="d-card"><div class="d-k">Next · Smart GroomCue</div><h3>Adaptive engagement</h3><p>Sensing movement or loss of attention, adjusting reward timing and audio, and offering calm, reward and grooming modes.</p></div>
    <div class="d-card"><div class="d-k">Later · Connected GroomCue</div><h3>Personalised companion</h3><p>A mobile app with dog profiles for multiple dogs, treat tracking, saved preferences, favourite audio and session history.</p></div>
  </div>
  <div class="d-road">
    ${I("dog-jump", "A small white dog jumping", "d-cut")}
    <div class="d-steps">
      <p class="d-p">Because of prototype constraints, this version focuses on the core interaction: continuous light and sound, with manually triggered treats.</p>
      <div><span>01</span><b>Refine the physical prototype</b><i>A more compact enclosure, more consistent dispensing, a tray that's easier to clean and refill, and a safer, sturdier build.</i></div>
      <div><span>02</span><b>Engagement system</b><i>Multiple audio tracks and different light sequences.</i></div>
      <div><span>03</span><b>Sensing and adaptation</b><i>Adapting reward timing to the dog's behaviour.</i></div>
    </div>
  </div>
</section>

<section class="d-sec d-credit" data-reveal>
  ${lab("Credits")}
  <p class="d-p">Phygital Design · M.Des IUxD, DAU<br>Guided by Prof. Umang Shah<br>Team: Brahmi, Nikita and Riddhi</p>
</section>

</div>`;
