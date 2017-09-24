var name = prompt("What name do you want?");
var id = Math.ceil(Math.random() * 100000000);
var mouseX = 0;
var mouseY = 0;
var bullets = [];
var characters = [];
var bubbles = [];

//setting up dimensions to be used in the math of colision detection later
var canvasDimensions = {
	height: 800,
	width: 800
}

var characterDimensions = {
	height: 15,
	width: 25
}

canvas.addEventListener("click", function(){
  socket.emit("bullet", {owner: id, x: mouseX, y: mouseY});
})

canvas.addEventListener("mousemove", function(e){
    mouseX = e.x - ((window.innerWidth / 2) - (canvas.width / 2));
    mouseY = e.y;
  })

function loop(){
  requestAnimationFrame(loop);
  c.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
  drawBullets();
  drawCharacters();
  drawScore();
}

loop();
