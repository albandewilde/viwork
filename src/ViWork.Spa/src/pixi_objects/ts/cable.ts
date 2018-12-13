
//import {all} from "pixi.js"

import {Cable} from "../../objects/js/cable"

class pixi_Cable {
    computer: Cable
    position: [number, number]
    sprite_path: string

    constructor(cross_eh: boolean=true) {
        this.computer = new Cable()
        this.position = [0, 0]// sous la rouris
        this.sprite_path = cross_eh ? "../../images/sprites/cable_cross.png" : "../../images/sprites/cable_straight.png"
    }
}