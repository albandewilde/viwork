import * as PIXI from "pixi.js"

import {Switch} from "../../objects/ts/commutateur"
import {Idrawable} from "./Idrawable"

export class pixi_Switch implements Idrawable {
    material: Switch;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;

    constructor() {
        this.material = new Switch()
        this.sprite_path = process.env.VUE_APP_BACKEND+"/images/icons/switch.png"
    }
    
    take(positionX: number , positionY: number ) {
        
    
        // the computer change his sprite and his position is under the pointer while he don't put ip
    }

    put() {
        // put the computer at his new position (fixed position), don't forget to change his sprite
    }

    Move(sprite: PIXI.Sprite){

        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.on('mousedown', onDragStart)
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

    draw(container: PIXI.Container, renderer:any) {
   
        const sprite = PIXI.Sprite.fromImage(this.sprite_path)
       
        
        console.log(sprite)
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;

        sprite.width = 100;
        sprite.height =100;

             
        sprite.x =container.position.x/2;
        sprite.y = container.position.y/2;
        this.Move(sprite);
        this.sprite= sprite;
        container.addChild(sprite);
        

        function animate(){      
            requestAnimationFrame(animate);
            renderer.render(container);           
        }
        animate();
        
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