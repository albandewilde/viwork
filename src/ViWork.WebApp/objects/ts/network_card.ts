import {IPortContainer} from "./IPortContainer"
import {Port} from "./port"
import {EthernetFrame} from "./ethernet_frame"
import {IEthernetPayload} from "./IEthernetPayload"
import {Computer} from "./computer"

export class NetworkCard implements IPortContainer {
    static last_avariable_mac_addr: number = 0x0
    ip_addr: number[]
    mac_addr: number
    port: Port
    computer: Computer
    // network_cards write paquet in the element 1 of a cable and listen in the element 0

    constructor(cmp: Computer=null) {
        this.mac_addr = NetworkCard.last_avariable_mac_addr + 1
        NetworkCard.last_avariable_mac_addr += 1
        this.port = new Port(this)
        this.ip_addr = [0, 0, 0, 0]
        this.computer = cmp
    }

    get Mac_addr() {return this.mac_addr}

    on_receive(cable_content: [EthernetFrame, EthernetFrame], port: Port) {
        let frame = cable_content[0]
        if (frame != null) {
            let payload = this.get_ethernet_frame(frame)
            this.computer.arrived(payload)
        }
    }

    send(content: any, dest: number) {
        let frame = this.make_ethernet_frame(content, dest)
        this.port.send(frame, 1)
    }

    make_ethernet_frame(content: IEthernetPayload, destinataire: number){
        return new EthernetFrame(destinataire, this.mac_addr, null, content, null)
    }

    get_ethernet_frame(content: EthernetFrame) {
        return content.content
    }

    remove() {
        if (this.port.cable != null) {
            this.port.unplug()
        }
        delete(this.port)
    }
}