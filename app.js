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
		console.log("new Bullet!");
		console.log(bullets);
		bullets.push(bullet);
		// for(var x = bullets.length; x > 0; x--){
		// 	if(Math.abs(bullets[x].bullet.x) > 2000 || Math.abs(bullets[x].y) > 2000){
		// 		bullets[x].splice(x, 0);
		// 	}
		// }
		console.log("sending bullets array");
		socket.emit("bullets", {"bullets": bullets});
	})
})
