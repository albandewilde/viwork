// This class is the mother of computer ans routeur
import { NetworkCard } from "./network_card";
export class Roucom {
    constructor(nb_network_card = 1, route = false) {
        if (nb_network_card < 0) {
            throw new Error("How get a negative number of network card is possible ? You have 4 houres.");
        }
        let idx = 0;
        this.network_cards = [];
        while (idx < nb_network_card) {
            this.add_network_card();
            idx += 1;
        }
        this.last_recv = null;
        this.route_table = new Map();
        this.routing_eh = route;
        this.arp_table = new Map();
    }
    add_network_card() {
        this.network_cards.push(new NetworkCard(this));
    }
    send_thing(content, mac_dest, card_id, ip_dest = null, protocol_layer3 = null) {
        if (card_id < 0 || card_id > this.network_cards.length) {
            throw RangeError("Index of network card out of range");
        }
        this.network_cards[card_id].send(content, mac_dest, ip_dest, protocol_layer3);
    }
    arrived(content) {
        this.last_recv = content;
    }
    delete_network_card(idx) {
        // throw error when 0 > idx or when idx > len(self.networkcard) 
        if (idx < 0 || idx > this.network_cards.length) {
            throw RangeError("Index of network card out of range");
        }
        this.network_cards[idx].remove();
        this.network_cards.splice(idx, 1);
    }
}
//# sourceMappingURL=roucom.js.map