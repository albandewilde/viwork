//import {all} from "pixi.js"

import {NetworkCard} from "../../objects/ts/network_card"

class pixi_Switch {
    computer: NetworkCard
    position: [number, number]
    sprite_path: string

    constructor() {
        this.computer = new NetworkCard()
        this.position = [0, 0]// sous la rouris
        this.sprite_path = "../../images/sprites/networkcard.png"
    }
}