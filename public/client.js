/* Start Things Going After the Scene is Loaded
 ——————————————————————————————————————————————*/
window.gameHasBegun = false;
document.querySelector('a-scene').addEventListener('loaded', function () {
 
  window.gameHasBegun = true;
  
  //var element = document.querySelector('#some-id');
  window.scene = document.querySelector('a-scene');
  var myAvatar = document.createElement('a-box');
  var player = document.querySelector('#player');
  player.appendChild(myAvatar);
  
  let playerData = {};
  let pos = player.getAttribute('position');
  pos.x = Number(pos.x.toFixed(2));
  pos.y = Number(pos.y.toFixed(2));
  pos.z = Number(pos.z.toFixed(2));
  playerData.position = pos;
  let rot = player.getAttribute('rotation');
  rot.x = Number(Number(rot.x).toFixed(1));
  rot.y = Number(Number(rot.y).toFixed(1));
  rot.z = Number(Number(rot.z).toFixed(1));
  playerData.rotation = rot;
  window.socket.initializePlayerData(playerData);
  
  window.otherPlayers = {};
  window.addOtherPlayer = newPlayerObject=>{
    console.log(`Adding new player with id: ${newPlayerObject.id}`)
    let p = document.createElement('a-box');
    p.id = newPlayerObject.id;
    p.setAttribute('position',newPlayerObject.data.position);
    p.setAttribute('rotation',newPlayerObject.data.rotation);
    p.setAttribute('scale','1.8 1.8 1.8');
    p.setAttribute('color', window.config.color);
    let face = document.createElement('a-plane');
    face.setAttribute('position','0 0 -0.51');
    face.setAttribute('rotation','0 180 0');
    face.setAttribute('src',window.config.face);
    p.appendChild(face);
    p.msg = document.createElement('a-entity');
    let test = 'I LOVE NODE.JS and SOCKET.IO!';
    p.msg.setAttribute('text',`value:${test};
                                   align:center;
                                   width:4;
                                   wrap-count:24; 
                                   color:black`);
    p.msg.setAttribute('position','0 1 -0.51');
    p.msg.setAttribute('rotation','0 180 0');
    p.appendChild(p.msg);
    window.scene.appendChild(p);
    window.otherPlayers[p.id]=p;
  }
  
  window.updateOtherPlayers = o=>{
    Object.keys(o).forEach(function(key,index) {
      if(key != player.id){
        if(window.otherPlayers[key]){
          let op = window.otherPlayers[key];
          op.setAttribute('position',o[key].position);
          op.setAttribute('rotation',o[key].rotation);
        }
      }
    });
  }
  
  window.removePlayer = id=>{
 window.otherPlayers[id].parentNode.removeChild(window.otherPlayers[id]);
    delete window.otherPlayers[id]; 
  }
  
  window.setPlayerMessage = data=>{
    if(window.otherPlayers[data.id]){
     window.otherPlayers[data.id].msg.setAttribute('text',`value:${data.msg};
    align:center;width:4;wrap-count:24;color:black`);
    }
  }
  
  var spotlight1 = document.querySelector('#spot-light-1');
  var spotlight2 = document.querySelector('#spot-light-2');
  var totalTime = 0;
  var totalSteps = 0;
  //GAME WORLD UPDATE FUNCTION
  function update(dt){
    spotlight1.object3D.rotateY(dt/400);
    spotlight2.object3D.rotateY(dt/800);
    totalTime += dt;
    totalSteps++;
    if(totalSteps%6 == 0) {
      let playerData = {};
      let pos = player.getAttribute('position');
      pos.x = Number(pos.x.toFixed(2));
      pos.y = Number(pos.y.toFixed(2));
      pos.z = Number(pos.z.toFixed(2));
      playerData.position = pos;
      let rot = player.getAttribute('rotation');
      rot.x = Number(Number(rot.x).toFixed(1));
      rot.y = Number(Number(rot.y).toFixed(1));
      rot.z = Number(Number(rot.z).toFixed(1));
      playerData.rotation = rot;
      if(window.socket.isInitialized)
        window.socket.setPlayerData(playerData);
      else
        window.socket.initializePlayerData(playerData);
      window.socket.sendUpdateToServer();
    }
    
  }
  //GAME LOOP
  var frameRate = 1000/60;
  var lastFrame = 0;
  var startTime = 0;
  var currentFrame;
  function gameLoop(time){  
    // time in ms accurate to 1 micro second 1/1,000,000th second
      currentFrame = Math.round((time - startTime) / frameRate);
      var deltaTime = (currentFrame - lastFrame) * frameRate;
      update(deltaTime);
      lastFrame = currentFrame;
      requestAnimationFrame(gameLoop);
    }
  window.requestAnimationFrame(gameLoop);
  

});