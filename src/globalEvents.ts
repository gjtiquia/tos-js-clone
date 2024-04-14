import { getCanvasProperties, getRelativePos } from "./canvasUtils";
import { mousePos, setMouseDown, touchPos } from "./globals";

export function subscribeToGlobalEvents() {
    // Subscribe to document events - Mouse
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
    subscribeToMouseDownEvent();
    subscribeToMouseMoveEvent();
    subscribeToMouseUpEvent();

    // Subscribe to document events - Touch
    // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
    subscribeToTouchStartEvent();
    subscribeToTouchMoveEvent();
    subscribeToTouchEndEvent();
    subscibeToTouchCancelEvent();
}
function subscribeToMouseDownEvent() {
    document.onmousedown = (e) => {
        setMouseDown(true);

        const absoluteX = e.clientX;
        const absoluteY = e.clientY;

        const { x, y } = getRelativePos(absoluteX, absoluteY);

        mousePos.x = x;
        mousePos.y = y;
    };
}
function subscribeToMouseMoveEvent() {
    document.onmousemove = (e) => {

        // There is a difference between e.clientX, e.screenX and e.pageX
        // Use clientX for viewport coordinates
        const absoluteX = e.clientX;
        const absoluteY = e.clientY;

        const { x, y } = getRelativePos(absoluteX, absoluteY);

        mousePos.x = x;
        mousePos.y = y;
    };
}
function subscribeToMouseUpEvent() {
    document.onmouseup = (_) => {
        setMouseDown(false);
    };
}
function subscribeToTouchStartEvent() {

    // For now we only consider single-touch
    document.ontouchstart = (e) => {

        const { top, left, width, height } = getCanvasProperties();

        // Clear the array
        touchPos.length = 0;

        const changedTouch = e.changedTouches[0];

        const absoluteX = changedTouch.clientX;
        const absoluteY = changedTouch.clientY;

        const relativePos = getRelativePos(absoluteX, absoluteY);

        touchPos.push(relativePos);
    };
}
function subscribeToTouchMoveEvent() {

    // For now we only consider single-touch
    document.ontouchmove = (e) => {

        const { top, left, width, height } = getCanvasProperties();

        // Clear the array
        touchPos.length = 0;

        const changedTouch = e.changedTouches[0];

        const absoluteX = changedTouch.clientX;
        const absoluteY = changedTouch.clientY;

        const relativePos = getRelativePos(absoluteX, absoluteY);

        touchPos.push(relativePos);
    };
}
function subscribeToTouchEndEvent() {
    document.ontouchend = (_) => {
        // Clear the array
        touchPos.length = 0;
    };
}
function subscibeToTouchCancelEvent() {
    document.ontouchcancel = (_) => {
        // Clear the array
        touchPos.length = 0;
    };
}
