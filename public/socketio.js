  var socket = io.connect();

  socket.on("connection", function(data){
    console.log(data);
  })

  socket.on("bullets", function(data){
    this.bullet = data.bullets.bullet;
    this.bullet = new Bullet(this.bullet.x, this.bullet.y, this.bullet.vx, this.bullet.vy, this.bullet.owner);
    bulletsArray.push(this.bullet);
  })

  socket.on("serverCharacters", function(data){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    charactersArray = data.data;
    for(var i = data.data.length - 1; i >= 0; i--){
      drawCharacter(data.data[i].character);
    }
  })

  socket.on("death", function(data){
    console.log("Recieved Death");
    var id = data.name;
    var owner = data.owner;
    if(me.id === owner){
      me.kills += 1;
    }
    for(var x = charactersArray.length - 1; x >= 0; x--){
      if(charactersArray[x].id === id){
        charactersArray.splice(x, 1);
      }
      if(me.id === id){
        me.x = 0;
        me.y = 0;
      }
    }
  })

  socket.on("healthBubble", function(data){
    console.log(data);
    healthBubbles = data.data;
  })
