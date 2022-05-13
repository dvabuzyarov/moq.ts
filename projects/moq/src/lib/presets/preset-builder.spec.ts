import { IMock, IPlayable } from "../moq";
import { PresetBuilder } from "./preset-builder";
import { Expressions } from "../reflector/expressions";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { PlayTimes } from "../playables/play-times";
import { InjectionToken } from "../static.injector/injection_token";
import { ReturnsPresetFactory } from "./factories/returns-preset.factory";
import { ThrowsPresetFactory } from "./factories/throws-preset.factory";
import { MimicsPresetFactory } from "./factories/mimics-preset.factory";
import { CallbackPresetFactory } from "./factories/callback-preset.factory";
import { ReturnsAsyncPresetFactory } from "./factories/returns-async-preset.factory";
import { ThrowsAsyncPresetFactory } from "./factories/throws-async-preset.factory";

describe("Preset builder", () => {
    const Target = new InjectionToken<Expressions<any>>("target");

    beforeEach(() => {
        createInjector(PresetBuilder, [
            ReturnsPresetFactory,
            ThrowsPresetFactory,
            MimicsPresetFactory,
            CallbackPresetFactory,
            ReturnsAsyncPresetFactory,
            ThrowsAsyncPresetFactory,
            Target]);
    });

    it("Defines a mimics preset", () => {
        const origin = {};
        const root = {} as IMock<any>;

        resolveMock(MimicsPresetFactory)
            .setup(instance => instance(resolve2(Target), PlayTimes.Always(), origin))
            .returns(root);

        const builder = resolve2(PresetBuilder);
        const actual = builder.mimics(origin);

        expect(actual).toBe(root);
    });

    it("Defines a returns preset", () => {
        const value = "value";
        const root = {} as IMock<any>;

        resolveMock(ReturnsPresetFactory)
            .setup(instance => instance(resolve2(Target), PlayTimes.Always(), value))
            .returns(root);

        const builder = resolve2(PresetBuilder);
        const actual = builder.returns(value);

        expect(actual).toBe(root);
    });

    it("Defines a throws preset", () => {
        const exception = new Error();
        const root = {} as IMock<any>;

        resolveMock(ThrowsPresetFactory)
            .setup(instance => instance(resolve2(Target), PlayTimes.Always(), exception))
            .returns(root);

        const builder = resolve2(PresetBuilder);
        const actual = builder.throws(exception);

        expect(actual).toBe(root);
    });

    it("Defines a callbacks preset", () => {
        const callback = () => undefined;
        const root = {} as IMock<any>;

        resolveMock(CallbackPresetFactory)
            .setup(instance => instance(resolve2(Target), PlayTimes.Always(), callback))
            .returns(root);

        const builder = resolve2(PresetBuilder);
        const actual = builder.callback(callback);

        expect(actual).toBe(root);
    });

    it("Defines a returns async preset", () => {
        const value = "value";
        const root = {} as IMock<any>;

        resolveMock<ReturnsAsyncPresetFactory<any, Promise<string>>>(ReturnsAsyncPresetFactory)
            .setup(instance => instance(resolve2(Target), PlayTimes.Always(), value))
            .returns(root);

        const builder = resolve2<PresetBuilder<any, Promise<string>>>(PresetBuilder);
        const actual = builder.returnsAsync(value);

        expect(actual).toBe(root);
    });

    it("Defines a throws async preset", () => {
        const exception = new Error();
        const root = {} as IMock<any>;

        resolveMock(ThrowsAsyncPresetFactory)
            .setup(instance => instance(resolve2(Target), PlayTimes.Always(), exception))
            .returns(root);

        const builder = resolve2(PresetBuilder);
        const actual = builder.throwsAsync(exception);

        expect(actual).toBe(root);
    });

    it("Sets playable", () => {
        const playable = {} as IPlayable;

        const builder = resolve2<PresetBuilder<any>>(PresetBuilder);
        const actual = builder.play(playable);
        builder.returns(undefined);
        builder.throws(undefined);
        builder.mimics(undefined);
        builder.callback(undefined);
        builder.returnsAsync(undefined);
        builder.throwsAsync(undefined);

        const target = resolve2(Target);
        resolveMock(ReturnsPresetFactory).verify(instance => instance(target, playable, undefined));
        resolveMock(ThrowsPresetFactory).verify(instance => instance(target, playable, undefined));
        resolveMock(MimicsPresetFactory).verify(instance => instance(target, playable, undefined));
        resolveMock(CallbackPresetFactory).verify(instance => instance(target, playable, undefined));
        resolveMock<ReturnsAsyncPresetFactory<any>>(ReturnsAsyncPresetFactory)
            .verify(instance => instance(target, playable, undefined));
        resolveMock(ThrowsAsyncPresetFactory).verify(instance => instance(target, playable, undefined));
        expect(actual).toBe(builder);
    });
});
