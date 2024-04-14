import { describe, expect, it } from "vitest";
import { _gameToCanvasPos, _canvasToGamePos } from "../src/canvasUtils";

describe("design resolution tests", () => {

    const canvasResolution = { x: 50, y: 60 };
    const gameResolution = { x: 5000, y: 6000 };

    it("should translate to canvas coordinates", () => {
        const gameCoordinates = { x: 5000, y: 6000 };
        const canvasCoordinates = _gameToCanvasPos(canvasResolution, gameResolution, gameCoordinates);

        expect(canvasCoordinates).toStrictEqual({ x: 50, y: 60 });
    })

    it("should translate to game coordinates", () => {
        const canvasCoordinates = { x: 50, y: 60 };
        const gameCoordinates = _canvasToGamePos(canvasResolution, gameResolution, canvasCoordinates);

        expect(gameCoordinates).toStrictEqual({ x: 5000, y: 6000 });
    })
})