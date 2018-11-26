<template>
  <div id="canva">
  
    <pixi-renderer>
     <container>
        <sprite :x="0" :y="0"  imagePath='../../assets/BLAC.png'/>
        
     </container> 
   
    </pixi-renderer>
  </div>
</template>

<script>

import PixiRenderer from '../PIXI/PixiRender.vue'
import Sprite from '../PIXI/PixiSprite.vue'
import Container from '../PIXI/PixiContainer.vue'

export default {
  components: {
    PixiRenderer,
    Sprite,
    Container
  },

  methods: {
    scaleObject(container) {
      container.scale.x *= 1.25;
      container.scale.y *= 1.25;
      
    },

    tickInfo(container, delta) {
      console.log(this.container)
    }
  }
}
</script>

<style>
#screen {
  position: absolute;
  top: 50%;
  right: 50%;
  
}
</style>