// VR Tattoo Studio case study: native page with the walkthrough video up top.
const lab = (t) => `<div class="vr-lab">${t}</div>`;

const steps = [
  ["01", "In the studio", "You start inside a tattoo studio, a space most people only ever see as a place to book a session. Here it is somewhere you can look around, move through and interact with."],
  ["02", "Into the Māori world", "From the studio you choose to step into a particular world, the Māori tribe of New Zealand. You enter it and meet familiar things from their culture, shown in context instead of explained in a caption."],
  ["03", "Back through the portal", "A portal brings you back to the studio. You return with a tattoo on your hand, a small memory of having been there."],
];

const decisions = [
  ["Make the studio something you explore", "The main idea was to lift the tattoo studio experience by making it more engaging and interactive, so the visit is more than choosing a design and waiting."],
  ["Teach through the experience, not a poster", "Tattoos carry cultural meaning. Instead of telling people about it, the experience puts them inside the Māori world so they learn by seeing and being there."],
  ["Let the tattoo be the memory", "Coming back with a tattoo on your hand turns the journey into something you keep. The tattoo is the souvenir of the experience."],
];

export const vrDoc = `
<div class="vr">

<section class="vr-video" data-reveal>
  <video controls playsinline preload="metadata" poster="/img/vr-tattoo-card.webp" aria-label="Walkthrough of the VR Tattoo Studio experience">
    <source src="/video/vr-tattoo.mp4" type="video/mp4" />
  </video>
  <p class="vr-cap">Walkthrough of the experience, about 2 minutes. Built with Blender and Unity.</p>
</section>

<section class="vr-sec" data-reveal>
  <div class="vr-split">
    <div>${lab("The idea")}<h2 class="vr-h">A tattoo studio you can step out of.</h2></div>
    <p class="vr-p">The aim was to make a tattoo studio more engaging and interactive, and at the same time teach people more about the cultural side of tattoos. Inside VR the studio becomes a doorway: you choose a world, walk into it, and come back changed.</p>
  </div>
</section>

<section class="vr-sec" data-reveal>
  ${lab("The experience")}
  <div class="vr-steps">
    ${steps.map(([n, h, p]) => `<div class="vr-step"><div class="vr-n">${n}</div><h3>${h}</h3><p>${p}</p></div>`).join("")}
  </div>
</section>

<section class="vr-sec" data-reveal>
  ${lab("Decisions")}
  <div class="vr-dec">
    ${decisions.map(([h, p]) => `<div class="vr-d"><h3>${h}</h3><p>${p}</p></div>`).join("")}
  </div>
</section>

<section class="vr-sec" data-reveal>
  <div class="vr-split">
    <div>${lab("How it was made")}<h2 class="vr-h">Blender and Unity.</h2></div>
    <p class="vr-p">The experience was made with Blender and Unity: the 3D spaces were built in Blender and brought to life as an interactive VR experience in Unity.</p>
  </div>
</section>

</div>`;
