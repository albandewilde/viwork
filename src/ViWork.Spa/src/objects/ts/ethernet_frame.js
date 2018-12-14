export class EthernetFrame {
    constructor(destination, source, protocol_layer3 = null, content, crc = null) {
        this.destination = destination;
        this.source = source;
        this.protocol_layer3 = protocol_layer3;
        this.content = content;
        this.crc = crc;
    }
}
//# sourceMappingURL=ethernet_frame.js.map