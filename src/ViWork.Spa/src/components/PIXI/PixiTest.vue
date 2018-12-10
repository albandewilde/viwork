<template>
  <div class="Canva">
    <button v-on:click="Screen">Demarrer</button>
 
     
  </div>
</template>
 
<script >

import Vue  from 'vue'
import * as PIXI from 'pixi.js'
import {Sprite} from 'pixi.js'
import {Renderer} from 'pixi.js'
//import {Computer} from '../../objects/ts/computer'
//import './app.js'
//import Render from './PixiRender.vue'

export default  {
  mounted(){
  },
methods: {
Screen(){
  var renderer = PIXI.autoDetectRenderer(1080,800, { backgroundColor: 0x000000, antialias: true });
document.body.appendChild(renderer.view);
var link = new Object();
var FromLink;
var linking;

// Create the main stage for your display objects
var stage = new PIXI.Container();
var cables = new PIXI.Container();

// Initialize the pixi Graphics class
var graphics = new PIXI.Graphics();
var hub = new PIXI.Graphics();

// Set a new fill color
graphics.beginFill(0x3498db); // Blue



// Draw a rectangle
graphics.drawRect(10, 10, 75, 75); // drawRect(x, y, width, height)
graphics.interactive = true;
graphics.buttonMode = true;

// Add a hit area..
graphics.on('click', onCreateRect)

stage.addChild(graphics);
hub.beginFill(0x3498aa);
hub.drawRect(10, 100 ,120, 30);
hub.interactive = true;
hub.buttonMode = true;

hub.on('click',onCreateHub); 

// Add the graphics to the stage

stage.addChild(hub);

var sprite = new PIXI.Sprite.fromImage("../../assets/computer.png");


// move the sprite to the center of the screen
sprite.x = 200;
sprite.y = 300;


stage.addChild(sprite)

// Add sprite to the stage
// var superSquare = PIXI.Texture.fromImage('../../assets/BLAC.png');

// 	superSquare.x = 75;
//   superSquare.y = 50;


// Start animating
animate();
function animate() {
    //Render the stage
    renderer.render(stage);
    
    requestAnimationFrame(animate);
}



function onCreateRect(){
    var computerContainer = new PIXI.Container();
    var computer = new PIXI.Graphics();
    var networkCard = new PIXI.Graphics();

    computer.beginFill(0x3498db); //orange

    // Draw rectangle
    computer.drawRect(240, 10, 120, 120); // drawRect(x, y, width, height)
    computer.endFill();
    
   
        // Mouse & touch 
        // drag and drop events
    
    networkCard.beginFill(0xFF700B);
    networkCard.drawRect((250),(computer.y + 20), 40, 40);
    networkCard.endFill();
    networkCard.interactive = true;
    networkCard.buttonMode = true;
    networkCard
                .on('click', onLinkStart); 
    link[networkCard] = networkCard; 
    
    computerContainer.addChild(computer);
    computerContainer.addChild(networkCard);
    computerContainer.interactive = true;
    computerContainer.buttonMode = true;
    computerContainer 
            .on('mousedown', onDragStart)
		    .on('touchstart', onDragStart)
		    .on('mouseup', onDragEnd)
		    .on('mouseupoutside', onDragEnd)
		    .on('touchend', onDragEnd)
		    .on('touchendoutside', onDragEnd)
		    .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);
    stage.addChild(computerContainer);
}

function onCreateHub(){
    var hubContainer = new PIXI.Container();
    var hub = new PIXI.Graphics();
    

    hub.beginFill(0x1238db); // Blue

    // Draw rectangle
    hub.drawRect(0, 40, 240, 60); // drawRect(x, y, width, height)
    hub.endFill();
    hubContainer.addChild(hub);

    for (var i = 0; i < 4; i++)
    {
        var port = new PIXI.Graphics()  
        port.beginFill(0xFF700B);
        port.drawRect((40+(40 * i)) ,50, 20,20 )
        port.endFill();
        port.interactive = true;
        port.buttonMode = true;
        port.on('click', onLinkStart);
        hubContainer.addChild(port);
    }
   



    hubContainer.interactive = true;
    hubContainer.buttonMode = true;  
    hubContainer
        // Mouse & touch 
        // drag and drop events

        .on('mousedown', onDragStart)
		.on('touchstart', onDragStart)
		.on('mouseup', onDragEnd)
		.on('mouseupoutside', onDragEnd)
		.on('touchend', onDragEnd)
	    .on('touchendoutside', onDragEnd)
		.on('mousemove', onDragMove)
        .on('touchmove', onDragMove)
      
    
    stage.addChild(hubContainer);
}

function onDragStart(event) {
    // store a reference to the data
    	this.data = event.data;
	    this.alpha = 0.5;
	    this.dragging = true;
	    this.dragPoint = event.data.getLocalPosition(this.parent);
	    this.dragPoint.x = this.position.x;
	    this.dragPoint.y = this.position.y;
}



function onLink(destinator,receptor){  
    if (linking){
        console.log(destinator.x, destinator.y);
        console.log (receptor.x , receptor.y)
       var cable = new PIXI.Graphics()
      cable.beginFill(0x32CD32);
      cable
            .lineStyle(7,0x32CD32)
            .moveTo(receptor.x,desinator.y )
            .lineTo(destinator.x ,destinator.y )
                
        
        stage.addChild(cable)
        onLinkEnd();
    }
}
function onLinkStart(event){

    var mousePosition = event.data.getLocalPosition(stage);
    console.log(mousePosition);
  
    if (linking)
    {
        
        var toLink = mousePosition
        onLink(FromLink, toLink);
    } else{

          FromLink = mousePosition
         
          linking = true;
    }
}
function onLinkEnd(){
    linking = false;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove(event) {
    if (this.dragging) {
        this.x += event.data.originalEvent.movementX;
        this.y += event.data.originalEvent.movementY;
    }
}
 
}
 }
}

</script>

<style lang="scss">
  canvas {
  width: 100%;
  height:100%;
}
</style>