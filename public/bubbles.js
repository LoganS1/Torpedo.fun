alert("WELCOME! Yellow Bubbles give +2 ammo! Green Bubbles Give +5 health");

var healthBubbles = [];

function loopHealthBubbles(){
  for(var x = healthBubbles.length - 1; x >= 0; x--){
    var currBubble = healthBubbles[x];
    c.beginPath();
    c.arc(currBubble.x, currBubble.y, 10, 0, 2*Math.PI);
    c.fillStyle = "green";
    c.fill();
    c.stroke();
  }
}

function healthBubbleCollisionDetection(){
  for(var x = healthBubbles.length - 1; x >= 0; x--){
      this.currBubble = healthBubbles[x];
      if(this.currBubble.x >= me.x && this.currBubble.x <= me.x + 25 && this.currBubble.y >= me.y && this.currBubble.y <= me.y + 15){
          me.health += 2;
          if(me.health > 10){
            me.health = 10;
          }
        healthBubbles.splice(x, 1);
        socket.emit("healthBubble", {data: healthBubbles});

    }
  }
}

var ammoBubbles = [];

function loopAmmoBubbles(){
  for(var x = ammoBubbles.length - 1; x >= 0; x--){
    var currBubble = ammoBubbles[x];
    c.beginPath();
    c.arc(currBubble.x, currBubble.y, 10, 0, 2*Math.PI);
    c.fillStyle = "yellow";
    c.fill();
    c.stroke();
  }
}

function ammoBubbleCollisionDetection(){
  for(var x = ammoBubbles.length - 1; x >= 0; x--){
      var currBubble = ammoBubbles[x];
      if(currBubble.x >= me.x && currBubble.x <= me.x + 25 && currBubble.y >= me.y && currBubble.y <= me.y + 15){
          me.ammo += 10;
          if(me.ammo > 10){
            me.ammo = 10;
          }
        ammoBubbles.splice(x, 1);
        socket.emit("ammoBubble", {data: ammoBubbles});

    }
  }
}

var speedBubbles = [];

function loopSpeedBubbles(){
  for(var x = speedBubbles.length - 1; x >= 0; x--){
    var currBubble = speedBubbles[x];
    c.beginPath();
    c.arc(currBubble.x, currBubble.y, 10, 0, 2*Math.PI);
    c.fillStyle = "blue";
    c.fill();
    c.stroke();
  }
}

function speedBubbleCollisionDetection(){
  for(var x = speedBubbles.length - 1; x >= 0; x--){
      this.currBubble = speedBubbles[x];
      if(this.currBubble.x >= me.x && this.currBubble.x <= me.x + 25 && this.currBubble.y >= me.y && this.currBubble.y <= me.y + 15){
          me.speedCount += 5;
        speedBubbles.splice(x, 1);
        socket.emit("speedBubble", {data: speedBubbles});

    }
  }
}
