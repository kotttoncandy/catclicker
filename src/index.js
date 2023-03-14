import kaboom from "kaboom"
import Toggle from "./toggle"
import { animate } from "./animate";
import Powerup from "./powerup";
import Stage from "./stage"
import state from "./Globals"
import Game from "./game";

GamePix.loaded()
var blocker = 1;

function adblockDetection(event) {
    if (event.hasAdblock) {
        blocker = 2;
    } else {
        blocker = 1
    }
}

function roundNearestTenth(x) {
    return Math.round(10 * x) / 10;
}


var vol = 1;

let x = document.querySelector(".ad-zone");
let x_height = x.offsetHeight;
let msg = document.getElementById("msg")
     
if(x_height){
    blocker = 1;
} else{
    blocker = 2;
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

kaboom({
    background: [222, 222, 222],
    crisp: true,
    canvas: document.querySelector("#mycanvas"),
    height: 615,
    width: 1128,
    debug: false,
    texFilter: "nearest"
});

var s = (width / 1680) / ((945 / height))

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

loadShader("outline",
    `vec4 vert(vec2 pos, vec2 uv, vec4 color) {
    // predefined functions to get the default value by kaboom
    return def_vert();
}`,
    `vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
    // turn everything blue-ish
    return def_frag() * vec4(1, 1, 1, 1);
}`, false)

loadSound("angry", "sfx/angry.wav");
loadSound("lion", "sfx/lion.wav");
loadSound("wild", "sfx/wild.wav");
loadSound("regular", "sfx/regular.wav");
loadSound("music", "music/music.mp3");
loadSound("kaching", "sfx/kaching.mp3");

var sounds = [
    "regular",
    "wild",
    "lion",
    "angry",
    "regular",
    "wild",
    "angry",

]

function getCookie(name) {
    var name = name + '=';
    var cookies = decodeURIComponent(document.cookie).split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c;
        }
    }
}

loadFont("font", "font.ttf")
loadSprite("cat", "images/cat.png", {
    sliceX: 2,
    sliceY: 3,
    anims: {
        idle: {
            from: 0,
            to: 4,
            loop: true
        },
    },
});

loadSprite("glassesInvert", "images/glassesInvert.png")
loadSprite("glasses", "images/glasses.png")
loadSprite("switch", "images/switch.png")
loadSprite("bow", "images/bow.png")
loadSprite("hat", "images/hat.png")
loadSprite("fur", "images/fur.png")
loadSprite("cap", "images/cap.png")
loadSprite("voice", "images/voice.png")
loadSprite("background", "images/background.png")

var light = true;

var ps = []

var m = 1
var r = 1;

var type = "CUDDLING";
var i = 0;
function save() {
    setCookie("state", JSON.stringify(state), 100000000000);
}

var music = play("music", {
    loop: true,
    volume: 0.1
})

scene("title", () => {
    var cat = add([
        sprite("cat"),
        animate(1, 0.05),
        scale(1),
        anchor("center"),
        pos(center().x + 210, center().y + 50),
        area(),
    ])


    add([
        rect(400, height()),
        pos(200, center().y),
        area(),
        anchor("center"),
        color(0,0,0),
        opacity(0.3),
        z(-1000)
    ])
    var start = add([
        area(),
        text("START", {
            font: "font",
            size: 60
        }),
        color(255, 255, 255),
        anchor("center"),
        pos(200, center().y),
        animate(1, 0.05),
        scale(),
        outline(4),
        z(1000)
    ])


    var title = add([
        pos(center().x+250, 75),
        anchor("center"),
        text("BONGO CAT \nCLICKER", {
            font: "font",
            size: 60,
            align: "center"
        }),
        color(0, 0, 0),
        scale(),
        animate(1, 0.05)
    ])

    var back = add([
        rect(100000, 10000),
        anchor("center"),
        pos(center()),
        z(10000),
        opacity(0),
        color(255, 192.01500, 202.98)
    ])

    var t = null;

    start.onHoverUpdate(() => {
        if (isMousePressed()) {
            var t = tween(back.opacity, 1, 0.5, (y) => back.opacity = y, easings.linear).then(() => {
                go("game")
                t.cancel()
            })
        }
    })

    cat.play("idle")

    const effects = {

        light: () => ({
            "u_radius": 200,
            "u_blur": 200,
            "u_resolution": vec2(1110, 600),
            "u_mouse": center(),
        }),
    }

    for (let cat = 0; cat < 20; cat++) {
        var temp = add([
            sprite("cat"),
            rotate(rand(-360, 360)),
            move(90, 120),
            pos(rand(50, width()), rand(0, -height())),
            scale(0.2),
            area(),
            anchor("center"),
            "displayCat"
        ])

        var chance = randi(0, 4);
        if (chance == 3) {
            temp.add([
                sprite("hat"),
                anchor("center"),
                area(),
                scale(0.3),
                rotate(20),
                pos(40, -120),
            ])

        }
        if (chance == 2) {
            temp.add([
                sprite("cap"),
                anchor("center"),
                area(),
                scale(0.3),
                rotate(20),
                pos(40, -120),
            ])

        }
    }


    onUpdate(() => {
        music.volume = vol * 0.2;

        for (var i = 0; i < get("displayCat").length; i++) {
            if (debug.fps() > 1) get("displayCat")[i].angle += 120/debug.fps();

            if (get("displayCat")[i].pos.y > height() + 50) {
                get("displayCat")[i].pos.y = -50;
                get("displayCat")[i].pos.x = rand(50, width());
            }
        }
    })

})

scene("game", () => {

    var back2 = add([
        rect(100000, 10000),
        anchor("center"),
        pos(center()),
        z(10000),
        opacity(1),
        color(222, 222, 222)
    ])

    tween(back2.opacity, 0, 1, (y) => back2.opacity = y, easings.linear).then(() => {
        destroy(back2)
    })

    var increase = add([
        text("")
    ])

    var mouse = add([
        rect(2, 2),
        area(),
        pos(),
        "mouse",
    ])


    var powerups = add([
        rect(500, 10000, {
            radius: 10
        }),
        pos(center().x + 420, center().y),
        area(),
        anchor("center"),
        outline(4),
        scale(),
        "powerup"
    ])

    const effects = {

        light: () => ({
            "u_radius": 200,
            "u_blur": 200,
            "u_resolution": vec2(1110, 600),
            "u_mouse": center(),
        }),
    }

    var borderMeter = add([
        rect(50, 250),
        pos(50, height() - 150),
        anchor("center"),
        outline(5),
        area(),
    ])

    var value = 0;

    var meter = borderMeter.add([
        rect(45, 245),
        anchor("bot"),
        pos(0, 123),
        area(),
        scale(),
        color(rgb(0, 222, 222))
    ])

    const effect = Object.keys(effects)[0]


    var player = add([
        sprite("cat", {
            anim: "idle",
        }),
        area({
            scale: vec2(1, 0.8)
        }),
        pos(center().x - 150, center().y),
        anchor("center"),
        scale(0.7),
        animate(1, 0.05),
        shader("outline")

    ]);

    var glasses = player.add([
        sprite("glassesInvert"),
        pos(-25, 2),
        anchor("center"),
        rotate(20),
        color(255, 255, 255),
        scale(0.4),
    ])

    var hat = player.add([
        sprite("hat"),
        anchor("center"),
        area(),
        scale(0.3),
        rotate(20),
        pos(40, -120),
    ])

    var cap = player.add([
        sprite("cap"),
        anchor("center"),
        area(),
        scale(0.3),
        rotate(20),
        pos(40, -120),
    ])

    // stages

    var c = new Stage([
        new Powerup(-50, -220, "Soft Hands\n+1 Fur Per Click", function () {
            state.click += 1
            state.c += Math.random() + 2;

        }, 2, "powerup", "cuddling", state.c),

        new Powerup(-50, -100, "Auto Petter\n+1 Fur Per Second", function () {
            state.auto += 1
            state.c += Math.random() + 2;

        }, 50, "powerup", "cuddling", state.c),
        new Powerup(-55, 20, "Auto Petter 2.0\n+5 Furs Per Second", function () {
            state.auto += 5;
            state.c += rand(1, 2);

        }, 100, "powerup", "cuddling"),
    ], 0, 0, "CUDDLING", state.c)


    var cool = new Stage([


        new Powerup(-50, -220, "Soft Hands\n+1 Fur Per Click", function () {
            state.click += 1
            state.cool += Math.random() + 2;

        }, 2, "powerup", "cool", state.cool),
        new Powerup(-50, -80, "Auto Belly \nRubs\n+10 Furs Per Second", function () {
            state.auto += 10;
            state.cool += Math.random() + 2;

        }, 100, "powerup", "cool", state.cool),

        new Powerup(-50, 80, "Super Soft \nHands\n +20 Furs Per Click", function () {

            state.click += 20;
            state.cool += Math.random() + 2;

        }, 120, "powerup", "cool", state.cool),
    ], 1, 10000, "COOL")

    var elegant = new Stage([
        new Powerup(-50, -200, "Soft Hands\n+1 Fur Per Click", function () {

            state.click += 1
            state.elegant += Math.random() + 2;

        }, 2, "powerup", "elegant", state.elegant),
        new Powerup(-50, -80, "Auto Cuddler\n+30 Furs Per Second", function () {

            state.auto += 30;
            state.elegant += Math.random() + 2;

        }, 200, "powerup", "elegant", state.elegant),

        new Powerup(-50, 40, "Scratches\n+4 Furs Per Second", function () {
            state.auto += 10;
            state.elegant += Math.random() + 2;

        }, 50, "powerup", "elegant", state.elegant),
    ], 2, 500000, "ELEGANT")


    var buisness = new Stage([
        new Powerup(-50, -200, "Soft Hands\n+1 Fur Per Click", function () {

            state.click += 1
            state.buisness += Math.random() + 2;

        }, 2, "powerup", "buisness", state.buisness),
        new Powerup(-50, -80, "Stonks\n+100 Furs Per Second", function () {
            state.auto += 30;
            state.buisness += Math.random() + 2;

        }, 500, "powerup", "buisness", state.buisness),

        new Powerup(-50, 40, "Milk\n+50 Furs Per Click", function () {

            state.click += 50;
            state.buisness += Math.random() + 2;

        }, 225, "powerup", "buisness", state.buisness),
    ], 3, 5000000, "BUISNESS")

    var doc = new Stage([
        new Powerup(-50, -200, "Soft Hands\n+1 Fur Per Click", function () {

            state.click += 1
            state.doc += Math.random() + 2;

        }, 2, "powerup", "doctor", state.doc),
        new Powerup(-50, -80, "Cancer-FREE Cat\n+150 Furs Per \nSecond", function () {
            state.auto += 150;
            state.doc += Math.random() + 2;

        }, 400, "powerup", "doctor", state.doc),

        new Powerup(-50, 50, "Vaccinated Cat\n+30 Furs Per Click", function () {

            state.click += 30;
            state.doc += Math.random() + 2;

        }, 300, "powerup", "doctor", state.doc),
        new Powerup(-50, 180, "Super Duper \nSoft Hands\n+200 Furs Per Click", function () {

            state.click += 200;
            state.doc += Math.random() + 2;

        }, 500, "powerup", "doctor", state.doc),
    ], 4, 10000000, "DOCTOR")

    var t = add([
        text(`${state.types[i]} Cat!`, {
            font: "font",
            size: 60,
        }),
        pos(center().x - 150, 100),
        area(),
        anchor("center"),
        scale(),
        color(0,0,0),
        animate(3, 0.04),
    ])

    var back = add([
        circle(50),
        pos(120, height - 130),
        scale(),
    ])

    var sw = back.add([
        sprite("switch"),
        scale(0.2),
        area(),
        color(),
        anchor("center")
    ]);

    var v = add([
        text(`Volume (${vol})`, {
            font: "font",
        }),
        pos(width() - 120, height() - 20),
        area(),
        color(0, 0, 0),
        anchor("center"),
        scale(0.7),
    ]);

    var a = v.add([
        text(">", {
            font: "font"
        }),
        color(0, 0, 0),
        pos(140, 0),
        area(),
        anchor("center"),
    ])

    var s = v.add([
        text("<", {
            font: "font"
        }),
        color(0, 0, 0),
        pos(-145, 0),
        area(),
        anchor("center"),
    ])

    var isActive = false;

    s.onHoverUpdate(() => {
        if (isMousePressed()) {
            vol -= 0.1;
        }
    })

    a.onHoverUpdate(() => {
        if (isMousePressed()) {
            vol += 0.1;

        }
    })

    onKeyPress("s", () => {
        save();
        var cook = getCookie("state");
        cook = cook.replace("state=", "")
        console.log(JSON.parse(cook))
    })

    sw.paused = true;

    var resolutionNorm = 1800 + 956;
    var currentRes = width + height;
    var average = (resolutionNorm / currentRes)

    var focus = vec2(center().x - 150, center().y)


    for (const effect in effects) {
        loadShaderURL(effect, null, `src/${effect}.frag`)
    }
    var arrow1 = player.add([
        text(">", {
            font: "font",
            size: 60,
        }),
        pos(300, 0),
        anchor("center"),
        scale(),
        animate(1, 0.1),
        area(),
        z(10),
        color(0, 0, 0)
    ])

    var arrow2 = player.add([
        text("<", {
            font: "font",
            size: 60,
        }),
        pos(-300, 0),
        anchor("center"),
        scale(),
        animate(1, 0.1),
        area(),
        color(0, 0, 0)

    ])

    arrow1.onHoverUpdate(() => {
        if (isMousePressed()) {
            if (i < 4) i++;
        }
    })

    arrow2.onHoverUpdate(() => {
        if (isMousePressed()) {
            if (i > 0) i -= 1;
        }
    })

    var bow = player.add([
        sprite("bow"),
        pos(-40, 50),
        anchor("center"),
        rotate(10),
        color(255, 255, 255),
        z(1),
        scale(0.3),
    ])

    var glassesInvert = player.add([
        sprite("glasses"),
        pos(-25, 2),
        anchor("center"),
        rotate(20),
        color(255, 255, 255),
        scale(0.4),

    ])

    setGravity(1600)

    const score = add([
        text("Fur: 0", {
            font: "font",
            size: 60,
        }),
        pos(center().x - 150, height() - 100),
        scale(),
        color(0, 0, 0),
        animate(2, 0.05),
        anchor("center"),
        z(1000),
    ])

    // invert
    function invert(color) {
        score.color = color;
        t.color = color;
        sw.color = color;
    }

    // 2x ad

    var button = add([
        rect(100, 100, {
            radius: 0
        }),
        anchor("center"),
        pos(width() - 325, height() - 60),
        outline(3),
        scale(),
        area()
    ])

    var b2 = button.add([
        anchor("center"),
        area(),
        text("2x Fur\n(Ad)", {
            align: "center",
            font: "font",
            size: 24,
        }),
        scale(),
        color(0, 0, 0),
    ])
    let curTween = null

    //debug.paused = true

    function giveReward() {
        debug.paused = false;
        r = 2;
        let indicator = add([
            text("2x", {
                font: "font",
                size: 40
            }),
            pos(rand(50, width() - 50), 0),
            area(),
            color(0, 0, 0),
            offscreen({ destroy: true }),
        ]);


        tween(indicator.pos, vec2(indicator.pos.x, height()), 10, (y) => indicator.pos = y, easings.linear);

        setTimeout(() => {
            r = 1;

        }, 10000);
        debug.paused = false;
    }

    button.onHoverUpdate(() => {
        if (isMousePressed()) {
            if (blocker == 1) {
                if (state.timer <= 0) {
                    debug.paused = true;

                    GamePix.rewardAd().then(function (res) {
                        if (res.success) {
                            giveReward();
                            state.timer = 300;

                        } 
                      });                    
                } else {
                    add([
                        text(`You Need to Wait ${roundNearestTenth(roundNearestTenth(state.timer) / 60)} Minutes`, {
                            size: 30,
                            align: "center",
                            font: "font",
                        }),
                        color(0, 0, 0),
                        pos(356, 25),
                        anchor("center"),
                        lifespan(2),
                    ])
                }

                //300000
            } else {
                add([
                    text("AD BLOCKER DETECTED", {
                        size: 50,
                        align: "center",
                        font: "font",
                    }),
                    color(0, 0, 0),
                    pos(356, 25),
                    anchor("center"),
                    lifespan(2),
                ])
            }
        }
    })


    // click

    player.onHoverUpdate(() => {
        if (isMousePressed("left") && state.types[i]) {
            if (!curTween) {
                state.fur += state.click * ((m * r) / blocker);
                var me = play(sounds[Math.floor(Math.random() * sounds.length)], {
                    volume: 0.15 * vol,
                    speed: 1.2
                })

                if (value < 245) value += 5;

                add([
                    sprite("fur"),
                    pos(mousePos()),
                    anchor("center"),
                    rotate(Math.floor(Math.random() * -180) + 90),
                    scale(0.2),
                    move(rand(-180, 300), 500),
                    area({
                        scale: vec2(0.10, 0.1)
                    }),
                    offscreen({ destroy: true }),
                    "fur"
                ])

                // start the tween
                curTween = tween(
                    // start value (accepts number, Vec2 and Color)
                    player.scale,
                    // destination value
                    vec2(0.8, 0.8),
                    // duration (in seconds)
                    0.1,
                    // how value should be updated
                    (val) => player.scale = val,
                    // interpolation function (defaults to easings.linear)
                    easings.easeInQuad,
                )

                setTimeout(() => {
                    curTween = tween(
                        // start value (accepts number, Vec2 and Color)
                        player.scale,
                        // destination value
                        vec2(0.7, 0.7),
                        // duration (in seconds)
                        0.1,
                        // how value should be updated
                        (val) => player.scale = val,
                        // interpolation function (defaults to easings.linear)
                        easings.easeInQuad,
                    )
                }, 100)

                setTimeout(() => {
                    curTween.cancel();
                    curTween = null;
                }, 200)
            }

        }
    })

    let tw = null

    player.onHover(() => {
        if (tw) tw.cancel();
        // start the tween
        tw = tween(
            // start value (accepts number, Vec2 and Color)
            focus,
            // destination value
            player.pos,
            // duration (in seconds)
            0.2,
            // how value should be updated
            (val) => focus = val,
            // interpolation function (defaults to easings.linear)
            easings.easeOutQuad,
        )

    })

    powerups.onHover(() => {
        if (tw) tw.cancel();

        tw = tween(
            // start value (accepts number, Vec2 and Color)
            focus,
            // destination value
            powerups.pos,
            // duration (in seconds)
            0.2,
            // how value should be updated
            (val) => focus = val,
            // interpolation function (defaults to easings.linear)
            easings.easeOutQuad,
        )
    })


    sw.onHoverUpdate(() => {
        if (isMousePressed("left")) {
            light = !light;
        }
    })

    const effect2 = Object.keys(effects)[1]

    console.log(meter);

    onUpdate(() => {
        save();

        if (vol > 2) {
            vol = 2;
        }

        if (vol < 0) {
            vol = 0;
        }

        volume(vol*3);

        v.text = `Volume (${roundNearestTenth(vol)})`

        music.volume = vol * 0.1;

        if (debug.fps() > 1 && state.timer > 0) state.timer -= 1 / debug.fps();

        if (value > 0 && debug.fps() > 1) {
            value -= 6 / debug.fps();
        }

        if (value >= 240) {
            add([
                text("2x Fur", {
                    font: "font"
                }),
                area(),
                pos(rand(50, width()), -100),
                offscreen({ destroy: true }),
                color(0, 0, 0),
                move(90, 1200)
            ])
            m = 2;

        } else {
            m = 1;
        }

        if (debug.fps() > 1) meter.scale.y += (value/245 - meter.scale.y) * (3 / debug.fps());


        score.text = `Fur: ${Math.round(state.fur)}`;

        t.text = `${state.types[i]} CAT!`


        mouse.pos = mousePos();

        if (state.types[i] == "CUDDLING") {
            ps = [];
            ps = c.powerups;

        }
        if (state.types[i] == "COOL") {
            ps = [];
            ps = cool.powerups;
            cool.activated = true;

        }
        if (state.types[i] == "ELEGANT") {
            ps = []
            ps = elegant.powerups;
            elegant.activated = true;

        }

        if (state.types[i] == "BUISNESS") {
            ps = []
            ps = buisness.powerups;
            buisness.activated = true;

        }

        if (state.types[i] == "DOCTOR") {
            ps = []
            ps = doc.powerups;
            doc.activated = true;

        }

        if (state.types[i] == undefined) {
            ps = [];

        }


        if (i == 0) {
            glasses.opacity = 0;
            glassesInvert.opacity = 0
            bow.opacity = 0;
            hat.opacity = 0;
            cap.opacity = 0;
        }

        if (i == 1) {
            glasses.opacity = 1;
            glassesInvert.opacity = 1;
            bow.opacity = 0;
            hat.opacity = 0;
            cap.opacity = 0;
        }

        if (i == 2) {
            glasses.opacity = 0;
            glassesInvert.opacity = 0;
            bow.opacity = 1;
            hat.opacity = 0;
            cap.opacity = 0;
        }

        if (i == 3) {
            glasses.opacity = 0;
            glassesInvert.opacity = 0;
            bow.opacity = 0;
            hat.opacity = 1;
            cap.opacity = 0;      
        }

        if (i == 4) {
            glasses.opacity = 0;
            glassesInvert.opacity = 0;
            bow.opacity = 0;
            hat.opacity = 0;
            cap.opacity = 1;
        }


        if (state.types.includes("CUDDLING") && !c.activated) {
            c.activated = true;
        }

        // cuddling reset

        if (i != c.i) {
            for (var a = 0; a < get("cuddling").length; a++) {
                get("cuddling")[a].opacity = 0
            }
        }

        // cool reset
        if (i != cool.i) {
            for (var b = 0; b < get("cool").length; b++) {
                get("cool")[b].opacity = 0
            }
        }

        // elegant reset

        if (i != elegant.i) {
            for (var b = 0; b < get("elegant").length; b++) {
                get("elegant")[b].opacity = 0
            }
        }

        // buisness reset
        if (i != buisness.i) {
            for (var b = 0; b < get("buisness").length; b++) {
                get("buisness")[b].opacity = 0
            }
        }

/*
        for (let toggle = 0; toggle < toggles.length; toggle++) {
            toggles[toggle].update();
            if (!light) {
                toggles[toggle].gameObject.color = rgb(255, 255, 255)
                toggles[toggle].r.color = rgb(0, 0, 0)


            } else {
                toggles[toggle].gameObject.color = rgb(0, 0, 0)
                toggles[toggle].r.color = rgb(255, 255, 255)

            }
        }
*/
        c.update(i, state.fur, vol);
        cool.update(i, state.fur, vol);
        elegant.update(i, state.fur, vol);
        buisness.update(i, state.fur, vol);
        doc.update(i, state.fur, vol);

        for (var f = 0; f < get("fur").length; f++) {
            get("fur")[f].angle += 120 / debug.fps();
        }
    })

    usePostEffect(effect, effects[effect]())

    setInterval(() => {
        state.fur += state.auto * ((m * r) / blocker);
        save()
    }, 1000)

})

go("title");
