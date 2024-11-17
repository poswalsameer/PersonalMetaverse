import kaboom from "kaboom";

export const k = kaboom({
    global: false,
    touchToMouse: true,
    canvas: document.getElementById("game") as HTMLCanvasElement,
    width: 800,
    height: 600,
    background: [49, 16, 71], // #311047 in RGB format
})