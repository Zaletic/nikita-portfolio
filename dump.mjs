// "Design dump": hanging polaroids of paintings, sketches and crafts.
// 4+ items: endless loop, drag to move, idle sway. Fewer items: a static row that just sways.
export const dumpItems = [
  { img: "/img/dump-railway-model-2.webp", w: 1400, h: 1050, title: "Central Railway Model", kind: "Information Design" },
  { img: "/img/dump-weave-green.webp", w: 1050, h: 1400, title: "Carpet weaving swatches", kind: "B.Des, NIFT" },
  { img: "/img/dump-weave-plaid.webp", w: 1050, h: 1400, title: "Checks &amp; Stripes swatches", kind: "B.Des, NIFT" },
  { img: "/img/dump-quill-carrot.webp", w: 787, h: 1400, title: "Paper Quilling - Carrot", kind: "" },
  { img: "/img/dump-quill-ghost.webp", w: 787, h: 1400, title: "Paper Quilling - Ghost", kind: "" },
  { img: "/img/dump-quill-snowman.webp", w: 1050, h: 1400, title: "Paper Quilling - Snowman", kind: "" },
  { img: "/img/dump-quill-gnome.webp", w: 1050, h: 1400, title: "Paper Quilling - Santa", kind: "" },
  { img: "/img/dump-callig-bamboo.webp", w: 1400, h: 863, title: "Calligraphy", kind: "Done with Ink" },
  { img: "/img/dump-callig-nikita.webp", w: 1377, h: 882, title: "Calligraphy", kind: "Done with Ink" },
  { img: "/img/dump-ink.webp", w: 1400, h: 852, title: "Ink studies", kind: "Ink Painting" },
];

const card = (it, i, hidden) =>
  `<div class="dd-c"${hidden ? ' aria-hidden="true"' : ""} style="--r:${i % 2 ? 1.5 : -1.5}deg"><div class="dd-p"><div class="dd-art"><img src="${it.img}" width="${it.w}" height="${it.h}" style="aspect-ratio:${it.w} / ${it.h}" alt="${it.title}" loading="eager" draggable="false" /></div><div class="dd-cap">${it.title}${it.kind ? `<small>${it.kind}</small>` : ""}</div></div></div>`;

export const dumpSection = (items = dumpItems) => {
  const loop = items.length >= 4;
  const cards = loop
    ? [0, 1, 2].map((k) => items.map((it, i) => card(it, i, k > 0)).join("")).join("")
    : items.map((it, i) => card(it, i, false)).join("");
  return `
<section class="dd${loop ? " dd-loop" : ""}">
  <h2 class="h-xl dd-h" data-lines>Artsy, Crafty Dump</h2>
  <p class="dd-tip" data-reveal>Weaving, paper quilling, ink, calligraphy and little models. This is where my colour, form and patience come from.</p>
  <div class="dd-string"><div class="dd-vp" id="ddvp"><div class="dd-track" id="ddtr">${cards}</div></div></div>
</section>${loop ? `
<script>
(()=>{const v=document.getElementById("ddvp"),t=document.getElementById("ddtr");let cs=[...t.children];
{const n=cs.length/3,p=[...Array(n).keys()];for(let i=n-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[p[i],p[j]]=[p[j],p[i]]}
 const o=[];for(let k=0;k<3;k++)p.forEach((j,i)=>{const c=cs[k*n+j];c.style.setProperty("--r",(i%2?1.5:-1.5)+"deg");o.push(c)});t.append(...o);cs=o}
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
v.addEventListener("pointermove",e=>{if(e.pointerType==="mouse")hov=!!(e.target.closest&&e.target.closest(".dd-art"))});v.addEventListener("pointerleave",()=>{hov=false});
v.addEventListener("wheel",e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();vx=clamp(vx-e.deltaX*.12,-30,30)}},{passive:false});
addEventListener("resize",()=>{wrap();t.style.transform="translateX("+x+"px)"});t.style.transform="translateX("+x+"px)";requestAnimationFrame(tick);
})();
</script>` : ""}`;
};
