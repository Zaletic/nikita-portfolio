/**
 * Railway: a locomotive on a length of track with four stations beside it.
 * The pointer is projected onto the ground and the train rolls along the
 * rails to it on a spring, with a headlamp that stays bright and the nearest
 * station marked. At rest it waits at the first station. The slider is how
 * firmly the train follows.
 */
const {
  Cam, clamp, facing, fit, open, prism, proj, rings, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const L = 168, W = 34, PB = 4, TL = 38, SL = 11, Z0 = 3, ZB = 16, ZC = 25;
const ST = [22, 62, 106, 146];
const X0 = 5, X1 = L - TL - 5;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.05);
  fit(C, [[-8, -8, -PB], [L + 8, W + 20, -PB], [L + 8, -8, -PB], [-8, W + 20, -PB], [0, 0, 34], [L, 16, 34]], 200, 172);
  const P = proj(C), front = facing(C);
  const stiff = (v) => ({ k: v, c: 1.8 * Math.sqrt(v), eps: 0.05 });
  const sp = spring(ST[0] - TL / 2, stiff(value));
  let nearest = 0;

  const g = mk("g", {}, svg);
  const [br, bi] = rings(-8, -8, L + 8, W + 8, 6, 1.8);
  put(solid(g), prism(P, front, br, bi, -PB, 0));
  // sleepers first, rails on top of them, then the train, then the station dots
  for (let k = 0; k < SL; k++) {
    const x = 6 + k * ((L - 16) / (SL - 1)), [r, i] = rings(x, 1.5, x + 3.6, W - 1.5, 1, 0.5);
    put(solid(g), prism(P, front, r, i, 0, 1.4));
  }
  for (const y of [5.5, W - 7.7]) {
    const [r, i] = rings(0, y, L, y + 2.2, 1, 0.4);
    put(solid(g), prism(P, front, r, i, 1.4, 3.2));
  }
  const dots = ST.map((x) => flatDot(g, C, 1.6, "dot off"));
  ST.forEach((x, k) => place(dots[k], P(x, W + 15, 0)));

  // the train: a body, a roof that is smaller than the body, a pantograph, and a lamp
  const train = mk("g", {}, g), body = solid(train), roof = solid(train);
  const pant = mk("path", { class: "nf" }, train), lamp = mk("circle", { r: 2.1, class: "dot" }, train);
  let drawn = NaN;
  function drawTrain() {
    const x = sp.x;
    if (x === drawn) return;
    drawn = x;
    const [r, i] = rings(x, 8, x + TL, W - 8, 6, 1.4), [r2, i2] = rings(x + 4, 11, x + TL - 11, W - 11, 4, 1.2);
    put(body, prism(P, front, r, i, Z0, ZB));
    put(roof, prism(P, front, r2, i2, ZB, ZC));
    const a = x + 11, y = W / 2;
    pant.setAttribute("d", open([P(a, y, ZC), P(a + 7, y, ZC + 8), P(a + 14, y, ZC)]) + open([P(a + 3, y, ZC + 6), P(a + 11, y, ZC + 6)]));
    place(lamp, P(x + TL, y, 9));
  }

  const B = register(stage, (dt) => { const m = stepS(sp, dt); drawTrain(); return m; });
  bag.add(B.unregister);

  function aim(over) {
    if (!over) { sp.t = ST[0] - TL / 2; nearest = 0; read.textContent = "rest"; }
    else {
      sp.t = clamp(over[0] - TL / 2, X0, X1);
      nearest = ST.reduce((a, s, k) => (Math.abs(s - over[0]) < Math.abs(ST[a] - over[0]) ? k : a), 0);
      read.textContent = `stn ${nearest + 1}`;
    }
    dots.forEach((d, k) => d.setAttribute("class", k === nearest ? "dot m" : "dot off"));
    B.wake();
  }
  dots[0].setAttribute("class", "dot m");

  bag.add(pointer(stage, {
    move: (p) => aim(unproj(C, p[0], p[1], 0)),
    leave: () => aim(null),
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { const s = stiff(v); sp.k = s.k; sp.c = s.c; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "railway",
  means: "A locomotive rolls along the rails to the pointer and stops at the nearest station.",
  rules: [1, 5, 8, 9],
  range: [45, 100, 190],
  tour: [[110, 190], [200, 170], [290, 150], null],
  mount,
});
