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
      var currBubble = healthBubbles[x];
      if(currBubble.x >= me.x && currBubble.x <= me.x + 25 && currBubble.y >= me.y && currBubble.y <= me.y + 15){


          me.health += 5;
          if(me.health > 10){
            me.health = 10;
          }

        healthBubbles.splice(x, 1);
        socket.emit("healthBubble", {data: healthBubbles});

    }
  }
}
