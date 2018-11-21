<template lang="html">
  <div class="screen">

    {{createScreen}}
  </div>

</template>
 

 <script type="text/javascript">
export default {
   data () {
            return {
                type:'',
                
            }
        },
  mounted () {
  },
 computed: {
        auth: () => AuthService,
        
        isLoading() {
            return this.state.isLoading;
        },

        createScreen(){ 
          
          PIXI.utils.sayHello();
        
          let app = new PIXI.Application({ 
            width: 800,         // default: 800
            height:600,        // default: 600
            antialias: true,    // default: false
            transparent: false, // default: false
            resolution: 1       // default: 1       
          });

     

        app.renderer.view.style.position = "relative";
        app.renderer.view.style.display = "block";
        app.renderer.view.style.left ="50%";
        app.renderer.view.style.top ="50%";
        app.renderer.view.style.transform = "translate3d( -50%, -50%, 0 )";
        

        document.body.appendChild(app.view);

        
        PIXI.loader.load((loader,ressources) => LoadImg());


        function LoadImg()
        {
          console.log(PIXI.RenderTexture);
       
          let sprite = new PIXI.Sprite(
          PIXI.loader.ressources.test.texture 
          );
          app.stage.addChild(sprite);
         

          // throughout the process multiple signals can be dispatched.
          PIXI.loader.onProgress.add(() => {}); // called once per loaded/errored file
          PIXI.loader.onError.add(() => {}); // called once per errored file
          PIXI.loader.onLoad.add(() => {}); // called once per loaded file
          PIXI.loader.onComplete.add(() => {}); // called once when the queued resources all load.
        }
        },

   
        
        
    },

 
}
  </script>   

<style lang="scss">
  .screen{
    margin-left: auto;
    margin-right: auto;
  }
</style>