import {IPortContainer} from "./IPortContainer"
import {Roucom} from "./roucom"

export class Routeur extends Roucom implements IPortContainer {
    // in case you don't know what a routeur is: http://lmgtfy.com/?s=d&iie=1&q=routeur+wikipedia

    constructor(nb_network_card: number=2) {
        if (nb_network_card < 2) {
            throw Error("A routeur with less than two interfaces is like a car with out engine,\nit's pretty but useless")
        }
        
        super(nb_network_card)
    }
    on_receive(){}
    
}