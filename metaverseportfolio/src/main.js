import { scaleFactor } from "./constants";
import { k } from "./kaboomContext";

k.loadSprite("character", "./character.png", {

    sliceX: 24,
    sliceY: 2,
    anims: {
        "up": 32,
        "move-up": { from: 32, to: 35, loop: true, speed: 8 },
        "down": 42,
        "move-down": { from: 42, to: 45, loop: true, speed: 8 },
        "left": 41,
        "move-left": {from: 41, to: 38, loop: true, speed: 8 },
        "right": 26,
        "move-right": { from: 26, to: 29, loop: true, speed: 8 }
    }

});

k.loadSprite("map", "./metaverse-new.png");
k.setBackground(k.Color.fromHex("#311047"));

k.scene("mainFunction", async () => {

    const mapData = await (await fetch("./metaverse-new.tmj")).json();
    const layers = mapData.layers;
    const map = k.add([
        k.sprite("map"),
        k.pos(0),
        k.scale(scaleFactor)
    ]);

    const player = k.add([
        k.sprite("character", {anim: "down"} ),
        k.area({
            shape: new k.Rect(k.vec2(0, 3), 10, 10)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(),
        k.scale(scaleFactor),
        {
            speed: 250,
            direction: "down",
            isInDialogue: false,
        }
    ]);

    for (const layer of layers ){
        if( layer.name === "Wall Boundary" ){
            for (const boundary of layer.objects){
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0), boundary.width, boundary.height)
                    }),
                    k.body({isStatic: true}),
                    k.pos(boundary.x, boundary.y),
                    boundary.name,
                ]);

                if( boundary.name ){
                    player.onCollide(boundary.name, () => {
                        player.isInDialogue = true;
                        //TODO: Add dialogue box when player collides with a wall
                    })
                }
            }

            continue;
        }

        if( layer.name === "Spawnpoint" ){
            for (const entity of layer.objects){
                if( entity.name === "player" ){
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor 
                    );
                    k.add(player);
                    continue;
                }
            }
        }
    }

    k.onUpdate( () => {
        k.camPos(player.pos.x, player.pos.y + 100);
    } )

})

//First scene that loads up when the game starts
k.go("mainFunction");

