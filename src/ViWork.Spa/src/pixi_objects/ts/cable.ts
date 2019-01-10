import * as PIXI from "pixi.js"

import {Idrawable} from"./Idrawable"
import {Cable} from "../../objects/ts/cable"
import { pixi_NetWorkCard } from './networkcard';


export class pixi_Cable implements Idrawable {
    material: Cable;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;
    receptor: any;
    destinator: any;
    cable: any;
    cable2: any;

    cross_eh: any;

    constructor(cross_eh: boolean) {
        this.material = new Cable(cross_eh)
        this.cross_eh = cross_eh;
        this.sprite_path = cross_eh ? process.env.VUE_APP_BACKEND+"/images/icons/cable_cross.png" : process.env.VUE_APP_BACKEND+"/images/icons/cable_straight.png"
    }
    
    take(positionX: number , positionY: number ) {
        
    
        // the computer change his sprite and his position is under the pointer while he don't put ip
    }

    put() {
        // put the computer at his new position (fixed position), don't forget to change his sprite
    }

    draw(container: PIXI.Container, renderer:any) {

        
        this.container = container
        var cable = new PIXI.Graphics()
        var cable2 = new PIXI.Graphics()
        cable.beginFill(0x32CD32);
  
        if (this.cross_eh === false ){
            cable
                .lineStyle(3,0x32CD32)
                .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y )
                .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y)
            this.container.addChild(cable); 
        } else  {
            cable
                .lineStyle(3,0x32CD32)
                .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y + 17)
                .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y)
            
            this.container.addChild(cable); 
          
            cable2
            .lineStyle(3,0x32CD32)
            .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y )
            .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y +17)
            this.container.addChild(cable2); 
        }
        this.cable = cable;
        this.cable2 = cable2;
        
        
       

        function animate(){      
            requestAnimationFrame(animate);
            renderer.render(container);           
        }
        animate();
                
        
    }

    SetReceptor(NtC: pixi_NetWorkCard){
        this.receptor = NtC;
    }

    SetDestinator(NtC: pixi_NetWorkCard){
        this.destinator = NtC
    }

    UpdateCable(NtC){
     
        if (NtC.material !== this.destinator.material){
            console.log(1)
            if (this.cross_eh === false){
                this.cable.clear();
                this.cable
                .lineStyle(3,0x32CD32)
                .moveTo(NtC.stage.position.x,NtC.stage.position.y )
                .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y);
            } else {
                this.cable.clear();
                this.cable2.clear();

                this.cable
                .lineStyle(3,0x32CD32)
                .moveTo(NtC.stage.position.x,NtC.stage.position.y + 17 )
                .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y);

                
                this.cable2
                this.cable2
                .lineStyle(3,0x32CD32)
                .moveTo(NtC.stage.position.x,NtC.stage.position.y)
                .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y  + 17 );


            }
        } else if (NtC.material === this.destinator.material){
            console.log(2)
            if (this.cross_eh === false ){
                this.cable.clear();
                this.cable
                    .lineStyle(3,0x32CD32)
                    .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y )
                    .lineTo(NtC.stage.position.x ,NtC.stage.position.y)
               
            } else  {
                this.cable.clear();
                this.cable
                    .lineStyle(3,0x32CD32)
                    .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y + 17)
                    .lineTo(NtC.stage.position.x ,NtC.stage.position.y)
       
                this.cable2.clear()
                this.cable2
                .lineStyle(3,0x32CD32)
                .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y )
                .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y +17)
           
            }
        }
    }


    Move(sprite: PIXI.Sprite){

        sprite.interactive = true;
        sprite.buttonMode = true;
    }

    async GetPosition(positionX: number , positionY:number){
        this.container.position.x = positionX;
        this.container.position.y = positionY;
    }
    remove() {
    }


}