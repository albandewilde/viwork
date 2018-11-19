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
        if (card_id < 0 || card_id > this.network_cards.length) {
            throw RangeError("Index of network card out of range")
        }
        this.network_cards[card_id].send(content, dest)
    }

    arrived(content: any) {
        console.log(content)
    }

    delete_network_card(idx: number) {
        if (idx < 0 || idx > this.network_cards.length) {
            throw RangeError("Index of network card out of range")
        }
        // throw error when if  0 > idx of idx > len(self.networkcard) 
        this.network_cards[idx].remove()
        this.network_cards.splice(idx, 1)
    }
}