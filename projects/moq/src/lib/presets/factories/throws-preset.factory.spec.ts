import { InjectionToken } from "../../static.injector/injection_token";
import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { ReturnsPresetFactory } from "./returns-preset.factory";
import { Presets } from "../presets";
import { IMock } from "../../moq";
import { Expressions } from "../../reflector/expressions";
import { PlayTimes } from "../../playables/play-times";
import { ReturnsPreset } from "../presets/returns.preset";
import { ThrowsPresetFactory } from "./throws-preset.factory";
import { ThrowsPreset } from "../presets/throws.preset";

describe("Throws preset factory", () => {
    const Mock = new InjectionToken<IMock<unknown>>("mock");

    beforeEach(() => {
        createInjector(ThrowsPresetFactory, [Mock, Presets]);
    });

    beforeEach(() => {
        resolveMock(Presets)
            .prototypeof(Presets.prototype);
    });

    it("Defines preset", () => {
        const target = {} as Expressions<unknown>;
        const exception = new Error();
        const playable = PlayTimes.Always();

        const builder = resolve2(ThrowsPresetFactory);
        const actual = builder(target, playable, exception);

        const expected = new ThrowsPreset(playable, target, exception);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(Mock));
    });
});
