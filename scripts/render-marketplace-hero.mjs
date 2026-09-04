import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const width = 1280;
const height = 800;
const fps = 24;
const seconds = 12;
const frames = fps * seconds;
const outputBase = "public/cie-marketplace-hero";

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const ease = (value) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};
const reveal = (time, start, duration = 0.1) => ease((time - start) / duration);
const fadeWindow = (time) => Math.min(reveal(time, 0, 0.05), 1 - reveal(time, 0.94, 0.06));
const esc = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");

function text(x, y, value, size, color, options = "") {
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Helvetica Neue,Arial,sans-serif" font-size="${size}" ${options}>${esc(value)}</text>`;
}

function chip(x, y, label, progress, accent = "#b8f1cf") {
  const opacity = reveal(progress, 0, 0.18);
  const shift = 28 * (1 - ease(progress / 0.35));
  return `<g opacity="${opacity}" transform="translate(${x - shift} ${y})">
    <rect width="166" height="44" rx="3" fill="#0f211a" stroke="#ffffff" stroke-opacity=".13"/>
    <circle cx="18" cy="22" r="4" fill="${accent}"/>
    ${text(32, 27, label, 10, "#c5d0cb", 'font-weight="500" letter-spacing=".35"')}
  </g>`;
}

function frameSvg(frame) {
  const time = frame / frames;
  const scene = fadeWindow(time);
  const pulse = 0.5 + 0.5 * Math.sin(time * Math.PI * 8);
  const route = (time * 1220) % 1220;
  const cardIn = reveal(time, 0.48, 0.13);
  const selected = time > 0.68 ? 2 : time > 0.42 ? 1 : 0;
  const phase = time < 0.2 ? "SIGNALS" : time < 0.4 ? "CONNECT" : time < 0.6 ? "COMPARE" : time < 0.8 ? "DECIDE" : "PREPARE";
  const products = [
    ["SKU / 1048", "PRODUCT A", 0.03],
    ["SKU / 2082", "PRODUCT B", 0.08],
    ["SKU / 3154", "PRODUCT C", 0.13],
  ];
  const productCards = products.map(([sku, name, start], index) => {
    const p = reveal(time, start, 0.12);
    const x = 40 + 38 * (1 - p);
    const y = 174 + index * 156;
    const active = index === selected;
    return `<g opacity="${p}" transform="translate(${x} ${y})">
      <rect width="205" height="122" rx="4" fill="${active ? "#142b22" : "#0d1c17"}" stroke="${active ? "#b8f1cf" : "#ffffff"}" stroke-opacity="${active ? ".55" : ".12"}"/>
      <rect x="16" y="16" width="54" height="54" rx="3" fill="#1d3028"/>
      <path d="M28 52h30M35 44h16M39 36h8" stroke="${active ? "#b8f1cf" : "#728078"}" stroke-width="2" stroke-linecap="round"/>
      ${text(84, 34, sku, 9, "#6f7e77", 'letter-spacing="1.4"')}
      ${text(84, 57, name, 14, active ? "#f3f0e9" : "#aeb9b4", 'font-weight="600"')}
      ${text(16, 96, index === 0 ? "PRICE SIGNAL" : index === 1 ? "STOCK SIGNAL" : "DEMAND SIGNAL", 9, active ? "#f1bc76" : "#65736c", 'letter-spacing="1.2"')}
    </g>`;
  }).join("");

  const barProgress = [0.38, 0.62, 0.48, 0.78, 0.56].map((value, index) => value * reveal(time, 0.25 + index * 0.025, 0.18));
  const bars = barProgress.map((value, index) => `<g transform="translate(0 ${index * 48})">
    ${text(0, 12, ["DEMAND", "PRICE", "COMPETITION", "MARGIN", "CHANNEL FIT"][index], 9, "#78877f", 'letter-spacing="1.2"')}
    <rect x="122" y="2" width="196" height="10" rx="5" fill="#ffffff" fill-opacity=".06"/>
    <rect x="122" y="2" width="${196 * value}" height="10" rx="5" fill="${index === 3 ? "#f1bc76" : "#7ee2a8"}" fill-opacity="${index === 3 ? ".78" : ".62"}"/>
  </g>`).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <radialGradient id="glow"><stop offset="0" stop-color="#7ee2a8" stop-opacity=".13"/><stop offset="1" stop-color="#7ee2a8" stop-opacity="0"/></radialGradient>
      <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M64 0H0V64" fill="none" stroke="#fff" stroke-opacity=".035"/></pattern>
    </defs>
    <rect width="1280" height="800" fill="#07120e"/>
    <rect width="1280" height="800" fill="url(#grid)"/>
    <circle cx="650" cy="400" r="350" fill="url(#glow)"/>
    <g opacity="${scene}">
      ${text(40, 60, "CIE MARKETPLACE", 14, "#b8f1cf", 'font-weight="600" letter-spacing="3.2"')}
      ${text(40, 91, "PRODUCT / MARKET / COMMERCIAL SIGNALS", 9, "#627069", 'letter-spacing="2"')}
      ${text(1040, 60, "CONCEPTUAL VIEW", 9, "#75837c", 'letter-spacing="2"')}

      <path d="M245 235 C335 235 330 305 430 305 M245 391 C340 391 335 390 430 390 M245 547 C335 547 335 474 430 474" fill="none" stroke="#b8f1cf" stroke-opacity=".18" stroke-dasharray="5 9"/>
      <path d="M860 400 C900 400 900 400 930 400" fill="none" stroke="#f1bc76" stroke-opacity=".45" stroke-dasharray="6 8"/>
      <circle cx="${40 + route}" cy="718" r="3" fill="#b8f1cf" opacity=".7"/>

      ${productCards}
      ${chip(260, 154, "MARKETPLACE SIGNAL", time * 2.2, "#b8f1cf")}
      ${chip(260, 558, "SUPPLIER CONTEXT", time * 2 - 0.1, "#f1bc76")}

      <g transform="translate(430 112)">
        <rect width="430" height="576" rx="7" fill="#0a1813" stroke="#b8f1cf" stroke-opacity=".22"/>
        <rect x="1" y="1" width="428" height="62" rx="6" fill="#ffffff" fill-opacity=".025"/>
        <circle cx="26" cy="31" r="5" fill="#7ee2a8" opacity="${0.62 + pulse * 0.38}"/>
        ${text(42, 36, "CIE / MARKETPLACE", 13, "#edf1ed", 'font-weight="600" letter-spacing="1.1"')}
        ${text(324, 35, phase, 9, "#7ee2a8", 'letter-spacing="1.6"')}
        <circle cx="215" cy="184" r="86" fill="#10251d" stroke="#b8f1cf" stroke-opacity=".25"/>
        <circle cx="215" cy="184" r="${108 + pulse * 7}" fill="none" stroke="#b8f1cf" stroke-opacity=".11"/>
        <circle cx="215" cy="184" r="${136 - pulse * 6}" fill="none" stroke="#f1bc76" stroke-opacity=".10" stroke-dasharray="4 8"/>
        ${text(215, 176, "CIE", 46, "#f3f0e9", 'font-weight="500" text-anchor="middle" letter-spacing="-2"')}
        ${text(215, 202, "MARKETPLACE", 10, "#7ee2a8", 'text-anchor="middle" letter-spacing="2.5"')}
        <g transform="translate(55 315)">${bars}</g>
        ${text(26, 550, "EVIDENCE  /  CONTEXT  /  PRIORITY", 9, "#65736c", 'letter-spacing="1.8"')}
      </g>

      <g opacity="${cardIn}" transform="translate(${930 + 28 * (1 - cardIn)} 182)">
        <rect width="310" height="436" rx="6" fill="#f3f0e9"/>
        <rect width="310" height="58" rx="6" fill="#e7e1d5"/>
        ${text(22, 35, "COMMERCIAL OPPORTUNITY", 9, "#55625c", 'font-weight="600" letter-spacing="1.4"')}
        <circle cx="277" cy="29" r="6" fill="#60c98b"/>
        ${text(22, 102, "CHANNEL DECISION", 10, "#66736d", 'letter-spacing="1.4"')}
        ${text(22, 144, "Marketplace fit", 25, "#08120f", 'font-weight="500" letter-spacing="-.8"')}
        <line x1="22" y1="172" x2="288" y2="172" stroke="#08120f" stroke-opacity=".12"/>
        ${text(22, 210, "PRODUCT FIT", 9, "#64716b", 'letter-spacing="1.2"')}
        ${text(212, 210, "REVIEWED", 11, "#173d2d", 'font-weight="700"')}
        ${text(22, 254, "MARGIN CONTEXT", 9, "#64716b", 'letter-spacing="1.2"')}
        ${text(212, 254, "VISIBLE", 11, "#173d2d", 'font-weight="700"')}
        ${text(22, 298, "SUPPLY CONTEXT", 9, "#64716b", 'letter-spacing="1.2"')}
        ${text(212, 298, "CONNECTED", 11, "#173d2d", 'font-weight="700"')}
        <rect x="22" y="340" width="266" height="62" rx="3" fill="#0a1813"/>
        ${text(40, 377, "PREPARE NEXT ACTION", 11, "#b8f1cf", 'font-weight="600" letter-spacing="1.1"')}
      </g>

      <line x1="40" y1="718" x2="1240" y2="718" stroke="#fff" stroke-opacity=".08"/>
      ${text(40, 752, "PRODUCT SIGNAL", 9, "#64716b", 'letter-spacing="1.8"')}
      ${text(537, 752, "COMMERCIAL DECISION LAYER", 9, "#83918a", 'letter-spacing="1.8"')}
      ${text(1020, 752, "GOVERNED ACTION", 9, "#64716b", 'letter-spacing="1.8"')}
    </g>
  </svg>`;
}

function mobilePosterSvg() {
  const signal = (y, label, accent) => `<g transform="translate(70 ${y})">
    <rect width="580" height="88" rx="5" fill="#10231c" stroke="#ffffff" stroke-opacity=".15"/>
    <circle cx="34" cy="44" r="7" fill="${accent}"/>
    ${text(62, 53, label, 21, "#d6ded9", 'font-weight="550" letter-spacing=".7"')}
  </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="900" viewBox="0 0 720 900">
    <defs><pattern id="mobile-grid" width="52" height="52" patternUnits="userSpaceOnUse"><path d="M52 0H0V52" fill="none" stroke="#fff" stroke-opacity=".035"/></pattern><radialGradient id="mobile-glow"><stop offset="0" stop-color="#7ee2a8" stop-opacity=".17"/><stop offset="1" stop-color="#7ee2a8" stop-opacity="0"/></radialGradient></defs>
    <rect width="720" height="900" fill="#07120e"/><rect width="720" height="900" fill="url(#mobile-grid)"/><circle cx="360" cy="470" r="330" fill="url(#mobile-glow)"/>
    ${text(50, 60, "CIE MARKETPLACE", 22, "#b8f1cf", 'font-weight="650" letter-spacing="3"')}
    ${signal(100, "PRODUCT  /  PRICE  /  DEMAND", "#b8f1cf")}
    ${signal(204, "COMPETITION  /  STOCK  /  MARGIN", "#f1bc76")}
    <path d="M360 310V366" stroke="#7ee2a8" stroke-opacity=".65" stroke-width="2"/><path d="m348 352 12 14 12-14" fill="none" stroke="#7ee2a8" stroke-width="2"/>
    <circle cx="360" cy="490" r="114" fill="#10251d" stroke="#b8f1cf" stroke-opacity=".42"/><circle cx="360" cy="490" r="150" fill="none" stroke="#b8f1cf" stroke-opacity=".13"/><circle cx="360" cy="490" r="182" fill="none" stroke="#f1bc76" stroke-opacity=".13" stroke-dasharray="5 10"/>
    ${text(360, 483, "CIE", 66, "#f3f0e9", 'font-weight="520" text-anchor="middle" letter-spacing="-2"')}${text(360, 522, "MARKETPLACE", 18, "#7ee2a8", 'text-anchor="middle" letter-spacing="3"')}
    <path d="M360 674V720" stroke="#7ee2a8" stroke-opacity=".65" stroke-width="2"/><path d="m348 706 12 14 12-14" fill="none" stroke="#7ee2a8" stroke-width="2"/>
    <g transform="translate(50 744)"><rect width="620" height="108" rx="5" fill="#f3f0e9"/>${text(28, 39, "MARKETPLACE FIT", 17, "#52605a", 'font-weight="650" letter-spacing="1.5"')}${text(28, 78, "CHANNEL  ·  PRIORITY  ·  NEXT ACTION", 22, "#08120f", 'font-weight="560" letter-spacing=".3"')}<circle cx="580" cy="34" r="8" fill="#60c98b"/></g>
  </svg>`;
}

const frameDirectory = await mkdtemp(join(tmpdir(), "exwest-marketplace-hero-"));

try {
  for (let frame = 0; frame < frames; frame += 1) {
    const filename = join(frameDirectory, `frame-${String(frame).padStart(4, "0")}.png`);
    await sharp(Buffer.from(frameSvg(frame))).png({ compressionLevel: 6 }).toFile(filename);
  }

  const input = join(frameDirectory, "frame-%04d.png");
  const runs = [
    ["-y", "-framerate", String(fps), "-i", input, "-c:v", "libx264", "-preset", "slow", "-crf", "25", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", `${outputBase}.mp4`],
    ["-y", "-framerate", String(fps), "-i", input, "-c:v", "libvpx-vp9", "-crf", "37", "-b:v", "0", "-deadline", "good", "-cpu-used", "2", "-pix_fmt", "yuv420p", "-an", `${outputBase}.webm`],
  ];

  for (const args of runs) {
    const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
    if (result.status !== 0) throw new Error(`ffmpeg failed with exit code ${result.status}`);
  }

  await sharp(Buffer.from(frameSvg(Math.round(frames * 0.72)))).webp({ quality: 88 }).toFile(`${outputBase}-poster.webp`);
  await sharp(Buffer.from(mobilePosterSvg())).webp({ quality: 88 }).toFile(`${outputBase}-mobile-poster.webp`);
  console.log(`Rendered ${outputBase}.mp4, ${outputBase}.webm, ${outputBase}-poster.webp and ${outputBase}-mobile-poster.webp`);
} finally {
  await rm(frameDirectory, { recursive: true, force: true });
}
