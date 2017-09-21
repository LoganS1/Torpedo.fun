var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
canvas.height = 800;
canvas.width = 800;

function drawScore(){
  this.y = 30;
  this.scoreArray=[];
  for(var i = charactersArray.length - 1; i >= 0; i--){
    this.char = charactersArray[i].character;
    scoreArray.push({x: this.char.x, y: this.char.y, name: this.char.name, health: this.char.health, deaths: this.char.deaths, kills: this.char.kills, ammo: this.char.ammo});
  }

  for(var t = scoreArray.length - 1; t >= 0; t--){
    this.currObj = scoreArray[t];
    console.log
    c.beginPath();
    c.font = "16px Arial";
    c.fillStyle = "black";
    c.fillText(this.currObj.name + " " + this.currObj.deaths + " Deaths, " + this.currObj.kills + " Kills!", 10, this.y);
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
