import "mocha"
import {assert} from "chai"

import {Computer} from "../../js/computer"
import {Cable} from "../../js/cable"

// delete the network card of a computer
describe("Createa computer and remove his network card", function() {
    let cmp = new Computer()
    cmp.delete_network_card(0)

    it("The computer don't have any network cards", function() {
        assert.strictEqual(cmp.network_cards.length, 0)    // le teste ne fonctionne pas
    })
})

// Remove a network card should remove the good network card
// And if the port of the card was pluget around and the cable don't reference the port
describe("Create computer withe multiple network cards and remove on of them", function() {
    let cmp = new Computer(6)
    let cables = []

    // create our cables
    for (let idx = 0; idx < 6; idx += 1) {
        cables.push(new Cable())
        cables[idx].plug(cmp.network_cards[idx].port)
    }

    cmp.delete_network_card(3)

    it("The computer have one network card in less", function() {
        assert.strictEqual(cmp.network_cards.length, 5)
    })
    it("The 3rd cable in the list must have no reference to a network card", function() {
        assert.deepEqual(cables[3].branched, [null, null])
    })
})