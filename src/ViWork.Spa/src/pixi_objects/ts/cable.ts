
import * as PIXI from "pixi.js"

import {Idrawable} from"./Idrawable"
import {Cable} from "../../objects/ts/cable"

class pixi_Cable implements Idrawable {
    material: Cable;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;

    constructor(cross_eh: boolean=true) {
        this.material = new Cable()
        this.sprite_path = cross_eh ? "../../images/sprites/cable_cross.png" : "../../images/sprites/cable_straight.png"
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