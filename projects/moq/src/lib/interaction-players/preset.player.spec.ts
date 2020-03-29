import { Interaction } from "../interactions";
import { PresetPlayer } from "./preset.player";
import { ReturnsPreset } from "../presets/returns.preset";
import { CallbacksPreset } from "../presets/callbacks.preset";
import { CallbackPresetPlayer } from "./callback-preset.player";
import { ThrowsPreset } from "../presets/throws.preset";
import { MimicsPreset } from "../presets/mimics.preset";
import { MimicsPresetPlayer } from "./mimics-preset.player";
import { resolveBuilder } from "../../tests.components/resolve.builder";

describe("Preset player", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const callbackPlayer = jasmine.createSpyObj<CallbackPresetPlayer>("", ["play"]);
        const mimicsPlayer = jasmine.createSpyObj<MimicsPresetPlayer>("", ["play"]);
        resolve = resolveBuilder([
            [CallbackPresetPlayer, callbackPlayer],
            [MimicsPresetPlayer, mimicsPlayer],
            [PresetPlayer, new PresetPlayer(callbackPlayer, mimicsPlayer)]
        ]);
    });

    it("Plays returns preset and returns result", () => {
        const expression = <Interaction>{};

        const value = "value";
        const preset = new ReturnsPreset<unknown, string>(undefined, undefined, value);

        const player = resolve(PresetPlayer);
        const actual = player.play(preset, expression);

        expect(actual).toBe(value);
    });

    it("Plays callback preset and returns result", () => {
        const expression = <Interaction>{};

        const value = "value";
        const callback = jasmine.createSpy();
        const preset = new CallbacksPreset<unknown>(undefined, undefined, callback);

        resolve(CallbackPresetPlayer)
            .play.withArgs(callback, expression).and.returnValue(value);

        const player = resolve(PresetPlayer);
        const actual = player.play(preset, expression);

        expect(actual).toBe(value);
    });

    it("Plays mimics preset and returns result", () => {
        const expression = <Interaction>{};

        const origin = {};
        const value = "value";
        const preset = new MimicsPreset<unknown>(undefined, undefined, origin);

        resolve(MimicsPresetPlayer)
            .play.withArgs(origin, expression).and.returnValue(value);

        const player = resolve(PresetPlayer);
        const actual = player.play(preset, expression);

        expect(actual).toBe(value);
    });

    it("Throws value of throw preset", () => {
        const expression = <Interaction>{};

        const value = new Error();
        const preset = new ThrowsPreset<unknown, unknown>(undefined, undefined, value);

        const player = resolve(PresetPlayer);
        expect(() => player.play(preset, expression)).toThrow(value);
    });
});
