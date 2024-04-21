import { DESIGN_RESOLUTION } from "../globals";
import { Vector2 } from "../types";

export function gameToGemPos(gamePos: Vector2) {
    const gemPos = _gameToGemPos(DESIGN_RESOLUTION, gamePos);
    let error = undefined;

    // Assumes 6x5 grid size
    if (gemPos.x < 0 || gemPos.x >= 6 || gemPos.y < 0 || gemPos.y >= 5)
        error = `Error: gemPos out of bounds! gemPos: (${gemPos.x}, ${gemPos.y})`

    return { gemPos, error }
}

export function _gameToGemPos(designResolution: Vector2, gamePos: Vector2): Vector2 {
    // Top Left = (0,0)
    // Assumes 6x5 grid size

    const gemCellWidth = designResolution.x / 6;
    const gemCellHeight = designResolution.y / 5;

    const gemFloatXPos = gamePos.x / gemCellWidth;
    const gemXPos = Math.floor(gemFloatXPos);

    const gemFloatYPos = gamePos.y / gemCellHeight;
    const gemYPos = Math.floor(gemFloatYPos);

    return { x: gemXPos, y: gemYPos };
}