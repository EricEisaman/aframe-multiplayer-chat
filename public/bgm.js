  var songs = window.config.songs;
  var currentSongIndex = 0;
  
  var bgm = document.createElement('audio');
  var bgmUrlStart = 'https://api.soundcloud.com/tracks/';
  var bgmUrlEnd = '/stream?client_id=b9d11449cd4c64d461b8b5c30650cd06';
  bgm.src = bgmUrlStart +songs[0]+ bgmUrlEnd;
  bgm.crossorigin = 'anonymous';
  bgm.autoplay = 'autoplay';
  bgm.loop = true;
  bgm.volume = 0.05;
  document.body.appendChild(bgm);

 
  var nextSongBtn = document.createElement('button');
  nextSongBtn.innerHTML = "PLAY NEXT SONG";
  nextSongBtn.zIndex = 100;
  nextSongBtn.addEventListener('click',e=>{
    playNextSong();
  });
  let ui = document.createElement('div');
  ui.style.margin = '0 auto';
  ui.style.width = '800px';
  setTimeout(()=>{
   document.body.appendChild(ui);
   ui.appendChild(nextSongBtn);
  },5000);

  
  function playNextSong(){
    currentSongIndex++;
    if(currentSongIndex == songs.length) currentSongIndex = 0;
    bgm.src = bgmUrlStart + songs[currentSongIndex] + bgmUrlEnd;
    bgm.crossorigin = 'anonymous';
    bgm.autoplay = 'autoplay';
    bgm.load();
    bgm.loop = true;
    bgm.volume = 0.05;
  }

document.body.addEventListener('keyup',e=>{
   if(window.dialog.isShowing)return;
   switch(e.code){
     case window.config.keys.nextSong: playNextSong();
       break;
     case window.config.keys.toggleMute: 
       if(bgm.volume > 0){
          bgm.volume = 0.00;
       }else{
          bgm.volume = 0.05;
       }
   }
});




