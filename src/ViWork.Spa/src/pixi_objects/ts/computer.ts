//import {all} from "pixi.js"

import {Computer} from "../../objects/js/computer"

class pixi_Computer {
    computer: Computer
    position: [number, number]
    sprite_path: string

    constructor() {
        this.computer = new Computer()
        this.position = [0, 0]// sous la rouris
        this.sprite_path = "../../images/sprites/computer.png"
    }
}