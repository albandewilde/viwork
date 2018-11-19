import "mocha"
import {assert} from "chai"

import {NetworkCard} from "../../js/network_card"

describe("Create network card", function() {
    it("Create network card should create new port which reference the network card", function() {
        let card = new NetworkCard()
        assert.isNotNull(card.port)
        assert.strictEqual(card.port.contenair, card)
    })
})