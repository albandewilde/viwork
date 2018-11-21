import "mocha"
import {assert} from "chai"

describe("Simple tests", function() {
    it("True must be True", function() {
        assert.strictEqual(true, true)
    })

    // Here i know !
    // all "it" functions are excuted after all expressions and statements
    // here there all tests pass
    let a = 3
    it("3 but 4", function() {
        assert.strictEqual(a, 4)
    })
    a += 1
    it("a real 4", function() {
        assert.strictEqual(a, 4)
    })
})