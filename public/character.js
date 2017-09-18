function Player(x, y, name, xIncr, yIncr, health){
  this.x = x;
  this.y = y;
  this.color = "rgb(" + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ")";
  this.name = name;
  this.xIncr = xIncr;
  this.yIncr= yIncr;
  this.health = health;
  this.deaths = 0;
  this.id = Math.ceil(Math.random() * 10000);

  this.update = function(){
    if(this.health > antiCheatHealth){
      this.health = antiCheatHealth;
      this.deaths+=1;
      console.warn("Cheater! +1 Death for being bad!");
    }
    if(this.deaths < antiCheatDeaths){
      this.deaths = antiCheatDeaths;
      this.deaths+=1;
      console.warn("Cheater! +1 Death for being bad!");
    }
    antiCheathHealth = this.health;
    antiCheatDeaths = this.deaths;

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
  c.fillStyle = character.color;
  c.fillRect(character.x, character.y, 50, 30);
  c.restore();
}
