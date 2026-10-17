/**
 * Tap: a standpipe with a spout over a stone basin. Where the pointer sits
 * across the stage sets how far the tap is turned: the stream thickens from a
 * drip to a run, and the water slab in the basin rises with it. At rest the
 * tap is barely open and its handle is the bright mark. The slider is how
 * fast the water answers.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, spring, stepS,
  mk, place, pointer, put, register, disposer, solid,
} = HL;

const PB = 4, HB = 9, WMAX = 9, DROPS = 7, SX = 52, SY = 28, ZS = 30, ZF = HB + 2;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.2);
  fit(C, [[-6, -6, -PB], [106, 62, -PB], [106, -6, -PB], [-6, 62, -PB], [8, 24, 48], [100, 50, HB + WMAX]], 200, 166);
  const P = proj(C), front = facing(C);
  const sp = spring(0.3, { k: value, c: 1.8 * Math.sqrt(value), eps: 0.004 });
  let drawn = NaN, bright = true;

  const g = mk("g", {}, svg);
  const [br, bi] = rings(-6, -6, 106, 62, 7, 1.8);
  put(solid(g), prism(P, front, br, bi, -PB, HB));
  const water = solid(g);
  const [wr, wi] = rings(34, 6, 98, 50, 6, 1.4);
  // the standpipe, its arm over the basin, and the handle on top
  const post = solid(g), arm = solid(g), handle = solid(g);
  const [pr, pi] = rings(6, SY - 4, 16, SY + 4, 3, 1);
  put(post, prism(P, front, pr, pi, HB, ZS + 8));
  const [ar, ai] = rings(6, SY - 4, SX + 4, SY + 4, 3, 1);
  put(arm, prism(P, front, ar, ai, ZS, ZS + 8));
  const drops = [];
  for (let k = 0; k < DROPS; k++) drops.push(mk("circle", { r: 1.5, class: "dot off" }, g));
  const [hr, hi] = rings(24, SY - 2, 32, SY + 2, 1.8, 0.6);

  function draw() {
    const f = sp.x;
    if (f === drawn) return;
    drawn = f;
    put(water, prism(P, front, wr, wi, HB, HB + 0.6 + WMAX * f));
    put(handle, prism(P, front, hr, hi, ZS + 8, ZS + 12 + 6 * f));
    handle.sil.classList.toggle("hi", bright);
    water.sil.classList.toggle("hi", !bright);
    // a stream of drops: more of them, and closer together, the further the tap is turned
    const live = Math.round(1 + f * (DROPS - 1)), top = HB + 0.6 + WMAX * f;
    drops.forEach((d, k) => {
      const z = ZS - 1 - (k / (DROPS - 1)) * (ZS - 1 - top);
      place(d, P(SX, SY, z));
      d.setAttribute("class", k < live ? "dot" : "dot off");
    });
  }

  const B = register(stage, (dt) => { const m = stepS(sp, dt); draw(); return m; });
  bag.add(B.unregister);

  function aim(x) {
    if (x === null) { sp.t = 0.3; bright = true; read.textContent = "rest"; }
    else { sp.t = clamp((x - 70) / 260, 0, 1); bright = false; read.textContent = `flow ${Math.round(sp.t * 10)}`; }
    B.wake();
  }
  bag.add(pointer(stage, { move: (p) => aim(p[0]), leave: () => aim(null) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { sp.k = v; sp.c = 1.8 * Math.sqrt(v); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "tap",
  means: "A tap over a basin: the further the pointer turns it, the thicker the stream and the higher the water.",
  rules: [4, 5, 8, 9],
  range: [45, 100, 190],
  tour: [[110, 190], [200, 170], [300, 150], null],
  mount,
});
