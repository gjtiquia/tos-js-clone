import { getCanvasAnd2DContext, updateCanvasResolution } from "./canvasUtils";
import { DELTA_TIME, getCanvas, getCtx, getTouchOrMousePos, isMouseDown, isTouching } from "./globals";
import { subscribeToGlobalEvents } from "./globalEvents";
import { sleep } from "./utils";
import { Vector2 } from "./types";

// Globals
const designResolution: Vector2 = { x: 6000, y: 5000 };

// Debug
let posX = 0;
let posY = 0;

// Main
main();

async function main() {
    const { error } = getCanvasAnd2DContext()
    if (error) {
        console.error(error);
        return;
    }

    // Not that this does not resize automatically
    // But mobile window does not... resize often anyways
    // On desktop is not noticable easily anyways too
    // Can implement in the future tho
    updateCanvasResolution();

    // Eg. Mouse and Touch events which update globals
    subscribeToGlobalEvents();

    // Game Loop
    let isGameActive = true;
    while (isGameActive) {

        // Update Game State
        updateGameState();

        // Render
        render();

        // DeltaTime
        await sleep(DELTA_TIME * 1000);
    }
}

function updateGameState() {

    const canvas = getCanvas();
    const ctx = getCtx();

    if (isTouching() || isMouseDown()) {
        posX = getTouchOrMousePos().x - canvas.width / 4;
        posY = getTouchOrMousePos().y - canvas.height / 4;
    }
}

function render() {

    const canvas = getCanvas();
    const ctx = getCtx();

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {

            ctx.beginPath();
            ctx.fillStyle = "#ff0000";

            // TODO : use a design resolution, eg. 1000x1000

            // Circle
            ctx.arc(
                canvas.width / 12 + i * canvas.width / 6,
                canvas.height / 12 + j * canvas.width / 6 + 5,
                canvas.width / 12 - 5,
                0, 2 * Math.PI
            );

            ctx.fill()
        }
    }

    // TODO : use a design resolution, eg. 1000x1000

    ctx.beginPath();
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(posX, posY, canvas.width / 2, canvas.height / 2);
}
