function Bullet(x, y, vx, vy){
 this.x = x;
 this.y = y;
 this.vx = vx;
 this.vy = vy;

 this.update = function(){
   this.x += vx;
   this.y += vy;
   //for(var x = charactersArray.length - 1; x >= 0; x--){
     //var ch = charactersArray[x].character;
     //console.log(ch);
     //console.log("(" + ch.x + ", " + ch.y + "), (" + this.x + ", " + this.y + ")")
     if(this.x >= me.x && this.x <= me.x + 50 && this.y >= me.y && this.y <= me.y + 30){
       // socket.emit("death", {name: ch.id});
       me.health -= 2;
       if(me.health <= 0){
         me.deaths += 1;
         me.x = 0;
         me.y = 0;
         me.health = 10;
       }
     }
   //}
 }

 this.draw = function(){
   c.beginPath();
   c.arc(this.x, this.y, 5, 0, 2*Math.PI);
   c.fillStyle = "black";
   c.fill();
   c.stroke();

   c.beginPath();
   c.arc(this.x - this.vx, this.y - this.vy, 3, 0, 2*Math.PI);
   c.fillStyle = "grey";
   c.fill();
   c.stroke();

   c.beginPath();
   c.arc(this.x - this.vx * 2, this.y - this.vy * 2, 1, 0, 2*Math.PI);
   c.fillStyle = "grey";
   c.fill();
   c.stroke();
 }
}
