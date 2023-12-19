const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 30;

const { width, height } = canvas;

// Define display section limits
const displaySection = {
  minX: 0,
  minY: 0,
  maxX: width,
  maxY: height,
};

let x = Math.floor(Math.random() * (displaySection.maxX - displaySection.minX) + displaySection.minX);
let y = Math.floor(Math.random() * (displaySection.maxY - displaySection.minY) + displaySection.minY);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function draw({ key }) {
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);

  switch (key) {
    case 'ArrowUp':
    case 'KeyW':
      y = Math.max(y - MOVE_AMOUNT, displaySection.minY);
      break;
    case 'ArrowRight':
    case 'KeyD':
      x = Math.min(x + MOVE_AMOUNT, displaySection.maxX);
      break;
    case 'ArrowDown':
    case 'KeyS':
      y = Math.min(y + MOVE_AMOUNT, displaySection.maxY);
      break;
    case 'ArrowLeft':
    case 'KeyA':
      x = Math.max(x - MOVE_AMOUNT, displaySection.minX);
      break;
    default:
      break;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleKey(e) {
  if (e.key.includes('Arrow') || ['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
    e.preventDefault();
    draw({ key: e.code });
  }
}

function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function () {
      console.log('done the shake!');
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);