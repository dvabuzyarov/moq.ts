import { GetPropertyInteraction, MethodInteraction, NamedMethodInteraction, SetPropertyInteraction } from "../interactions";
import { CallbackPresetPlayer } from "./callback-preset.player";

describe("Callback preset player", () => {

    it("Returns value from callback for GetPropertyInteraction", () => {
        const value = [];

        const callback = jasmine.createSpy();
        callback.withArgs().and.returnValue(value);

        const player = new CallbackPresetPlayer();
        const actual = player.play(callback, new GetPropertyInteraction(undefined));

        expect(actual).toBe(value);
    });

    it("Returns value from callback for SetPropertyInteraction", () => {
        const value = [];
        const arg = "argument 1";

        const callback = jasmine.createSpy();
        callback.withArgs(arg).and.returnValue(value);

        const player = new CallbackPresetPlayer();
        const actual = player.play(callback, new SetPropertyInteraction(undefined, arg));

        expect(actual).toBe(value);
    });

    it("Returns value from callback for MethodInteraction", () => {
        const value = [];
        const arg1 = "argument 1";
        const arg2 = "argument 2";

        const callback = jasmine.createSpy();
        callback.withArgs(arg1, arg2).and.returnValue(value);

        const player = new CallbackPresetPlayer();
        const actual = player.play(callback, new MethodInteraction([arg1, arg2]));

        expect(actual).toBe(value);
    });

    it("Returns value from callback for NamedMethodInteraction", () => {
        const value = [];
        const arg = "argument 1";

        const callback = jasmine.createSpy();
        callback.withArgs(arg).and.returnValue(value);

        const player = new CallbackPresetPlayer();
        const actual = player.play(callback, new NamedMethodInteraction(undefined, [arg]));

        expect(actual).toBe(value);
    });
});
