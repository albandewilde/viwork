<template>
  <div class="pixi-renderer">
    <canvas ref="renderCanvas"></canvas>
     
    <slot></slot>
  </div>
</template>


 <script type="text/javascript">
 import * as PIXI from 'pixi.js'
import Vue  from 'vue'
export default {
  data() {
    return {
      // These need to be contained in an object because providers are not reactive.
      PIXIWrapper: {
        // Expose PIXI and the created app to all descendants.
        PIXI,
        PIXIApp: null,
      },
      // Expose the event bus to all descendants so they can listen for the app-ready event.
      EventBus: new Vue()
    }
  },
  // Allows descendants to inject everything.
  provide() {
    return {
      PIXIWrapper: this.PIXIWrapper,
      EventBus: this.EventBus
    }
  },

  mounted() {
    // Determine the width and height of the renderer wrapper element.
    const renderCanvas = this.$refs.renderCanvas;
    const w = renderCanvas.offsetWidth;
    const h = renderCanvas.offsetHeight;

    // Create a new PIXI app.
    this.PIXIWrapper.PIXIApp = new PIXI.Application(w, h, {
      view: renderCanvas,
      backgroundColor: 0x1099bb
    });

    this.EventBus.$emit('ready');
  }
}
  </script>   

<style lang="scss">
  canvas {
  width: 100%;
  height:100%;
}
</style>