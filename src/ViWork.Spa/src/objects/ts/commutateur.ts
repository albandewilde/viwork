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
    cam: Array<Array<Number>>
    vlan: {}

    constructor(nb_port: number=5) {
        if (nb_port < 3) {
            throw new RangeError("A switch with less than 3 port is pretty useless")
        }
        this.nb_port = nb_port
        this.ports = []
        this.cam = []
        this.vlan = {"vlan0": []}
        for (let idx = 0; idx < this.nb_port; idx += 1) {
            this.ports.push(new Port(this))
            this.vlan["vlan0"].push(idx)
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

    vlan_add(name: string, ports_idx: Array<Number>) {
        if (name === "vlan0") {
            throw new Error("You can't name a vlan like this")
        }

        // check if the vlan name exist
        if (Object.keys(this.vlan).includes(name)) {
            // do nothing if the vlan already exist
            //this.vlan[name] = this.vlan[name].concat(ports_idx)
        } else {
            // create it if he don't exist
            this.vlan[name] = []
        }

        ports_idx.forEach(
            idx => {
                // check if there is no range port error
                if (idx > this.nb_port - 1 || idx < 0) {
                    throw new RangeError("There is no port number n° " + idx + ".")
                }
                // implicite else
                this.vlan[name].includes(idx) ? null : this.vlan[name].push(idx)
                this.vlan["vlan0"].includes(idx) ? this.vlan["vlan0"].splice(this.vlan["vlan0"].indexOf(idx), 1) : null
            }
        )
    }

    vlan_remove(name: string, ports_idx: Array<Number>) {
        if (name === "vlan0") {
            throw new Error("Bad vlan name")
        }
        if (!(Object.keys(this.vlan).includes(name))) {
            throw new Error("There is no vlan named " + name + ".")
        }

        ports_idx.forEach(
            idx => {
                if (this.vlan[name].includes(idx)) {
                    // remove the port number in the vlan
                    this.vlan[name].splice(this.vlan[name].indexOf(idx), 1)

                    // may the port is in another vlan ?
                    let in_other_vlan = false
                    for (let key of Object.keys(this.vlan)) {
                        let value = this.vlan[key]
                        if (key != "vlan0" && value.includes(idx)) {
                            in_other_vlan = true
                            break
                        } else {
                            continue
                        }
                    }

                    // put the port number in the vlan0
                    this.vlan["vlan0"].includes(idx) || in_other_vlan ? null : this.vlan["vlan0"].push(idx)
                } else {
                    throw new Error("The port n° " + idx + " isn't in the vlan " + name + ".")
                }
            }
        )
    }
}