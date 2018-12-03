export class ip {
    addresse: number
    mask: number

    constructor(string: string=null) {
        [this.addresse, this.mask] = ip.parse(string)
    }

    static parse(string: string) {
        if (string != null) {
            // assure we only have 1 mask
            if (string.split("/").length > 2) {
                throw new Error("Invalid ip address.")
            }
            let [ip, mask] = string.split("/")

            // assure we only have 4 elements in the addresse
            let ip_addr = ip.split(".")
            if (ip_addr.length != 4) {
                throw new Error("Invalid ip address.")
            }

            // assure we have 4 numbers between 0 and 255
            let addr = []
            for (let nb of ip_addr) {
                try {
                    let nombre = Number(nb)
                    if (nombre < 0 || nombre > 255) {
                        throw new Error()
                        // nothing in the error because we are in try catch
                    }
                    addr.push(nombre)
                } catch {
                    throw new Error("Invalid ip address.")
                }
            }

            let addresse_number: number = (addr[0]<<24) | (addr[1]<<16) | (addr[2]<<8) | (addr[3]) 
            
            let mask_number: number
            if (mask != "") {
                // assure the mask is valid and a number
                try{
                    let nombre = Number(mask)
                    if (nombre < 0 || nombre > 32) {
                        throw new Error()
                    }
                    let bin_mask = "1".repeat(nombre) + "0".repeat(32 - nombre)    // string of the binary mask
                    mask_number = parseInt(bin_mask, 2)
                } catch {
                    throw new Error("Invalid mask")
                }
            } else {
                mask_number = null
            }

            return [addresse_number, mask_number]
        } else {
            return [null, null]
        }
    }

    network_addresse() {
        return this == null ? null : this.addresse & this.mask
    }

    toString() {
        let str = "There is no ip addresse"
        if (this.addresse != null) {
            str = (
                String(this.addresse >> 24) + "." +
                String((this.addresse >> 16) & 255) + "." +
                String((this.addresse >> 8) & 255) + "." +
                String(this.addresse & 255)
            )
        }
        if (this.mask != null) {
            str += "/" + String(this.mask.toString(2).split("1").length - 1)
        }
        return str
    }

    static toString(nombre: number) {
        if (nombre == null) {
            throw new Error("The ip given is null")
        }
        // Convert number to ip addresse but this isn't a realy ip because we don't have mask
        return(
            String(nombre >> 24) + "." +
            String((nombre >> 16) & 255) + "." +
            String((nombre >> 8) & 255) + "." +
            String(nombre & 255)
        )
    }
}