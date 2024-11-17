import { k } from "./kaboomContext";

k.loadSprite("spritesheet", "./character.png", {
    sliceX: 24,
    sliceY: 1,
    anims: {
        "idle-down": 42,
        "walk-down": { from: 42, to: 45, loop: true, speed: 8 },
        "idle-left": 41,
        "walk-left": { from: 41, to: 38, loop: true, speed: 8 },
        "idle-right": 26,
        "walk-right": { from: 26, to: 29, loop: true, speed: 8 },
        "idle-up": 32,
        "walk-up": { from: 32, to: 35, loop: true, speed: 8 }
    }
})

k.loadSprite("map", "./metaverse.png");

k.setBackground(k.Color.fromHex("#311047"));