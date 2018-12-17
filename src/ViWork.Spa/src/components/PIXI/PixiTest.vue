
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PIXI from 'pixi.js'

@Component({
  template: `
  <div>
   <button @click="Screen">Start</button>
  </div>

  `
})

export default class Canva extends Vue{

}




</script>




<style lang="scss">
  canvas {
  width: 100%;
  height:100%;
}
</style>