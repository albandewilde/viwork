import {IPortContainer} from "./IPortContainer"
import {Port} from "./port"
import { EthernetFrame } from "./ethernet_frame";

export class Switch implements IPortContainer {
    // el commutator
    // if you don't know what is a switch see this: https://fr.wikipedia.org/wiki/Commutateur_réseau
    // the switch write paquet in the element 0 of a cable and listen in the element 1

    nb_port: number
    ports: Array<Port>
    // this is the cam table of the switch
    // keys are port number and values are mac address
    cam: Array<Array<Number>>    // ça devrai être une liste de liste pour avoir plusieurs addresse sur un port (cas de switch sur switch)

    constructor(nb_port: number=5) {
        if (nb_port < 3) {
            throw new RangeError("A switch with less than 3 port is pretty useless")
        }
        this.nb_port = nb_port
        this.ports = []
        this.cam = []
        for (let idx = 0; idx < this.nb_port; idx += 1) {
            this.ports.push(new Port(this))
            this.cam.push([])
        }
    }

    on_receive(tup: [EthernetFrame, EthernetFrame], port: Port) {
        let paquet = tup[1]
        if (paquet != null) {
            this.send(paquet, port)
        }
    }

    send(frame: EthernetFrame, port: Port) {
        // Add the souce destinataire if we don't have it
        if (!(this.cam[this.ports.indexOf(port)].includes(frame.source))) {
            this.cam[this.ports.indexOf(port)].push(frame.source)
        }

        // if wa have the address of the destinataire in out cam table
        // we send the paquet to him
        // otherwise
        // we send the paquet to every body
        let no_break = true
        for (let idx = 0; idx < this.cam.length && no_break; idx += 1) {
            if (this.cam[idx].includes(frame.destination)) {
                this.ports[idx].send(frame, 0)
                no_break = false
            }
        } if (no_break) {
            this.ports.forEach(
                port => {
                    port.send(frame, 0)
                }
            )
        }
    }
}