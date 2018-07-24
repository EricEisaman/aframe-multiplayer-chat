module.exports = (io)=>{
    var players = {};
    let intervalId = setInterval(()=>{
          io.emit('update-players',players);
        },200);
    io.on('connection', function(socket){
        socket.ip = socket.handshake.headers['x-forwarded-for'];
        socket.ip = socket.ip.split(',')[0].replace(/\./g, "_");
        console.log(`New member has connected with socket id: ${socket.id} and ip: ${socket.ip}`);
        socket.on('new-player',function(shared_state_data){ 
          console.log('sending players already here');
          console.log(players);
          socket.emit('players-already-here',players);
          console.log("New player has state:",shared_state_data);
          // Add the new player to the object
          players[socket.id] = shared_state_data;
          let id = socket.id;
          io.emit('new-player',{"id":id, "data":shared_state_data});
        })
        socket.on('disconnect',function(){
          // Delete from object on disconnect
          console.log(`Player disconnected. Removing ${socket.id}`);
          delete players[socket.id]; 
          socket.broadcast.emit('remove-player',socket.id);
        })
        // Online players' shared data throughput
        socket.on('send-update',function(data){
          if(players[socket.id] == null) return;
          players[socket.id].position = data.position; 
          players[socket.id].rotation = data.rotation;
          players[socket.id].faceIndex = data.faceIndex;
          //console.log(data);
        }) 
        socket.on('msg',function(data){
          if(data.key == process.env.MESSAGE_KEY){
            socket.broadcast.emit('msg',{id:socket.id,msg:data.msg});
          }
        });
     })
  }
  