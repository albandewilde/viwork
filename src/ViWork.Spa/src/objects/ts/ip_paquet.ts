import {IEthernetPayload} from "./IEthernetPayload"
import {IIpPayload} from "./IIpPayload"
import {ipv4} from "./ipv4"

export class ip_paquet implements IEthernetPayload {
    ip_src: ipv4
    ip_dest: ipv4
    content: String //IIpPayload

    constructor(
        ip_src: ipv4,
        ip_dest: ipv4,
        content: String//IIpPayload
    ) {
        this.ip_src = ip_src
        this.ip_dest = ip_dest
        this.content = content
    }
}