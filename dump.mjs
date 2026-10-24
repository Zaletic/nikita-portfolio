// "Design dump": hanging polaroids of paintings, sketches and crafts.
// 4+ items: endless loop, drag to move, idle sway. Fewer items: a static row that just sways.
export const dumpItems = [
  { img: "/img/dump-railway-model-2.webp", w: 1400, h: 1050, title: "Central Railway Model", kind: "Information Design - April 2026" },
  { img: "/img/dump-weave-green.webp", w: 1050, h: 1400, title: "Green weave samples", kind: "Weaving" },
  { img: "/img/dump-weave-plaid.webp", w: 1050, h: 1400, title: "Plaid weave samples", kind: "Weaving" },
  { img: "/img/dump-print-lynx.webp", w: 1200, h: 1200, title: "Print patterns", kind: "Print Design - Lynx 2024" },
  { img: "/img/dump-quill-carrot.webp", w: 787, h: 1400, title: "Quilled carrot", kind: "Paper Quilling - 2024" },
  { img: "/img/dump-quill-ghost.webp", w: 787, h: 1400, title: "Quilled ghost", kind: "Paper Quilling - 2024" },
  { img: "/img/dump-quill-snowman.webp", w: 1050, h: 1400, title: "Quilled snowman", kind: "Paper Quilling - 2024" },
  { img: "/img/dump-quill-gnome.webp", w: 1050, h: 1400, title: "Quilled gnome", kind: "Paper Quilling - 2024" },
  { img: "/img/dump-ph-4.svg", w: 1400, h: 1000, title: "Coming soon", kind: "Sketching" },
];

const card = (it, i, hidden) =>
  `<div class="dd-c"${hidden ? ' aria-hidden="true"' : ""} style="--r:${i % 2 ? 1.5 : -1.5}deg"><div class="dd-p"><div class="dd-art"><img src="${it.img}" width="${it.w}" height="${it.h}" style="aspect-ratio:${it.w} / ${it.h}" alt="${it.title}" loading="eager" draggable="false" /></div><div class="dd-cap">${it.title}<small>${it.kind}</small></div></div></div>`;

export const dumpSection = (items = dumpItems) => {
  const loop = items.length >= 4;
  const cards = loop
    ? [0, 1, 2].map((k) => items.map((it, i) => card(it, i, k > 0)).join("")).join("")
    : items.map((it, i) => card(it, i, false)).join("");
  return `
<section class="dd${loop ? " dd-loop" : ""}">
  <h2 class="h-xl dd-h" data-lines>Artsy, Crafty Dump</h2>
  <p class="dd-tip" data-reveal>Paintings, sketches and little crafts. This is where my colour, form and patience come from.</p>
  <div class="dd-string"><div class="dd-vp" id="ddvp"><div class="dd-track" id="ddtr">${cards}</div></div></div>
</section>${loop ? `
<script>
(()=>{const v=document.getElementById("ddvp"),t=document.getElementById("ddtr"),cs=[...t.children];
let vx=0,drag=false,hov=false,lx=0,last=0;const SPEED=-38;
const PAD=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pad"))||40;
const S=()=>cs[cs.length/3].offsetLeft-cs[0].offsetLeft;
let x=-S()+PAD();
const wrap=()=>{const s=S(),hi=-s+PAD(),lo=-2*s+PAD();while(x>hi)x-=s;while(x<=lo)x+=s};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const tick=now=>{const dt=Math.min(.05,(now-(last||now))/1000);last=now;
 if(!drag){x+=vx;vx*=.94;if(Math.abs(vx)<.05)vx=0;if(!hov&&!reduce&&vx===0)x+=SPEED*dt}
 wrap();t.style.transform="translateX("+x+"px)";requestAnimationFrame(tick)};
v.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"&&e.button!==0)return;drag=true;lx=e.clientX;vx=0;v.classList.add("d");try{v.setPointerCapture(e.pointerId)}catch(_){}});
v.addEventListener("pointermove",e=>{if(!drag)return;const d=e.clientX-lx;lx=e.clientX;x+=d;vx=clamp(d,-40,40)});
const up=()=>{if(!drag)return;drag=false;v.classList.remove("d")};
v.addEventListener("pointerup",up);v.addEventListener("pointercancel",up);
v.addEventListener("pointerenter",e=>{if(e.pointerType==="mouse")hov=true});v.addEventListener("pointerleave",()=>{hov=false});
v.addEventListener("wheel",e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();vx=clamp(vx-e.deltaX*.12,-30,30)}},{passive:false});
addEventListener("resize",()=>{wrap();t.style.transform="translateX("+x+"px)"});t.style.transform="translateX("+x+"px)";requestAnimationFrame(tick);
})();
</script>` : ""}`;
};
