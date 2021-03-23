import { InjectionToken } from "../../static.injector/injection_token";
import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { Presets } from "../presets";
import { IMock } from "../../moq";
import { Expressions } from "../../reflector/expressions";
import { PlayTimes } from "../../playables/play-times";
import { CallbackPresetFactory } from "./callback-preset.factory";
import { CallbacksPreset } from "../presets/callbacks.preset";

describe("Callback preset factory", () => {
    const Mock = new InjectionToken<IMock<unknown>>("mock");

    beforeEach(() => {
        createInjector2(CallbackPresetFactory, [Mock, Presets]);
    });

    beforeEach(() => {
        resolveMock(Presets)
            .prototypeof(Presets.prototype);
    });

    it("Defines preset", () => {
        const target = {} as Expressions<unknown>;
        const callback = () => undefined;
        const playable = PlayTimes.Always();

        const builder = resolve2(CallbackPresetFactory);
        const actual = builder(target, playable, callback);

        const expected = new CallbacksPreset(playable, target, callback);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(Mock));
    });
});
