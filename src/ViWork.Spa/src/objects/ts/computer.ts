import {Roucom} from "./roucom"

export default class Computer extends Roucom{
    constructor(nb_network_card: number=1) {
        super(nb_network_card)
    }
}