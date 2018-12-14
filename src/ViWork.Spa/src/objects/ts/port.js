export class Port {
    constructor(contenair = null) {
        this.contenair = contenair;
        this.cable = null;
    }
    plug(cable) {
        if (this.cable != null) {
            throw new Error("There is already a cable in this port ! Don't you see it ?");
        }
        cable.on_plug(this);
        this.cable = cable;
    }
    on_plug(cable) {
        if (this.cable != null) {
            throw new Error("A cable is here why did you try this ? (wtf dude, what are you doing ?).");
        }
        this.cable = cable;
    }
    unplug() {
        if (this.cable == null) {
            throw new Error("WOAW there is nothing here ! How can you expect remove something to nothing ?");
        }
        this.cable.on_unplug(this);
        this.cable = null;
    }
    on_unplug(cable) {
        if (this.cable != cable) {
            throw new Error("You trying to remove a cable which isn't in this port.");
        }
        this.cable = null;
    }
    new_message() {
        this.contenair.on_receive(this.cable.Wire, this);
        this.cable.wire = [null, null]; // remove the paquet in the cable
    }
    send(paquet, wire) {
        if (this.cable != null) {
            this.cable.send(wire ? [this.cable.wire[0], paquet] : [paquet, this.cable.wire[1]], this);
        }
    }
}
//# sourceMappingURL=port.js.map