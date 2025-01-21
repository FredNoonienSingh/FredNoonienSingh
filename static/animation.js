// res/main.js
const canvas = document.getElementById('background_canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numberOfParticles = 500;
let mouse = {
  x: undefined,
  y: undefined
};

class Particle {
  constructor(x, y, color) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.radius = Math.random() * 3;
    this.speedX = (Math.random() - 0.5) * 12; 
    this.speedY = (Math.random() - 0.5) * 12;
    this.color = color || 'rgb(255, 0, 0)'; 
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  
    // Wrap around the edges
    if (this.x > canvas.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0; 
    else if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < numberOfParticles; i++) {
  particles.push(new Particle());
}

// Event listeners for mouse movement
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  // Emit blue particles from mouse position
  for (let i = 0; i < 5; i++) { 
    particles.push(new Particle(mouse.x, mouse.y, 'blue')); 
  }
});

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
}

animate();