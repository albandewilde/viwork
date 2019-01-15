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
        cable.beginFill(0x979797);
  
        
            if (this.receptor.type === "networkcard" && this.destinator.type === "networkcard"){
                cable
                .lineStyle(3,0x979797)
                .moveTo(this.receptor.stage.position.x - 50,this.receptor.stage.position.y - 50 + (this.receptor.id * 20 ))
                .lineTo(this.destinator.stage.position.x - 50,this.destinator.stage.position.y - 50 + (this.destinator.id * 20 ))
                this.container.addChild(cable); 
            } else if (this.receptor.type === "networkcard" && this.destinator.type === "port"){
                cable
                .lineStyle(3,0x979797)
                .moveTo(this.receptor.stage.position.x - 50,this.receptor.stage.position.y - 50 + (this.receptor.id * 20 ))
                .lineTo(this.destinator.stage.position.x +(this.destinator.id * 20 ),this.destinator.stage.position.y + 50)
                this.container.addChild(cable); 
            } else if (this.receptor.type === "port" && this.destinator.type === "networkcard"){
                cable
                .lineStyle(3,0x979797)
                .moveTo(this.receptor.stage.position.x   +(this.receptor.id * 20 ),this.receptor.stage.position.y + 50 )
                .lineTo(this.destinator.stage.position.x - 50,this.destinator.stage.position.y - 50 + (this.destinator.id * 20 ))
                this.container.addChild(cable); 
            } else if (this.receptor.type === "port" && this.destinator.type === "port"){
                cable
                .lineStyle(3,0x979797)
                .moveTo(this.receptor.stage.position.x  +(this.receptor.id * 20 ) ,this.receptor.stage.position.y +50)
                .lineTo(this.destinator.stage.position.x +(this.destinator.id * 20 ),this.destinator.stage.position.y + 50)
                this.container.addChild(cable); 
            }
        
           
            
        // } else  {
        //     cable
        //         .lineStyle(3,0x32CD32)
        //         .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y + 17)
        //         .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y)
            
        //     this.container.addChild(cable); 
          
        //     cable2
        //     .lineStyle(3,0x32CD32)
        //     .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y )
        //     .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y +17)
        //     this.container.addChild(cable2); 
        // }
        this.cable = cable;
        // this.cable2 = cable2;
        
        
       

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
            console.log( this.cable)
           
                this.cable.clear();
                if (this.receptor.type === "networkcard" && this.destinator.type === "networkcard"){
                    this.cable
                    .lineStyle(3,0x979797)
                    .moveTo(this.receptor.stage.position.x - 50,this.receptor.stage.position.y - 50 + (this.receptor.id * 20 ))
                    .lineTo(this.destinator.stage.position.x - 50,this.destinator.stage.position.y - 50 + (this.destinator.id * 20 ))
                    this.container.addChild( this.cable); 
                } else if (this.receptor.type === "networkcard" && this.destinator.type === "port"){
                    this.cable
                    .lineStyle(3,0x979797)
                    .moveTo(this.receptor.stage.position.x - 50,this.receptor.stage.position.y - 50 + (this.receptor.id * 20 ))
                    .lineTo(this.destinator.stage.position.x +(this.destinator.id * 20 ),this.destinator.stage.position.y + 50)
                    this.container.addChild( this.cable); 
                } else if (this.receptor.type === "port" && this.destinator.type === "networkcard"){
                    this.cable
                    .lineStyle(3,0x979797)
                    .moveTo(this.receptor.stage.position.x   +(this.receptor.id * 20 ),this.receptor.stage.position.y + 50 )
                    .lineTo(this.destinator.stage.position.x - 50,this.destinator.stage.position.y - 50 + (this.destinator.id * 20 ))
                    this.container.addChild( this.cable); 
                } else if (this.receptor.type === "port" && this.destinator.type === "port"){
                    this.cable
                    .lineStyle(3,0x979797)
                    .moveTo(this.receptor.stage.position.x  +(this.receptor.id * 20 ) ,this.receptor.stage.position.y +50)
                    .lineTo(this.destinator.stage.position.x +(this.destinator.id * 20 ),this.destinator.stage.position.y + 50)
                    this.container.addChild( this.cable); 
                }
        
                // } else {
            //     this.cable.clear();
            //     this.cable2.clear();

            //     this.cable
            //     .lineStyle(3,0x32CD32)
            //     .moveTo(NtC.stage.position.x,NtC.stage.position.y + 17 )
            //     .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y);

                
            //     this.cable2
            //     this.cable2
            //     .lineStyle(3,0x32CD32)
            //     .moveTo(NtC.stage.position.x,NtC.stage.position.y)
            //     .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y  + 17 );


            // }
        } else if (NtC.material === this.destinator.material){
                this.cable.clear();
                if (this.receptor.type === "networkcard" && this.destinator.type === "networkcard"){
                    this.cable
                    .lineStyle(3,0x979797)
                    .moveTo(this.receptor.stage.position.x - 50,this.receptor.stage.position.y - 50 + (this.receptor.id * 20 ))
                    .lineTo(this.destinator.stage.position.x - 50,this.destinator.stage.position.y - 50 + (this.destinator.id * 20 ))
                    this.container.addChild( this.cable); 
                } else if (this.receptor.type === "networkcard" && this.destinator.type === "port"){
                    this.cable
                    .lineStyle(3,0x979797)
                    .moveTo(this.receptor.stage.position.x - 50,this.receptor.stage.position.y - 50 + (this.receptor.id * 20 ))
                    .lineTo(this.destinator.stage.position.x +(this.destinator.id * 30 ),this.destinator.stage.position.y + 50)
                    this.container.addChild( this.cable); 
                } else if (this.receptor.type === "port" && this.destinator.type === "networkcard"){
                    this.cable
                    .lineStyle(3,0x979797)
                    .moveTo(this.receptor.stage.position.x   +(this.receptor.id * 30 ),this.receptor.stage.position.y + 50 )
                    .lineTo(this.destinator.stage.position.x - 50,this.destinator.stage.position.y - 50 + (this.destinator.id * 20 ))
                    this.container.addChild( this.cable); 
                } else if (this.receptor.type === "port" && this.destinator.type === "port"){
                    this.cable
                    .lineStyle(3,0x979797)
                    .moveTo(this.receptor.stage.position.x  +(this.receptor.id * 30 ) ,this.receptor.stage.position.y +50)
                    .lineTo(this.destinator.stage.position.x +(this.destinator.id * 30 ),this.destinator.stage.position.y + 50)
                    this.container.addChild( this.cable); 
                }
            
            // } else  {
            //     this.cable.clear();
            //     this.cable
            //         .lineStyle(3,0x32CD32)
            //         .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y + 17)
            //         .lineTo(NtC.stage.position.x ,NtC.stage.position.y)
       
            //     this.cable2.clear()
            //     this.cable2
            //     .lineStyle(3,0x32CD32)
            //     .moveTo(this.receptor.stage.position.x,this.receptor.stage.position.y )
            //     .lineTo(this.destinator.stage.position.x ,this.destinator.stage.position.y +17)
           
            // }
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