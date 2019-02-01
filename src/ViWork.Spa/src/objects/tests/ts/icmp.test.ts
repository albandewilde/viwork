import "mocha"
import {assert} from "chai"

import {ipv4} from "../../js/ipv4"
import {new_network} from "./new_network.function_helper.test"

describe("ping - pong", function() {
    let network = new_network()

    it("cmp00 ping cmp11", function() {
        network["cmp00"].ping(0, new ipv4("192.168.1.2/24"))

        assert.strictEqual(network["cmp11"].last_recv, "Echo request - ping")
        assert.strictEqual(network["cmp00"].last_recv, "Echo reply - pong")
    })
    
    it("cmp10 ping cmp12", function() {
        network["cmp10"].ping(0, network["cmp12"].network_cards[0].ip_addr)

        assert.strictEqual(network["cmp12"].last_recv, "Echo request - ping")
        assert.strictEqual(network["cmp10"].last_recv, "Echo reply - pong")
    })

    it("cmp21 ping cmp02", function() {
        network["cmp21"].ping(0, new ipv4("192.168.0.3/24"))

        assert.strictEqual(network["cmp02"].last_recv, "Echo request - ping")
        assert.strictEqual(network["cmp21"].last_recv, "Echo reply - pong")
    })

    // TODO
    // unretchable machine
})