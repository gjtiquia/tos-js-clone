import { gameToCanvasPos, getCanvasAnd2DContext, updateCanvasResolution } from "./canvasUtils";
import { DELTA_TIME, DESIGN_RESOLUTION, getCanvas, getCtx, getTouchOrMousePos, isMouseDown, isTouching } from "./globals";
import { subscribeToGlobalEvents } from "./globalEvents";
import { sleep } from "./utils";
import { Vector2 } from "./types";

// Globals
const designResolution: Vector2 = { x: 6000, y: 5000 };

// Debug
let pos: Vector2 = { x: 0, y: 0 };

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
        pos.x = getTouchOrMousePos().x - designResolution.x / 4;
        pos.y = getTouchOrMousePos().y - designResolution.y / 4;
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

            // Circle
            const unit = DESIGN_RESOLUTION.x / 6;

            const padding = unit / 10;
            const radius = unit / 2 - padding / 2;

            const x = unit / 2 + i * unit;
            const y = unit / 2 + j * unit;

            const canvasPos = gameToCanvasPos({ x, y });
            const canvasRadius = gameToCanvasPos({ x: radius, y: radius }).x;

            ctx.arc(canvasPos.x, canvasPos.y, canvasRadius, 0, 2 * Math.PI);
            ctx.fill()
        }
    }

    ctx.beginPath();
    ctx.fillStyle = "#0000ff";

    const boxCanvasPos = gameToCanvasPos(pos);
    ctx.fillRect(boxCanvasPos.x, boxCanvasPos.y, canvas.width / 2, canvas.height / 2);
}
