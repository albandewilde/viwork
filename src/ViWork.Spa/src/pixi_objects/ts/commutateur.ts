import * as PIXI from "pixi.js"

//import {Switch} from "../../objects/ts/commutateur"
import {Idrawable} from "./Idrawable"

class pixi_Switch implements Idrawable {
    //material: Switch;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;

    constructor() {
        //.material = new Switch()
        this.sprite_path = "../../images/sprites/switch.png"
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