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

var canvasDimensions = {
	height: 800,
	width: 800
}

var characterDimensions = {
	height: 25,
	width: 15
}

//loop that runs 60 times a second
var loop = setInterval(function(){
	io.sockets.emit("positions", {characters: characters, bullets: bullets});
}, 1000/60);

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
