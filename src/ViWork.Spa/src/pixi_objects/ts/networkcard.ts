//import {all} from "pixi.js"

import {Networkcard} from "../../objects/js/network_card"

class pixi_Switch {
    computer: Networkcard
    position: [number, number]
    sprite_path: string

    constructor() {
        this.computer = new Networkcard()
        this.position = [0, 0]// sous la rouris
        this.sprite_path = "../../images/sprites/networkcard.png"
    }
}