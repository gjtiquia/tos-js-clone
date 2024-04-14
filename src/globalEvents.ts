import { getCanvasProperties, getRelativePos } from "./canvasUtils";
import { mousePos, setMouseDown, touchPos } from "./globals";

export function subscribeToGlobalEvents(canvas: HTMLCanvasElement) {
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
}
function subscribeToMouseDownEvent(canvas: HTMLCanvasElement) {
    document.onmousedown = (e) => {
        setMouseDown(true);

        const absoluteX = e.clientX;
        const absoluteY = e.clientY;

        const { x, y } = getRelativePos(canvas, absoluteX, absoluteY);

        mousePos.x = x;
        mousePos.y = y;
    };
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
    };
}
function subscribeToMouseUpEvent(_: HTMLCanvasElement) {
    document.onmouseup = (_) => {
        setMouseDown(false);
    };
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
    };
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
    };
}
function subscribeToTouchEndEvent(_: HTMLCanvasElement) {
    document.ontouchend = (_) => {
        // Clear the array
        touchPos.length = 0;
    };
}
function subscibeToTouchCancelEvent(_: HTMLCanvasElement) {
    document.ontouchcancel = (_) => {
        // Clear the array
        touchPos.length = 0;
    };
}
