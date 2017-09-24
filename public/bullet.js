function drawBullets(){
  for(var i = 0; i < bullets.length; i++){
    c.beginPath();
    c.arc(bullets[i].x, bullets[i].y, 3, 0, 2*Math.PI);
    c.fillStyle = "black";
    c.fill();
    c.stroke();
  }
}
