import { getCanvasAnd2DContext, updateCanvasResolution } from "./canvasUtils";
import { DELTA_TIME, getTouchOrMousePos, isMouseDown, isTouching } from "./globals";
import { subscribeToGlobalEvents } from "./globalEvents";
import { sleep } from "./utils";

// Debug
let posX = 0;
let posY = 0;

// Main
main();

async function main() {
    const { canvas, ctx, error } = getCanvasAnd2DContext()
    if (error) {
        console.error(error);
        return;
    }

    // Not that this does not resize automatically
    // But mobile window does not... resize often anyways
    // On desktop is not noticable easily anyways too
    // Can implement in the future tho
    updateCanvasResolution(canvas);

    // Eg. Mouse and Touch events which update globals
    subscribeToGlobalEvents(canvas);

    // Game Loop
    let isGameActive = true;
    while (isGameActive) {

        // Update Game State
        if (isTouching() || isMouseDown()) {
            posX = getTouchOrMousePos().x - canvas.width / 4;
            posY = getTouchOrMousePos().y - canvas.height / 4;
        }

        // Render
        render(canvas, ctx);

        // DeltaTime
        await sleep(DELTA_TIME * 1000);
    }
}

function render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw
    // TODO : use a design resolution, eg. 1080x1080
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(posX, posY, canvas.width / 2, canvas.height / 2);
}
