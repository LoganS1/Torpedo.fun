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

window.addEventListener("mousemove", function(e){
    mouseX = (e.x - ((window.innerWidth / 2) - (canvas.width / 2))) + canvasDimensions.width * currSection.x;
    mouseY = ((e.y) + canvasDimensions.height * currSection.y) - 100;
  })

function loop(){
	findMe();
  requestAnimationFrame(loop);
  c.clearRect(0, 0, canvasDimensions.width*3, canvasDimensions.height*3);
  drawBullets();
  drawCharacters();
	drawBubbles();
  drawUI();
	updateSection();
}

loop();

var me;

function findMe(){
	for(var y = characters.length - 1; y >= 0; y--){
		if(characters[y].id === id){
			me = characters[y];
		}
	}
}
