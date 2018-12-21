//import {all} from "pixi.js"

import {Routeur} from "../../objects/ts/routeur";
import { Idrawable } from './Idrawable';
import { pixi_Port} from "./port";

export class pixi_Router implements Idrawable{
    material: Routeur;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;
    renderer: any;

    constructor() {
        this.material = new Routeur();
        this.sprite_path = process.env.VUE_APP_BACKEND+"/images/icons/routeur.png";       
    }

    take(positionX: number , positionY: number ) {
       
 
        // the computer change his sprite and his position is under the pointer while he don't put ip
    }

    put() {
        // put the computer at his new position (fixed position), don't forget to change his sprite
    }

    draw(container: PIXI.Container, renderer:any) {

        this.renderer = renderer
        const sprite = PIXI.Sprite.fromImage(this.sprite_path)
       
        
        console.log(sprite)
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;

        sprite.width = 100;
        sprite.height =100;
     
        sprite.x =container.position.x/2;
        sprite.y = container.position.y/2;
        
        this.Move(sprite);
        this.sprite = sprite;

        container.addChild(sprite);

        for (var i=0; i < this.material.network_cards.length; i++ ){
            this.CreatePort(this.container,0,10+20*i);
        }
        

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
    CreatePort(container,positionX,positionY){
        var port = new pixi_Port();
        port.GetPosition(container, positionX,positionY);
        port.draw(container,this.renderer)
    }

     
    GetPosition(container: PIXI.Container,positionX: number , positionY:number){
        container.position.x = positionX;
        container.position.y = positionY;
    }
    remove(){

    }
}