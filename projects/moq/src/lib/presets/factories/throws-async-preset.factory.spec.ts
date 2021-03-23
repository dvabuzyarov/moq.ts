import { InjectionToken } from "../../static.injector/injection_token";
import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { Presets } from "../presets";
import { IMock } from "../../moq";
import { Expressions } from "../../reflector/expressions";
import { PlayTimes } from "../../playables/play-times";
import { ReturnsPreset } from "../presets/returns.preset";
import { ThrowsAsyncPresetFactory } from "./throws-async-preset.factory";
import { RejectedPromiseFactory } from "../rejected-promise.factory";

describe("Throws async preset factory", () => {
    const Mock = new InjectionToken<IMock<unknown>>("mock");

    beforeEach(() => {
        createInjector2(ThrowsAsyncPresetFactory, [Mock, Presets, RejectedPromiseFactory]);
    });

    beforeEach(() => {
        resolveMock(Presets)
            .prototypeof(Presets.prototype);
    });

    it("Defines preset", () => {
        const target = {} as Expressions<unknown>;
        const exception = new Error();
        const promise = Promise.resolve(undefined);
        const playable = PlayTimes.Always();

        resolveMock(RejectedPromiseFactory)
            .setup(instance => instance(exception))
            .returns(promise);

        const builder = resolve2(ThrowsAsyncPresetFactory);
        const actual = builder(target, playable, exception);

        const expected = new ReturnsPreset(playable, target, promise);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(Mock));
    });
});
