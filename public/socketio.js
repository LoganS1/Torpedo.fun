var socket = io.connect();

socket.on("connection", function(data){
  console.log(data);
})

socket.on("data", function(data){
  bullets = data.bullets;
  characters = data.characters;
  bubbles = data.bubbles;
})

var sendData = setInterval(function(){
  socket.emit("data", {mouseX: mouseX, mouseY: mouseY, id: id, name: name});
}, 1000/60)

var sendData = setInterval(function(){
  socket.emit("data", {mouseX: mouseX, mouseY: mouseY, id: id, name: name});
}, 1000/60)
