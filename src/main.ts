import { gameToCanvasPos, getCanvasAnd2DContext, updateCanvasResolution } from "./canvasUtils";
import { DELTA_TIME, DESIGN_RESOLUTION, getCanvas, getCtx, getTouchOrMousePos, isMouseDown, isTouching } from "./globals";
import { subscribeToGlobalEvents } from "./globalEvents";
import { sleep } from "./utils";

// Game State
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

type GemType =
    "Fire" |
    "Grass" |
    "Water" |
    "Light" |
    "Dark" |
    "Heart"

function initializeGameState() {
    gems.push(["Fire", "Grass", "Water", "Light", "Dark", "Heart"]);
    gems.push(["Grass", "Water", "Light", "Dark", "Heart", "Fire"]);
    gems.push(["Fire", "Grass", "Water", "Light", "Dark", "Heart"]);
    gems.push(["Grass", "Water", "Light", "Dark", "Heart", "Fire"]);
    gems.push(["Fire", "Grass", "Water", "Light", "Dark", "Heart"]);
}

function updateGameState() {
    // TODO
    // if (isTouching() || isMouseDown()) {
    //     pos.x = getTouchOrMousePos().x - DESIGN_RESOLUTION.x / 4;
    //     pos.y = getTouchOrMousePos().y - DESIGN_RESOLUTION.y / 4;
    // }
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

function render() {

    const canvas = getCanvas();
    const ctx = getCtx();

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {

            const gemType = gems[j][i];

            ctx.beginPath();
            ctx.fillStyle = getColor(gemType);

            // Circle
            const unit = DESIGN_RESOLUTION.x / 6;

            const padding = unit / 10;
            const radius = unit / 2 - padding / 2;

            const x = unit / 2 + i * unit;
            const y = unit / 2 + j * unit;

            const canvasPos = gameToCanvasPos({ x, y });
            const canvasRadius = gameToCanvasPos({ x: radius, y: radius }).x;

            ctx.arc(canvasPos.x, canvasPos.y, canvasRadius, 0, 2 * Math.PI);
            ctx.fill()
        }
    }
}
