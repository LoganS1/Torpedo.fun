// function Player(x, y, name, xIncr, yIncr, health){
//   this.x = x;
//   this.y = y;
//   this.color = "rgb(" + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ")";
//   this.name = name;
//   this.xIncr = xIncr;
//   this.yIncr= yIncr;
//   this.deaths = 0;
//   this.kills = 0;
//   this.id = Math.ceil(Math.random() * 100000000);
//   this.ammo = 10;
//
//   this.update = function(){
//     if(this.x - 25 < this.mouseX){
//       this.x += this.xIncr;
//     }
//     if(this.x + 50 > this.mouseX){
//       this.x -= this.xIncr
//     }
//
//     if(this.y - 25 < this.mouseY){
//       this.y += this.yIncr;
//     }
//     if(this.y + 50 > this.mouseY){
//       this.y -= this.yIncr;
//     }
//     this.rotation = Math.atan2(this.y - this.mouseY, this.x - this.mouseX);
//
//     socket.emit("character", me);
//   }
// }

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
