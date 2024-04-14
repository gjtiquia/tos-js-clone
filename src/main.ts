// Game Properties
const TICK_RATE = 60;
const DELTA_TIME = 1 / TICK_RATE;

// Types
type Vector2 = { x: number, y: number }

// Globals
let mousedown = false;
const mousePos: Vector2 = { x: 0, y: 0 }

const touchPos: Vector2[] = []

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

    // Subscribe to document events - Mouse
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
    subscribeToMouseDownEvent(canvas);
    subscribeToMouseMoveEvent(canvas);
    subscribeToMouseUpEvent(canvas);

    // Subscribe to document events - Touch
    // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
    subscribeToTouchStartEvent(canvas);
    subscribeToTouchMoveEvent(canvas);
    subscribeToTouchEndEvent(canvas);
    subscibeToTouchCancelEvent(canvas);

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

function subscribeToMouseDownEvent(canvas: HTMLCanvasElement) {
    document.onmousedown = (e) => {
        mousedown = true;

        const absoluteX = e.clientX;
        const absoluteY = e.clientY;

        const { x, y } = getRelativePos(canvas, absoluteX, absoluteY);

        mousePos.x = x;
        mousePos.y = y;
    }
}

function subscribeToMouseMoveEvent(canvas: HTMLCanvasElement) {
    document.onmousemove = (e) => {

        // There is a difference between e.clientX, e.screenX and e.pageX
        // Use clientX for viewport coordinates
        const absoluteX = e.clientX;
        const absoluteY = e.clientY;

        const { x, y } = getRelativePos(canvas, absoluteX, absoluteY);

        mousePos.x = x;
        mousePos.y = y;
    }
}

function subscribeToMouseUpEvent(_: HTMLCanvasElement) {
    document.onmouseup = (_) => {
        mousedown = false;
    }
}

function subscribeToTouchStartEvent(canvas: HTMLCanvasElement) {

    // For now we only consider single-touch
    document.ontouchstart = (e) => {

        const { top, left, width, height } = getCanvasProperties(canvas);

        // Clear the array
        touchPos.length = 0;

        const changedTouch = e.changedTouches[0];

        const absoluteX = changedTouch.clientX;
        const absoluteY = changedTouch.clientY;

        const relativePos = getRelativePos(canvas, absoluteX, absoluteY);

        touchPos.push(relativePos);
    }
}

function subscribeToTouchMoveEvent(canvas: HTMLCanvasElement) {

    // For now we only consider single-touch
    document.ontouchmove = (e) => {

        const { top, left, width, height } = getCanvasProperties(canvas);

        // Clear the array
        touchPos.length = 0;

        const changedTouch = e.changedTouches[0];

        const absoluteX = changedTouch.clientX;
        const absoluteY = changedTouch.clientY;

        const relativePos = getRelativePos(canvas, absoluteX, absoluteY);

        touchPos.push(relativePos);
    }
}

function subscribeToTouchEndEvent(_: HTMLCanvasElement) {
    document.ontouchend = (_) => {
        // Clear the array
        touchPos.length = 0;
    }
}

function subscibeToTouchCancelEvent(_: HTMLCanvasElement) {
    document.ontouchcancel = (_) => {
        // Clear the array
        touchPos.length = 0;
    }
}

function isTouching() {
    return touchPos.length > 0;
}

function isMouseDown() {
    return mousedown;
}

function getTouchOrMousePos(): Vector2 {
    if (touchPos.length > 0)
        return touchPos[0];

    return mousePos;
}

function getRelativePos(canvas: HTMLCanvasElement, absoluteX: number, absoluteY: number): Vector2 {
    const { top, left, width, height } = getCanvasProperties(canvas);

    const relativeX = absoluteX - left;
    const relativeY = absoluteY - top;

    // TODO : Update in respect to design resolution 

    return { x: relativeX, y: relativeY };
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}