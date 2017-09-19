function Bullet(x, y, vx, vy, owner){
 this.x = x;
 this.y = y;
 this.vx = vx;
 this.vy = vy;
 this.owner = owner;

 this.update = function(){
   this.x += vx;
   this.y += vy;
   //for(var x = charactersArray.length - 1; x >= 0; x--){
     //var ch = charactersArray[x].character;
     //console.log(ch);
     //console.log("(" + ch.x + ", " + ch.y + "), (" + this.x + ", " + this.y + ")")
     if(this.x >= me.x && this.x <= me.x + 25 && this.y >= me.y && this.y <= me.y + 15){
       // socket.emit("death", {name: ch.id});
       me.health -= 2;
       if(me.health <= 0){
         socket.emit("death", {id: me.id, owner: this.owner});
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
   c.arc(this.x, this.y, 3, 0, 2*Math.PI);
   c.fillStyle = "black";
   c.fill();
   c.stroke();

   c.beginPath();
   c.arc(this.x - this.vx, this.y - this.vy, 2, 0, 2*Math.PI);
   c.fillStyle = "grey";
   c.fill();
   c.stroke();

   c.beginPath();
   c.arc(this.x - this.vx * 2, this.y - this.vy * 1, 1, 0, 2*Math.PI);
   c.fillStyle = "grey";
   c.fill();
   c.stroke();
 }
}
