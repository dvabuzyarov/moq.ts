import { Expressions } from "../expressions";
import { PresetPlayer } from "./preset.player";
import { ReturnsPreset } from "../presets/returns.preset";
import { CallbacksPreset } from "../presets/callbacks.preset";
import { CallbackPresetPlayer } from "./callback-preset.player";
import { ThrowsPreset } from "../presets/throws.preset";
import { MimicsPreset } from "../presets/mimics.preset";
import { MimicsPresetPlayer } from "./mimics-preset.player";

describe("Preset player", () => {

    it("Plays returns preset and returns result", () => {
        const expression = <Expressions>{};

        const value = "value";
        const preset = new ReturnsPreset<unknown, string>(undefined, undefined, value);

        const player = new PresetPlayer(null, null);
        const actual = player.play(preset, expression);

        expect(actual).toBe(value);
    });

    it("Plays callback preset and returns result", () => {
        const expression = <Expressions>{};

        const value = "value";
        const callback = jasmine.createSpy();
        const preset = new CallbacksPreset<unknown>(undefined, undefined, callback);

        const presetPlayer = jasmine.createSpyObj<CallbackPresetPlayer>(["play"]);
        presetPlayer.play.withArgs(callback, expression).and.returnValue(value);

        const player = new PresetPlayer(presetPlayer, null);
        const actual = player.play(preset, expression);

        expect(actual).toBe(value);
    });

    it("Plays mimics preset and returns result", () => {
        const expression = <Expressions>{};

        const origin = {};
        const value = "value";
        const preset = new MimicsPreset<unknown>(undefined, undefined, origin);

        const presetPlayer = jasmine.createSpyObj<MimicsPresetPlayer>(["play"]);
        presetPlayer.play.withArgs(origin, expression).and.returnValue(value);

        const player = new PresetPlayer(null, presetPlayer);
        const actual = player.play(preset, expression);

        expect(actual).toBe(value);
    });

    it("Throws value of throw preset", () => {
        const expression = <Expressions>{};

        const value = new Error();
        const preset = new ThrowsPreset<unknown, unknown>(undefined, undefined, value);

        const player = new PresetPlayer(null, null);
        expect(() => player.play(preset, expression)).toThrow(value);
    });
});
