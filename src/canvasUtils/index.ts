import { DESIGN_RESOLUTION, getCanvas, setCanvas, setCtx } from "../globals";
import { Vector2 } from "../types";

// Hack to upscale canvas in mobile
// Because the window.innerWidth is... not really equal to the device resolution
// This number for now is arbitrary
// x1.25 already has significant diffence from x1
// x10 works as well
// x100 crashes the canvas
// x2 is chosen for now, for "good-enough" sharpness while not having too much performance drain
/**
 * Scaling factor from canvas size to canvas resolution.
 */
const UPSCALE_FACTOR = 2;

export function getCanvasAnd2DContext() {
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    if (!canvas) {
        return { error: "No canvas element with id 'game-canvas' found!" };
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return { error: "No 2D context found!" };
    }

    setCanvas(canvas);
    setCtx(ctx);

    return {};
}

export function updateCanvasResolution() {
    // Ref: https://stackoverflow.com/questions/21325343/how-to-get-width-and-height-of-canvas-after-resizing-the-browser

    const { width, height } = getCanvasProperties();

    const canvas = getCanvas();
    canvas.width = width;
    canvas.height = height;
}

export function getCanvasProperties() {

    const canvas = getCanvas();

    const boundingRect = canvas.getBoundingClientRect();
    const top = boundingRect.top * UPSCALE_FACTOR;
    const left = boundingRect.left * UPSCALE_FACTOR;

    const cs = getComputedStyle(canvas);
    const width = parseInt(cs.getPropertyValue('width'), 10) * UPSCALE_FACTOR;
    const height = parseInt(cs.getPropertyValue('height'), 10) * UPSCALE_FACTOR;

    return { top, left, width, height };
}

export function absoluteToGamePos(absolutePos: Vector2): Vector2 {
    const canvasPos = absoluteToCanvasPos(absolutePos)
    return canvasToGamePos(canvasPos);
}

export function absoluteToCanvasPos(absolutePos: Vector2): Vector2 {
    const { top, left } = getCanvasProperties();

    // top/left is already upscaled
    // absolutePos is NOT upscaled
    // need to first "normalize" top/left => subtract => upscale again
    const x = (absolutePos.x - left / UPSCALE_FACTOR) * UPSCALE_FACTOR;
    const y = (absolutePos.y - top / UPSCALE_FACTOR) * UPSCALE_FACTOR;

    return { x, y };
}

export function gameToCanvasPos(gamePos: Vector2): Vector2 {

    const canvas = getCanvas();
    const canvasResolution: Vector2 = { x: canvas.width, y: canvas.height };

    return _gameToCanvasPos(canvasResolution, DESIGN_RESOLUTION, gamePos);
}

export function _gameToCanvasPos(canvasResolution: Vector2, designResolution: Vector2, gamePos: Vector2): Vector2 {

    const x = gamePos.x * (canvasResolution.x / designResolution.x);
    const y = gamePos.y * (canvasResolution.y / designResolution.y);

    return { x, y };
}

export function canvasToGamePos(canvasPos: Vector2): Vector2 {
    const canvas = getCanvas();
    const canvasResolution: Vector2 = { x: canvas.width, y: canvas.height };

    return _canvasToGamePos(canvasResolution, DESIGN_RESOLUTION, canvasPos);
}

export function _canvasToGamePos(canvasResolution: Vector2, designResolution: Vector2, canvasPos: Vector2): Vector2 {

    const x = canvasPos.x * (designResolution.x / canvasResolution.x);
    const y = canvasPos.y * (designResolution.y / canvasResolution.y);

    return { x, y };
}
