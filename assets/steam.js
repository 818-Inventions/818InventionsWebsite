// Steampunk workshop: brass, gears, steam, a peeling Victorian wall and clockwork cockroaches.
// Gradients and the brick pattern used below (url(#brass) etc.) are defined once in index.html.

let uidCounter = 0;
const uid = () => 'u' + (++uidCounter);

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function svg(w, h, body, cls = '', vb = `0 0 ${w} ${h}`) {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="${vb}" width="${w}" height="${h}" aria-hidden="true">${body}</svg>`;
}

// Gear outline centred on 0,0 with a hole in the middle
function gearPath(r, teeth, depth) {
  const step = 2 * Math.PI / teeth;
  const pt = (rad, a) => `${(rad * Math.cos(a)).toFixed(2)} ${(rad * Math.sin(a)).toFixed(2)}`;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += (i ? 'L' : 'M') + pt(r - depth, a) + 'L' + pt(r, a + step * 0.15) + 'L' + pt(r, a + step * 0.45) + 'L' + pt(r - depth, a + step * 0.6);
  }
  const h = r * 0.28;
  return d + `Z M${h} 0 A${h} ${h} 0 1 0 ${-h} 0 A${h} ${h} 0 1 0 ${h} 0 Z`;
}

function gear(r, teeth, cls) {
  return svg(r * 2, r * 2, `
    <path d="${gearPath(r - 1, teeth, r * 0.16)}" fill="url(#brass)" fill-rule="evenodd" stroke="#3a2610" stroke-width="1.5"/>
    <circle r="${r * 0.6}" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="${r * 0.08}"/>`,
    'gear ' + cls, `${-r} ${-r} ${r * 2} ${r * 2}`);
}

/* Items on the shelves */

const ITEMS = {
  cards: () => svg(110, 110, `
    <g transform="translate(60 114)">
      <g transform="rotate(-24)">
        <rect x="-22" y="-94" width="44" height="64" rx="4" fill="#6e1d1d" stroke="#2a1a10" stroke-width="2"/>
        <rect x="-17" y="-89" width="34" height="54" rx="2" fill="none" stroke="#d4af37" stroke-width="1.5"/>
        <path d="M0 -78 L9 -62 L0 -46 L-9 -62Z" fill="#d4af37"/>
      </g>
      <g transform="rotate(-4)">
        <rect x="-22" y="-94" width="44" height="64" rx="4" fill="#f3e9d2" stroke="#2a1a10" stroke-width="2"/>
        <text x="-17" y="-81" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#1a1a1a">A</text>
        <path d="M0 -76 C14 -64 12 -52 4 -54 C1 -55 0 -58 0 -58 C0 -58 -1 -55 -4 -54 C-12 -52 -14 -64 0 -76Z M-4 -46 L0 -56 L4 -46Z" fill="#1a1a1a"/>
      </g>
      <g transform="rotate(16)">
        <rect x="-22" y="-94" width="44" height="64" rx="4" fill="#f3e9d2" stroke="#2a1a10" stroke-width="2"/>
        <text x="-17" y="-81" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#a3222b">K</text>
        <path d="M0 -50 C-14 -60 -12 -74 -4 -72 C-1 -71 0 -68 0 -66 C0 -68 1 -71 4 -72 C12 -74 14 -60 0 -50Z" fill="#a3222b"/>
      </g>
    </g>`, '', '0 0 120 120'),

  camera: () => svg(110, 110, `
    <path d="M60 74 L34 118 M60 74 L60 118 M60 74 L86 118" stroke="#4a2e17" stroke-width="5" stroke-linecap="round"/>
    <rect x="50" y="68" width="20" height="8" rx="2" fill="url(#brass)" stroke="#5a3d14"/>
    <rect x="16" y="24" width="32" height="46" rx="3" fill="#5a3820" stroke="#2a1a10" stroke-width="2"/>
    <rect x="21" y="30" width="22" height="34" rx="2" fill="none" stroke="#3a2412" stroke-width="2"/>
    <path d="M16 31V24h7 M48 31V24h-7 M16 63v7h7 M48 63v7h-7" stroke="#d4a64a" stroke-width="3" fill="none"/>
    <rect x="26" y="17" width="12" height="7" rx="1" fill="url(#brass)" stroke="#5a3d14"/>
    <path d="M48 28 L78 36 L78 60 L48 66 Z" fill="#2b1d14" stroke="#160e08" stroke-width="2"/>
    <path d="M54 29.6 V64.8 M60 31.2 V63.6 M66 32.8 V62.4 M72 34.4 V61.2" stroke="#4a3526" stroke-width="2"/>
    <rect x="76" y="32" width="8" height="32" rx="1.5" fill="url(#brass-h)" stroke="#5a3d14"/>
    <rect x="84" y="38" width="18" height="20" rx="2" fill="url(#brass)" stroke="#5a3d14"/>
    <rect x="100" y="35" width="6" height="26" rx="2" fill="url(#brass)" stroke="#5a3d14"/>
    <ellipse cx="105" cy="48" rx="3" ry="9" fill="url(#glass)"/>`, '', '0 0 120 120'),

  trend: () => svg(110, 110, `
    <rect x="28" y="112" width="64" height="6" rx="2" fill="#4a2e17"/>
    <path d="M34 114 Q34 103 50 101 H70 Q86 103 86 114 Z" fill="url(#brass)" stroke="#5a3d14" stroke-width="1.5"/>
    <rect x="57" y="30" width="6" height="74" fill="url(#brass-h)" stroke="#5a3d14"/>
    <g transform="translate(60 84)"><path d="${gearPath(10, 10, 3)}" fill="url(#brass)" fill-rule="evenodd" stroke="#5a3d14"/></g>
    <path d="M20 38 L9 72 M20 38 L31 72 M100 30 L89 62 M100 30 L111 62" stroke="#8a6a2a" stroke-width="1.2" stroke-dasharray="2 1"/>
    <g transform="rotate(-6 60 34)">
      <rect x="16" y="32" width="88" height="4" rx="2" fill="url(#brass)" stroke="#5a3d14"/>
      <circle cx="18" cy="34" r="3" fill="url(#brass-r)"/><circle cx="102" cy="34" r="3" fill="url(#brass-r)"/>
    </g>
    <circle cx="60" cy="26" r="5" fill="url(#brass-r)" stroke="#5a3d14"/>
    <rect x="15" y="63" width="10" height="9" rx="1" fill="#3a3a3a"/><circle cx="20" cy="62" r="2" fill="#3a3a3a"/>
    <path d="M7 72 Q20 86 33 72 Z" fill="url(#brass)" stroke="#5a3d14"/>
    <path d="M87 62 Q100 76 113 62 Z" fill="url(#brass)" stroke="#5a3d14"/>`, '', '0 0 120 120'),

  crate: n => svg(110, 110, `
    <rect x="16" y="44" width="88" height="70" fill="#8a5a2b" stroke="#3a2412" stroke-width="2"/>
    <path d="M16 67 H104 M16 90 H104" stroke="#5e3b1a" stroke-width="2"/>
    <path d="M22 108 L98 50" stroke="#6b4421" stroke-width="7"/>
    <rect x="19" y="47" width="82" height="64" fill="none" stroke="#5e3b1a" stroke-width="5"/>
    <path d="M16 54V44h10 M104 54V44H94 M16 104v10h10 M104 104v10H94" stroke="#d4a64a" stroke-width="3" fill="none"/>
    <circle cx="22" cy="50" r="1.6" fill="#2a1608"/><circle cx="98" cy="50" r="1.6" fill="#2a1608"/>
    <circle cx="22" cy="108" r="1.6" fill="#2a1608"/><circle cx="98" cy="108" r="1.6" fill="#2a1608"/>
    <text x="60" y="88" text-anchor="middle" font-family="'Special Elite', monospace" font-size="32" fill="#2a1608" opacity="0.85">?</text>
    <text x="60" y="104" text-anchor="middle" font-family="'Special Elite', monospace" font-size="10" fill="#2a1608" opacity="0.85">No. ${pad(n)}</text>`, '', '0 0 120 120'),

  goggles: () => svg(110, 110, `
    <path d="M6 94 Q60 70 114 94" stroke="#4a2a14" stroke-width="6" fill="none"/>
    <path d="M54 90 Q60 83 66 90" stroke="#b8862b" stroke-width="4" fill="none"/>
    <circle cx="38" cy="94" r="17" fill="url(#brass)" stroke="#5a3d14" stroke-width="2"/>
    <circle cx="82" cy="94" r="17" fill="url(#brass)" stroke="#5a3d14" stroke-width="2"/>
    <circle cx="38" cy="94" r="11" fill="url(#glass)"/>
    <circle cx="82" cy="94" r="11" fill="url(#glass)"/>
    <circle cx="38" cy="79" r="1.4" fill="#5a3d14"/><circle cx="38" cy="109" r="1.4" fill="#5a3d14"/>
    <circle cx="82" cy="79" r="1.4" fill="#5a3d14"/><circle cx="82" cy="109" r="1.4" fill="#5a3d14"/>`, '', '0 0 120 120')
};

/* Clockwork cockroaches */

const ROACH_LEGS = [
  'M16 9 L10 2 M24 8 L24 1 M30 9 L36 2 M16 23 L10 30 M24 24 L24 31 M30 23 L36 30',
  'M16 9 L13 1 M24 8 L20 1 M30 9 L33 1 M16 23 L13 31 M24 24 L20 31 M30 23 L33 31'
];

function roachSvg(legs) {
  return svg(48, 32, `
    <path d="${legs}" stroke="#2a1a10" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M9 16 H4" stroke="#b8862b" stroke-width="1.6"/>
    <ellipse cx="3" cy="16" rx="2" ry="4" fill="none" stroke="#b8862b" stroke-width="1.6"/>
    <ellipse cx="22" cy="16" rx="13" ry="9" fill="url(#copper)" stroke="#3a2610" stroke-width="1.2"/>
    <path d="M15 8 Q13 16 15 24 M29 8 Q27 16 29 24" stroke="rgba(0,0,0,0.35)" fill="none"/>
    <g transform="translate(21 16)"><path d="${gearPath(4.5, 8, 1.5)}" fill="#e0b65a" fill-rule="evenodd"/></g>
    <circle cx="37" cy="16" r="5" fill="#2a1a10"/>
    <circle cx="39" cy="14" r="1.4" fill="#ff4a2a"/>
    <path d="M40 13 Q46 6 47 2 M40 19 Q46 26 47 30" stroke="#2a1a10" fill="none"/>`);
}

function roach(cls) {
  const [a, b] = ROACH_LEGS.map(roachSvg);
  return `<div class="roach ${cls}" aria-hidden="true"><span class="f1">${a}</span><span class="f2">${b}</span></div>`;
}

// What's left of a clockwork roach: oil, a spring and loose gears
function splatSvg() {
  const rnd = Math.random;
  const pts = [];
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2;
    const r = 11 + rnd() * 8;
    pts.push(`${(35 + Math.cos(a) * r * 1.4).toFixed(1)},${(23 + Math.sin(a) * r * 0.9).toFixed(1)}`);
  }
  let parts = '';
  for (let i = 0; i < 3; i++) {
    const x = 14 + rnd() * 42, y = 8 + rnd() * 30;
    parts += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(rnd() * 90) | 0})"><path d="${gearPath(3.6, 8, 1.3)}" fill="#e0b65a" fill-rule="evenodd"/></g>`;
  }
  return svg(70, 46, `
    <polygon points="${pts.join(' ')}" fill="#1a120b" opacity="0.85"/>
    <circle cx="8" cy="12" r="2.5" fill="#1a120b" opacity="0.8"/><circle cx="62" cy="38" r="2" fill="#1a120b" opacity="0.8"/>
    <path d="M28 24 l3 -5 l3 10 l3 -10 l3 10 l3 -5" stroke="#c9973a" stroke-width="1.4" fill="none"/>
    ${parts}`);
}

/* The wall */

function peel(w, h, seed) {
  const rnd = mulberry32(seed);
  const id = uid();
  const pts = [];
  const n = 18;
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2;
    const k = 0.72 + rnd() * 0.28;
    pts.push([w / 2 + Math.cos(a) * (w / 2 - 8) * k, h / 2 + Math.sin(a) * (h / 2 - 8) * k]);
  }
  const p = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  // A strip of paper curling down from the top edge
  const [ax, ay] = pts[Math.floor(n * 0.7)];
  const [bx, by] = pts[Math.floor(n * 0.7) + 2];
  const flap = `M${ax.toFixed(1)} ${ay.toFixed(1)} L${bx.toFixed(1)} ${by.toFixed(1)} Q${((ax + bx) / 2 + 4).toFixed(1)} ${(ay + 30).toFixed(1)} ${((ax + bx) / 2 - 6).toFixed(1)} ${(ay + 24).toFixed(1)} Z`;
  return svg(w, h, `
    <defs><clipPath id="${id}"><polygon points="${p}"/></clipPath></defs>
    <polygon points="${p}" fill="url(#brick)"/>
    <polygon points="${p}" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="14" clip-path="url(#${id})"/>
    <polygon points="${p}" fill="none" stroke="#d8c7a0" stroke-width="3" stroke-linejoin="round"/>
    <path d="${flap}" fill="#cdb98c" stroke="#8f7c55"/>`);
}

function cobweb(size) {
  return svg(size, size, `<path d="M0 0 L158.4 22.2 M0 0 L145 67.7 M0 0 L113 113 M0 0 L67.7 145 M0 0 L22.2 158.4 M39.6 5.6 Q33.4 9.9 36.2 16.9 Q28.4 19.9 28.3 28.3 Q19.9 28.4 16.9 36.2 Q9.9 33.4 5.6 39.6 M79.2 11.1 Q66.7 19.8 72.5 33.8 Q56.8 39.8 56.6 56.6 Q39.8 56.8 33.8 72.5 Q19.8 66.7 11.1 79.2 M123.8 17.4 Q104.3 30.9 113.3 52.9 Q88.7 62.2 88.4 88.4 Q62.2 88.7 52.9 113.3 Q30.9 104.3 17.4 123.8" fill="none" stroke="rgba(235,230,215,0.35)" stroke-width="1"/>`, 'cobweb', '0 0 160 160');
}

function gauge(value, max, size, cls = '') {
  const angle = -135 + 270 * Math.min(1, value / max);
  let ticks = '';
  for (let i = 0; i <= 10; i++) {
    const a = (-135 + 27 * i) * Math.PI / 180;
    const r1 = i % 5 === 0 ? 29 : 33;
    ticks += `<line x1="${(50 + r1 * Math.sin(a)).toFixed(1)}" y1="${(50 - r1 * Math.cos(a)).toFixed(1)}" x2="${(50 + 38 * Math.sin(a)).toFixed(1)}" y2="${(50 - 38 * Math.cos(a)).toFixed(1)}"/>`;
  }
  return svg(size, size, `
    <circle cx="50" cy="50" r="48" fill="url(#brass-r)" stroke="#3a2610" stroke-width="2"/>
    <circle cx="50" cy="50" r="40" fill="#efe3c4" stroke="#5a3d14" stroke-width="2"/>
    <path d="M${(50 + 36 * Math.sin(1.885)).toFixed(1)} ${(50 - 36 * Math.cos(1.885)).toFixed(1)} A36 36 0 0 1 ${(50 + 36 * Math.sin(2.356)).toFixed(1)} ${(50 - 36 * Math.cos(2.356)).toFixed(1)}" stroke="#a3222b" stroke-width="5" fill="none"/>
    <g stroke="#2a1608" stroke-width="2">${ticks}</g>
    <text x="27" y="76" font-family="Georgia, serif" font-size="9" fill="#2a1608">0</text>
    <text x="58" y="76" font-family="Georgia, serif" font-size="9" fill="#2a1608">${max}</text>
    <g class="needle" transform="rotate(${angle.toFixed(1)} 50 50)"><path d="M48.5 52 L50 16 L51.5 52Z" fill="#a3222b"/></g>
    <circle cx="50" cy="50" r="5" fill="url(#brass-r)" stroke="#3a2610"/>
    <path d="M22 32 Q50 8 78 32" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none"/>`, cls, '0 0 100 100');
}

function valve() {
  return svg(46, 46, `
    <circle cx="23" cy="23" r="19" fill="none" stroke="#8a1f1f" stroke-width="5"/>
    <path d="M23 4 V42 M4 23 H42 M9.6 9.6 L36.4 36.4 M36.4 9.6 L9.6 36.4" stroke="#8a1f1f" stroke-width="3"/>
    <circle cx="23" cy="23" r="5" fill="url(#brass-r)" stroke="#3a2610"/>`, 'valve');
}

function sconce() {
  return svg(60, 120, `
    <path d="M30 118 V92 Q30 80 18 78" stroke="url(#brass-h)" stroke-width="5" fill="none"/>
    <rect x="22" y="112" width="16" height="8" rx="2" fill="url(#brass)"/>
    <path d="M10 78 H38 L34 70 H14 Z" fill="url(#brass)" stroke="#5a3d14"/>
    <path d="M16 70 Q12 44 20 30 H28 Q36 44 32 70 Z" fill="rgba(255,240,200,0.25)" stroke="rgba(255,240,200,0.6)"/>
    <path class="flame" d="M24 64 Q17 54 24 42 Q31 54 24 64Z" fill="#ffb347"/>
    <rect x="18" y="24" width="12" height="6" rx="1" fill="url(#brass)"/>`, 'sconce-lamp');
}

function place(html, pos, cls = '') {
  const style = Object.entries(pos).map(([k, v]) => `${k}:${v}`).join(';');
  return `<div class="decor ${cls}" style="${style}">${html}</div>`;
}

function renderWall() {
  document.getElementById('wall-decor').innerHTML = [
    place(gear(95, 16, 'spin'), { left: '-70px', top: '70px' }),
    place(gear(52, 10, 'spin-back'), { left: '88px', top: '188px' }, 'wide'),
    place(gear(80, 14, 'spin-slow'), { right: '-50px', bottom: '40px' }, 'wide'),

    place(peel(200, 150, 3), { left: '6%', top: '42%' }),
    place(peel(150, 210, 7), { right: '7%', top: '24%' }, 'wide'),
    place(peel(240, 120, 11), { left: '38%', top: '4%' }),
    place(peel(170, 130, 5), { right: '18%', bottom: '4%' }),

    place(cobweb(170), { right: '0', top: '44px' }, 'flip'),

    '<div class="pipe-h"></div><div class="pipe-v"></div><div class="elbow"></div>',
    place('', { left: '18%', top: '16px' }, 'flange'),
    place('', { left: '61%', top: '16px' }, 'flange'),
    place(valve(), { left: 'calc(61% - 16px)', top: '-14px' }),
    place(gauge(40, 100, 54, 'wobble'), { left: '84%', top: '4px' }, 'wide'),
    place('<i></i><i></i><i></i>', { left: 'calc(18% - 10px)', top: '-4px' }, 'steam'),

    place(sconce(), { left: 'calc(50% - 470px)', top: '230px' }, 'sconce wide'),
    place(sconce(), { right: 'calc(50% - 470px)', top: '230px' }, 'sconce wide'),

    roach('roach-1'),
    roach('roach-2'),
    roach('roach-3')
  ].join('');
}

/* Shelves */

function slotHtml(slot) {
  if (slot.kind === 'project') {
    const p = slot.project;
    return `
      <div class="slot">
        <a class="item" href="${p.url}">
          ${ITEMS[p.icon]()}
          <span class="bubble"><b>${p.name}</b>${p.tagline}<em>${p.platform}</em></span>
        </a>
        <span class="label"><i>No. ${pad(p.number)}</i>${p.name}</span>
      </div>`;
  }
  if (slot.kind === 'crate') {
    return `
      <div class="slot">
        <div class="item" tabindex="0">
          ${ITEMS.crate(slot.number)}
          <span class="bubble"><b>Invention No. ${pad(slot.number)}</b>Still in the crate. Coming soon&hellip;</span>
        </div>
        <span class="label"><i>No. ${pad(slot.number)}</i>???</span>
      </div>`;
  }
  if (slot.kind === 'decor') {
    return `<div class="slot"><div class="junk">${ITEMS[slot.item]()}</div></div>`;
  }
  return '<div class="slot"></div>';
}

const colsFor = () => window.innerWidth < 600 ? 2 : 3;

function renderShelves() {
  const cols = colsFor();
  const items = PROJECTS.map(p => ({ kind: 'project', project: p }));
  items.push({ kind: 'crate', number: PROJECTS.length + 1 });
  const junk = [{ kind: 'decor', item: 'goggles' }];

  const shelves = Math.max(3, Math.ceil((items.length + junk.length) / cols));
  const slots = Array(shelves * cols).fill({ kind: 'empty' });
  items.forEach((it, i) => { slots[i] = it; });
  junk.forEach((it, i) => { slots[slots.length - 1 - i] = it; });

  let html = '<span class="post left"></span><span class="post right"></span>';
  for (let s = 0; s < shelves; s++) {
    const row = slots.slice(s * cols, (s + 1) * cols).map(slotHtml).join('');
    html += `<div class="shelf" style="--cols:${cols}">${row}${s === shelves - 1 ? roach('roach-shelf') : ''}</div>`;
  }
  const unit = document.getElementById('shelves');
  unit.innerHTML = html;
  unit.dataset.cols = cols;
}

/* The slipper "in case of roaches" */

const SLIPPER = `
  <path d="M4 30 Q4 36 12 36 H86 Q94 36 94 30 Q94 27 88 27 H10 Q4 27 4 30Z" fill="#3a2214" stroke="#1a0e06" stroke-width="1.5"/>
  <path d="M30 28 Q36 8 62 8 Q86 8 93 28 Z" fill="#7a3f1d" stroke="#2a1608" stroke-width="1.5"/>
  <path d="M42 26 Q46 14 62 13 M54 27 Q58 17 72 16" stroke="#9a5a2e" stroke-width="1.5" fill="none"/>
  <rect x="62" y="12" width="11" height="11" rx="1.5" fill="none" stroke="#e0b65a" stroke-width="2.5"/>
  <path d="M67.5 12 V23" stroke="#e0b65a" stroke-width="1.5"/>`;

function setupSlipper() {
  const spot = document.getElementById('slipper');
  const kills = document.getElementById('kills');
  let armed = false;
  let count = 0;

  spot.innerHTML = `
    <span class="case-sign">In case of roaches</span>
    <span class="case-glass">${svg(96, 40, SLIPPER, '', '0 0 98 40')}</span>
    <span class="case-hint">Break glass</span>`;
  const cursor = svg(72, 30, SLIPPER, '', '0 0 98 40');
  document.body.style.setProperty('--slipper-cursor',
    `url("data:image/svg+xml,${encodeURIComponent(cursor)}") 66 22, crosshair`);

  const arm = on => {
    armed = on;
    document.body.classList.toggle('armed', on);
    spot.setAttribute('aria-pressed', on);
    spot.querySelector('.case-hint').textContent = on ? 'Put it back' : 'Break glass';
  };

  const swing = (x, y, text) => {
    const fx = document.createElement('div');
    fx.className = 'swing';
    fx.style.left = x + 'px';
    fx.style.top = y + 'px';
    fx.innerHTML = svg(72, 30, SLIPPER, '', '0 0 98 40') + `<span>${text}</span>`;
    document.body.appendChild(fx);
    setTimeout(() => fx.remove(), 800);
  };

  const squash = roachEl => {
    const host = roachEl.parentElement;
    const r = roachEl.getBoundingClientRect();
    const h = host.getBoundingClientRect();
    const mark = document.createElement('div');
    mark.className = 'decor splat';
    mark.style.left = (r.left - h.left - 10) + 'px';
    mark.style.top = (r.top - h.top - 6) + 'px';
    mark.innerHTML = splatSvg();
    host.appendChild(mark);

    // Another one winds itself up after a while
    const cls = [...roachEl.classList].find(c => c.startsWith('roach-'));
    roachEl.remove();
    setTimeout(() => host.insertAdjacentHTML('beforeend', roach(cls)), 6000 + Math.random() * 6000);

    count++;
    kills.innerHTML = String(count).padStart(2, '0').split('').map(d => `<b>${d}</b>`).join('');
    const room = document.getElementById('room');
    room.classList.remove('shake');
    void room.offsetWidth;
    room.classList.add('shake');
  };

  spot.addEventListener('click', e => {
    e.stopPropagation();
    arm(!armed);
  });

  document.addEventListener('click', e => {
    if (!armed) return;
    const hit = e.target.closest('.roach');
    if (hit) {
      e.preventDefault();
      squash(hit);
      swing(e.clientX, e.clientY, 'CLANK!');
    } else if (!e.target.closest('a, .item')) {
      swing(e.clientX, e.clientY, 'miss');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && armed) arm(false);
  });
}

function renderWorkshop() {
  const count = PROJECTS.length;
  document.getElementById('gauge').innerHTML = gauge(count, GOAL, 84);
  document.getElementById('count').textContent = pad(count);
  document.getElementById('goal').textContent = GOAL;

  renderWall();
  renderShelves();
  setupSlipper();

  window.addEventListener('resize', () => {
    if (String(colsFor()) !== document.getElementById('shelves').dataset.cols) renderShelves();
  });
}
