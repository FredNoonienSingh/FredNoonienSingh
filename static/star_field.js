const canvas = document.getElementById('background_canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const starCount = 78;
const stars = [];
let mouse = {
  x: undefined,
  y: undefined
};

let target = {
  x: canvas.width/2, 
  y: canvas.height/2
}

// Edit so i can push again for pages

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * 100; 
    this.radius = Math.random(); 
    this.speed = Math.random() + 0.1;
    this.color = 'white'
  }

  update() {
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (this.radius < 2){
      this.radius += this.radius * .1;
    }

    this.x -= dx / distance * this.speed *10;
    this.y -= dy / distance * this.speed *10;

    if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0
    ){
      this.z = 100;
      this.radius = 0.1;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  }

  draw() {

    ctx.fillStyle = this.color; 
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < starCount; i++) {
  stars.push(new Star());
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fade out previous frame
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.update();
    star.draw();
  });

  requestAnimationFrame(animate);
}

animate();