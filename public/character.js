function Player(x, y, name, xIncr, yIncr, health){
  this.x = x;
  this.y = y;
  this.name = name;
  this.xIncr = xIncr;
  this.vIncr= yIncr;
  this.health = health;
  this.id = Math.ceil(Math.random() * 10000);

  this.update = function(){
    //x movement calculation
    if(this.x > mouseX){
      if(this.x - mouseX > xIncr){
        this.x -= xIncr;
      }
    }else if(this.x < mouseX){
      if(mouseX - this.x > xIncr){
        this.x += xIncr;
      }
    }
    //y movement calculation
     if(this.y > mouseY){
      if(this.y - mouseY > yIncr){
        this.y -= yIncr;
      }
    }else if(this.y < mouseY){
      if(mouseY - this.y > yIncr){
        this.y += yIncr;
      }
    }

    this.rotation = Math.atan2(this.y - mouseY, this.x - mouseX);
  }

  this.draw = function(){
    c.save();
    c.translate(this.x + 50/2, this.y + 30/2);
    c.rotate(this.rotation);
    c.translate(-this.x + 50/2, -this.y + 30/2)
    c.fillStyle = "blue"
    c.fillRect(this.x, this.y, 50, 30);
    c.restore();
  }
}

function drawCharacter(character){
  c.save();
  c.translate(character.x + 50/2, character.y + 30/2);
  c.rotate(character.rotation);
  c.translate(-character.x + 50/2, -character.y + 30/2)
  c.fillStyle = "blue"
  c.fillRect(character.x, character.y, 50, 30);
  c.restore();
}
