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
  coins = data.coins;
})

socket.on("death", function(data){
  if(data.deathID === me.deathID){
    clearInterval(sendData);
    splash.classList.remove("disappear");
    died.classList.remove("disappear");
    kills.innerHTML = me.kills + " Kills";
    kills.classList.remove("disappear");
  }
})

socket.on("uh-oh", function(data){
  console.log(data.error);
})

function upgrade(status){
  socket.emit("upgrade", {status: status})
}

var sendData;

function enter(){
  name = input.value;
  splash.classList.add("disappear");
	sendData = setInterval(function(){
	  socket.emit("data", {mouseX: mouseX, mouseY: mouseY, name: name});
	}, 1000/60)
}
