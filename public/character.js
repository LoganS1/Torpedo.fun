function Player(x, y, name, xIncr, yIncr, health){
  this.x = x;
  this.y = y;
  this.color = "rgb(" + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ")";
  this.name = name;
  this.origXIncr = xIncr;
  this.origYIncr = yIncr;
  this.xIncr = xIncr;
  this.yIncr= yIncr;
  this.health = health;
  this.deaths = 0;
  this.kills = 0;
  this.id = Math.ceil(Math.random() * 10000);
  this.ammo = 10;
  this.speedCount = 0;

  this.update = function(){
    if(this.speedCount > 0){
      this.xIncr = this.origXIncr + 5;
      this.yIncr = this.origYIncr + 5;
    }else{
      this.xIncr = this.origXIncr;
      this.yIncr = this.origYIncr;
    }

    if(this.x - 25 < mouseX){
      this.x += this.xIncr;
    }
    if(this.x + 50 > mouseX){
      this.x -= this.xIncr
    }

    if(this.y - 25 < mouseY){
      this.y += this.yIncr;
    }
    if(this.y + 50 > mouseY){
      this.y -= this.yIncr;
    }
    this.rotation = Math.atan2(this.y - mouseY, this.x - mouseX);

    socket.emit("character", {character: me});
  }
}

function drawCharacter(character){
  c.save();
  c.translate(character.x + 25/2, character.y + 15/2);
  c.rotate(character.rotation);
  c.translate(-(character.x + 25/2), - (character.y + 15/2))
  c.fillStyle = character.color;
  c.fillRect(character.x, character.y, 25, 15);
  c.restore();
}
