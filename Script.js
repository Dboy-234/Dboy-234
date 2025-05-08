const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 320;

let box = 20;
let score = 0;
let direction = 'RIGHT';

let snake = [
  { x: 5 * box, y: 5 * box },
  { x: 4 * box, y: 5 * box },
  { x: 3 * box, y: 5 * box }
];

let apple = {
  x: Math.floor(Math.random() * 15) * box,
  y: Math.floor(Math.random() * 15) * box
};

function draw() {
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#00c853' : '#66bb6a';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw Apple
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(apple.x + box / 2, apple.y + box / 2, box / 2 - 2, 0, Math.PI * 2);
  ctx.fill();

  // Move Snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === 'LEFT') headX -= box;
  if (direction === 'UP') headY -= box;
  if (direction === 'RIGHT') headX += box;
  if (direction === 'DOWN') headY += box;

  // Wrap around walls
  if (headX >= canvas.width) headX = 0;
  if (headX < 0) headX = canvas.width - box;
  if (headY >= canvas.height) headY = 0;
  if (headY < 0) headY = canvas.height - box;

  // Check apple collision
  if (headX === apple.x && headY === apple.y) {
    score++;
    apple = {
      x: Math.floor(Math.random() * 15) * box,
      y: Math.floor(Math.random() * 15) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  // Add new head
  snake.unshift(newHead);

  // Update score
  document.getElementById('score-board').innerText = `Score: ${score}`;
}

setInterval(draw, 150);

// Controls
document.getElementById('up').onclick = () => {
  if (direction !== 'DOWN') direction = 'UP';
};
document.getElementById('down').onclick = () => {
  if (direction !== 'UP') direction = 'DOWN';
};
document.getElementById('left').onclick = () => {
  if (direction !== 'RIGHT') direction = 'LEFT';
};
document.getElementById('right').onclick = () => {
  if (direction !== 'LEFT') direction = 'RIGHT';
};