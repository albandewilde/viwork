//import {all} from "pixi.js"

import {NetworkCard} from "../../objects/ts/network_card"
import { Cable } from '../../objects/ts/cable';
import { Idrawable } from './Idrawable';
import { pixi_Cable } from './cable';


export class pixi_NetWorkCard implements Idrawable {
    material: NetworkCard;
    texture: PIXI.Texture;
    sprite_path: string;
    container: PIXI.Container;
    sprite: PIXI.Sprite;
    stage: PIXI.Container;
    moosePositoin: any;
    positionX: any;
    positionY: any;
    linking: boolean;
    fromLinkX: any;
    fromLinkY: any;
    cable: pixi_Cable;
    renderer: any;
    data: any;
  

    constructor(linking: boolean) {
        this.linking = linking;
        this.material = new NetworkCard();
        this.sprite_path = process.env.VUE_APP_BACKEND+"/images/icons/ethernet_Off.png";       
    }

    take(positionX: number , positionY: number ) {
       
 
        // the computer change his sprite and his position is under the pointer while he don't put ip
    }

    put() {
        // put the computer at his new position (fixed position), don't forget to change his sprite
    }

    draw(container: PIXI.Container, renderer:any) {
        this.renderer = renderer;
        const sprite = PIXI.Sprite.fromImage(this.sprite_path)
    
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;

        sprite.width = 20;
        sprite.height = 20;
                  
        sprite.x =this.positionX
        sprite.y = this.positionY
        this.sprite= sprite;
        this.Move(sprite);
        container.addChild(sprite);  
         
    }

    Move(sprite: PIXI.Sprite){
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.on("click",this.GetNetworkCart)
     
    }
   
    GetNetworkCart(event){
        var mousePosition = event.data.position
        var cable = new pixi_Cable(true);
        this.moosePositoin =mousePosition;
        while(this.linking){
            if (this.moosePositoin === mousePosition){
                this.Plug(cable.material)
                cable.destinatorX = mousePosition.x;
                cable.destinatorY = mousePosition.y;
            } else {
                this.Plug(cable.material)
                var moosePositoin = event.data.position
                cable.receptorX = moosePositoin.x;
                cable.receptorY = moosePositoin.y;
                cable.draw(this.container,this.renderer);
                console.log("ca a marcher");    
                this.linking = false
            }
        }
               
    }

    
    GetPosition(container: PIXI.Sprite,positionX: number , positionY:number){
        this.positionX = positionX;
        this.positionY = positionY;
    }
  
    remove(){

    }

    Plug(cable: Cable){
        this.material.port.on_plug(cable)
    }

    
    onLink(){  
        if (this.linking){

            this.onLinkEnd();
        }
    }

    onLinkStart(event){
        if (!this.linking)
        {
            this.cable = new pixi_Cable(true);
            this.cable.destinatorX = this.positionX;
            this.cable.destinatorY = this.positionY;
            //this.Plug(this.cable.material)
        } else{
     
            this.onLinkEnd()
        }
        
     
     }

    getCable(){
        return this.cable
    }

    onLinkEnd(){
        this.cable.receptorX = this.positionX
        this.cable.receptorY= this.positionY
        this.Plug(this.cable.material)
        this.cable.draw(this.container, this.renderer)
        this.linking = false;
    }

}