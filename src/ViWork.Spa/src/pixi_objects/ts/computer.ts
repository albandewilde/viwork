import {PIXI} from "pixi.js"

import {Idrawable} from "./Idrawable"
import {Computer} from "../../objects/js/computer"

class pixi_Computer implements Idrawable {
    material: Computer
    container_position: [number, number]
    sprite_path: string
    container: PIXI.container
    sprite: PIXI.sprite

    constructor() {
        this.material = new Computer()
        this.container_position = PIXI.renderer.interaction.mouse.global    // position du pointeur de la souris
        this.sprite_path = "../../images/sprites/computer.png"
        this.container = new PIXI.contenair()
        this.sprite = new PIXI.sprite.fromImage(this.sprite_path)
        this.sprite.interactive = true
    }

    take() {
        // the computer change his sprite and his position is under the pointer while he don't put ip
    }

    put() {
        // put the computer at his new position (fixed position), don't forget to change his sprite
    }

    draw() {
        this.container.addChild(this.sprite)
    }

    remove() {
    }

    async animation(){
    }
}