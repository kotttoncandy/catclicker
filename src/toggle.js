import { animate } from "./animate";

export default class Toggle {
    constructor(x, y, t, id, width, height) {
        this.gameObject = add([
            text(t, {
                font: "font",
            }),
            pos(x, y),
            area(),
            anchor("center"),
            scale(),
            animate(2, 0.1),
            id,
        ]);

        this.r = this.gameObject.add([
            rect(width, height, {
                radius: 20
            }),
            pos(0, height/2+25),
            anchor("center"),
            opacity(0.5),
            color(0,0,0),
            z(-1000)
        ])
        this.tary = y;
        this.y = y;
        this.move = false;
        this.id = id;
    }

    update() {
        if (debug.fps() > 1) {
            this.gameObject.pos.y += ((this.tary - this.gameObject.pos.y) *  (1/ debug.fps())) * 2;

        }
    }

    init() {
        onHoverUpdate("powerup", () => {
            if (isMousePressed()) {
                if (this.move) {
                    this.tary += 300;
                    this.move = !this.move;
                } else {
                    this.tary -= 300;
                    this.move = !this.move;
                }
            }
        });
    }

}
