import {IEthernetPayload} from "./IEthernetPayload"

export class EthernetFrame {
    destination: number
    source: number
    protocol_layer3: any
    content: IEthernetPayload
    crc: string

    constructor(
        destination: number,
        source: number,
        protocol_layer3: any=null,
        content: IEthernetPayload,
        crc: string=null
    ) {
        this.destination = destination
        this.source = source
        this.protocol_layer3 = this.protocol_layer3
        this.content = content
        this.crc = crc
    }
}