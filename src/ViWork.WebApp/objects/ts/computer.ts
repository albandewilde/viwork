import {NetworkCard} from "./network_card"

export class Computer{
    network_cards: NetworkCard[]

    constructor(nb_network_card: number=1) {
        let idx = 0
        this.network_cards = []
        while (idx < nb_network_card) {
            this.add_network_card()
            idx += 1
        }
    }

    add_network_card() {
        this.network_cards.push(new NetworkCard(this))
    }

    send_thing(content: any, dest: number, card_id: number) {
        this.network_cards[card_id].send(content, dest)
    }

    arrived(content: any) {
        console.log(content)
    }
}