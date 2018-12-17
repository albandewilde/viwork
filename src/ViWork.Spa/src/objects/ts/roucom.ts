// This class is the mother of computer ans routeur
import {NetworkCard} from "./network_card"
import {ipv4} from "./ipv4"

export class Roucom{
    network_cards: NetworkCard[]
    last_recv: String
    route_table: Map<ipv4, ipv4>    // Destination, Gateway 
    routing_eh: boolean
    arp_table: Map<ipv4, number>
    write_on_cable: number

    constructor(nb_network_card: number=1, route: boolean=false, write_on_cable: number) {
        if (nb_network_card < 0) {
            throw new Error("How get a negative number of network card is possible ? You have 4 houres.")
        }
        let idx = 0
        this.write_on_cable = write_on_cable
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
        this.network_cards.push(new NetworkCard(this, true, this.write_on_cable))
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

    get_gateway(ip_reach: ipv4) {
        // given an ip, we return the gateway qhich is in the route table
        let no_break = true
        let gateway: ipv4
        for (let ip of Array.from(this.route_table.keys())) {
            if (ipv4.compare(ip, ip_reach)) {
                gateway = this.route_table.get(ip)
                no_break = false
                break
            }
        } if (no_break) {
            gateway = this.route_table.get(new ipv4("0.0.0.0/0"))    // the default route
        }
        return gateway
    }

    get_network_card_idx_on_network(network_ip) {
        // given a ip address, we return the first network card which is on the same network to the ip given
        let network_card_idx: number = null
        for (let idx = 0; idx < this.network_cards.length; idx += 1) {   
            let card = this.network_cards[idx]
            if (ipv4.compare(card.ip_addr, network_ip)) {
                network_card_idx = idx
                break
            }
        }
        return network_card_idx
    }

    get_mac_by_ip(search: ipv4, card_idx: number) {
        // given an ip, we return the mac address corresponding with the arp table

        let get_mac = function(target: ipv4, obj: Roucom=this) {
            // searche in the arp table the ip
            for (let ip of Array.from(obj.arp_table.keys())) {
                if (ipv4.compare(ip, target)) {
                    // we got the mac address
                    return this.arp_table.get(ip)
                }
            }
            return null
        }

        let mac_addr = get_mac(search)
        if (mac_addr === null) {
            // if we don't have the mac address we send a broadcast_arp to find if
            this.network_cards[card_idx].broadcast_arp(search)
            mac_addr = get_mac(search)
        }

        return mac_addr
    }
}