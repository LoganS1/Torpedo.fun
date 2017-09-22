var name = prompt("What name do you want?");
var me = new Player(200,200, name, 4, 4, 10);
var mouseX = 0;
var mouseY = 0;
var bulletsArray = [];
var charactersArray = [];

canvas.addEventListener("click", function(){
  this.speed = 15;
  this.dx = mouseX - me.x;
  this.dy = mouseY - me.y;
  this.mag = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
  this.vx = (this.dx / this.mag) * this.speed;
  this.vy = (this.dy / this.mag) * this.speed;
  if(me.ammo >= 1){
    this.newBullet = new Bullet(me.x + this.vx, me.y + this.vy, this.vx, this.vy, me.id);
    socket.emit("newBullet", {bullet: this.newBullet});
    me.ammo -= 1;
  }

})

canvas.addEventListener("mousemove", function(e){
    mouseX = e.x - ((window.innerWidth / 2) - (canvas.width / 2));
    mouseY = e.y;
  })

function loop(){
  requestAnimationFrame(loop);
  loopHealthBubbles();
  healthBubbleCollisionDetection()
  loopAmmoBubbles();
  ammoBubbleCollisionDetection();
  loopSpeedBubbles();
  speedBubbleCollisionDetection();
  loopBullets();
  drawScore();
  me.update();
}

loop();

var healthBubbleTimer = setInterval(function(){
  if(healthBubbles.length < 2){
    this.healthBubble = {
      x : Math.ceil(Math.random()* 700) + 50,
      y : Math.ceil(Math.random()* 700) + 50
    }
    healthBubbles.push(this.healthBubble);
    socket.emit("healthBubble", {data: healthBubbles});
  }
}, 20000)

var ammoBubbleTimer = setInterval(function(){
  if(ammoBubbles.length < 2){
    this.ammoBubble = {
      x : Math.ceil(Math.random()* 700) + 50,
      y : Math.ceil(Math.random()* 700) + 50
    }
    ammoBubbles.push(this.ammoBubble);
    socket.emit("ammoBubble", {data: ammoBubbles});
  }
}, 5000)

var speedBubbleTimer = setInterval(function(){
  if(speedBubbles.length < 2){
    this.speedBubble = {
      x : Math.ceil(Math.random()* 700) + 50,
      y : Math.ceil(Math.random()* 700) + 50
    }
    speedBubbles.push(this.speedBubble);
    socket.emit("speedBubble", {data: speedBubbles});
  }
}, 5000)

var speedDecreaser = setInterval(function(){
  if(me.speedCount > 0){
    me.speedCount -= 1;
  }
}, 1000)
