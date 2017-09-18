function Player(x, y, name, xIncr, yIncr, health){
  this.x = x;
  this.y = y;
  this.name = name;
  this.xIncr = xIncr;
  this.yIncr= yIncr;
  this.health = health;
  this.id = Math.ceil(Math.random() * 10000);

  this.update = function(){
    //x movement calculation
    // this.x = mouseX - 50/2;
    // this.y  = mouseY - 30/2;
    if(this.x - 50 < mouseX){
      this.x += this.xIncr;
    }
    if(this.x + 100 > mouseX){
      this.x -= this.xIncr
    }

    if(this.y - 50 < mouseY){
      this.y += this.yIncr;
    }
    if(this.y + 100 > mouseY){
      this.y -= this.yIncr;
    }
      this.rotation = Math.atan2(this.y - mouseY, this.x - mouseX);
  }
}

function drawCharacter(character){
  c.save();
  c.translate(character.x + 50/2, character.y + 30/2);
  c.rotate(character.rotation);
  c.translate(-(character.x + 50/2), - (character.y + 30/2))
  c.fillStyle = "blue"
  c.fillRect(character.x, character.y, 50, 30);
  c.restore();
}
