import * as PIXI from "pixi.js"

import {Idrawable} from"./Idrawable"
import {Cable} from "../../objects/ts/cable"


export class pixi_Cable implements Idrawable {
    material: Cable;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;
    receptorX: any;
    receptorY: any;
    destinatorX: any;
    destinatorY: any;

    constructor(cross_eh: boolean) {
        this.material = new Cable()
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
        console.log(this.receptorX, this.receptorY)
        var cable = new PIXI.Graphics()
        cable.beginFill(0x32CD32);
        cable
                .lineStyle(7,0x32CD32)
                .moveTo(this.receptorX,this.receptorY )
                .lineTo(this.destinatorX ,this.destinatorY)   
        this.container.addChild(cable);
        

        function animate(){      
            requestAnimationFrame(animate);
            renderer.render(container);           
        }
        animate();
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

    async animation(){
    }
}