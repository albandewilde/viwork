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
        
        this.container = new PIXI.Container();
        this.texture = PIXI.Texture.fromImage(this.sprite_path);
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.interactive = true;
    }

    take(positionX: number , positionY: number ) {
        
    
        // the computer change his sprite and his position is under the pointer while he don't put ip
    }

    put() {
        // put the computer at his new position (fixed position), don't forget to change his sprite
    }

    draw() {
        this.container.addChild(this.sprite)
        
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