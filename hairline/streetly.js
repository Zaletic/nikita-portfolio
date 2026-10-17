/**
 * Streetly: a city district of seven by seven blocks, with streets between
 * them. The pointer is projected onto the ground; each block rises on its own
 * spring by its distance to it, so the nearest blocks swell like the nearest
 * bikes. A map pin (a stem and a round head) stands on the block under the
 * pointer, or on the first station at rest. The slider is the radius.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  mk, pointer, put, register, disposer, solid,
} = HL;

const N = 7, CELL = 17, FOOT = 13, EXT = N * CELL, PB = 5, RISE = 26, PIN = 12;
// three stations stand taller at rest; the first one carries the pin
const ST = [[1, 1], [4, 2], [5, 5]];

const falloff = (u) =>
  u <= 0 ? 1 : u <= 0.417 ? 1 - (u / 0.417) * 0.6875 : u <= 1 ? 0.3125 - ((u - 0.417) / 0.583) * 0.2185 : 0.094;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.7);
  fit(C, [[-6, -6, -PB], [EXT + 6, EXT + 6, -PB], [EXT + 6, -6, -PB], [-6, EXT + 6, -PB], [0, 0, RISE + PIN + 10]], 200, 168);
  const P = proj(C), front = facing(C);
  let R = value * CELL, over = null;

  const g = mk("g", {}, svg), cols = [], byCell = new Map();
  const [pr, pi] = rings(-6, -6, EXT + 6, EXT + 6, 8, 2);
  put(solid(g), prism(P, front, pr, pi, -PB, 0));
  for (let s = 0; s <= 2 * (N - 1); s++) for (let i = 0; i < N; i++) {
    const j = s - i;
    if (j < 0 || j >= N) continue;
    const st = ST.some(([a, b]) => a === i && b === j);
    const h0 = 3 + ((i * 3 + j * 5) % 4) * 1.6 + (st ? 9 : 0);
    const x0 = i * CELL + (CELL - FOOT) / 2, y0 = j * CELL + (CELL - FOOT) / 2;
    const [ring, inner] = rings(x0, y0, x0 + FOOT, y0 + FOOT, 3, 1);
    const c = { i, j, h0, ring, inner, sp: spring(h0, { eps: 0.04 }), el: solid(g), drawn: NaN };
    cols.push(c);
    byCell.set(i + "," + j, c);
  }

  // The pin: a thin stem under a round head, painted just after its block so nearer blocks still cover it.
  const pin = mk("g", {}, g), stem = solid(pin), head = solid(pin);
  const [sr, si] = rings(0, 0, 2.4, 2.4, 1.2, 0.5), [hr, hi] = rings(0, 0, 7, 7, 3.5, 1.2);
  const home = byCell.get(ST[0].join(","));
  let want = home, on = null, drawnPin = NaN;

  function drawPin() {
    if (want !== on) { on = want; on.el.g.after(pin); drawnPin = NaN; }
    const h = Math.max(0.6, on.sp.x);
    if (h === drawnPin) return;
    drawnPin = h;
    const cx = (on.i + 0.5) * CELL, cy = (on.j + 0.5) * CELL;
    const mv = (ring, dx) => ring.map((q) => ({ ...q, u: q.u + cx - dx, v: q.v + cy - dx }));
    put(stem, prism(P, front, mv(sr, 1.2), mv(si, 1.2), h, h + PIN - 4));
    put(head, prism(P, front, mv(hr, 3.5), mv(hi, 3.5), h + PIN - 4, h + PIN + 3));
    head.sil.classList.add("hi");
  }

  function drawCol(c) {
    const h = Math.max(0.6, c.sp.x);
    if (h === c.drawn) return;
    c.drawn = h;
    put(c.el, prism(P, front, c.ring, c.inner, 0, h));
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const c of cols) { if (stepS(c.sp, dt)) m = true; drawCol(c); }
    drawPin();
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    for (const c of cols) {
      if (!over) { c.sp.t = c.h0; continue; }
      const dx = (c.i + 0.5) * CELL - over[0], dy = (c.j + 0.5) * CELL - over[1];
      c.sp.t = c.h0 + RISE * falloff(Math.hypot(dx, dy) / R);
    }
    const prev = want;
    if (over) {
      const i = clamp(Math.floor(over[0] / CELL), 0, N - 1), j = clamp(Math.floor(over[1] / CELL), 0, N - 1);
      want = byCell.get(i + "," + j);
      read.textContent = `block ${i + 1}·${j + 1}`;
    } else { want = home; read.textContent = "rest"; }
    if (prev) prev.el.sil.classList.remove("hi");
    want.el.sil.classList.add("hi");
    B.wake();
  }
  home.el.sil.classList.add("hi");

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v * CELL; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "streetly",
  means: "A district of blocks swells toward the pointer, and a map pin lands on the nearest station.",
  rules: [1, 3, 5, 9],
  range: [1.6, 3, 5],
  tour: [[130, 150], [270, 160], [220, 230], null],
  mount,
});
