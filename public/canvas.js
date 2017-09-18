var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
canvas.height = 1420;
canvas.width = 1920;

function drawScore(){
  this.y = 30;
  this.scoreArray=[];
  for(var i = charactersArray.length - 1; i >= 0; i--){
    this.char = charactersArray[i].character;
    scoreArray.push({name: this.char.name, health: this.char.health, deaths: this.char.deaths});
  }

  for(var t = scoreArray.length - 1; t >= 0; t--){
    this.currObj = scoreArray[t];
    c.font = "30px Arial";
    c.fillText(this.currObj.name + ": " + "Health: " + this.currObj.health + " / Deaths: " + this.currObj.deaths, 1400, this.y);
    this.y += 30;
  }
}
