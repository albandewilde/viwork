import "mocha"
import {assert} from "chai"

import {Computer} from "../../js/computer"
import {Hub} from "../../js/hub"
import {Cable} from "../../js/cable"

// One computer send message to a second but the third don't receive it
describe("Send message to one computer but not the others", function() {
    let cmp1 = new Computer()
    let cmp2 = new Computer()
    let cmp3 = new Computer()
    let hub = new Hub()
    let cab1 = new Cable(false, cmp1.network_cards[0].port, hub.ports[0])
    let cab2 = new Cable(false, cmp2.network_cards[0].port, hub.ports[1])
    let cab3 = new Cable(false, cmp3.network_cards[0].port, hub.ports[2])

    cmp1.send_thing("fun", cmp2.network_cards[0].mac_addr, 0)

    it("The content of the last recv in cmp3 shouldn't fun, because null is the opposite of fun", function() {
        assert.isNull(cmp3.last_recv)
    })
    it("The content of the last recv in cmp2 should be fun", function() {
        assert.strictEqual(cmp2.last_recv, "fun")
    })
})