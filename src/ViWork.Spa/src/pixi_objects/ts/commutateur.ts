//import {all} from "pixi.js"

import {Switch} from "../../objects/js/commutateur"

class pixi_Switch {
    computer: Switch
    position: [number, number]
    sprite_path: string

    constructor() {
        this.computer = new Switch()
        this.position = [0, 0]// sous la rouris
        this.sprite_path = "../../images/sprites/switch.png"
    }
}