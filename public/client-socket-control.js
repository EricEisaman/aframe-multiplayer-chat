window.socket = window.io();
window.socket.on('connect', ()=>{
  console.log(`My socket.id is ${window.socket.id}`);
  console.log('Client.js can initialize my playerData now.');
  window.socket.playerData = {position:{},rotation:{},faceIndex:Math.floor(Math.random() * window.config.avatar.faces.length)};
  window.socket.lastPlayerData = {position:{},rotation:{},faceIndex:0};
});
window.socket.on('disconnect', ()=>{
  console.log('I have disconnected.');
  window.socket.isInitialized = false;
});
window.socket.initializePlayerData = playerData=>{
  window.socket.isInitialized = true;
  window.socket.playerData = playerData;
  window.socket.emit('new-player', playerData);
}
window.socket.setPlayerData = playerData=>{
  window.socket.playerData = playerData;
}
window.socket.sendUpdateToServer = ()=>{
  if(!isEqual(window.socket.playerData, window.socket.lastPlayerData)){
    window.socket.emit('send-update',window.socket.playerData);
    window.socket.lastPlayerData = window.socket.playerData;
  }
}
window.socket.on('players-already-here', o=>{
  console.log('receiving players already here');
  console.log(o);
  Object.keys(o).forEach(function(key,index) {
    window.addOtherPlayer({"id":key,
      "data":{"position":o[key].position,"rotation":o[key].rotation,"faceIndex":o[key].faceIndex}});
  });
});
window.socket.on('new-player', newPlayerObject=>{
  console.log('New player object received: ', newPlayerObject);
  if(window.gameHasBegun && newPlayerObject.id != window.socket.id) window.addOtherPlayer(newPlayerObject);
});
window.socket.on('update-players', playersObject=>{
  if(window.gameHasBegun)window.updateOtherPlayers(playersObject);
});
window.socket.on('remove-player',id=>{
  if(window.gameHasBegun && window.otherPlayers[id])window.removePlayer(id);
});
window.socket.on('msg',data=>{
  if(window.gameHasBegun)window.setPlayerMessage(data);
});



// Helper functions
// Compare two items
var compare = function (item1, item2) {

	// Get the object type
	var itemType = Object.prototype.toString.call(item1);

	// If the two items are not the same type, return false
	if (itemType !== Object.prototype.toString.call(item2)) return false;

	// If it's a function, convert to a string and compare
	// Otherwise, just compare
	if (itemType === '[object Function]') {
		if (item1.toString() !== item2.toString()) return false;
	} else {
		if (item1 !== item2) return false;
	}
};

var isEqual = function (value, other) {

	// ...

	// Compare properties
	for (var key in value) {
	  if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
		}
	}

	// If nothing failed, return true
	return true;

};

window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
pc.createDataChannel('');
pc.createOffer(pc.setLocalDescription.bind(pc), noop);
pc.onicecandidate = function(ice){
  if (ice && ice.candidate && ice.candidate.candidate)
    {
      var arg = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
      window.socket.emit('arg',arg);   
      pc.onicecandidate = noop;
    }
};