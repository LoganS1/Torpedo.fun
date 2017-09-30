var input = document.getElementById("input");
var splash = document.getElementById("splash");
var died = document.getElementById("died");
var kills = document.getElementById("kills");
var name;
var id = Math.ceil(Math.random() * 100000000);
var mouseX = 0;
var mouseY = 0;
var bullets = [];
var characters = [];
var bubbles = [];
var characterDimensions;
var AmtOfSectionsAcross;

//setting up dimensions to be used in the math of colision detection later
var canvasDimensions = {
	height: 800,
	width: 800
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
  c.clearRect(0, 0, canvasDimensions.width*AmtOfSectionsAcross, canvasDimensions.height*AmtOfSectionsAcross);
	drawBackground();
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
