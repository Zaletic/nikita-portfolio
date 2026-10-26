// VR Tattoo Studio case study: native page with the walkthrough video up top.
const lab = (t) => `<div class="vr-lab">${t}</div>`;

const steps = [
  ["01", "Arrival", "Users begin inside a virtual tattoo studio, a familiar setting they can look around and interact with. From here they are invited to choose a world to enter."],
  ["02", "Immersion", "Choosing the Māori world transports users to the setting of a Māori tribe of New Zealand. Objects and surroundings drawn from the culture appear in context, so understanding builds through exploration rather than explanation."],
  ["03", "Return", "A portal leads back to the studio. The journey leaves a trace: a tattoo on the user's hand, a lasting memory of the place they visited."],
];

const decisions = [
  ["Interaction over passive viewing", "To deepen engagement, the studio became a space to explore and make choices in, giving users agency from the very first moment."],
  ["Learning through presence", "Tattoos carry cultural meaning. Rather than explaining it in text, the experience places that context in an environment users inhabit, so knowledge is encountered, not lectured."],
  ["The tattoo as memory", "Ending with a tattoo on the user's hand closes the loop between story and studio. The mark becomes a personal souvenir that links the virtual journey to the act of being tattooed."],
];

export const vrDoc = `
<div class="vr">

<section class="vr-video" data-reveal>
  <video controls playsinline preload="metadata" poster="/img/vr-tattoo-poster.webp" aria-label="Walkthrough of the VR Tattoo Studio experience">
    <source src="/video/vr-tattoo-v2.mp4" type="video/mp4" />
  </video>
  <p class="vr-cap">Walkthrough of the experience (about 2 minutes), built with Blender and Unity.</p>
</section>

<section class="vr-sec" data-reveal>
  <div class="vr-split">
    <div>${lab("The idea")}<h2 class="vr-h">From studio visit to cultural journey.</h2></div>
    <p class="vr-p">A tattoo studio is usually a transactional space: a person arrives, chooses a design and leaves. This project asks whether the visit can become something richer. Set in virtual reality, the studio turns interactive and doubles as a doorway, inviting users to learn about the cultural roots of tattooing by stepping into a world where that culture lives.</p>
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
    <div>${lab("How it was made")}<h2 class="vr-h">Built with Blender and Unity.</h2></div>
    <p class="vr-p">The 3D spaces were modelled in Blender and assembled in Unity, where the interactions, the portal transition and the VR experience were developed.</p>
  </div>
</section>

</div>`;
