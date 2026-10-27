(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  $$(".project-page .gallery figure:first-child").forEach((el) => el.classList.add("in"));
  $$("[data-reveal], [data-chars], [data-lines]").forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });

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
    setTimeout(() => setInterval(tick, 1000), 1000 + ci * 300);
    chip.addEventListener("mouseenter", tick);
  });

  /* ---------- hairline figures in the project cards ---------- */
  if (window.HL && window.__figs) {
    HL.inject(document);
    $$("[data-fig]").forEach((host) => {
      const f = window.__figs[host.dataset.fig];
      if (!f) return;
      host.setAttribute("data-hairline", f.name);
      host.setAttribute("role", "img");
      host.setAttribute("aria-label", f.means);
      const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, host);
      const out = host.parentElement.querySelector(".fig-read");
      let text = "";
      const read = { get textContent() { return text; }, set textContent(v) { text = v == null ? "" : String(v); if (out) out.textContent = text === "rest" ? "" : text; } };
      f.mount({ stage: host, svg, read }, f.range[1]);
    });
  }

  /* ---------- scroll-linked card grow + scrub (single rAF loop) ---------- */
  // Project cards start at 70% size and grow to 100% as they travel up the screen
  // (measured from the original: progress runs from card-centre at 1.42 x viewport height to 0.39 x).
  /* copy email */
  $$("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
    const t = b.dataset.copy;
    try { await navigator.clipboard.writeText(t); }
    catch { const a = document.createElement("textarea"); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand("copy"); } catch {} a.remove(); }
    b.classList.add("done"); clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove("done"), 1600);
  }));

  /* case-study pages: home palette up top, project palette from the first image down */
  const gal = $(".gallery, .doc, .sdoc, .vr");
  if (gal && document.body.classList.contains("project-page")) {
    const sync = () => document.body.classList.toggle("case-on", gal.getBoundingClientRect().top < innerHeight * 0.5);
    addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    sync();
  }

  const grow = $$("[data-grow]").map((el) => ({ el, k: reduce ? 1 : 0.7 }));
  let lastY = -1;
  function frame() {
    const vh = innerHeight;
    if (!reduce) {
      grow.forEach((g) => {
        const r = g.el.getBoundingClientRect();
        const p = clamp((1.416 * vh - (r.top + r.height / 2)) / (1.028 * vh), 0, 1);
        g.k += (0.7 + 0.3 * p - g.k) * 0.2;
        g.el.style.transform = `scale(${g.k.toFixed(4)})`;
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

/* Back (case study) returns to the card that was opened (landing position comes from CSS scroll-margin) */
(() => {
  const slug = (location.pathname.match(/^\/projects\/([^/]+)/) || [])[1];
  if (slug) {
    let ref = null;
    try { ref = document.referrer && new URL(document.referrer); } catch {}
    const from = ref && ref.origin === location.origin && (ref.pathname === "/" || ref.pathname === "/projects" || ref.pathname === "/projects.html") ? ref.pathname.replace(".html", "") : "/projects";
    const target = from + "#p-" + slug;
    document.querySelectorAll(".back-fixed").forEach((a) => (a.href = target));
    return;
  }
})();
(() => {
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".exp-row");
    if (b) b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") === "true" ? "false" : "true");
  });
})();
(() => {
  const f = document.getElementById("connect"), b = document.querySelector("[data-connect]");
  if (!f || !b) return;
  const sync = () => {
    const r = f.getBoundingClientRect();
    const here = r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5;
    b.classList.toggle("is-here", here);
    here ? b.setAttribute("aria-current", "location") : b.removeAttribute("aria-current");
  };
  addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync);
  sync();
})();
/* "View" cursor over portfolio cards (fine pointers only) */
(() => {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;
  const c = document.createElement("div");
  c.className = "view-cursor";
  c.setAttribute("aria-hidden", "true");
  c.textContent = "View";
  document.body.append(c);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let x = 0, y = 0, cx = 0, cy = 0, on = false, raf = 0;
  const tick = () => {
    cx += (x - cx) * (reduce ? 1 : 0.2);
    cy += (y - cy) * (reduce ? 1 : 0.2);
    c.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    raf = on || Math.abs(x - cx) > 0.5 || Math.abs(y - cy) > 0.5 ? requestAnimationFrame(tick) : 0;
  };
  const show = (v) => { on = v; c.classList.toggle("on", v); if (v && !raf) raf = requestAnimationFrame(tick); };
  cards.forEach((el) => {
    el.addEventListener("pointerenter", (e) => { x = cx = e.clientX; y = cy = e.clientY; show(true); });
    el.addEventListener("pointerleave", () => show(false));
    el.addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; });
  });
  addEventListener("scroll", () => { if (on && !document.querySelector(".card:hover")) show(false); }, { passive: true });
})();
