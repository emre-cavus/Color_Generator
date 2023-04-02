const minL = 0.75;
const maxL = 0.90;
const interval = 3000;

const hslEl = document.getElementById('hsl');
const rgbEl = document.getElementById('rgb');
const hexEl = document.getElementById('hex');

const colors = { bgColor: '', txtColor: '', btnColor: '', btnFocus: ''}

function HSLtoRGB(h, s, l) {
  let r, g, b;
  
  const rd = (a) => {
    return Math.floor(Math.max(Math.min(a*256, 255), 0)); 
  };
  
  const hueToRGB = (m, n, o) => {
    if (o < 0) o += 1;
    if (o > 1) o -= 1;
    if (o < 1/6) return m + (n - m) * 6 * o;
    if (o < 1/2) return n;
    if (o < 2/3) return m + (n - m) * (2/3 - o) * 6;
    return m;
  }
  
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  r = hueToRGB(p, q, h + 1/3);
  g = hueToRGB(p, q, h);
  b = hueToRGB(p, q, h - 1/3);

  return [rd(r), rd(g), rd(b)]
}

function RGBtoHex(r, g, b) {
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

function copyToClipboard() {
  document.execCommand("copy");
}

function newColor() {
  const hBase = Math.random();
  const newH = Math.floor(hBase * 360);
  const newL = Math.floor(Math.random() * 16) + 75;
  
  colors.bgColor = `hsl(${newH}, 100%, ${newL}%)`;
  colors.txtColor = `hsl(${newH}, 100%, 5%)`;
  colors.btnColor = `hsl(${newH}, 100%, 98%)`;
  colors.btnFocus = `hsl(${newH}, 100%, 95%)`;
  
  const [ r, g, b ] = HSLtoRGB(hBase, 1, newL*.01);

  Object.entries(colors).forEach(([k,v]) => {
    document.documentElement.style.setProperty(`--${k}`, `${v}`);
  });
  
  hslEl.innerHTML = colors.bgColor;
  rgbEl.innerHTML = `rgb(${r}, ${g}, ${b})`;
  hexEl.innerHTML = `${RGBtoHex(r,g,b)}`;
}

newColor();

const el = document.getElementById('autoGenCB');
let auto;
function autoGenerate() {
  el.checked = !el.checked;
  if (el.checked) auto = setInterval(newColor, interval);
  else { 
    clearInterval(auto);
  }
}