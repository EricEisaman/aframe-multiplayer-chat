window.dialog = {
  init:()=>{
    window.dialog.button = document.getElementById('submit-message');
    window.dialog.submit =()=>{
      let msg = document.getElementById('msg').value;
      let key = document.getElementById('key').value;
      document.getElementById('msg').value = '';
      if(window.socket.isInitialized) window.socket.emit('msg',{key:key,msg:msg});
    }
    window.dialog.ui = document.getElementById('dialog');
    window.dialog.isShowing = false;
    document.body.addEventListener('keydown',function(e){
      if(e.code == window.config.keys.toggleUI ){
        if(window.dialog.isShowing){
          window.dialog.ui.close();
          window.dialog.isShowing = false;
          if(window.config.releasePointerLockOnUI){
            let c = document.getElementsByTagName('canvas')[0];
            c.requestPointerLock();
          }
        }else if(typeof window.setPlayerProperty != "undefined"){
          e.preventDefault();
          document.getElementById('msg').value = '';
          window.dialog.ui.show();
          window.dialog.isShowing = true;
          if(window.config.releasePointerLockOnUI){
            document.exitPointerLock = document.exitPointerLock    ||
                                     document.mozExitPointerLock;
            // Attempt to unlock
            document.exitPointerLock();
          }
        }
      }else if(e.keyCode == 13 && window.dialog.isShowing 
               && document.getElementById('msg').value.length > 0 
               && document.getElementById('key').value.length > 0){
        window.dialog.submit();
        window.dialog.ui.close();
        window.dialog.isShowing = false;
        if(window.config.releasePointerLockOnUI){
          let c = document.getElementsByTagName('canvas')[0];
          c.requestPointerLock();
        }
        
      }
      
    });
    window.config.avatar.faces.forEach((url,index)=>{
      let btns = document.getElementById('btns');
      let btn = document.createElement('button');
      btn.classList = "face-btn";
      btn.style.backgroundColor = window.config.avatar.color;
      btn.innerHTML = '<img width=40 src="'+url+'" />';
      btn.id = index;
      btn.onclick = ()=>{
       window.setPlayerProperty('faceIndex',index);
       window.dialog.submit();
       window.dialog.ui.close();
       window.dialog.isShowing = false;
      }
      btns.appendChild(btn);
    });
  }
}
window.dialog.init();

  
  
  
  

