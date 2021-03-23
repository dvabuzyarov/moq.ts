import { InjectionToken } from "../../static.injector/injection_token";
import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { ReturnsPresetFactory } from "./returns-preset.factory";
import { Presets } from "../presets";
import { IMock } from "../../moq";
import { Expressions } from "../../reflector/expressions";
import { PlayTimes } from "../../playables/play-times";
import { ReturnsPreset } from "../presets/returns.preset";

describe("Returns preset factory", () => {
    const Mock = new InjectionToken<IMock<unknown>>("mock");

    beforeEach(() => {
        createInjector2(ReturnsPresetFactory, [Mock, Presets]);
    });

    beforeEach(() => {
        resolveMock(Presets)
            .prototypeof(Presets.prototype);
    });

    it("Defines preset", () => {
        const target = {} as Expressions<unknown>;
        const value = "value";
        const playable = PlayTimes.Always();

        const builder = resolve2(ReturnsPresetFactory);
        const actual = builder(target, playable, value);

        const expected = new ReturnsPreset(playable, target, value);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(Mock));
    });
});
