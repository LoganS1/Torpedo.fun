var name = prompt("What name do you want?");
var me = new Player(200,200, name, 4, 4, 10);
var mouseX = 0;
var mouseY = 0;
var bullets = [];
var characters = [];
var bubbles = [];

canvas.addEventListener("click", function(){
  this.speed = 15;
  this.dx = mouseX - me.x;
  this.dy = mouseY - me.y;
  this.mag = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
  this.vx = (this.dx / this.mag) * this.speed;
  this.vy = (this.dy / this.mag) * this.speed;
  if(me.ammo >= 1){
    this.newBullet = new Bullet(me.x + this.vx, me.y + this.vy, this.vx, this.vy, me.id);
    socket.emit("bullet", {bullet: this.newBullet});
    me.ammo -= 1;
  }

})

canvas.addEventListener("mousemove", function(e){
    mouseX = e.x - ((window.innerWidth / 2) - (canvas.width / 2));
    mouseY = e.y;
  })

function loop(){
  requestAnimationFrame(loop);
  loopBullets();
  drawScore();
  me.update();
}

loop();
