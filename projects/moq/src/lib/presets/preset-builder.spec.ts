import { IPlayable } from "../moq";
import { PresetBuilder } from "./preset-builder";
import { Expressions } from "../reflector/expressions";
import { MimicsPreset } from "./presets/mimics.preset";
import { ReturnsPreset } from "./presets/returns.preset";
import { ThrowsPreset } from "./presets/throws.preset";
import { CallbacksPreset } from "./presets/callbacks.preset";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { PlayTimes } from "../playables/play-times";
import { InjectionToken } from "../static.injector/injection_token";
import { Presets } from "./presets";
import { RootMockProvider } from "../auto-mocking/root-mock.provider";

describe("Preset builder", () => {
    const Target = new InjectionToken<Expressions<any>>("target");

    beforeEach(() => {
        createInjector2(PresetBuilder, [RootMockProvider, Presets, Target]);
    });

    beforeEach(() => {
        resolveMock(Presets)
            .prototypeof(Presets.prototype);
    });

    it("Defines a mimics preset", () => {
        const origin = {};

        const builder = resolve2(PresetBuilder);
        const actual = builder.mimics(origin);

        const expected = new MimicsPreset(PlayTimes.Always(), resolve2(Target), origin);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(RootMockProvider));
    });

    it("Defines a returns preset", () => {
        const value = "value";

        const builder = resolve2(PresetBuilder);
        const actual = builder.returns(value);

        const expected = new ReturnsPreset(PlayTimes.Always(), resolve2(Target), value);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(RootMockProvider));
    });

    it("Defines a throws preset", () => {
        const exception = new Error();

        const builder = resolve2(PresetBuilder);
        const actual = builder.throws(exception);

        const expected = new ThrowsPreset(PlayTimes.Always(), resolve2(Target), exception);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(RootMockProvider));
    });

    it("Defines a callbacks preset", () => {
        const callback = () => undefined;

        const builder = resolve2(PresetBuilder);
        const actual = builder.callback(callback);

        const expected = new CallbacksPreset(PlayTimes.Always(), resolve2(Target), callback);
        resolveMock(Presets).verify(instance => instance.add(expected));
        expect(actual).toBe(resolve2(RootMockProvider));
    });

    it("Sets playable", () => {
        const playable = {} as IPlayable;

        const builder = resolve2(PresetBuilder);
        const actual = builder.play(playable);
        builder.callback(undefined);
        builder.returns(undefined);
        builder.mimics(undefined);
        builder.throws(undefined);

        resolveMock(Presets).verify(instance => instance.add(new CallbacksPreset(playable, resolve2(Target), undefined)));
        resolveMock(Presets).verify(instance => instance.add(new ReturnsPreset(playable, resolve2(Target), undefined)));
        resolveMock(Presets).verify(instance => instance.add(new MimicsPreset(playable, resolve2(Target), undefined)));
        resolveMock(Presets).verify(instance => instance.add(new ThrowsPreset(playable, resolve2(Target), undefined)));
        expect(actual).toBe(builder);
    });
});
