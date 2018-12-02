import {IEthernetPayload} from "./IEthernetPayload"
import {IIpPayload} from "./IIpPayload"

export class ip_paquer implements IEthernetPayload {
    ip_src: [number, number, number, number]
    ip_dest: [number, number, number, number]
    content: IIpPayload

    constructor(
        ip_src: [number, number, number, number],
        ip_dest: [number, number, number, number],
        content: IIpPayload
    ) {
        this.ip_src = ip_src
        this.ip_dest = ip_dest
        this.content = content
    }
}