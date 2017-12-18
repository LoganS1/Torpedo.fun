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

//draw leaderboard
  if(options.names.players){
    c.beginPath();
    c.font = "16px Arial";
    c.fillStyle = "black";
    c.fillText(this.currChar.name + " (" + this.currChar.scrap + " Scrap / " + this.currChar.kills + " Kills)", 10 + canvasDimensions.width * me.section.x + canvasDimensions.width - 250, this.y + canvasDimensions.height * me.section.y);
    c.textAlign = "center";
    //draw character names
    c.fillText(this.currChar.name + " (" + this.currChar.scrap + " Scrap)", this.currChar.x, this.currChar.y - 30);
    if(this.currChar.timers.speed > 0){
      c.fillText("-Speed: " + this.currChar.timers.speed, this.currChar.x, this.currChar.y - 70);
    }
  }

//draw character bars
    this.oxygenBarValue = (50 / (this.currChar.max.oxygen)) * this.currChar.timers.oxygen;
    this.ammoBarValue = (50 / (this.currChar.max.ammo)) * this.currChar.ammo;
    this.healthBarValue = (50 / (this.currChar.max.health)) * this.currChar.health;

    //oxygen bar
    c.font = "10px Arial"
    c.fillStyle = "grey";
    c.fillRect(this.currChar.x - 15, this.currChar.y -15, 50, 5);
    c.fillStyle = "white";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 15, this.oxygenBarValue, 5);
    c.fillText(this.currChar.timers.oxygen + " / " + this.currChar.max.oxygen, this.currChar.x + 55, this.currChar.y - 0)
    //health bar
    c.fillStyle = "grey";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 20, 50, 5);
    c.fillStyle = "red";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 20, this.healthBarValue, 5);
    c.fillText(this.currChar.health + " / " + this.currChar.max.health, this.currChar.x + 55, this.currChar.y - 10)
    //ammo bar
    c.fillStyle = "grey";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 25, 50, 5);
    c.fillStyle = "black";
    c.fillRect(this.currChar.x - 15, this.currChar.y - 25, this.ammoBarValue, 5);
    c.fillText(this.currChar.ammo + " / " + this.currChar.max.ammo, this.currChar.x + 55, this.currChar.y - 20)
    c.font = "16px Arial";
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

function drawBubbles(){
  for(var y = bubbles.length - 1; y >= 0; y--){
    if(bubbles[y].status === "scrap"){
      c.beginPath();
      c.fillStyle = options.bubbleColors[bubbles[y].status];
      c.fillRect(bubbles[y].x, bubbles[y].y, bubbles[y].size, bubbles[y].size);
      if(options.names.bubbles){
        c.fillText(bubbles[y].status, bubbles[y].x + bubbles[y].size, bubbles[y].y);
      }

    }else if(bubbles[y].status === "oxygen"){
      c.beginPath();
      c.strokeStyle = options.bubbleColors[bubbles[y].status];
      c.arc(bubbles[y].x, bubbles[y].y, bubbles[y].size, 0, 2*Math.PI);
      c.stroke();
      c.beginPath();
      c.fillStyle = options.bubbleColors[bubbles[y].status];
      if(options.names.bubbles){
        c.fillText(bubbles[y].status, bubbles[y].x + bubbles[y].size, bubbles[y].y);
      }
      c.fill();

    }else{
      c.beginPath()
      c.fillStyle = options.bubbleColors[bubbles[y].status];
      c.arc(bubbles[y].x, bubbles[y].y, bubbles[y].size, 0, 2*Math.PI);
      if(options.names.bubbles){
        c.fillText(bubbles[y].status, bubbles[y].x + bubbles[y].size, bubbles[y].y);
      }
      c.fill();
    }

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

/*----------MiniMap----------*/
function drawMiniMap(){
  this.xOffSet = 20;
  this.yOffSet = 20;
  this.miniMapSize = 40;
  this.miniMapThickness = 2;
  this.barLength = this.miniMapSize * AmtOfSectionsAcross;
  this.xCounter = 0;
  this.yCounter = 0;

  for(var y = 0; y <= AmtOfSectionsAcross; y++){
    c.beginPath();

    c.fillRect(this.xOffSet + this.xCounter + (canvasDimensions.width * me.section.x),
    this.yOffSet + (canvasDimensions.height * me.section.y),
    this.miniMapThickness,
    this.barLength);

    c.fillRect(this.xOffSet + (canvasDimensions.width * me.section.x),
    this.yOffSet + this.yCounter + (canvasDimensions.height * me.section.y),
    this.barLength,
    this.miniMapThickness);

    this.xCounter += this.miniMapSize;
    this.yCounter += this.miniMapSize;
  }

  for(var y = characters.length - 1; y >= 0; y--){
    c.beginPath();
      c.fillStyle = "rgba(255, 0, 0, 0.2)"
    if(characters[y].id != "[redacted]"){
      //this checks if current character is "me"
      c.fillStyle = "rgba(0, 0, 255, 0.5)";
    }
      this.x1 = this.xOffSet + (this.miniMapThickness + (this.miniMapSize * characters[y].section.x)) + (canvasDimensions.width * me.section.x);
      this.y1 = this.yOffSet + (this.miniMapThickness + (this.miniMapSize * characters[y].section.y)) + (canvasDimensions.width * me.section.y);
    c.fillRect(this.x1, this.y1, this.miniMapSize, this.miniMapSize);
  }
}


function drawBackground(){
  c.fillStyle = "lightblue";
  c.fillRect(0, 100, canvasDimensions.width * AmtOfSectionsAcross, canvasDimensions.height * AmtOfSectionsAcross);

}
