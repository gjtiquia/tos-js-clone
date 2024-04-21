import { describe, expect, it } from "vitest";
import { Vector2 } from "../../types";
import { _gameToGemPos } from "..";

describe("game pos to gem pos tests", () => {
    const designResolution: Vector2 = { x: 6000, y: 5000 }

    it("should get the correct gemPos from gamePos (1)", () => {
        const gamePos: Vector2 = { x: 1, y: 1 };;
        const gemPos = _gameToGemPos(designResolution, gamePos);

        expect(gemPos).toStrictEqual<Vector2>({ x: 0, y: 0 })
    })

    it("should get the correct gemPos from mousePos (2)", () => {
        const mousePos: Vector2 = { x: 5999, y: 4999 };;
        const gemPos = _gameToGemPos(designResolution, mousePos);

        expect(gemPos).toStrictEqual<Vector2>({ x: 5, y: 4 })
    })
})