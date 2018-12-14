import { Port } from "./port";
import { EthernetFrame } from "./ethernet_frame";
import { ipv4 } from "./ipv4";
import { ip_paquet } from "./ip_paquet";
export class NetworkCard {
    // network_cards write paquet in the element 1 of a cable and listen in the element 0
    constructor(cmp = null, paquet_filter = true) {
        this.mac_addr = NetworkCard.last_avariable_mac_addr + 1;
        NetworkCard.last_avariable_mac_addr += 1;
        this.port = new Port(this);
        this.ip_addr = new ipv4();
        this.roucom = cmp;
        this.paquet_filter = paquet_filter;
    }
    on_receive(cable_content, port) {
        let frame = cable_content[0];
        if (frame != null && (!this.paquet_filter || (frame.destination === this.mac_addr || frame.destination === 0xFFFFFFFFFFFF))) {
            // add the ip and the mac address of the source to our arp table
            if (frame.content.ip_src != null && frame.source != null) {
                this.roucom.arp_table.set(frame.content.ip_src, frame.source);
            }
            // check the protocole
            if (frame.protocol_layer3 === null) { // no protocole, we are un layer 2
                let payload = this.get_ethernet_payload(frame);
                let content = this.get_payload_content(payload);
                this.roucom.arrived(content);
            }
            else if (frame.protocol_layer3 === 0x0800) { // Internet Protocol version 4 (IPv4)
                let payload = this.get_ethernet_payload(frame);
                if (payload.ip_dest.address === this.ip_addr.address) { // the paquet is for our us
                    let content = this.get_payload_content(payload);
                    this.roucom.arrived(content);
                }
                else if (this.roucom.routing_eh) { // the paquet isn't for us but we route paquets
                    this.route(payload);
                }
            }
            else if (frame.protocol_layer3 === 0x0806) { // Address Resolution Protocol (ARP)
                let payload = this.get_ethernet_payload(frame);
                if (ipv4.compare(payload.ip_dest, this.ip_addr)) {
                    this.send("Hey, it's me " + String(this.mac_addr), this.roucom.arp_table.get(payload.ip_src), payload.ip_src, 0X0806);
                }
            }
        }
    }
    route(paquet) {
        // serach who is the gateway to join the network of the destinataire of the paquet
        let gateway = null;
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        gateway = this.roucom.get_gateway(paquet.ip_dest);
        // ==============================================================================================
        let no_break = true;
        for (let ip of Array.from(this.roucom.route_table.keys())) {
            if (ipv4.compare(ip, paquet.ip_dest)) {
                gateway = this.roucom.route_table.get(ip);
                no_break = false;
                break;
            }
        }
        if (no_break) {
            gateway = this.roucom.route_table.get(new ipv4("0.0.0.0/0")); // the default route
        }
        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        // now, we know the gateway but we have to chose on which network to send the paquet
        let network_card_idx = null;
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        network_card_idx = this.roucom.get_network_card_idx_on_network(paquet.ip_dest);
        // ==============================================================================================
        for (let idx = 0; idx < this.roucom.network_cards.length; idx += 1) {
            let card = this.roucom.network_cards[idx];
            if (ipv4.compare(card.ip_addr, paquet.ip_dest)) {
                network_card_idx = idx;
                break;
            }
        }
        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        // we know on which interface to send the paquet if we don't break before
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        let mac_dest = this.roucom.get_mac_by_ip(gateway);
        if (mac_dest != null) {
            let content = this.get_payload_content(paquet);
            this.roucom.network_cards[network_card_idx].send(content, mac_dest, paquet.ip_dest, 0x0800);
        }
        // ==============================================================================================
        if (network_card_idx != null) {
            // we seek in the arp table of the roucom if we have the ethernet address of the ip to reach
            let mac_dest = this.get_mac_by_ip(gateway);
            if (mac_dest === null) { // we don't have the mac address, we send a broadcast arp to get it
                this.broadcast_arp(network_card_idx, gateway);
                mac_dest = this.get_mac_by_ip(gateway);
            }
            if (mac_dest != null) { // if we know the mac address of the destinataire we send the paquet
                let content = this.get_payload_content(paquet);
                this.roucom.network_cards[network_card_idx].send(content, mac_dest, paquet.ip_dest, 0x0800);
            }
        }
        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    }
    broadcast_arp(network_card_idx, ip) {
        this.roucom.network_cards[network_card_idx].send("Who is " + ip.toString + " ?", 0xFFFFFFFFFFFF, ip, 0x0806);
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // ==============================================================================================
    get_mac_by_ip(search) {
        for (let ip of Array.from(this.roucom.arp_table.keys())) {
            if (ipv4.compare(ip, search)) {
                // we got the mac address
                return this.roucom.arp_table.get(ip);
            }
        }
        return null;
    }
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    send(content, mac_dest, ip_dest = null, protocole = null) {
        let payload = this.make_ethernet_payload(content, ip_dest);
        let frame = this.make_ethernet_frame(payload, mac_dest, protocole);
        this.port.send(frame, 1);
    }
    make_ethernet_frame(content, destinataire, protocole_layer3) {
        return new EthernetFrame(destinataire, this.mac_addr, protocole_layer3, content, null);
    }
    get_ethernet_payload(frame) {
        return frame.content;
    }
    make_ethernet_payload(content, ip_dest) {
        return new ip_paquet(this.ip_addr, ip_dest, content);
    }
    get_payload_content(payload) {
        return payload.content;
    }
    remove() {
        if (this.port.cable != null) {
            this.port.unplug();
        }
        delete (this.port);
    }
}
NetworkCard.last_avariable_mac_addr = 0x0;
//# sourceMappingURL=network_card.js.map