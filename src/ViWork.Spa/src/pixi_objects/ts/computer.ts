import * as PIXI from'pixi.js'

import {Idrawable} from "./Idrawable";
import {Computer} from "../../objects/ts/computer";

export class pixi_Computer implements Idrawable {
    material: Computer;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;
    positionX: any;
    positionY: any;

    constructor() {
        this.material = new Computer();
        this.container = new PIXI.Container();
        this.sprite_path = process.env.VUE_APP_BACKEND+"/images/icons/computer.png";       
    }

    take(positionX: number , positionY: number ) {
       
 
        // the computer change his sprite and his position is under the pointer while he don't put ip
    }

    put() {
        // put the computer at his new position (fixed position), don't forget to change his sprite
    }

    draw(container: PIXI.Container, renderer:any) {
   
        const sprite = PIXI.Sprite.fromImage(this.sprite_path)
       
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
        
        sprite.width = 110;
        sprite.height = 110;
        sprite.x = this.positionX
        sprite.y = this.positionY;
        this.Move(sprite);
        this.sprite= sprite;
        this.container.addChild(sprite)
        container.addChild(this.container);
        

        function animate(){      
            requestAnimationFrame(animate);
            renderer.render(container);           
        }
        animate();
        
    }

    Move(sprite: PIXI.Sprite){

        this.container.interactive = true;
        this.container.buttonMode = true;
        this.container.on('mousedown', onDragStart)
		    .on('touchstart', onDragStart)
		    .on('mouseup', onDragEnd)
		    .on('mouseupoutside', onDragEnd)
		    .on('touchend', onDragEnd)
		    .on('touchendoutside', onDragEnd)
		    .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);


            function onDragStart(event) {
                // store a reference to the data
                    this.data = event.data;
                    this.alpha = 0.5;
                    this.dragging = true;
                    this.dragPoint = event.data.getLocalPosition(this.parent);
                    this.dragPoint.x = this.position.x;
                    this.dragPoint.y = this.position.y;
            }

            function onDragMove(event) {
                if (this.dragging) {
                    this.x += event.data.originalEvent.movementX;
                    this.y += event.data.originalEvent.movementY;
                }
            }

            function onDragEnd() {
                this.alpha = 1;
                this.dragging = false;
                // set the interaction data to null
                this.data = null;
            }
    }
     
    GetPosition(container: PIXI.Container,positionX: number , positionY:number){
        this.positionX = positionX;
        this.positionY = positionY;
    }
    remove(){

    }
}