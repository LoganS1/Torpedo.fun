var express = require("express"),
	app 	= express(),
	server 	= require("http").Server(app),
	io 		= require("socket.io")(server);

server.listen(3000, function(){
	console.log("The Server has started!")
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
})

app.use(express.static('public'))

var characters = [];
var bullets = [];

io.on("connection", function(socket){
	socket.emit("connection", {successfully: "connected!"});
	console.log("Someone has connected!");
	socket.on("character", function(data){
		for(var i = 0; i < characters.length; i++){
			if(characters[i].character.id === data.character.id){
				characters.splice(i, 1);
			}
		}
		characters.push(data);
		socket.emit("serverCharacters", {data: characters});
	})
	socket.on("newBullet", function(bullet){
		bullets.push(bullet);
		// for(var x = bullets.length - 1; x >= 0; x--){
		// 	if(Math.abs(bullets[x].bullet.x) > 2000 || Math.abs(bullets[x].y) > 2000){
		// 		bullets[x].splice(x, 0);
		// 	}
		// }
		io.sockets.emit("bullets", {"bullets": bullet});
	})
	socket.on("death", function(name){

		var id = name.id;
		var owner = name.owner;
		io.sockets.emit("death", {name: id, owner: owner});
		for(var x = characters.length - 1; x >= 0; x--){
			var ch = characters[x];
			if(ch.id === id){
				characters.splice(x, 1);
			}
		}
	})
	socket.on("healthBubble", function(data){
		io.sockets.emit("healthBubble", data);
	});
	socket.on("ammoBubble", function(data){
		io.sockets.emit("ammoBubble", data);
	});
	socket.on(" speedBubble", function(data){
		io.sockets.emit("speedBubble", data);
	});
})

var characterRemoval = setInterval(function(){
	characters = [];
}, 60000)
