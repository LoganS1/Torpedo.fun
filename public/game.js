var name = prompt("What name do you want?");
var me = new Player(200,200, name, 4, 4, 10);
var mouseX = 0;
var mouseY = 0;
var bulletsArray = [];
var charactersArray = [];

canvas.addEventListener("click", function(){
  this.speed = 20;
  this.dx = mouseX - me.x;
  this.dy = mouseY - me.y;
  this.mag = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
  this.vx = (this.dx / this.mag) * this.speed;
  this.vy = (this.dy / this.mag) * this.speed;
  if(me.ammo >= 1){
    this.newBullet = new Bullet(me.x + this.vx * 2, me.y + this.vy * 2, this.vx, this.vy, me.id);
    socket.emit("newBullet", {bullet: this.newBullet});
    me.ammo -= 1;
  }

})

canvas.addEventListener("mousemove", function(e){
    mouseX = e.x - ((window.innerWidth / 2) - (canvas.width / 2));
    mouseY = e.y;
  })

function loop(){
  if(me.ammo < 10){
    me.ammo += 0.02;
  }

  requestAnimationFrame(loop);
  me.update();
  drawScore();
  for(var i = 0; i < bulletsArray.length; i++){
    bulletsArray[i].update();
    bulletsArray[i].draw();
    for(var p = bulletsArray.length - 1; p >= 0; p--){
      if(bulletsArray[p].x < -2000 || bulletsArray[p].y < -2000 || bulletsArray[p].x > 2000 || bulletsArray[p].y > 2000){
        bulletsArray.splice(p, 1);
      }
    }
  }

    socket.emit("character", {character: me});
}

loop();
