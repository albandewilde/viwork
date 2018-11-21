import "mocha"
import {assert} from "chai"

import {Computer} from "../../js/computer"

// The default constructor
describe("Create computer", function() {
    it("Create computer should create new network card which reference the computer", function() {
        let cmp = new Computer()
        assert.isNotNull(cmp.network_cards[0])
        assert.strictEqual(cmp.network_cards[0].computer, cmp)
    })
})

// Computer with no net network card
describe("Create computer no network card", function() {
    let cmp = new Computer(0)
    
    it("The computer haven't any network cards", function() {
        assert.isEmpty(cmp.network_cards)
    })
})

// Computer constructor with multiple network card
describe("Create computer with 6 network cards which reference the computer", function() {
    let cmp = new Computer(6)

    it("The computer have 6 network cards", function() {
        assert.strictEqual(cmp.network_cards.length, 6)
    })

    it("The six network cards reference the computer", function() {
        cmp.network_cards.forEach(
            card => {
                assert.strictEqual(card.computer, cmp)
            }
        )
    })
})

// add network card to computer without one
describe("Create computer without network card and add a network card", function() {
    let cmp = new Computer(0)
    cmp.add_network_card()

    it("The computer reference the network card", function() {
        assert.strictEqual(cmp.network_cards.length, 1)
        assert.typeOf(cmp.network_cards[0], "object")
    })
    it("The network card reference the computer", function() {
        assert.strictEqual(cmp.network_cards[0].computer, cmp)
    })
})

// Add multiple network card on a computer
describe("Create computer with 6 network cards which reference the computer", function() {
    let cmp = new Computer()

    for (let idx = 5; idx > 0; idx -= 1) {cmp.add_network_card()}

    it("The computer have 6 network cards", function() {
        assert.strictEqual(cmp.network_cards.length, 6)
    })

    it("The six network cards reference the computer", function() {
        cmp.network_cards.forEach(
            card => {
                assert.strictEqual(card.computer, cmp)
            }
        )
    })
})