var socket = io.connect();

socket.on("connection", function(data){
  console.log(data);
})

socket.on("data", function(){
  bullets = data.bullets;
  characters = data.characters;
  bubbles = data.bubbles;
})
