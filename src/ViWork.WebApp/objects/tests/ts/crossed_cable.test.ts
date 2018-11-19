import {Cable} from "../../js/cable"
import {EthernetFrame} from "../../js/ethernet_frame"
import {Computer} from "../../js/computer"
import "mocha"
import {assert} from "chai"
import { Port } from "../../js/port";

// Test the cross of cable

/*describe("Create uncrossed cable and get his content", function() {
    let computer = new Computer()
    let p1 = new Port()
    let p2 = new Port()
    let cable = new Cable(false, p1, p2)
    let frame = new EthernetFrame()

    p1.send(frame, 0)

})*/