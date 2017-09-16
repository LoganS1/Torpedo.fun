function Bullet(x, y, vx, vy){
 this.x = x;
 this.y = y;
 this.vx = vx;
 this.vy = vy;

 this.update = function(){
   this.x += vx;
   this.y += vy;
   for(var x = charactersArray.length - 1; x >= 0; x--){
     var ch = charactersArray[x].character;
     //console.log(ch);
     //console.log("(" + ch.x + ", " + ch.y + "), (" + this.x + ", " + this.y + ")")
     if(this.x >= ch.x && this.x <= ch.x + 30 && this.y >= ch.y && this.y <= ch.y + 50){
       // socket.emit("death", {name: ch.id});
       if(me.id === ch.id){
         me.x = 0;
         me.y = 0;
       }
       console.log(ch.name + "Died!");
     }
   }
 }

 this.draw = function(){
   c.beginPath();
   c.arc(this.x, this.y, 5, 0, 2*Math.PI);
   c.stroke();
 }
}
