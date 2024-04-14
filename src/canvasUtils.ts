import { DESIGN_RESOLUTION, getCanvas, setCanvas, setCtx } from "./globals";
import { Vector2 } from "./types";

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
    const top = boundingRect.top;
    const left = boundingRect.left;

    const cs = getComputedStyle(canvas);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);

    return { top, left, width, height };
}

export function absoluteToGamePos(absolutePos: Vector2): Vector2 {
    const canvasPos = absoluteToCanvasPos(absolutePos)
    return canvasToGamePos(canvasPos);
}

export function absoluteToCanvasPos(absolutePos: Vector2): Vector2 {
    const { top, left, width, height } = getCanvasProperties();

    const x = absolutePos.x - left;
    const y = absolutePos.y - top;

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
