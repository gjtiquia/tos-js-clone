import { gameToCanvasPos, getCanvasAnd2DContext, updateCanvasResolution } from "./canvasUtils";
import { DELTA_TIME, DESIGN_RESOLUTION, getCanvas, getCtx, getTouchOrMousePos } from "./globals";
import { subscribeToGlobalEvents } from "./globalEvents";
import { sleep } from "./utils";
import { Vector2 } from "./types";
import { updateCurrentInputState, isPressedDown, isPressedUp, copyCurrentInputStateToPrevious } from "./inputState";
import { gameToGemPos } from "./gemUtils";

// Types
type GemType =
    "Fire" |
    "Grass" |
    "Water" |
    "Light" |
    "Dark" |
    "Heart"

// Game State
const dragState = {
    isActive: false,
    initialGemType: "Fire" as GemType,
    currentGemPos: { x: -1, y: -1 } as Vector2,
}
const gems: GemType[][] = [];

// Main
main();

async function main() {
    const { error } = getCanvasAnd2DContext()
    if (error) {
        console.error(error);
        return;
    }

    // Not that this does not resize automatically
    // But mobile window does not... resize often anyways
    // On desktop is not noticable easily anyways too
    // Can implement in the future tho
    updateCanvasResolution();

    // Eg. Mouse and Touch events which update globals
    subscribeToGlobalEvents();

    // Game Setup
    initializeGameState();

    // Game Loop
    let isGameActive = true;
    while (isGameActive) {

        // Update Game StateS
        updateGameState();

        // Render
        render();

        // DeltaTime
        await sleep(DELTA_TIME * 1000);
    }
}

function initializeGameState() {
    gems.push(["Fire", "Grass", "Water", "Light", "Dark", "Heart"]);
    gems.push(["Grass", "Water", "Light", "Dark", "Heart", "Fire"]);
    gems.push(["Fire", "Grass", "Water", "Light", "Dark", "Heart"]);
    gems.push(["Grass", "Water", "Light", "Dark", "Heart", "Fire"]);
    gems.push(["Fire", "Grass", "Water", "Light", "Dark", "Heart"]);
}

function getGem(gemPos: Vector2) {
    return gems[gemPos.y][gemPos.x];
}

function updateGameState() {

    // Input Polling
    updateCurrentInputState();

    // Update State
    if (isPressedDown()) {
        updateDragStateOnPressDown();
    }

    if (isPressedUp()) {
        updateDragStateOnPressUp();
    }

    // Saves current input as previous input for next tick
    copyCurrentInputStateToPrevious();
}

function updateDragStateOnPressDown() {
    const mousePos = getTouchOrMousePos();

    const { gemPos, error } = gameToGemPos(mousePos);
    if (error) return;

    const gem = getGem(gemPos);

    dragState.isActive = true;
    dragState.initialGemType = gem;
    dragState.currentGemPos = gemPos;

    console.log("updateDragStateOnPressDown", "dragState:", dragState)
}

function updateDragStateOnPressUp() {
    dragState.isActive = false;
    console.log("updateDragStateOnPressUp", "dragState:", dragState)
}

function render() {

    const canvas = getCanvas();
    const ctx = getCtx();

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw
    const gemSizeUnit = DESIGN_RESOLUTION.x / 6;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {

            const gemType = gems[j][i];

            const x = gemSizeUnit / 2 + i * gemSizeUnit;
            const y = gemSizeUnit / 2 + j * gemSizeUnit;
            const pos = { x, y };

            drawGem(gemType, gemSizeUnit, pos)
        }
    }

    if (dragState.isActive) {
        drawGem(dragState.initialGemType, gemSizeUnit, getTouchOrMousePos());
    }
}

function drawGem(gemType: GemType, sizeUnit: number, gamePos: Vector2) {

    const ctx = getCtx();

    ctx.beginPath();
    ctx.fillStyle = getColor(gemType);

    // Circle
    const padding = sizeUnit / 10;
    const radius = sizeUnit / 2 - padding / 2;

    const canvasPos = gameToCanvasPos(gamePos);
    const canvasRadius = gameToCanvasPos({ x: radius, y: radius }).x;

    ctx.arc(canvasPos.x, canvasPos.y, canvasRadius, 0, 2 * Math.PI);
    ctx.fill()
}

function getColor(gemType: GemType) {
    switch (gemType) {
        case "Fire": return "#ff3504";
        case "Grass": return "#00ab19";
        case "Water": return "#35c8fe";
        case "Light": return "#edb800";
        case "Dark": return "#ba1fa8";
        case "Heart": return "#ea327a";
    }
}
