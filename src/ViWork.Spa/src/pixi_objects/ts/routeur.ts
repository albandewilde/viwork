//import {all} from "pixi.js"

import {Routeur} from "../../objects/ts/routeur"

class pixi_Router {
    computer: Routeur
    position: [number, number]
    sprite_path: string

    constructor() {
        this.computer = new Routeur()
        this.position = [0, 0]// sous la rouris
        this.sprite_path = "../../images/sprites/routeur.png"
    }
}