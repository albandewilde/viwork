import {ipv4} from "./ipv4"

export interface IEthernetPayload {
    ip_src: ipv4
    ip_dest: ipv4
    content: String //IIpPayload
}