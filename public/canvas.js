var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
canvas.height = 1420;
canvas.width = 1920;

function drawScore(){
  this.y = 30;
  this.scoreArray=[];
  for(var i = charactersArray.length - 1; i >= 0; i--){
    this.char = charactersArray[i].character;
    scoreArray.push({x: this.char.x, y: this.char.y, name: this.char.name, health: this.char.health, deaths: this.char.deaths, kills: this.char.kills});
  }

  for(var t = scoreArray.length - 1; t >= 0; t--){
    this.currObj = scoreArray[t];
    console.log
    c.beginPath();
    c.font = "30px Arial";
    c.fillStyle = "black";
    c.fillText(this.currObj.name + " " + this.currObj.deaths + " Deaths, " + this.currObj.kills + " Kills!", 10, this.y);
    c.textAlign = "center";
    c.fillText(this.currObj.name, this.currObj.x, this.currObj.y - 50);
    c.fillText(this.currObj.health, this.currObj.x, this.currObj.y - 20);
    c.textAlign = "left";
    this.y += 30;
  }
}
