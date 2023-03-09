import { animate } from "./animate";
import state from "./Globals"

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


export default class Stage {
    constructor(powerups, i, cost, type) {
        this.button = add([
            text(`ACTIVATE (${cost} Fur)`, {
                font: "font",
                textAlign: "center"
            }),
            pos(center().x-150, height()-30),
            anchor("center"),
            scale(),
            animate(1, 0.1),
            color(0,0,0),
            area(),
        ])
        this.powerups = powerups;
        this.activated = false;
        this.i = i;
        this.visible = false;
        this.cost = cost;
        this.type = type;
    }

    update(i, fur, vol) {
        if (i == this.i && !this.activated) {
            this.button.onHoverUpdate(() => {
                if (isMousePressed()) {
                    if (fur >= this.cost) {
                        this.activated = true;
                        fur -= this.cost;
                        state.fur = fur;
                        state.types[this.i] = this.type;
                        setCookie("state", JSON.stringify(state), 100000000000);
                    }
                }
            })
        }

        for (let pw = 0; pw < this.powerups.length; pw++) {
            this.powerups[pw].update(vol);
            this.powerups[pw].gameObject.color = rgb(0, 0, 0)

        }
        if (this.activated) {
            destroy(this.button);
        }

        if (i == this.i) {

            if (this.button.paused) {
                this.button.paused = false;
                this.button.opacity = 1;

            }

            if (this.activated) {
                for (var i = 0; i < this.powerups.length; i++) {
                    this.powerups[i].gameObject.opacity = 1;
                    this.powerups[i].gameObject.paused = false;

                }
            } else {
                for (let i = 0; i < this.powerups.length; i++) {
                    this.powerups[i].gameObject.opacity = 0;
                    this.powerups[i].gameObjectpaused = true;

                }
            }

        } else {
            this.button.paused = true;
            this.button.opacity = 0

            for (let i = 0; i < this.powerups.length; i++) {
                this.powerups[i].gameObject.opacity = 0;
                this.powerups[i].gameObject.paused = true;
            }
        }
    }
}