import { InjectionToken } from "../../static.injector/injection_token";
import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { Presets } from "../presets";
import { IMock } from "../../moq";
import { Expressions } from "../../reflector/expressions";
import { PlayTimes } from "../../playables/play-times";
import { MimicsPresetFactory } from "./mimics-preset.factory";
import { MimicsPreset } from "../presets/mimics.preset";

describe("Mimics preset factory", () => {
    const Mock = new InjectionToken<IMock<unknown>>("mock");

    beforeEach(() => {
        createInjector(MimicsPresetFactory, [Mock, Presets]);
    });

    beforeEach(() => {
        resolveMock(Presets)
            .prototypeof(Presets.prototype);
    });

    it("Defines preset", () => {
        const target = {} as Expressions<unknown>;
        const origin = {};
        const playable = PlayTimes.Always();

        const builder = resolve2(MimicsPresetFactory);
        const actual = builder(target, playable, origin);

        const expected = new MimicsPreset(playable, target, origin);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(Mock));
    });
});
