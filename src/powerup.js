import state from "./Globals"
import { animate } from "./animate";

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default class Powerup {
    constructor(x, y, t, func, cost, parent, id, m) {
        this.gameObject = add([
            text(t + `\n`, {
                font: "font",
                align: "center",
                size: 30
            }),
            anchor("center"),
            pos(get(parent)[0].pos.x + x, get(parent)[0].pos.y + y),
            area(),
            scale(),
            animate(1, 0.05),
            z(1000),
            id
        ])
        this.func = func;
        this.cost = cost;
        this.initialCost = cost;
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.t = t;
        this.id = id;
        this.multiplyer = 1;
        this.m = m;
        if (this.id == "cuddling") {
            this.cost = this.initialCost + state.c

        }
        if (this.id == "cool") {
            this.cost = this.initialCost + state.cool

        }
        if (this.id == "elegant") {
            this.cost = this.initialCost + state.elegant
        }
        if (this.id == "buisness") {
            this.cost = this.initialCost + state.buisness
        }
        if (this.id == "doctor") {
            this.cost = this.initialCost + state.doc
        }
    }
    update(vol) {
        if (this.id == "cuddling") {
            this.gameObject.text = this.t + `\nCost: ${Math.round(this.cost)}`
            this.m = state.c

        }
        if (this.id == "cool") {
            this.gameObject.text = this.t + `\nCost: ${Math.round(this.cost)}`
            this.m = state.cool
        }
        if (this.id == "elegant") {
            this.gameObject.text = this.t + `\nCost: ${Math.round(this.cost)}`
            this.m = state.elegant
        }
        if (this.id == "buisness") {
            this.gameObject.text = this.t + `\nCost: ${Math.round(this.cost)}`
            this.m = state.buisness
        }

        if (this.id == "doctor") {
            this.gameObject.text = this.t + `\nCost: ${Math.round(this.cost)}`
            this.m = state.doc
        }

        if (isMousePressed() && get("mouse")[0].isColliding(this.gameObject) && !this.gameObject.paused) {
            if (state.fur >= this.cost) {
                play("kaching", {
                    volume: vol/1.5,
                    seek: 0.4
                })
            }


            if (this.id == "cuddling" && state.fur >= this.cost) {
                state.fur -= this.cost;
                this.func();
                this.cost = this.initialCost + state.c
            }

            if (this.id == "cool" && state.fur >= this.cost) {
                state.fur -= this.cost;
                this.func();
                this.cost = this.initialCost + state.cool

            }
            if (this.id == "elegant" && state.fur >= this.cost) {
                state.fur -= this.cost;
                this.func();
                this.cost = this.initialCost + state.elegant

            }
            if (this.id == "buisness" && state.fur >= this.cost) {
                state.fur -= this.cost;
                this.func();
                this.cost = this.initialCost + state.buisness

            }
            if (this.id == "doctor" && state.fur >= this.cost) {
                state.fur -= this.cost;
                this.func();
                this.cost = this.initialCost + state.doc

            }
            setCookie("state", JSON.stringify(state), 100000000000);


        }
    }


}