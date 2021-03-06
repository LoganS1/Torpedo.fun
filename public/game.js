var input = document.getElementById("input");
var splash = document.getElementById("splash");
var upgradesBar = document.getElementById("upgradesBar");
var healthCost = document.getElementById("healthCost");
var oxygenCost = document.getElementById("oxygenCost");
var ammoCost = document.getElementById("ammoCost");
var upgradeItems = document.getElementsByClassName("upgradeItems");
var upgradeList = document.getElementById("upgradeList");
var chat = document.getElementById("chat");
var chatInput = document.getElementById("chatInput");
var chatBox = document.getElementById("chatBox");
var playerNamesBox = document.getElementById("displayPlayerNames");
var bubbleNamesBox = document.getElementById("displayBubbleNames");
var displayChat = document.getElementById("displayChat");

var name;
var me;
var mouseX = 0;
var mouseY = 0;
var bullets = [];
var characters = [];
var bubbles = [];
var started = false;
var characterDimensions;
var AmtOfSectionsAcross;

if(window.innerHeight < 500 || window.innerWidth < 600){
	alert("Sorry, a bigger screen size is recommended for playing this game!");
}

var options = {
	bubbleColors: {
	  damage: "red",
	  health: "green",
	  ammo: "purple",
	  speed: "blue",
	  oxygen: "black",
	  scrap: "brown"
	},
	names: {
		bubbles: true,
		players: true
	},
	minimap: {
		color: "red"
	}
}

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
		if(me.scrap >= me.max[this.id] / 2){
			upgrade(this.id);
		}else{
			createMsg("Bank", "red", "You do not have enough scrap!")
		}
	})
}

canvas.addEventListener("click", function(){
  sendBullet();
})

window.addEventListener("mousemove", function(e){
	mouseX = (canvasDimensions.width/canvas.clientWidth) * (e.x - canvas.offsetLeft + canvas.clientWidth * me.section.x) - 10;
	mouseY = (canvasDimensions.height/canvas.clientHeight) * (e.y - canvas.offsetTop + canvas.clientHeight * me.section.y) - 10;
})

function loop(){
	findMe();
  requestAnimationFrame(loop);
	if(started){
	  c.clearRect(0, 0, canvasDimensions.width*AmtOfSectionsAcross, canvasDimensions.height*AmtOfSectionsAcross);
		drawBackground();
		drawBullets();
	  drawCharacters();
		drawBubbles();
	  drawUI();
		drawMiniMap();
		updateUpgradeUI();
		updateSection();
	}
}

loop();

function findMe(){
	for(var y = characters.length - 1; y >= 0; y--){
		if(characters[y].id === socket.id){
			me = characters[y];
			if(!started){
				started = true;
			}
		}
	}
}

function updateUpgradeUI(){
	if(me.scrap >= me.max.health / 2 || me.scrap >= me.max.ammo / 2 || me.scrap >= me.max.oxygen / 2){
		unrollUpgradeBar();
	}else{
		rerollUpgradeBar();
	}
	ammoCost.innerHTML = me.max.ammo / 2;
	oxygenCost.innerHTML = me.max.oxygen / 2;
	healthCost.innerHTML = me.max.health / 2;
}

chatInput.addEventListener("keyup", function(e){
	if(e.keyCode === 13){
		sendMsg();
	}
})

input.addEventListener("keyup", function(e){
	if(e.keyCode === 13){
		enter();
	}
})

function createMsg(name, color, message){
	this.span = document.createElement("span");
  this.nameSpan = document.createElement("span");
  this.span.innerText = message;
  this.nameSpan.innerText = name + ": ";
  this.span.classList.add("chatMsg");
  this.nameSpan.classList.add("chatName");
  this.nameSpan.append(this.span);
  this.nameSpan.style.color = color;
  chatBox.append(this.nameSpan);
  chatBox.append(document.createElement("br"));
  chatBox.scrollTo(0, 100000);
}

function enter(){
  name = input.value;
  splash.classList.add("disappear");
	if(displayChat.checked){
  	chat.classList.remove("disappear");
	}
  if(name === ""){
    name = "Guest";
	}
	options.names.players = playerNamesBox.checked;
	options.names.bubbles = bubbleNamesBox.checked;
	sendData();
}
