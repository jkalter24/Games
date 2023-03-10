const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const pacman = {
  x: 50,
  y: 50,
  radius: 20,
  mouthOpen: false,
  mouthAngle: 0,
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.mouthAngle, Math.PI*2 - this.mouthAngle);
    ctx.lineTo(this.x, this.y);
    ctx.fillStyle = "yellow";
    ctx.fill();
  },
  update: function() {
    if (this.mouthOpen) {
      this.mouthAngle += 0.1;
      if (this.mouthAngle >= Math.PI/4) {
        this.mouthOpen = false;
      }
    } else {
      this.mouthAngle -= 0.1;
      if (this.mouthAngle <= 0) {
        this.mouthOpen = true;
      }
    }
  }
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pacman.update();
  pacman.draw();
  requestAnimationFrame(animate);
}

animate();
document.addEventListener("keydown", function(event) {
    switch(event.key) {
      case "ArrowLeft":
        pacman.x -= 5;
        break;
      case "ArrowRight":
        pacman.x += 5;
        break;
      case "ArrowUp":
        pacman.y -= 5;
        break;
      case "ArrowDown":
        pacman.y += 5;
        break;
    }
  });
  const pellets = [
    {x: 100, y: 100, radius: 5},
    {x: 200, y: 200, radius: 5},
    {x: 300, y: 300, radius: 5}
  ];
  
  function drawPellets() {
    for (let i = 0; i < pellets.length; i++) {
      const pellet = pellets[i];
      ctx.beginPath();
      ctx.arc(pellet.x, pellet.y, pellet.radius, 0, Math.PI*2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }
  
  function eatPellets() {
    for (let i = 0; i < pellets.length; i++) {
      const pellet = pellets[i];
      const distance = Math.sqrt((pacman.x - pellet.x)**2 + (pacman.y - pellet.y)**2);
      if (distance < pacman.radius + pellet.radius) {
        pellets.splice(i, 1);
        pacman.radius += 1;
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width,
    
