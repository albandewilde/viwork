import "mocha"
import {assert} from "chai"

import {Computer} from "../../js/computer"

describe("Create computer", function() {
    it("Create computer should create new network card which reference the computer", function() {
        let cmp = new Computer()
        assert.isNotNull(cmp.network_cards[0])
        assert.strictEqual(cmp.network_cards[0].computer, cmp)
    })
})

// multiple cards
// add card
// delete a card