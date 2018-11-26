import "mocha"
import {assert} from "chai"

import {Switch} from "../../js/commutateur"
import {Computer} from "../../js/computer"
import {Cable} from "../../js/cable"

describe("Create a switch and send some paquets", function() {
    let sw = new Switch()

    let cmp1 = new Computer()
    cmp1.network_cards[0].paquet_filter = false
    let cmp2 = new Computer()
    let cmp3 = new Computer()

    let cab1 = new Cable(false, cmp1.network_cards[0].port, sw.ports[0])
    let cab2 = new Cable(false, cmp2.network_cards[0].port, sw.ports[1])
    let cab3 = new Cable(false, cmp3.network_cards[0].port, sw.ports[2])

    it("cmp3 send message to cmp2 but dut to the empty cam table and the cmp&'s network card config cmp1 and cmp2 get the package", function() {
        cmp3.send_thing("thing", cmp2.network_cards[0].mac_addr, 0)

        assert.strictEqual(cmp2.last_recv, "thing")
        assert.strictEqual(cmp1.last_recv, "thing")
    })
    it("the cmp2 send a message, so he is un the cam table of the switch", function() {
        cmp2.send_thing("pouet", cmp1.network_cards[0].mac_addr, 0)

        assert.deepEqual(cmp2.network_cards[0].mac_addr, sw.cam[1][0])
    })
    it("cmp3 send message to cmp2 and the switch know who is cmp2 so, cmp1 don't receive the paquet", function() {
        cmp3.send_thing("poulet", cmp2.network_cards[0].mac_addr, 0)

        assert.strictEqual(cmp1.last_recv, "pouet")
        assert.strictEqual(cmp2.last_recv, "poulet")
    })
})