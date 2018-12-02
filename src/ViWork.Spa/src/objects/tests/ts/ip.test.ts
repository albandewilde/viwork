import "mocha"
import {assert} from "chai"

import {ip} from "../../js/ip"

describe("Create ip object", function() {
    let addr0 = new ip("10.0.1.34/24")
    let addr1 = new ip("192.168.15.91/24")
    let addr2 = new ip("77.179.54.2/20")
    let addr3 = new ip("145.65.95.5/30")
    let addr4 = new ip("100.0.52.12/10")
    let addr5 = new ip("255.255.255.255/1")
    let addr6 = new ip("0.0.0.0/32")
    
    it("the ip.toString", function() {
        assert.strictEqual(addr0.toString(), "10.0.1.34/24")
        assert.strictEqual(addr1.toString(), "192.168.15.91/24")
        assert.strictEqual(addr2.toString(), "77.179.54.2/20")
        assert.strictEqual(addr3.toString(), "145.65.95.5/30")
        assert.strictEqual(addr4.toString(), "100.0.52.12/10")
        assert.strictEqual(addr5.toString(), "255.255.255.255/1")
        assert.strictEqual(addr6.toString(), "0.0.0.0/32")
    })
    it("the network address", function() {
        assert.strictEqual(ip.toString(addr0.network), "10.0.1.0")
        assert.strictEqual(ip.toString(addr1.network), "192.168.15.0")
        assert.strictEqual(ip.toString(addr2.network), "17.179.48.0")
        assert.strictEqual(ip.toString(addr3.network), "145.165.95.4")
        assert.strictEqual(ip.toString(addr4.network), "100.0.0.0")
        assert.strictEqual(ip.toString(addr5.network), "128.0.0.0")
        assert.strictEqual(ip.toString(addr6.network), "0.0.0.0")
    })
    it("the mask", function() {
        assert.strictEqual(ip.toString(addr0.mask), "255.255.255.0")
        assert.strictEqual(ip.toString(addr1.mask), "255.255.255.0")
        assert.strictEqual(ip.toString(addr2.mask), "255.255.240.0")
        assert.strictEqual(ip.toString(addr3.mask), "255.255.255.252")
        assert.strictEqual(ip.toString(addr4.mask), "255.192.0.0")
        assert.strictEqual(ip.toString(addr5.mask), "128.0.0.0")
        assert.strictEqual(ip.toString(addr6.mask), "255.255.255.255")
    })        
    it("the wildcard", function() {
        assert.strictEqual(ip.toString(addr6.wildcard), "0.0.0.0")
        assert.strictEqual(ip.toString(addr5.wildcard), "127.255.255.255")
        assert.strictEqual(ip.toString(addr4.wildcard), "0.63.255.255")
        assert.strictEqual(ip.toString(addr3.wildcard), "0.0.0.3")
        assert.strictEqual(ip.toString(addr2.wildcard), "0.0.15.255")
        assert.strictEqual(ip.toString(addr1.wildcard), "0.0.0.255")
        assert.strictEqual(ip.toString(addr0.wildcard), "0.0.0.255")
    })
    it("the broadcars address", function() {
        assert.strictEqual(ip.toString(addr0.broadcast), "10.0.1.255")
        assert.strictEqual(ip.toString(addr1.broadcast), "192.168.15.255")
        assert.strictEqual(ip.toString(addr2.broadcast), "77.179.63.255")
        assert.strictEqual(ip.toString(addr3.broadcast), "145.65.95.7")
        assert.strictEqual(ip.toString(addr4.broadcast), "100.63.255.255")
        assert.strictEqual(ip.toString(addr5.broadcast), "255.255.255.255")
        assert.strictEqual(ip.toString(addr6.broadcast), "255.255.255.255")
    })
})