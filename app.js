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
var bubbles = [];

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
	characterCollisionDetection();
	bulletCollisionDetection();
	updateConsole();
	//bubbleCollisionDetection();
	emitArrays();
}, 1000/60);

var fps = {	startTime : 0,	frameNumber : 0,	getFPS : function(){		this.frameNumber++;		var d = new Date().getTime(),			currentTime = ( d - this.startTime ) / 1000,			result = Math.floor( ( this.frameNumber / currentTime ) );		if( currentTime > 1 ){			this.startTime = new Date().getTime();			this.frameNumber = 0;		}		return result;	}	};

function updateConsole(){
	console.log("Players Connected: " + characters.length + "\n FPS: " + fps.getFPS() + "\n" + createPlayerList());
}

function createPlayerList(){
	this.toReturn = "";
	for(var y = characters.length - 1; y >= 0; y--){
		this.toReturn += (y + ". "+ characters[y].name + "\n");
	}
	return this.toReturn;
}

/*----------Characters----------*/
function updateCharacters(){
	for(var x = characters.length - 1; x >= 0; x--){
		this.currChar = characters[x];

		if(this.currChar.x - 25 < this.currChar.mouseX){
      this.currChar.x += this.currChar.xIncr;
    }
    if(this.currChar.x + 50 > this.currChar.mouseX){
      this.currChar.x -= this.currChar.xIncr
    }

    if(this.currChar.y - 25 < this.currChar.mouseY){
      this.currChar.y += this.currChar.yIncr;
    }
    if(this.currChar.y + 50 > this.currChar.mouseY){
      this.currChar.y -= this.currChar.yIncr;
    }
    this.currChar.rotation = Math.atan2((this.currChar.y + characterDimensions.height / 2) - this.currChar.mouseY, (this.currChar.x + characterDimensions.width / 2) - this.currChar.mouseX);
	}
}

function characterCollisionDetection(){
	//todo - damage and repel players when hitting eachother
}

/*----------Bubbles----------*/
var createBubblesCount = 0;
var createBubbles = setInterval(function(){
/*
Effect Status's meanings
0 = damage;
1 = health;
2 = ammo;
3 = speed;
*/
	if(createBubblesCount % 30 === 0){
		createBubble(0);
	}else if(createBubblesCount % 20 === 0){
		createBubble(1);
	}else if(createBubblesCount % 10 === 0){
		createBubble(3);
	}else if(createBubblesCount % 5 === 0){
		createBubble(2);
	}

	//counter updating
	createBubblesCount++;
	if(createBubblesCount > 30){
		createBubblesCount = 0;
	}

}, 1000);

function createBubble(status){
	//add bubble max limit checking here
	this.newBubble = {
		x : Math.ceil(Math.random()* (canvasDimensions.width - 100)) + 50, //creates an x cordinate that is 50 places away from a wall.
		y : Math.ceil(Math.random()* (canvasDimensions.height - 100)) + 50, //creates an y cordinate that is 50 places away from a wall.
		status: status
	}
	bubbles.push(this.newBubble);
}

function bubbleCollisionDetection(){
	for(var x = characters.length - 1; x >= 0; x--){
		for(var i = bubbles.length - 1; i >= 0; i--){
			this.char = characters[x];
			this.bubble = bubbles[i];
			//running through arrays comparing each bubble to each character
			if(this.bubble.x >= this.char.x && this.bubble.x <= this.char.x + characterDimensions.width && this.bubble.y >= this.char.y && this.bubble.y <= this.char.y + characterDimensions.height){
				//when a bubbele is found inside a character

			}
		}
	}
}

/*----------Bullets----------*/
function updateBullets(){
	for(var x = bullets.length - 1; x >= 0; x--){
		bullets[x].x += bullets[x].xIncr;
		bullets[x].y += bullets[x].yIncr;
		if(bullets[x].x > 2000 || bullets[x].x < -2000 || bullets[x].y > 2000 || bullets[x].y < -2000){
			bullets.splice(x, 1);
		}
	}
}

function bulletCollisionDetection(){
	for(var x = characters.length - 1; x >= 0; x--){
		for(var i = bullets.length - 1; i >= 0; i--){
			this.char = characters[x];
			this.bull = bullets[i];

			//running through arrays comparing each bullet to each character
			if(this.bull.x >= this.char.x && this.bull.x <= this.char.x + characterDimensions.width && this.bull.y >= this.char.y && this.bull.y <= this.char.y + characterDimensions.height){
				//when a bullet is found inside a character

				//decrease that players health
				this.char.health -= this.bull.damage;

				//test to see if player is dead
				if(this.char.health <= 1){
					//reset characters statistics
					this.char.x = 0;
					this.char.y = 0;
					this.char.health = 10;
					this.char.deaths += 1;
					this.char.ammo = 10;
					for(var y = characters.length - 1; y >= 0; y--){
						//find bullets owner and award the kill
						if(characters[y].id === this.bull.owner){
							characters[y].kills += 1;
						}
					}
				}
				//remove the bullet after it has hit something
				bullets.splice(i, 1);
			}
		}
	}
}

/*----------Socket.io----------*/
//emits positions to all clients
function emitArrays(){
	io.sockets.emit("data", {characters: characters, bullets: bullets, bubbles: bubbles});
};

//socket.io connections
io.on("connection", function(socket){
	socket.emit("connection", {successfully: "connected!"});

	//Receive Data
	socket.on("data", function(data){
		this.found = false;
		for(var x = characters.length - 1; x >= 0; x--){
			if(characters[x].id == data.id){
				characters[x].mouseX = data.mouseX;
				characters[x].mouseY = data.mouseY;
				characters[x].heartbeat = 5;
				this.found = true;
			}
		}
		if(!this.found){
			console.log(data.name + " joined the game!");
			if(data.name === ""){
				data.name = "torpedoed.io";
			}
			characters.push({
				x: Math.ceil(Math.random() * (canvasDimensions.width - 1)),
				y: Math.ceil(Math.random() * (canvasDimensions.width - 1)),
				color: "rgb(" + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ")",
				name: data.name,
				xIncr: 4,
				yIncr: 4,
				deaths: 0,
				kills: 0,
				health: 10,
				id: data.id,
				ammo: 10,
				rotation: 0,
				mouseX: data.mouseX,
				mouseY: data.mouseY,
				heartbeat: 5
			});
		}

	});

	//Receive Bullet
	socket.on("bullet", function(data){
		for(var y = characters.length - 1; y >= 0; y--){
			if(characters[y].id == data.owner){
				this.speed = 15;
			  this.dx = characters[y].mouseX - (characters[y].x + characterDimensions.width / 2);
			  this.dy = characters[y].mouseY - (characters[y].y + characterDimensions.height / 2);
			  this.mag = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
			  this.vx = (this.dx / this.mag) * this.speed;
			  this.vy = (this.dy / this.mag) * this.speed;
				this.x = (characters[y].x + characterDimensions.width / 2) + this.vx;
				this.y = (characters[y].y + characterDimensions.height / 2) + this.vy;
				bullets.push({
					x: this.x,
					y: this.y,
					xIncr: this.vx,
					yIncr: this.vy,
					damage: 2,
					owner: data.owner
				});
			}
		}
	})
})

var heartBeatTester = setInterval(function(){
	for(var x = characters.length - 1; x >= 0; x--){
		characters[x].heartbeat -= 1;
		if(characters[x].heartbeat <= 0){
			console.log(characters[x].name + " left the game!");
			characters.splice(x, 1);
		}
	}
}, 1000)
