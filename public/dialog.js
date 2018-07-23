window.dialog = {
  init:()=>{
    window.dialog.button = document.getElementById('submit-message');
    window.dialog.button.addEventListener('click',()=>{
      let msg = document.getElementById('msg').value;
      let key = document.getElementById('key').value;
      document.getElementById('msg').value = '';
      if(window.socket.isInitialized) window.socket.emit('msg',{key:key,msg:msg});
    });
    window.dialog.ui = document.getElementById('dialog');
    window.dialog.isShowing = false;
    document.body.addEventListener('keydown',function(e){
      if(e.keyCode == 187 ){
        if(window.dialog.isShowing){
          window.dialog.ui.close();
          window.dialog.isShowing = false;
        }else{
          e.preventDefault();
          document.getElementById('msg').value = '';
          window.dialog.ui.show();
          window.dialog.isShowing = true;
        }
      }else if(e.keyCode == 13 && window.dialog.isShowing && document.getElementById('msg').value.length > 0){
        window.dialog.button.click();
        window.dialog.ui.close();
        window.dialog.isShowing = false;
      }
      
    });
  }
}
window.dialog.init();

  
  
  
  

