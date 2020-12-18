import { Interaction } from "../interactions";
import { PresetPlayer } from "./preset.player";
import { ReturnsPreset } from "../presets/presets/returns.preset";
import { CallbacksPreset } from "../presets/presets/callbacks.preset";
import { CallbackPresetPlayer } from "./callback-preset.player";
import { ThrowsPreset } from "../presets/presets/throws.preset";
import { MimicsPreset } from "../presets/presets/mimics.preset";
import { MimicsPresetPlayer } from "./mimics-preset.player";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Preset player", () => {
    beforeEach(() => {
        createInjector2(PresetPlayer, [CallbackPresetPlayer, MimicsPresetPlayer]);
    });

    it("Plays returns preset and returns result", () => {
        const expression = {} as Interaction;

        const value = "value";
        const preset = new ReturnsPreset<unknown, string>(undefined, undefined, value);

        const player = resolve2(PresetPlayer);
        const actual = player.play(preset, expression);

        expect(actual).toBe(value);
    });

    it("Plays callback preset and returns result", () => {
        const expression = {} as Interaction;

        const value = "value";
        const callback = jasmine.createSpy();
        const preset = new CallbacksPreset<unknown>(undefined, undefined, callback);

        resolveMock(CallbackPresetPlayer)
            .setup(instance => instance.play(callback, expression))
            .returns(value);

        const player = resolve2(PresetPlayer);
        const actual = player.play(preset, expression);

        expect(actual).toBe(value);
    });

    it("Plays mimics preset and returns result", () => {
        const expression = {} as Interaction;

        const origin = {};
        const value = "value";
        const preset = new MimicsPreset<unknown>(undefined, undefined, origin);

        resolveMock(MimicsPresetPlayer)
            .setup(instance => instance.play(origin, expression))
            .returns(value);

        const player = resolve2(PresetPlayer);
        const actual = player.play(preset, expression);

        expect(actual).toBe(value);
    });

    it("Throws value of throw preset", () => {
        const expression = {} as Interaction;

        const value = new Error();
        const preset = new ThrowsPreset<unknown, unknown>(undefined, undefined, value);

        const player = resolve2(PresetPlayer);
        expect(() => player.play(preset, expression)).toThrow(value);
    });
});
