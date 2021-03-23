import { InjectionToken } from "../../static.injector/injection_token";
import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { Presets } from "../presets";
import { IMock } from "../../moq";
import { Expressions } from "../../reflector/expressions";
import { PlayTimes } from "../../playables/play-times";
import { ResolvedPromiseFactory } from "../resolved-promise.factory";
import { MimicsResolvedAsyncPresetFactory } from "./mimics-resolved-async-preset.factory";
import { MimicsPreset } from "../presets/mimics.preset";

describe("Mimics resolved async preset factory", () => {
    const Mock = new InjectionToken<IMock<unknown>>("mock");

    beforeEach(() => {
        createInjector2(MimicsResolvedAsyncPresetFactory, [Mock, Presets, ResolvedPromiseFactory]);
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

        const builder = resolve2<MimicsResolvedAsyncPresetFactory<any, Promise<string>>>(MimicsResolvedAsyncPresetFactory);
        const actual = builder(target, playable, value);

        const expected = new MimicsPreset(playable, target, promise);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(Mock));
    });
});
