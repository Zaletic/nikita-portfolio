// Plate It Right: a WebAR exploration made with Kivicube. Native page, portrait video beside the notes.
const lab = (t) => `<div class="vr-lab">${t}</div>`;

export const arDoc = `
<div class="vr">

<section class="vr-sec ar-top" data-reveal>
  <div class="ar-split">
    <video class="ar-video" controls autoplay muted loop playsinline preload="metadata" poster="/img/plate-it-right-poster.webp" aria-label="Screen recording of the Plate It Right AR experience">
      <source src="/video/plate-it-right.mp4" type="video/mp4" />
    </video>
    <div>
      ${lab("An exploration")}
      <h2 class="vr-h">A first try at augmented reality.</h2>
      <p class="vr-p">This was an exploration, not a finished product: a short exercise to learn how AR works by building one with Kivicube, a browser-based WebAR tool. The result runs straight from a link on a phone, with no app to install.</p>
      <p class="vr-p">Pointing the camera at a printed plate image brings up “Plate It Right”: a 3D plate that splits into food groups, showing what a balanced meal looks like. Half the plate is vegetables and fruits, a quarter is carbs and a quarter is protein.</p>
      <p class="vr-cap">Screen recording on a phone (about 25 seconds).</p>
    </div>
  </div>
</section>

<section class="vr-sec" data-reveal>
  <div class="vr-split">
    <div>${lab("What I explored")}<h2 class="vr-h">Image tracking and placing content in space.</h2></div>
    <p class="vr-p">The exercise was about the basics of AR: setting up an image marker for the camera to recognise, anchoring 3D content to it, and labelling it so it can be read at a glance while the phone moves.</p>
  </div>
</section>

<section class="vr-sec" data-reveal>
  <div class="vr-split">
    <div>${lab("Try it yourself")}<h2 class="vr-h">See it on your own phone.</h2></div>
    <p class="vr-p">The experience runs in the phone browser. Scan the QR code with your camera, wait for the scene to load, then point the camera at the plate image (on another screen or printed).</p>
  </div>
  <div class="ar-try">
    <figure><span class="ar-n">1</span><img src="/img/plate-it-right-qr.png" alt="QR code that opens the Plate It Right AR scene" class="ar-qr" /><figcaption><b>Scan the code</b> with your phone camera</figcaption></figure>
    <figure><span class="ar-n">2</span><div class="ar-wait">Loading scene…</div><figcaption><b>Wait for the scene</b> to load in the browser</figcaption></figure>
    <figure><span class="ar-n">3</span><img src="/img/plate-it-right-target.webp" alt="The elephant plate used as the AR target image" class="ar-tgt" /><figcaption><b>Point the camera</b> at this plate</figcaption></figure>
  </div>
</section>

</div>`;
