import { Vector2 } from "./types";

// Game Properties
export const TICK_RATE = 60;
export const DELTA_TIME = 1 / TICK_RATE;

// Mouse
let mousedown = false;
export const setMouseDown = (value: boolean) => mousedown = value;
export const isMouseDown = () => mousedown;
export const mousePos: Vector2 = { x: 0, y: 0 };

// Touch
export const isTouching = () => touchPos.length > 0;
export const touchPos: Vector2[] = [];

// Mouse / Touch
export function getTouchOrMousePos(): Vector2 {
    if (touchPos.length > 0)
        return touchPos[0];

    return mousePos;
}
