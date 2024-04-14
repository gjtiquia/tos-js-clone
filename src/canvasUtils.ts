import { Vector2 } from "./types";

export function getCanvasAnd2DContext() {
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
export function updateCanvasResolution(canvas: HTMLCanvasElement) {
    // Ref: https://stackoverflow.com/questions/21325343/how-to-get-width-and-height-of-canvas-after-resizing-the-browser

    const { width, height } = getCanvasProperties(canvas);

    canvas.width = width;
    canvas.height = height;
}
export function getCanvasProperties(canvas: HTMLCanvasElement) {

    const boundingRect = canvas.getBoundingClientRect();
    const top = boundingRect.top;
    const left = boundingRect.left;

    const cs = getComputedStyle(canvas);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);

    return { top, left, width, height };
}

export function getRelativePos(canvas: HTMLCanvasElement, absoluteX: number, absoluteY: number): Vector2 {
    const { top, left, width, height } = getCanvasProperties(canvas);

    const relativeX = absoluteX - left;
    const relativeY = absoluteY - top;

    // TODO : Update in respect to design resolution 

    return { x: relativeX, y: relativeY };
}
