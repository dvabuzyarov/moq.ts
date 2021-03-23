import { InjectionToken } from "../../static.injector/injection_token";
import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { Presets } from "../presets";
import { IMock } from "../../moq";
import { Expressions } from "../../reflector/expressions";
import { PlayTimes } from "../../playables/play-times";
import { ReturnsPreset } from "../presets/returns.preset";
import { ReturnsAsyncPresetFactory } from "./returns-async-preset.factory";
import { ResolvedPromiseFactory } from "../resolved-promise.factory";

describe("Returns async preset factory", () => {
    const Mock = new InjectionToken<IMock<unknown>>("mock");

    beforeEach(() => {
        createInjector2(ReturnsAsyncPresetFactory, [Mock, Presets, ResolvedPromiseFactory]);
    });

    beforeEach(() => {
        resolveMock(Presets)
            .prototypeof(Presets.prototype);
    });

    it("Defines preset", () => {
        const target = {} as Expressions<unknown>;
        const value = "value";
        const promise = Promise.resolve(undefined);
        const playable = PlayTimes.Always();

        resolveMock(ResolvedPromiseFactory)
            .setup(instance => instance(value))
            .returns(promise);

        const builder = resolve2<ReturnsAsyncPresetFactory<any, Promise<string>>>(ReturnsAsyncPresetFactory);
        const actual = builder(target, playable, value);

        const expected = new ReturnsPreset(playable, target, promise);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(Mock));
    });
});
