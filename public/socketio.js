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
  console.log(data.error);
})

socket.on("chat", function(message){
  this.span = document.createElement("span");
  this.nameSpan = document.createElement("span");
  this.span.innerText = message.message;
  this.nameSpan.innerText = message.name + ": ";
  this.span.classList.add("chatMsg");
  this.nameSpan.classList.add("chatName");
  this.nameSpan.append(this.span);
  this.nameSpan.style.color = message.color;
  console.log(message.color);
  chatBox.append(this.nameSpan);
  chatBox.append(document.createElement("br"));
  chatBox.scrollTo(0, 100000);
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
