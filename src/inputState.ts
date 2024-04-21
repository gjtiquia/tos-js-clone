import { isMouseDown, isTouching } from "./globals";

// Input State
type InputState = {
    isPressed: boolean;
};

export const _previousInputState: InputState = {
    isPressed: false,
};

export const _currentInputState: InputState = {
    isPressed: false,
};

const getPreviousInputState = () => _previousInputState;
const getCurrentInputState = () => _currentInputState;

export function updateCurrentInputState() {

    const inputState = getCurrentInputState();

    // Reset
    resetInputState(inputState);

    // Update based on current state
    if (isTouching() || isMouseDown()) {
        inputState.isPressed = true;
    }
}

function resetInputState(inputState: InputState) {
    inputState.isPressed = false;
}

export function copyCurrentInputStateToPrevious() {
    const previous = getPreviousInputState();
    const current = getCurrentInputState();

    copyInputState(current, previous);
}

function copyInputState(from: InputState, to: InputState) {
    to.isPressed = from.isPressed;
}

export function isPressedDown() {
    const previous = getPreviousInputState();
    const current = getCurrentInputState();

    return previous.isPressed === false && current.isPressed === true;
}

export function isPressedUp() {
    const previous = getPreviousInputState();
    const current = getCurrentInputState();

    return previous.isPressed === true && current.isPressed === false;
}
