import * as PIXI from "pixi.js"

import {Idrawable} from"./Idrawable"
import {Cable} from "../../objects/ts/cable"
import { Container } from 'element-ui';

export class pixi_Cable implements Idrawable {
    material: Cable;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;

    constructor(cross_eh: boolean) {
        this.material = new Cable()
        this.container = new PIXI.Container();
        this.sprite_path = cross_eh ? process.env.VUE_APP_BACKEND+"/images/icons/cable_cross.png" : process.env.VUE_APP_BACKEND+"/images/icons/cable_straight.png"
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
        //set anchor
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
        // set image scale
        sprite.width = 50;
        sprite.height =50;

           
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

    async GetPosition(positionX: number , positionY:number){
        this.container.position.x = positionX;
        this.container.position.y = positionY;
    }
    remove() {
    }

    async animation(){
    }
}