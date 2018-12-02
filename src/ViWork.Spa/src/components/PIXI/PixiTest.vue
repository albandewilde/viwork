<template>
  <div class="Canva">
    <button v-on:click="Screen">Demarrer</button>
    <!-- <img src= "../../assets/BLAC.png"> -->
     
  </div>
</template>
 
<script>

import Vue  from 'vue'
import * as PIXI from 'pixi.js'
import {Sprite} from 'pixi.js'
import {Renderer} from 'pixi.js'
//import './app.js'
//import Render from './PixiRender.vue'

export default {
  mounted(){
  },
methods: {
Screen(){
  var renderer = PIXI.autoDetectRenderer(1080,800, { backgroundColor: 0x000000, antialias: true });
document.body.appendChild(renderer.view);

// Create the main stage for your display objects
var stage = new PIXI.Container();

// Initialize the pixi Graphics class
var graphics = new PIXI.Graphics();

// Set a new fill color
graphics.beginFill(0x3498db); // Blue



// Draw a rectangle
graphics.drawRect(10, 10, 75, 75); // drawRect(x, y, width, height)
graphics.endFill();
graphics.interactive = true;
graphics.buttonMode = true;

// Add a hit area..
graphics
          .on('click', onCreateRect)

        


//         // Use mouse-only events
//         // .on('mousedown', onButtonDown)
//         // .on('mouseup', onButtonUp)
//         // .on('mouseupoutside', onButtonUp)
//         // .on('mouseover', onButtonOver)
//         // .on('mouseout', onButtonOut)

//         // Use touch-only events
//         // .on('touchstart', onButtonDown)
//         // .on('touchend', onButtonUp)
//         // .on('touchendoutside', onButtonUp)
      
  
 




// Add the graphics to the stage
stage.addChild(graphics);

var superSquare = PIXI.Texture.fromImage('../../assets/BLAC.png');

	superSquare.x = 75;
  superSquare.y = 50;


// Start animating
animate();
function animate() {
    //Render the stage
    renderer.render(stage);
    
    requestAnimationFrame(animate);
}

function onCreateRect(){
    var rect = new PIXI.Graphics();
    rect.beginFill(0x3498db); // Blue



    // Draw rectangle
    rect.drawRect(240, 10, 75, 75); // drawRect(x, y, width, height)
    rect.endFill();
    rect.interactive = true;
    rect.buttonMode = true;
    rect
        // Mouse & touch 
        // drag and drop events

        .on('mousedown', onDragStart)
		    .on('touchstart', onDragStart)
		    .on('mouseup', onDragEnd)
		    .on('mouseupoutside', onDragEnd)
		    .on('touchend', onDragEnd)
		    .on('touchendoutside', onDragEnd)
		    .on('mousemove', onDragMove)
		    .on('touchmove', onDragMove);
    stage.addChild(rect);
}

function onDragStart(event) {
    // store a reference to the data
    	this.data = event.data;
	    this.alpha = 0.5;
	    this.dragging = true;
	    this.dragPoint = event.data.getLocalPosition(this.parent);
	    this.dragPoint.x -= this.position.x;
	    this.dragPoint.y -= this.position.y;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
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