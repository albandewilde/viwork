//import {all} from "pixi.js"

import {Hub} from "../../objects/ts/hub"

class pixi_Hub {
    computer: Hub
    position: [number, number]
    sprite_path: string

    constructor() {
        this.computer = new Hub()
        this.position = [0, 0]// sous la rouris
        this.sprite_path = "../../images/sprites/hub.png"
    }
}