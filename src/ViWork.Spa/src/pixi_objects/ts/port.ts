
import * as PIXI from "pixi.js"

import { Idrawable } from './Idrawable';
import { Port } from '@/objects/ts/port';

export class pixi_Port implements Idrawable{
    material: Port
    texture: PIXI.Texture
    sprite_path: string
    sprite: PIXI.Sprite
    container: PIXI.Container
    positionX: any;
    positionY: any;


    constructor() {

        this.material = new Port();        
        this.sprite_path =  process.env.VUE_APP_BACKEND+"/images/icons/ethernet_Off.png";
    }

    take(positionX: number , positionY: number ) {
       
 
        // the computer change his sprite and his position is under the pointer while he don't put ip
    }

    put() {
        // put the computer at his new position (fixed position), don't forget to change his sprite
    }

    draw(container: PIXI.Container, renderer:any) {
   
        const sprite = PIXI.Sprite.fromImage(this.sprite_path)
       
        
        console.log(sprite)
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;

        sprite.width = 15;
        sprite.height = 15;

             
        sprite.x =this.positionX
        sprite.y = this.positionY
        this.sprite= sprite;
        container.addChild(sprite);
        
    }

    Move(sprite: PIXI.Sprite){

        sprite.interactive = true;
        sprite.buttonMode = true;
    }
     
    GetPosition(container: PIXI.Sprite,positionX: number , positionY:number){
        this.positionX = positionX;
        this.positionY = positionY;
    }
    remove(){

    }
}