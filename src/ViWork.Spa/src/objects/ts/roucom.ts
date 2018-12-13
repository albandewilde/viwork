// This class is the mother of computer ans routeur
import {NetworkCard} from "./network_card"
import {ipv4} from "./ipv4"

export class Roucom{
    network_cards: NetworkCard[]
    last_recv: String
    route_table: Map<ipv4, ipv4>    // Destination, Gateway 
    routing_eh: boolean
    arp_table: Map<ipv4, number>

    constructor(nb_network_card: number=1, route: boolean=false) {
        if (nb_network_card < 0) {
            throw new Error("How get a negative number of network card is possible ? You have 4 houres.")
        }
        let idx = 0
        this.network_cards = []
        while (idx < nb_network_card) {
            this.add_network_card()
            idx += 1
        }
        this.last_recv = null
        this.route_table = new Map()
        this.routing_eh = route
        this.arp_table = new Map()
    }

    add_network_card() {
        this.network_cards.push(new NetworkCard(this))
    }

    send_thing(content: string, mac_dest: number, card_id: number, ip_dest: ipv4=null, protocol_layer3: number=null) {
        if (card_id < 0 || card_id > this.network_cards.length) {
            throw RangeError("Index of network card out of range")
        }
        this.network_cards[card_id].send(content, mac_dest, ip_dest, protocol_layer3)
    }

    arrived(content: String) {
        this.last_recv = content
    }

    delete_network_card(idx: number) {
        // throw error when 0 > idx or when idx > len(self.networkcard) 
        if (idx < 0 || idx > this.network_cards.length) {
            throw RangeError("Index of network card out of range")
        }
        this.network_cards[idx].remove()
        this.network_cards.splice(idx, 1)
    }
}