// Game Properties
const TICK_RATE = 2;
const DELTA_TIME = 1 / TICK_RATE;

// Globals
let pos = 0;

// Main
main();

async function main() {
    const { canvas, ctx, error } = getCanvasAnd2DContext()
    if (error) {
        console.error(error);
        return;
    }

    // Not that this does not resize automatically
    updateCanvasResolution(canvas);

    let isGameActive = true;
    while (isGameActive) {

        // Update Game State
        if (pos >= 0 && pos < canvas.width / 2) {
            pos += 1;
        }

        // Render
        render(canvas, ctx);

        // DeltaTime
        await sleep(DELTA_TIME);
    }
}

function render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw
    // TODO : use a design resolution, eg. 1080x1080
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(pos, 0, canvas.width / 2, canvas.height / 2);
}

function getCanvasAnd2DContext() {
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    if (!canvas) {
        return { error: "No canvas found!" } as const;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return { error: "No canvas found!" } as const;
    }

    return { canvas, ctx } as const;
}

function updateCanvasResolution(canvas: HTMLCanvasElement) {

    // Ref: https://stackoverflow.com/questions/21325343/how-to-get-width-and-height-of-canvas-after-resizing-the-browser

    const cs = getComputedStyle(canvas);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);

    canvas.width = width;
    canvas.height = height;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}