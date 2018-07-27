Aframe Multiplayer Chat
=======================

**How to Play**

Toggle music mute with **M** key. Play next song with **P** key. 

![UI](https://cdn.glitch.com/3294c4a3-a3d8-412f-a31e-1e03d1cd1cbd%2Fui.png?1532486353198)

Toggle the **Message and Face UI** with the **EQUALS** key. You must enter the proper **Message_KEY** to send a message. **Tab** your way through the UI elements. Once you have finished typing your message or selecting a new face, hit **ENTER** to submit.


Pressing the **F** key or clicking the **VR Headset Icon** will take you to fullscreen mode.  Note: in fullscreen mode only movement keys are enabled.  Press the **ESC** key to exit fullscreen mode. 

<a href="https://aframe-multiplayer-chat.glitch.me/" no-opener no-referer>**LIVE DEMO**</a>

**Remixing Instructions**

Set the **MESSAGE_KEY** in .env. Change the scene's environment preset in the **index.html.**  Create your own **.ply** models in <a href="https://ephtracy.github.io/" no-opener no-referer>**MagicaVoxel**</a> and add them to the scene in the **index.html**. 

In the **client-config.js** set the values for:
  - avatar array of face image URLs ( use .png with transparent background )
  - avatar color 
  - sound file URL for playerJoined
  - sound file URL for playerLeft
  - BGM songs
  - custom key bindings/behaviors

![App Screens](https://cdn.glitch.com/3294c4a3-a3d8-412f-a31e-1e03d1cd1cbd%2Ffaces.png?1532450183268)

**Environment Presets**

![Environment GIF](https://github.com/feiss/aframe-environment-component/raw/master/assets/aframeenvironment.gif?raw=true)

**Credits**
Special thanks to <a href="https://twitter.com/donrmccurdy" no-opener no-referer>@donrmccurdy</a> ,<a href="https://twitter.com/feiss" no=opener no-referer>@feiss</a> , and <a href="https://twitter.com/superhoge" no-opener no-referer>@superhoge</a>.
