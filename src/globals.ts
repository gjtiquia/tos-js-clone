import { Vector2 } from "./types";

// DOM Elements
let _canvas: HTMLCanvasElement | null = null;
let _ctx: CanvasRenderingContext2D | null = null;
export const setCanvas = (canvas: HTMLCanvasElement) => _canvas = canvas;
export const getCanvas = () => _canvas as HTMLCanvasElement;
export const setCtx = (ctx: CanvasRenderingContext2D) => _ctx = ctx;
export const getCtx = () => _ctx as CanvasRenderingContext2D;

// Game Properties
export const TICK_RATE = 60;
export const DELTA_TIME = 1 / TICK_RATE;
export const DESIGN_RESOLUTION: Vector2 = { x: 6000, y: 5000 };

// Mouse
let _isMouseDown = false;
export const setMouseDown = (value: boolean) => _isMouseDown = value;
export const isMouseDown = () => _isMouseDown;
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
