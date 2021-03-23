import { InjectionToken } from "../../static.injector/injection_token";
import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { Presets } from "../presets";
import { IMock } from "../../moq";
import { Expressions } from "../../reflector/expressions";
import { PlayTimes } from "../../playables/play-times";
import { MimicsPreset } from "../presets/mimics.preset";
import { MimicsRejectedAsyncPresetFactory } from "./mimics-rejected-async-preset.factory";
import { RejectedPromiseFactory } from "../rejected-promise.factory";

describe("Mimics rejected async preset factory", () => {
    const Mock = new InjectionToken<IMock<unknown>>("mock");

    beforeEach(() => {
        createInjector2(MimicsRejectedAsyncPresetFactory, [Mock, Presets, RejectedPromiseFactory]);
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

        resolveMock(RejectedPromiseFactory)
            .setup(instance => instance(value))
            .returns(promise);

        const builder = resolve2<MimicsRejectedAsyncPresetFactory<any, Promise<string>>>(MimicsRejectedAsyncPresetFactory);
        const actual = builder(target, playable, value);

        const expected = new MimicsPreset(playable, target, promise);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(Mock));
    });
});
