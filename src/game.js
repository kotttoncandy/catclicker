import Stage from "./stage";

import Powerup from "./powerup";

export default class Game {
    constructor() {
        this.click = 1;
        this.hunger = 100;
        this.security = 100;
        this.energy = 100;
        this.auto = 0;
        this.multiplyer = 1;
        this.fur = 0;
        this.types = [
            "CUDDLING",
        ];
        this.c = 1;
        this.cool = 1;
        this.elegant = 1;
        this.buisness = 1;
        this.doc = 1;
        this.timer = 0;
    }
}
