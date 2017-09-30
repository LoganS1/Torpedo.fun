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
  if(data.id === id){
    clearInterval(sendData);
    splash.classList.remove("disappear");
    died.classList.remove("disappear");
    kills.innerHTML = me.kills + " Kills";
    kills.classList.remove("disappear");
  }
})

var sendData;

function enter(){
  name = input.value;
  splash.classList.add("disappear");
	sendData = setInterval(function(){
	  socket.emit("data", {mouseX: mouseX, mouseY: mouseY, id: id, name: name});
	}, 1000/60)
}
