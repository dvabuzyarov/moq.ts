import { Expression } from "../reflector/expressions";
import { CallbackPresetPlayer } from "./callback-preset.player";

describe("Callback preset player", () => {

    class TestInteraction extends Expression {
        constructor() {
            super(undefined, undefined);
        }
    }

    it("Returns value from callback", () => {
        const value = [];
        const interaction = new TestInteraction();

        const callback = jasmine.createSpy();
        callback.withArgs(interaction).and.returnValue(value);

        const player = new CallbackPresetPlayer();
        const actual = player.play(callback, interaction);

        expect(actual).toBe(value);
    });
});
