var input = document.getElementById("input");
var splash = document.getElementById("splash");
var died = document.getElementById("died");
var kills = document.getElementById("kills");
var upgradesBar = document.getElementById("upgradesBar");
var healthCost = document.getElementById("healthCost");
var oxygenCost = document.getElementById("oxygenCost");
var ammoCost = document.getElementById("ammoCost");
var upgradeItems = document.getElementsByClassName("upgradeItems");
var upgradeList = document.getElementById("upgradeList");

var name;
var me;
var mouseX = 0;
var mouseY = 0;
var bullets = [];
var characters = [];
var bubbles = [];
var characterDimensions;
var AmtOfSectionsAcross;

function unrollUpgradeBar(){
	upgradeList.classList.remove("disappear");
	upgradesBar.classList.remove("disappear");
}

function rerollUpgradeBar(){
	upgradeList.classList.add("disappear");
	upgradesBar.classList.add("disappear");
}



//setting up dimensions to be used in the math of colision detection later
var canvasDimensions = {
	height: 800,
	width: 800
}

for(var x = upgradeItems.length - 1; x >= 0; x--){
	upgradeItems[x].addEventListener("click", function(){
		if(me.coins > me.max[this.id] / 2){
			upgrade(this.id);
		}
	})
}

canvas.addEventListener("click", function(){
  socket.emit("bullet", {owner: socket.id, x: mouseX, y: mouseY});
})

window.addEventListener("mousemove", function(e){
    mouseX = (e.x - ((window.innerWidth / 2) - (canvas.width / 2))) + canvasDimensions.width * currSection.x;
    mouseY = ((e.y) + canvasDimensions.height * currSection.y) - canvas.offsetTop;
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
	updateUpgradeUI();
}

loop();

function findMe(){
	for(var y = characters.length - 1; y >= 0; y--){
		if(characters[y].id === socket.id){
			me = characters[y];
		}
	}
}

function updateUpgradeUI(){
	if(me.coins >= me.max.health / 2 || me.coins >= me.max.ammo / 2 || me.coins >= me.max.oxygen / 2){
		unrollUpgradeBar();
	}else{
		rerollUpgradeBar();
	}
	ammoCost.innerHTML = me.max.ammo / 2;
	oxygenCost.innerHTML = me.max.oxygen / 2;
	healthCost.innerHTML = me.max.health / 2;
}