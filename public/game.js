var me = new Player(200,200, "logan", 8, 8, 10);

var mouseX = 0;
var mouseY = 0;
var bulletsArray = [];
var charactersArray = [];

window.addEventListener("click", function(){
  this.speed = 20;
  this.dx = mouseX - me.x;
  this.dy = mouseY - me.y;
  this.mag = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
  this.vx = (this.dx / this.mag) * speed;
  this.vy = (this.dy / this.mag) * speed;
  if(me.x + 50/2 > mouseX){
    this.newBullet = new Bullet(me.x - 20, me.y + 30/2, this.vx, this.vy);
  }else if(me.x + 50/3 < mouseX){
    this.newBullet = new Bullet(me.x + 70, me.y + 30/2, this.vx, this.vy);
  }
  socket.emit("newBullet", {bullet: newBullet});
})

canvas.addEventListener("mousemove", function(e){
    mouseX = e.x;
    mouseY = e.y;
  })

function loop(){
  requestAnimationFrame(loop);
  me.update();

  for(var i = 0; i < bulletsArray.length; i++){
    bulletsArray[i].update();
    bulletsArray[i].draw();
    for(var p = bulletsArray.length - 1; p >= 0; p--){
      if(bulletsArray[p].x > 2000 || bulletsArray[p].y > 2000){
        bulletsArray.splice(p, 1);
      }
    }
  }

    socket.emit("character", {character: me});
}

loop();
