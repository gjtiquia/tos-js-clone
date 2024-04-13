// Game Properties
const TICK_RATE = 60;
const DELTA_TIME = 1 / TICK_RATE;

// Globals
const mousePos = { x: 0, y: 0 }

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

    // Subscribe to document events
    subscribeToMouseMoveEvent(canvas);

    // Game Loop
    let isGameActive = true;
    while (isGameActive) {

        // Update Game State
        posX = mousePos.x - canvas.width / 4;
        posY = mousePos.y - canvas.height / 4;

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

function getCanvasAnd2DContext() {
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    if (!canvas) {
        return { error: "No canvas element with id 'game-canvas' found!" } as const;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return { error: "No 2D context found!" } as const;
    }

    return { canvas, ctx } as const;
}

function updateCanvasResolution(canvas: HTMLCanvasElement) {

    // Ref: https://stackoverflow.com/questions/21325343/how-to-get-width-and-height-of-canvas-after-resizing-the-browser

    const { width, height } = getCanvasProperties(canvas);

    canvas.width = width;
    canvas.height = height;
}

function getCanvasProperties(canvas: HTMLCanvasElement) {

    const boundingRect = canvas.getBoundingClientRect()
    const top = boundingRect.top;
    const left = boundingRect.left;

    const cs = getComputedStyle(canvas);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);

    return { top, left, width, height };
}

function subscribeToMouseMoveEvent(canvas: HTMLCanvasElement) {

    // TODO : This... does not account for touch on mobile yet
    // TODO : See this for reference: https://dustinpfister.github.io/2020/03/04/canvas-get-point-relative-to-canvas/

    document.onmousemove = (e) => {

        // There is a difference between e.clientX, e.screenX and e.pageX
        const absoluteX = e.clientX;
        const absoluteY = e.clientY;

        const { top, left, width, height } = getCanvasProperties(canvas);

        const relativeX = absoluteX - left;
        const relativeY = absoluteY - top;

        // TODO : Then update in respect to design resolution 
        mousePos.x = relativeX;
        mousePos.y = relativeY;
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}