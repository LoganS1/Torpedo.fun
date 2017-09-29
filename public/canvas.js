var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
canvas.height = 800;
canvas.width = 800;

/*----------UI----------*/
function drawUI(){
  this.y = 30;
  this.scoreArray=[];

  for(var i = characters.length - 1; i >= 0; i--){
    this.char = characters[i];
    scoreArray.push({x: this.char.x, y: this.char.y, name: this.char.name, health: this.char.health, deaths: this.char.deaths, kills: this.char.kills, ammo: this.char.ammo});
  }

  c.fillStyle = "red";
  c.fillRect(0, 0, canvasDimensions.width * 3, 10);
  c.fillRect(0, 0, 10, canvasDimensions.height * 3);
  c.fillRect(0, canvasDimensions.height * 3 - 10, canvasDimensions.width * 3, canvasDimensions.height*3);
  c.fillRect(canvasDimensions.width * 3 - 10, 0, canvasDimensions.width * 3, canvasDimensions.height * 3);

  for(var t = characters.length - 1; t >= 0; t--){
    this.currObj = characters[t];

    c.beginPath();
    c.font = "16px Arial";
    c.fillStyle = "black";
    c.fillText(this.currObj.name + " " + this.currObj.deaths + " Deaths, " + this.currObj.kills + " Kills!", 10 + canvasDimensions.width * currSection.x, this.y + canvasDimensions.height * currSection.y);
    c.textAlign = "center";
    c.fillText(this.currObj.name, this.currObj.x, this.currObj.y - 30);
    //health bar
    c.fillStyle = "grey";
    c.fillRect(this.currObj.x - 15, this.currObj.y - 20, 50, 5);
    c.fillStyle = "red";
    c.fillRect(this.currObj.x - 15, this.currObj.y - 20, this.currObj.health * 5, 5);
    //ammo bar
    c.fillStyle = "grey";
    c.fillRect(this.currObj.x - 15, this.currObj.y - 25, 50, 5);
    c.fillStyle = "black";
    c.fillRect(this.currObj.x - 15, this.currObj.y - 25, this.currObj.ammo * 5, 5);
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
  speed: "blue"
}
function drawBubbles(){
  for(var y = bubbles.length - 1; y >= 0; y--){
    c.beginPath()
    c.fillStyle = bubbleColors[bubbles[y].status];
    c.arc(bubbles[y].x, bubbles[y].y, bubbles[y].size, 0, 2*Math.PI);
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
