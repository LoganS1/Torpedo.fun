//Getting packages
var express = require("express"),
	app 	= express(),
	server 	= require("http").Server(app),
	io 		= require("socket.io")(server);

//setting up server to listen
server.listen(80, function(){
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
var AmtOfSectionsAcross = 3;

//setting up the canvas size to be used in math
var canvasDimensions = {
	height: 800,
	width: 800
}

//setting up the character size to be used in math
var characterDimensions = {
	height: 15,
	width: 25
}

//loop that updates and sends out positions
var loop = setInterval(function(){
	//updating entities
	updateCharacters();
	updateBullets();
	updateBubbles();
	//collision detections
	characterCollisionDetection();
	bubbleCollisionDetection();
	bulletCollisionDetection();
	//updating console with server info
	updateConsole();
	//removing characters if they have been shot
	removeTheDead();

}, 1000/60);

//fps object that can be used to get fps
var fps = {	startTime : 0,	frameNumber : 0,	getFPS : function(){		this.frameNumber++;		var d = new Date().getTime(),
			currentTime = ( d - this.startTime ) / 1000,			result = Math.floor( ( this.frameNumber / currentTime ) );
			if( currentTime > 1 ){			this.startTime = new Date().getTime();			this.frameNumber = 0;		}		return result;	}	};

//updating the console with server info (FPS, Amt of Players, and Player Names)
function updateConsole(){
	console.log("FPS: " + fps.getFPS() + "\nPlayers Connected: " + characters.length + "\n" + createPlayerList());
}

//creates the player list to be used in updateConsole();
function createPlayerList(){
	this.toReturn = "";
	for(var y = characters.length - 1; y >= 0; y--){
		this.toReturn += ((y + 1) + ". "+ characters[y].name + "\n");
	}
	return this.toReturn;
}

/*----------Characters----------*/
function updateCharacters(){

	//update position
	for(var x = characters.length - 1; x >= 0; x--){
		this.currChar = characters[x];

		//checks if character is above the sea level and refills oxygen if so
		if(this.currChar.y <= 100 && this.currChar.timers.oxygen < this.currChar.max.oxygen){
			this.currChar.timers.oxygen += 1;
		}

		//"physics" for above water causing the character to fall back down
		if(this.currChar.y <= 100){
			if(this.currChar.y - this.currChar.mouseY < 25 && this.currChar.downV < 4){
				this.currChar.downV = 4;
			}
			this.currChar.downV += .1;
		}else{
			this.currChar.downV = 0;
		}

		//tests to see if character has oxygen before updating position
		if(this.currChar.noOxygen){
			//if character has no oxygen simple raise the character up
			this.currChar.y -= 3;
			this.noOxygenXSpeed = 0.5;
			this.noOxygenYSpeed = 0;
		}else{
			this.noOxygenXSpeed = 1;
			this.noOxygenYSpeed = 1;
		}
		//if the character does have oxygen
		//Boundaries
		//keeps the characters in the playable area.
		if(this.currChar.x > canvasDimensions.width * AmtOfSectionsAcross - characterDimensions.width){
			this.currChar.x = canvasDimensions.width * AmtOfSectionsAcross - characterDimensions.width;
		}

		if(this.currChar.x < characterDimensions.width){
			this.currChar.x = characterDimensions.width;
		}

		if(this.currChar.y > canvasDimensions.height * AmtOfSectionsAcross - characterDimensions.height){
			this.currChar.y = canvasDimensions.height * AmtOfSectionsAcross - characterDimensions.height;
		}

		if(this.currChar.y < characterDimensions.height){
			this.currChar.y = characterDimensions.height;
		}

		//movement
		//moves the player to the mouse cordinates.
		//updating x cordinates
		if(this.currChar.x - 25 < this.currChar.mouseX){
      this.currChar.x += this.currChar.speed * this.noOxygenXSpeed;
    }
    if(this.currChar.x + 50 > this.currChar.mouseX){
      this.currChar.x -= this.currChar.speed * this.noOxygenXSpeed;
    }

	    //updating y cordinates
		this.currChar.y += this.currChar.downV;
		if(this.currChar.y - 25 < this.currChar.mouseY){
      this.currChar.y += this.currChar.speed * this.noOxygenYSpeed;
    }
    if(this.currChar.y + 50 > this.currChar.mouseY){
      this.currChar.y -= this.currChar.speed * this.noOxygenYSpeed;
    }

    this.currChar.rotation = Math.atan2((this.currChar.y + characterDimensions.height / 2) - this.currChar.mouseY,
		//calculates the rotation of the player based on players and mouses cordinates
    	(this.currChar.x + characterDimensions.width / 2) - this.currChar.mouseX);

		//update section
		//calculates what section the character is in (used in rendering on canvas)

		//checking if character is in right sections
		//ex rb = right bottom, mm = middle middle, lt = left top
		/*
		|-----------------------|
		|		|		|		|
		|(0, 0)	|(1, 0)	|(2, 0)	|
		|-------|-------|-------|
		|		|		|		|
		|(0, 1)	|(1, 1)	|(2, 1)	|
		|-------|-------|-------|
		|		|		|		|
		|(0, 2)	|(1, 2)	|(2, 2)	|
		|-------|-------|-------|
		*/
		if(this.currChar.x > canvasDimensions.width*2){
			this.currChar.section.x = 2;
		  if(this.currChar.y > canvasDimensions.height*2){
		    //rb section
				this.currChar.section.y = 2;
		  }else if(this.currChar.y > canvasDimensions.height){
		    //rm section
				this.currChar.section.y = 1;
		  }else{
		    //rt section
				this.currChar.section.y = 0;
		  }
		}

		//checking if character is in middle sections
		else if(this.currChar.x > canvasDimensions.width){
			this.currChar.section.x = 1;
		  if(this.currChar.y > canvasDimensions.height*2){
		    //mb section
				this.currChar.section.y = 2;
		  }else if(this.currChar.y > canvasDimensions.height){
		    //mm section
				this.currChar.section.y = 1;
		  }else{
		    //mt section
				this.currChar.section.y = 0;
		  }
		}

		//checking if character is in left sections
		else{
			this.currChar.section.x = 0;
		  if(this.currChar.y > canvasDimensions.height*2){
		    //lb section
				this.currChar.section.y = 2;
		  }else if(this.currChar.y > canvasDimensions.height){
		    //lm section
				this.currChar.section.y = 1;
		  }else{
		    //lt section
				this.currChar.section.y = 0;
		  }
		}
	}
}

//creates a new character when a client joins
function newCharacter(data, socket){
	characters.push({
		x: Math.ceil(Math.random() * (canvasDimensions.width - 50)) * AmtOfSectionsAcross,
		y: Math.ceil(Math.random() * (canvasDimensions.height - 50)) * AmtOfSectionsAcross,
		color: "rgb(" + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ", " + Math.ceil(Math.random()*254) + ")",
		name: data.name,
		deaths: 0,
		kills: 0,
		health: 10,
		id: socket.id,
		deathID: makeID(),
		ammo: 10,
		rotation: 0,
		mouseX: data.mouseX,
		mouseY: data.mouseY,
		heartbeat: 5,
		damage: 2,
		//how many x/y cordinates can a character move per frame
		speed: 4,
		died: false,
		scrap: 0,
		section: {
			x: 1,
			y: 1
		},
		//amt of time a character has the ability left
		timers: {
			speed: 0,
			damage: 0,
			oxygen: 10
		},
		//max amt of ability a character can have
		max: {
			health: 10,
			ammo: 10,
			oxygen: 10
		}
	});
}

function characterCollisionDetection(){
	//todo - damage and repel players when hitting eachother
}

/*----------Bubbles----------*/
var createBubblesCount = 0;

var bubbleAmounts = {
	health: 0,
	ammo: 0,
	speed: 0,
	oxygen: 0,
	scrap: 0
};

//sets an interval that creates creates bubbles based on time
//because the interval runs every second and the time is kept with a variable
// (createBubblesCount)
var createBubbles = setInterval(function(){
	//if the time / 20 give a whole number run
	if(createBubblesCount % 20 === 0){
		//if their is less than 9 of these bubbles run
		if(bubbleAmounts.health < 9){
			//update the amt of bubbles
			bubbleAmounts.health += 1;
			//actually create the bubble
			createBubble("health");
		}
	}
	if(createBubblesCount % 5 === 0){
		if(bubbleAmounts.scrap < 27){
			bubbleAmounts.scrap += 1;
			createBubble("scrap", false);
		}
	}
	if(createBubblesCount % 5 === 0){
		if(bubbleAmounts.ammo < 18){
			bubbleAmounts.ammo += 1;
			createBubble("ammo");
		}
	}
	if(createBubblesCount % 10 === 0){
		if(bubbleAmounts.speed < 5){
			bubbleAmounts.speed += 1;
			createBubble("speed");
		}
	}
	if(createBubblesCount % 2 === 0){
		if(bubbleAmounts.oxygen < 100){
			bubbleAmounts.oxygen += 1;
			createBubble("oxygen");
		}
	}

	//counter updating
	createBubblesCount += 0.5;
	if(createBubblesCount > 30){
		createBubblesCount = 0;
	}

}, 500);

//sets an interval the lowers the "timers" of abilities on each character
//also applies consequences of the timers
var updateCharacterStatusTimers = setInterval(function(){
	for(var x = characters.length - 1; x >= 0; x--){
		if(characters[x].timers.speed <= 0){
			characters[x].speed = 4;
		}else{
			characters[x].speed = 8;
			characters[x].timers.speed -= 1;
		}

		if(characters[x].timers.oxygen <= 0){
			characters[x].noOxygen = true;
		}else{
			characters[x].noOxygen = false;
			characters[x].timers.oxygen -= 1;
		}
	}
}, 1000)

//function used to create the bubble
function createBubble(status, useXY, x, y){
	//add bubble max limit checking here
	this.newBubble = {
		x : Math.ceil(Math.random()* (canvasDimensions.width*AmtOfSectionsAcross - 100)) + 50, //creates an x cordinate that is 50 places away from a wall.
		y : Math.ceil(Math.random()* (canvasDimensions.height*AmtOfSectionsAcross - 100)) + 50, //creates an y cordinate that is 50 places away from a wall.
		status: status,
		size: 10,
		up: false
	}
	//scrap is created like bubbles but need more info
	if(status === "scrap"){
		if(useXY){
			this.newBubble.x = x + Math.random()*20;
			this.newBubble.y = y + Math.random()*20;
		}
	}

	if(status === "oxygen"){
		this.newBubble.y = canvasDimensions.height*AmtOfSectionsAcross;
	}

	//add the newly created bubble to the bubbles array
	bubbles.push(this.newBubble);
}

//tests to see if a character is hitting the bubble
function bubbleCollisionDetection(){
	for(var x = characters.length - 1; x >= 0; x--){
		for(var i = bubbles.length - 1; i >= 0; i--){
			this.char = characters[x];
			this.bubble = bubbles[i];
			//running through arrays comparing each bubble to each character
			if(this.bubble.x + this.bubble.size >= this.char.x && this.bubble.x - this.bubble.size <= this.char.x + characterDimensions.width
				&& this.bubble.y + this.bubble.size >= this.char.y && this.bubble.y - this.bubble.size <= this.char.y + characterDimensions.height){
				//when a bubbele is found inside a character
				switch(this.bubble.status){
					case "speed": this.char.timers.speed += 5;
						bubbleAmounts.speed -= 1;
						break;
					case "scrap": this.char.scrap += 1;
						bubbleAmounts.scrap -= 1;
						break;
					case "ammo": this.char.ammo += 10;
						if(this.char.ammo > this.char.max.ammo){
							this.char.ammo = this.char.max.ammo;
						}
						bubbleAmounts.ammo -= 1;
						break;
					case "oxygen": this.char.timers.oxygen += 10;
						if(this.char.timers.oxygen > this.char.max.oxygen){
							this.char.timers.oxygen = this.char.max.oxygen;
						}
						bubbleAmounts.oxygen -= 1;
						break;
					case "health": this.char.health += 5;
						if(this.char.health > this.char.max.health){
							this.char.health = this.char.max.health;
						}
						bubbleAmounts.health -= 1;
						break;
				}
				//removes hit bubble
				bubbles.splice(i, 1);
			}
		}
	}
}

function updateBubbles(){
	for(var y = bubbles.length - 1; y >= 0; y--){
		if(bubbles[y].status === "oxygen"){
			bubbles[y].y -= 2;
			if(Math.ceil(Math.random()*2) === 1){
				bubbles[y].x += 1;
			}else{
				bubbles[y].x -= 1;
			}

			if(bubbles[y].y <= 100){
				bubbles.splice(y, 1);
			}
		}
	}
}

/*----------Bullets----------*/
//updates the bullets position
function updateBullets(){
	for(var x = bullets.length - 1; x >= 0; x--){
		bullets[x].x += bullets[x].xIncr;
		bullets[x].y += bullets[x].yIncr;
		if(bullets[x].x > 5000 || bullets[x].x < -5000 || bullets[x].y > 5000 || bullets[x].y < -5000){
		//checks to see if bullet is out of bounds and deletes if so
			bullets.splice(x, 1);
		}
	}
}

//detects if a bullets is hitting a player
function bulletCollisionDetection(){
	for(var x = characters.length - 1; x >= 0; x--){
		for(var i = bullets.length - 1; i >= 0; i--){
			this.char = characters[x];
			this.bull = bullets[i];

			//running through arrays comparing each bullet to each character
			if(this.bull.x + this.bull.size >= this.char.x && this.bull.x - this.bull.size <= this.char.x + characterDimensions.width
				&& this.bull.y + this.bull.size >= this.char.y && this.bull.y - this.bull.size <= this.char.y + characterDimensions.height){
				//when a bullet is found inside a character

				//decrease that players health
				this.char.health -= this.bull.damage;

				//test if player is dead
				if(checkDeath(this.char.id)){
					for(var y = characters.length - 1; y >= 0; y--){
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

function checkDeath(id){
  for(var y = characters.length - 1; y >= 0; y--){
    if(characters[y].id === id){
      if(this.char.health <= 0){
        //tests to see if character has at least one scrap, if not drop 1 scrap
        if(this.char.scrap > 0){
          //drop all scrap the character had
          for(var y = this.char.scrap; y >= 0; y--){
            createBubble("scrap", true, this.char.x, this.char.y);
          }
        }else{
          createBubble("scrap", true, this.char.x, this.char.y);
        }
        //sends death to all players
        io.sockets.emit("death", {deathID: this.char.deathID});
        //remove dead player
         this.char.died = true;
				 return true;
      }
    }
  }
}


/*----------Socket.io----------*/
//socket.io connections
io.on("connection", function(socket){
	socket.emit("connection", {connection: "successful"});

	//send data
	this.sendData = setInterval(function(){
		//emiting the data 60 times a second

		//clones the arrays, cannot just set equal as updating cleanedCharacter/Bullets would still
		//update the original due to how JS handles cloning. (Just makes references)
		this.cleanedCharacters = JSON.parse(JSON.stringify(characters));
		this.cleanedBullets = JSON.parse(JSON.stringify(bullets));

		//cleaning characters array
		for(var x = this.cleanedCharacters.length - 1; x >= 0; x--){
			//checks if character is me, if so leave in most info
			if(this.cleanedCharacters[x].id != socket.id){
				this.cleanedCharacters[x].id = "n/a";
				this.cleanedCharacters[x].heartbeat = "n/a";
				this.cleanedCharacters[x].deathID = "n/a";
			}else{
				this.cleanedCharacters[x].heartbeat = "n/a";
			}

		}

		//cleaning bullets array
		for(var x = this.cleanedBullets.length - 1; x >= 0; x--){
			this.cleanedBullets[x].owner = "n/a";
		}

		socket.emit("data", {characters: this.cleanedCharacters, bullets: this.cleanedBullets,
			bubbles: bubbles, characterDimensions: characterDimensions,
			AmtOfSectionsAcross: AmtOfSectionsAcross
		})
	}, 1000/60)

	//Receive Data
	//updates characters information based on received data
	socket.on("data", function(data){
		this.found = false;
		//checks to see if the player is a new player
		for(var x = characters.length - 1; x >= 0; x--){
			if(characters[x].id == socket.id){
				characters[x].mouseX = data.mouseX;
				characters[x].mouseY = data.mouseY;
				characters[x].heartbeat = 5;
				this.found = true;
			}
		}
		if(!this.found){
			if(data.name === "" || data.name.length > 12){
				data.name = "torpedoed.fun";
				socket.emit("uh-oh", {error: "Username null or too long, setting default username..."});
			}
			newCharacter(data, socket);
		}

	});

	//Receive Bullet
	socket.on("bullet", function(data){
		for(var y = characters.length - 1; y >= 0; y--){
			if(characters[y].id == data.owner){
				if(characters[y].ammo >= 1){
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
						damage: characters[y].damage,
						owner: data.owner,
						size: 5
					});
					characters[y].ammo -= 1;
				}
			}
		}
	})
	socket.on("upgrade", function(data){
		for(var y = characters.length - 1; y >= 0; y--){
			if(characters[y].id === socket.id){
				//makes sure the status actually exists
				if(data.status === "health" || data.status === "oxygen" || data.status === "ammo"){
					//sets the cost
					this.cost = characters[y].max[data.status] / 2;
					//checks if character has correct amt of scrap
					if(characters[y].scrap >= this.cost){
						characters[y].scrap -= this.cost;
						characters[y].max[data.status] += 5;
					}else{
						socket.emit("uh-oh", {error: "Not enough scrap!"});
					}
				}

			}
		}
	})
})

//runs through and checks if characters need removed based on inactivity
//every character has a "heartbeat" # that decreases every second.
//if that # is at or below zero it is removed
var heartBeatTester = setInterval(function(){
	for(var x = characters.length - 1; x >= 0; x--){
		characters[x].heartbeat -= 1;
		if(characters[x].heartbeat <= 0){
			characters.splice(x, 1);
		}
	}
}, 1000)

//removes the characters that have their "dead" attribute set to true
function removeTheDead(){
	for(var y = characters.length - 1; y >= 0; y--){
		if(characters[y].died){
			characters.splice(y, 1);
		}
	}
}

//creates an id by making a random id and checking to see if it already in use,
//if it is it runs itself again (recursive)
function makeID(){
	this.id = Math.random()*20398475023;
	for(var x = characters.length - 1; x >= 0; x--){
		if(characters[x].deathID === this.id){
			return makeID();
		}else{
			return this.id;
		}
	}
}
