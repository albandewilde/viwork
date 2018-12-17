import {Roucom} from "./roucom"

export class Computer extends Roucom{
    // network_cards of computer write paquet in the element 1 of a cable and listen in the element 0
    constructor(nb_network_card: number=1, route_eh: boolean=false, write_on_cable: number=1) {
        super(nb_network_card, route_eh, write_on_cable)
    }
}