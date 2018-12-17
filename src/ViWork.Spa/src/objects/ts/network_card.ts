import {IPortContainer} from "./IPortContainer"
import {Port} from "./port"
import {EthernetFrame} from "./ethernet_frame"
import {IEthernetPayload} from "./IEthernetPayload"
import {Roucom} from "./roucom"
import {ipv4} from "./ipv4"
import {IIpPayload} from "./IIpPayload"
import {ip_paquet} from "./ip_paquet"

export class NetworkCard implements IPortContainer {
    static last_avariable_mac_addr: number = 0x0
    ip_addr: ipv4
    readonly mac_addr: number
    port: Port
    roucom: Roucom
    paquet_filter: boolean
    write_on_cable: number
    // network_cards write paquet in the element <write_on_cable> of a cable and listen in the other cable

    constructor(cmp: Roucom=null, paquet_filter: boolean=true, write_on_cable: number=1) {
        // the paquet_filter is for layer two only (on the mac address)
        // default write_on_cable is for computer
        this.mac_addr = NetworkCard.last_avariable_mac_addr + 1
        NetworkCard.last_avariable_mac_addr += 1
        this.port = new Port(this)
        this.ip_addr = new ipv4()
        this.roucom = cmp
        this.paquet_filter = paquet_filter
        this.write_on_cable = write_on_cable
    }

    on_receive(cable_content: [EthernetFrame, EthernetFrame], port: Port) {
        let frame = cable_content[(this.write_on_cable+1)%2]
        if (frame != null && (!this.paquet_filter || (frame.destination === this.mac_addr || frame.destination === 0xFFFFFFFFFFFF))) {
            // add the ip and the mac address of the source to our arp table
            if (frame.content.ip_src != null && frame.source != null) {
                this.roucom.arp_table.set(frame.content.ip_src, frame.source)
            }

            // check the protocole
            if (frame.protocol_layer3 === null) {    // no protocole, we are un layer 2
                let payload = this.get_ethernet_payload(frame)
                let content = this.get_payload_content(payload)
                this.roucom.arrived(content)
            } else if (frame.protocol_layer3 === 0x0800) {    // Internet Protocol version 4 (IPv4)
                let payload = this.get_ethernet_payload(frame)
                if (payload.ip_dest.address === this.ip_addr.address) {    // the paquet is for our us
                    let content = this.get_payload_content(payload)
                    this.roucom.arrived(content)
                } else if (this.roucom.routing_eh) {    // the paquet isn't for us but we route paquets
                    this.route(payload)
                }
            } else if (frame.protocol_layer3 === 0x0806) {    // Address Resolution Protocol (ARP)
                let payload = this.get_ethernet_payload(frame)
                if (ipv4.compare(payload.ip_dest, this.ip_addr)) {
                    this.send("Hey, it's me " + String(this.mac_addr), this.roucom.arp_table.get(payload.ip_src), payload.ip_src, 0X0806)
                }
            }
        }
    }

    route (paquet: IEthernetPayload) {
        // serach who is the gateway to join the network of the destinataire of the paquet
        let gateway: ipv4 = null
        gateway = this.roucom.get_gateway(paquet.ip_dest)

        // now, we know the gateway but we have to chose on which network to send the paquet

        let network_card_idx = null
        network_card_idx = this.roucom.get_network_card_idx_on_network(paquet.ip_dest)

        // we know on which interface to send the paquet if we don't break before

        if (network_card_idx != null) {
            // get the mac address to mac the ethernet frame
            let mac_dest = this.roucom.get_mac_by_ip(gateway, network_card_idx)
            if (mac_dest != null) {
                let content = this.get_payload_content(paquet)
                this.roucom.network_cards[network_card_idx].send(content, mac_dest, paquet.ip_dest, 0x0800)
            }
        }
    }

    broadcast_arp(ip: ipv4) {
        this.send("Who is " + ip.toString + " ?", 0xFFFFFFFFFFFF, ip, 0x0806)
    }

    send(content: any, mac_dest: number, ip_dest: ipv4=null, protocole: number=null) {
        let payload = this.make_ethernet_payload(content, ip_dest)
        let frame = this.make_ethernet_frame(payload, mac_dest, protocole)
        this.port.send(frame, this.write_on_cable)
    }

    make_ethernet_frame(content: IEthernetPayload, destinataire: number, protocole_layer3: number){
        return new EthernetFrame(destinataire, this.mac_addr, protocole_layer3, content, null)
    }

    get_ethernet_payload(frame: EthernetFrame) {
        return frame.content
    }

    make_ethernet_payload(content: String, ip_dest: ipv4) {
        return new  ip_paquet(this.ip_addr, ip_dest, content)
    }

    get_payload_content(payload: IEthernetPayload) {
        return payload.content
    }

    remove() {
        if (this.port.cable != null) {
            this.port.unplug()
        }
        delete(this.port)
    }
}