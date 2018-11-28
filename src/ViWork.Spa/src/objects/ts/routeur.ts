import {IPortContainer} from "./IPortContainer"
import {Roucom} from "./roucom"

export class Routeur extends Roucom implements IPortContainer {
    constructor(nb_network_card: number=1) {
        super(nb_network_card)
    }
    on_receive(){}
    
}