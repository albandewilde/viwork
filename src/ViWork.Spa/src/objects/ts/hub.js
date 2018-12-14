import { Port } from "./port";
export class Hub {
    constructor(nb_ports = 5) {
        if (nb_ports < 3) {
            throw new RangeError("A hub must have more than 3 ports. Otherwise it's a little useless...");
        }
        this.nb_ports = nb_ports;
        this.ports = [];
        for (let idx = 0; idx < this.nb_ports; idx += 1) {
            this.ports.push(new Port(this));
        }
    }
    on_receive(tup, port) {
        let paquet = tup[1];
        this.send(paquet, port);
    }
    send(paquet, current_port) {
        if (paquet != null) {
            this.ports.forEach(port => {
                if (port != current_port) {
                    port.send(paquet, 0); // write the paquet in element 0 and don't change what the cable contain in element 1
                }
            });
        }
    }
}
//# sourceMappingURL=hub.js.map