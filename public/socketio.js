var socket = io.connect();

socket.on("connection", function(data){
  console.log(data);
})

socket.on("data", function(data){
  bullets = data.bullets;
  characters = data.characters;
  bubbles = data.bubbles;
  characterDimensions = data.characterDimensions;
  AmtOfSectionsAcross = data.AmtOfSectionsAcross;
})

socket.on("death", function(data){
  if(data.deathID === me.deathID){
    started = false;
    clearInterval(sendData);
    splash.classList.remove("disappear");
    chat.classList.add("disappear");
    died.classList.remove("disappear");
    kill.classList.remove("disappear");
    kills.innerHTML = me.kills + " Kills";
  }
})

socket.on("uh-oh", function(data){
  createMsg(data.reason, "red", data.error);
})

socket.on("chat", function(message){
  createMsg(message.name, message.color, message.message);
})

function upgrade(status){
  socket.emit("upgrade", {status: status})
}

function sendMsg(){
  this.msgToSend = chatInput.value;
  socket.emit("chat", {message: this.msgToSend});
  chatInput.value = "";
}

var sendData;

function enter(){
  name = input.value;
  splash.classList.add("disappear");
  chat.classList.remove("disappear");
  if(name === ""){
    name = "Guest";
  }
	sendData = setInterval(function(){
	  socket.emit("data", {mouseX: mouseX, mouseY: mouseY, name: name});
	}, 1000/60)
}

function sendBullet(){
  socket.emit("bullet", {owner: socket.id, x: mouseX, y: mouseY});
}
