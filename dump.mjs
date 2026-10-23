// "Design dump": hanging polaroids of paintings, sketches and crafts.
// 4+ items: endless loop, drag to move, idle sway. Fewer items: a static row that just sways.
export const dumpItems = [
  { img: "/img/dump-railway-model.webp", w: 1400, h: 1000, title: "Mumbai CST model", kind: "Craft · Railway Network" },
];

const card = (it, i, hidden) =>
  `<div class="dd-c"${hidden ? ' aria-hidden="true"' : ""} style="--r:${i % 2 ? 2.5 : -2.5}deg;--d:${(3.4 + ((i * 0.37) % 1.6)).toFixed(2)}s;--l:${(-i * 0.6).toFixed(1)}s"><div class="dd-p"><div class="dd-art" style="aspect-ratio:${it.w} / ${it.h}"><img src="${it.img}" alt="${it.title}" loading="lazy" draggable="false" /></div><div class="dd-cap">${it.title}<small>${it.kind}</small></div></div></div>`;

export const dumpSection = (items = dumpItems) => {
  const loop = items.length >= 4;
  const cards = loop
    ? [0, 1, 2].map((k) => items.map((it, i) => card(it, i, k > 0)).join("")).join("")
    : items.map((it, i) => card(it, i, false)).join("");
  return `
<section class="dd${loop ? " dd-loop" : ""}">
  <div class="dd-k" data-reveal>Design dump</div>
  <h2 class="h-xl dd-h" data-lines>The dump behind the design.</h2>
  <p class="dd-tip" data-reveal>Paintings, sketches and little crafts. This is where my colour, form and patience come from.</p>
  <div class="dd-string"><div class="dd-vp" id="ddvp"><div class="dd-track" id="ddtr">${cards}</div></div></div>
</section>${loop ? `
<script>
(()=>{const v=document.getElementById("ddvp"),t=document.getElementById("ddtr"),cs=[...t.children];
let vx=0,drag=false,lx=0,raf=0,settle=0;
const PAD=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pad"))||40;
const S=()=>cs[cs.length/3].offsetLeft-cs[0].offsetLeft;
let x=-S()+PAD();
const wrap=()=>{const s=S(),hi=-s+PAD(),lo=-2*s+PAD();while(x>hi)x-=s;while(x<=lo)x+=s};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const R=c=>parseFloat(c.style.getPropertyValue("--r"));
const lean=()=>cs.forEach(c=>c.style.transform="rotate("+(R(c)+clamp(vx*-.9,-14,14))+"deg)");
const tick=()=>{if(!drag){vx*=.94;x+=vx}wrap();t.style.transform="translateX("+x+"px)";lean();
 if(drag||Math.abs(vx)>.12)raf=requestAnimationFrame(tick);
 else{vx=0;lean();clearTimeout(settle);settle=setTimeout(()=>{cs.forEach(c=>{c.style.transform=""});v.classList.remove("s")},500)}};
const start=()=>{cancelAnimationFrame(raf);clearTimeout(settle);raf=requestAnimationFrame(tick)};
v.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"&&e.button!==0)return;drag=true;lx=e.clientX;vx=0;v.classList.add("d","s");try{v.setPointerCapture(e.pointerId)}catch(_){}start()});
v.addEventListener("pointermove",e=>{if(!drag)return;const d=e.clientX-lx;lx=e.clientX;x+=d;wrap();vx=d});
const up=()=>{if(!drag)return;drag=false;v.classList.remove("d");start()};
v.addEventListener("pointerup",up);v.addEventListener("pointercancel",up);
v.addEventListener("wheel",e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();v.classList.add("s");vx=clamp(vx-e.deltaX*.12,-30,30);start()}},{passive:false});
addEventListener("resize",()=>{wrap();t.style.transform="translateX("+x+"px)"});t.style.transform="translateX("+x+"px)";
})();
</script>` : ""}`;
};
