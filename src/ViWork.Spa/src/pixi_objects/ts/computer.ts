import * as PIXI from'pixi.js'

import {Idrawable} from "./Idrawable";
import {Computer} from "../../objects/ts/computer";

export class pixi_Computer implements Idrawable {
    material: Computer;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;

    constructor() {
        this.material = new Computer();
            // position du pointeur de la souris
        this.sprite_path = "../../images/sprites/computer.png";
        
      
        
      
    }



    take(positionX: number , positionY: number ) {
        
    
        // the computer change his sprite and his position is under the pointer while he don't put ip
    }

    put() {
        // put the computer at his new position (fixed position), don't forget to change his sprite
    }

    draw(container: PIXI.Container) {

        let sprite = PIXI.Sprite.fromImage(this.sprite_path);
        sprite.interactive = true;
        sprite.x = 200;
        sprite.y = 200;
        container.addChild(sprite);
        return sprite
        
    }

     
    GetPosition(container: PIXI.Container,positionX: number , positionY:number){
        container.position.x = positionX;
        container.position.y = positionY;
    }
    remove() {
    }

    async animation(){
    }
    
}