var bubbleColors = {
  damage: "red",
  health: "green",
  ammo: "purple",
  speed: "blue"
}
function drawBubbles(){
  for(var y = bubbles.length - 1; y >= 0; y--){
    c.beginPath()
    c.fillStyle = bubbleColors[bubbles[y].status];
    c.arc(bubbles[y].x, bubbles[y].y, 5, 0, 2*Math.PI);
    c.fill();
  }
}
