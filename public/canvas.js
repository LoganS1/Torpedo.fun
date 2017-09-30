var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
canvas.height = 800;
canvas.width = 800;

/*----------UI----------*/
function drawUI(){
  this.y = 30;
  this.scoreArray=[];

  c.fillStyle = "red";
  c.fillRect(0, 0, canvasDimensions.width * AmtOfSectionsAcross, 10);
  c.fillRect(0, 0, 10, canvasDimensions.height * AmtOfSectionsAcross);
  c.fillRect(0, canvasDimensions.height * AmtOfSectionsAcross - 10, canvasDimensions.width * AmtOfSectionsAcross, canvasDimensions.height*AmtOfSectionsAcross);
  c.fillRect(canvasDimensions.width * AmtOfSectionsAcross - 10, 0, canvasDimensions.width * AmtOfSectionsAcross, canvasDimensions.height * AmtOfSectionsAcross);

  for(var t = characters.length - 1; t >= 0; t--){
    this.currChar = characters[t];

    c.beginPath();
    c.font = "16px Arial";
    c.fillStyle = "black";
    c.fillText(this.currChar.name, 10 + canvasDimensions.width * currSection.x, this.y + canvasDimensions.height * currSection.y);
    c.textAlign = "center";
    c.fillText(this.currChar.name, this.currChar.x, this.currChar.y - 30);
    if(this.currChar.timers.speed > 0){
      c.fillText("-Speed: " + this.currChar.timers.speed, this.currChar.x, this.currChar.y - 70);
    }
    //oxygen bar
    c.fillStyle = "grey";
    c.fillRect(this.currChar.x - 15, this.currChar.y -15, 50, 5);
    c.fillStyle = "white";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 15, this.currChar.timers.oxygen * 5, 5);
    //health bar
    c.fillStyle = "grey";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 20, 50, 5);
    c.fillStyle = "red";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 20, this.currChar.health * 5, 5);
    //ammo bar
    c.fillStyle = "grey";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 25, 50, 5);
    c.fillStyle = "black";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 25, this.currChar.ammo * 5, 5);
    c.textAlign = "left";
    this.y += 30;
  }
}

/*----------Sections----------*/
var currSection = {
  x: 0,
  y: 0
}

function updateSection(){

  //x section updating
  if(me.section.x != currSection.x){
    if(me.section.x > currSection.x){
      c.translate(-canvasDimensions.width, 0);
      currSection.x++;
    }else{
      c.translate(canvasDimensions.width, 0);
      currSection.x--;
    }
  }

  //y section updating
  if(me.section.y != currSection.y){
    if(me.section.y > currSection.y){
      c.translate(0, -canvasDimensions.height);
      currSection.y++;
    }else{
      c.translate(0, canvasDimensions.height);
      currSection.y--;
    }
  }
}

/*----------Characters----------*/
function drawCharacters(){
  for(var i = 0; i < characters.length; i++){
    this.currChar = characters[i];
    c.save();
    c.translate(this.currChar.x + characterDimensions.width/2, this.currChar.y + characterDimensions.height/2);
    c.rotate(this.currChar.rotation);
    c.translate(-(this.currChar.x + characterDimensions.width/2), - (this.currChar.y + characterDimensions.height/2))
    c.fillStyle = this.currChar.color;
    c.fillRect(this.currChar.x, this.currChar.y, characterDimensions.width, characterDimensions.height);
    c.restore();
  }
}

/*----------Bubbles----------*/
var bubbleColors = {
  damage: "red",
  health: "green",
  ammo: "purple",
  speed: "blue",
  oxygen: "black"
}
function drawBubbles(){
  for(var y = bubbles.length - 1; y >= 0; y--){
    c.beginPath()
    c.fillStyle = bubbleColors[bubbles[y].status];
    c.arc(bubbles[y].x, bubbles[y].y, bubbles[y].size, 0, 2*Math.PI);
    c.fillText(bubbles[y].status, bubbles[y].x + bubbles[y].size, bubbles[y].y);
    c.fill();
  }
}

/*----------Bullets----------*/
function drawBullets(){
  for(var i = 0; i < bullets.length; i++){
    c.beginPath();
    c.arc(bullets[i].x, bullets[i].y, bullets[i].size, 0, 2*Math.PI);
    c.fillStyle = "black";
    c.fill();
  }
}

/*----------Coins----------*/
function drawCoins(){
  for(var i = 0; i < coins.length; i++){
    c.beginPath();
    c.arc(coins[i].x, coins[i].y, coins[i].size, 0, 2*Math.PI);
    c.fillStyle = "yellow";
    c.fill();
  }
}


function drawBackground(){
  c.fillStyle = "lightblue";
  c.fillRect(0, 100, canvasDimensions.width * AmtOfSectionsAcross, canvasDimensions.height * AmtOfSectionsAcross);

}