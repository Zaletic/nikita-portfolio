(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- text splitting ---------- */
  // Walk text nodes (keeping <em>) and wrap every word/char.
  function splitText(el, mode) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) return frag.append(" ");
            const wd = document.createElement("span");
            wd.className = "wd";
            if (mode === "word") {
              const ln = document.createElement("span");
              ln.className = "ln";
              const inner = document.createElement("span");
              inner.textContent = tok;
              ln.append(inner);
              wd.className = "";
              frag.append(ln);
              return;
            }
            [...tok].forEach((c) => {
              const ch = document.createElement("span");
              ch.className = "ch";
              ch.textContent = c;
              wd.append(ch);
            });
            frag.append(wd);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    el.setAttribute("aria-label", el.textContent.trim());
    walk(el);
    $$(".ch, .ln > span", el).forEach((c, i) => c.style.setProperty("--i", i));
  }

  // data-chars: letter-by-letter entrance
  $$("[data-chars]").forEach((el) => {
    splitText(el, "char");
    el.classList.add("chars");
    $$(".ch", el).forEach((c, i) => (c.style.transitionDelay = `${Math.min(i * 22, 900)}ms`));
  });
  // data-lines: word mask reveal
  $$("[data-lines]").forEach((el) => {
    splitText(el, "word");
    $$(".ln > span", el).forEach((c, i) => (c.style.transitionDelay = `${i * 45}ms`));
  });
  // data-scrub: letters light up as you scroll
  const scrubs = $$("[data-scrub]").map((el) => {
    splitText(el, "char");
    return { el, chars: $$(".ch", el) };
  });

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      const vis = entries.filter((e) => e.isIntersecting);
      vis.forEach((e, i) => {
        const t = e.target;
        if (t.matches("[data-reveal]") && !t.matches(".chars,.scrub")) t.style.transitionDelay = `${i * 90}ms`;
        t.classList.add("in");
        io.unobserve(t);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
  );
  $$("[data-reveal], [data-chars], [data-lines]").forEach((el) => io.observe(el));

  /* ---------- hero entrance ---------- */
  const hero = $(".hero-title");
  if (hero && !reduce) {
    const items = $$(".w, .chip", hero);
    items.forEach((el, i) => {
      const chip = el.classList.contains("chip");
      const from = chip
        ? { opacity: 0, transform: `translate(${(Math.random() - 0.5) * 260}px, ${80 + Math.random() * 120}px) rotate(${(Math.random() - 0.5) * 40}deg) scale(.4)` }
        : { opacity: 0, transform: "translateY(60%)", filter: "blur(6px)" };
      el.animate([from, { opacity: 1, transform: "none", filter: "blur(0)" }], {
        duration: chip ? 1300 : 1000,
        delay: 250 + i * 120,
        easing: "cubic-bezier(.22,1,.36,1)",
        fill: "backwards",
      });
    });
  }

  /* ---------- hero chips: cycle photos ---------- */
  $$(".chip").forEach((chip, ci) => {
    const imgs = $$("img", chip);
    if (imgs.length < 2) return;
    let k = 0;
    const tick = () => {
      imgs[k].classList.remove("on");
      k = (k + 1) % imgs.length;
      imgs[k].classList.add("on");
    };
    setTimeout(() => setInterval(tick, 3800), 2600 + ci * 450);
    chip.addEventListener("mouseenter", tick);
  });

  /* ---------- parallax + scrub (single rAF loop) ---------- */
  const par = $$("[data-speed]").map((el) => ({ el, s: parseFloat(el.dataset.speed), y: 0 }));
  const desktop = () => innerWidth > 809;
  let lastY = -1;
  function frame() {
    const vh = innerHeight;
    if (desktop() && !reduce) {
      par.forEach((p) => {
        const r = p.el.parentElement.getBoundingClientRect();
        const mid = r.top + r.height / 2 - vh / 2;
        const target = clamp(-mid * p.s, -110, 110);
        p.y += (target - p.y) * 0.1;
        p.el.style.transform = `translate3d(0, ${p.y.toFixed(2)}px, 0)`;
      });
    }
    if (scrollY !== lastY) {
      lastY = scrollY;
      scrubs.forEach(({ el, chars }) => {
        const r = el.getBoundingClientRect();
        const prog = clamp((vh * 0.88 - r.top) / (vh * 0.55 + r.height * 0.7), 0, 1);
        const n = chars.length;
        chars.forEach((c, i) => {
          const o = clamp((prog * (n + 24) - i) / 24, 0, 1);
          c.style.opacity = (0.16 + 0.84 * o).toFixed(3);
        });
      });
    }
    requestAnimationFrame(frame);
  }
  scrubs.forEach(({ chars }) => chars.forEach((c) => (c.style.opacity = 0.16)));
  requestAnimationFrame(frame);

  /* ---------- eyes cursor ---------- */
  const eyes = $(".eyes");
  if (eyes && fine) {
    const pupils = $$(".pupil", eyes);
    let mx = innerWidth / 2, my = innerHeight / 2, x = mx, y = my, vx = 0, vy = 0, seen = false;
    eyes.style.opacity = 0;
    addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (!seen) { seen = true; x = mx; y = my; eyes.style.opacity = 1; }
    }, { passive: true });
    document.addEventListener("pointerleave", () => (eyes.style.opacity = 0));
    document.addEventListener("pointerenter", () => seen && (eyes.style.opacity = 1));
    const OX = 14, OY = -16;
    const loop = () => {
      // spring toward the pointer, so the eyes trail behind and "look" back at it
      vx += (mx + OX - x) * 0.085; vy += (my + OY - y) * 0.085;
      vx *= 0.72; vy *= 0.72;
      x += vx; y += vy;
      eyes.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      const cx = x + 28, cy = y + 19;
      const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 60);
      const px = (dx / d) * 5 * k, py = (dy / d) * 8 * k;
      pupils.forEach((p) => (p.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`));
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    // blink now and then
    const blink = () => {
      eyes.classList.add("blink");
      setTimeout(() => eyes.classList.remove("blink"), 140);
      setTimeout(blink, 2800 + Math.random() * 3600);
    };
    setTimeout(blink, 2500);
    // eyes swell over anything clickable
    document.addEventListener("pointerover", (e) => eyes.classList.toggle("hot", !!e.target.closest("a, button, input, textarea, select")));
  }

  /* ---------- smooth page transitions ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank") return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => (location.href = u.href), 260);
  });
  addEventListener("pageshow", (e) => e.persisted && document.body.classList.remove("leaving"));

  /* ---------- contact form (opens the visitor's mail app) ---------- */
  const form = $("#contact-form");
  if (form) {
    const note = $(".form-note", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      $$("input[required], textarea[required]", form).forEach((f) => {
        const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.classList.toggle("bad", bad);
        if (bad) ok = false;
      });
      if (!ok) { note.textContent = "Please fill in your name, a valid email and a message."; return; }
      const d = Object.fromEntries(new FormData(form));
      const body = `${d.message}\n\n— ${d.name} (${d.email})${d.source ? `\nHeard about you via: ${d.source}` : ""}`;
      const to = $(".footer-mail a").textContent.trim();
      location.href = `mailto:${to}?subject=${encodeURIComponent("Hello from " + d.name)}&body=${encodeURIComponent(body)}`;
      note.textContent = "Thank you! Your email app should open with the message ready to send.";
      form.reset();
    });
    $$("input, textarea", form).forEach((f) => f.addEventListener("input", () => f.classList.remove("bad")));
  }
})();
