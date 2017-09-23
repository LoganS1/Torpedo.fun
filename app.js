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
	height: 25,
	width: 15
}

//loop that sends out positions 60 times a second
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
