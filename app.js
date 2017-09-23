//Getting packages
var express = require("express"),
	app 	= express(),
	server 	= require("http").Server(app),
	io 		= require("socket.io")(server);

//setting up server to listen
server.listen(3000, function(){
	console.log("The Server has started!")
});

//tells express to send index.html to root of website
app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
})

//tells express to allow index.html to grab resources from the "public" file
app.use(express.static('public'))

//Game mechanics
//setting up array that will hold all positions/statuses
var characters = [];
var bullets = [];

//setting up dimensions to be used in the math of colision detection later
var canvasDimensions = {
	height: 800,
	width: 800
}

var characterDimensions = {
	height: 15,
	width: 25
}

//loop that updates and sends out positions
var loop = setInterval(function(){
	updateCharacters();
	updateBullets();
	bulletCollsionDetection();
	characterCollisionDetection();
	emitArrays();
}, 1000/60);

function updateCharacters(){
	for(var x = characters.length - 1; x >= 0; x--){
		characters[x].x += characters[x].xIncr;
		characters[x].y += characters[x].yIncr;
	}
}

function updateBullets(){
	for(var x = bullets.length - 1; x >= 0; x--){
		bullets[x].x += bullets[x].xIncr;
		bullets[x].y += bullets[x].yIncr;
	}
}

function bulletCollisionDetection(){
	for(var x = characters.length - 1; x >= 0; x--){
		for(var i = bullets.length - 1; i >= 0; i--){
			this.char = characters[x];
			this.bull = bullets[i];
			if(this.bull.x >= this.char.x && this.bull.x <= this.char.x + characterDimensions.width && this.bull.y >= this.char.y && this.bull.y <= this.char.y + characterDimensions.height){
				this.char.health -= this.bull.damage;
				if(this.char.health <= 1){
					this.char.health = 10;
					this.char.deaths += 1;
					this.char.ammo = 10;
					this.char.x = 0;
					this.char.y = 0;
					for(var y = characters.length - 1; y >= 0; y--){
						if(characters[y].id === this.bull.owner){
							characters[y].kills += 1;
						}
					}
				}
				bullets.splice(i, 1);
			}
		}
	}
}

function characterCollisionDetection(){
	//todo - damage players when in eachother
}

//emits positions to all clients
function emitArrays(){
	io.sockets.emit("positions", {characters: characters, bullets: bullets});
};

//socket.io connections
io.on("connection", function(socket){
	socket.emit("connection", {successfully: "connected!"});
	console.log("Someone has connected!");

	//Receive Character
	socket.on("character", function(data){
		characters.push(data);
	});

	//Receive Bullet
	socket.on("bullet", function(data){
		bullets.push(data);
	})
})
