//import {all} from "pixi.js"

import * as PIXI from "pixi.js";
import {Hub} from "../../objects/ts/hub";
import { Idrawable } from './Idrawable';
import {pixi_Port} from './port'
import { pixi_Router } from './routeur';

export class pixi_Hub implements Idrawable{
    material: Hub
    texture: PIXI.Texture
    sprite_path: string
    sprite: PIXI.Sprite
    positionX: any;
    positionY: any;
    container: PIXI.Container
    renderer: any
    ListPort: any
    constructor() {
        this.material = new Hub();
        this.container = new PIXI.Container();
        this.ListPort = []
        this.sprite_path = process.env.VUE_APP_BACKEND+"/images/icons/hub.png";
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

        sprite.width =100;
        sprite.height =100;
                
        sprite.x =container.position.x/2;
        sprite.y = container.position.y/2;
     
        this.sprite= sprite;
        this.container.addChild(sprite);

        for (var i=0; i < this.material.nb_ports; i++ ){
            this.CreatePort(this.container,20*i,42);
        }

        container.addChild(this.container)
        

        function animate(){      
            requestAnimationFrame(animate);
            renderer.render(container);           
        }
        animate();
        
    }

    Move(material: pixi_Hub ){

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
            }

            function onDragMove(event) {
                if (this.dragging) {
                    //this.x += event.data.originalEvent.movementX;
                    //this.y += event.data.originalEvent.movementY;
                    this.dragPoint = event.data.getLocalPosition(this.parent);
                    this.x = this.dragPoint.x;
                    this.y = this.dragPoint.y;
                }
            }

            function onDragEnd() {
                this.alpha = 1;
                this.dragging = false;
                material.SetPosition(this.x ,this.y)
                // set the interaction data to null
                this.data = null;
            }
    }
     
    SetPosition(positionX: number , positionY:number){
        this.positionX = positionX;
        this.positionY = positionY;
    }

    CreatePort(container,positionX,positionY){
        var port = new pixi_Port();
        port.SetPosition(container, positionX,positionY);
        port.draw(container,this.renderer)
        var singleObj = {};
        singleObj['type'] = 'NetWorkCard';
        singleObj['value'] = port;
        this.ListPort.push(singleObj);
    }

    remove(){

    }
}