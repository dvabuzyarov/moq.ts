import { GetPropertyExpression, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "../expressions";
import { CallbackPresetPlayer } from "./callback-preset.player";

describe("Callback preset player", () => {

    it("Returns value from callback for GetPropertyExpression", () => {
        const value = [];

        const callback = jasmine.createSpy();
        callback.withArgs().and.returnValue(value);

        const player = new CallbackPresetPlayer();
        const actual = player.play(callback, new GetPropertyExpression(undefined));

        expect(actual).toBe(value);
    });

    it("Returns value from callback for SetPropertyExpression", () => {
        const value = [];
        const arg = "argument 1";

        const callback = jasmine.createSpy();
        callback.withArgs(arg).and.returnValue(value);

        const player = new CallbackPresetPlayer();
        const actual = player.play(callback, new SetPropertyExpression(undefined, arg));

        expect(actual).toBe(value);
    });

    it("Returns value from callback for MethodExpression", () => {
        const value = [];
        const arg1 = "argument 1";
        const arg2 = "argument 2";

        const callback = jasmine.createSpy();
        callback.withArgs(arg1, arg2).and.returnValue(value);

        const player = new CallbackPresetPlayer();
        const actual = player.play(callback, new MethodExpression([arg1, arg2]));

        expect(actual).toBe(value);
    });

    it("Returns value from callback for NamedMethodExpression", () => {
        const value = [];
        const arg = "argument 1";

        const callback = jasmine.createSpy();
        callback.withArgs(arg).and.returnValue(value);

        const player = new CallbackPresetPlayer();
        const actual = player.play(callback, new NamedMethodExpression(undefined, [arg]));

        expect(actual).toBe(value);
    });
});
