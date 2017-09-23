function Bullet(x, y, vx, vy, owner){
 this.x = x;
 this.y = y;
 this.vx = vx;
 this.vy = vy;
 this.owner = owner;

 this.draw = function(){
   c.beginPath();
   c.arc(this.x, this.y, 3, 0, 2*Math.PI);
   c.fillStyle = "black";
   c.fill();
   c.stroke();
 }
}

function loopBullets(){
  for(var i = 0; i < bullets.length; i++){
    bulletsArray[i].draw();
  }
}
