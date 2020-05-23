import { IMock, IPlayable } from "../moq";
import { PresetBuilder } from "./preset-builder";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { MimicsPreset } from "./presets/mimics.preset";
import { ReturnsPreset } from "./presets/returns.preset";
import { ThrowsPreset } from "./presets/throws.preset";
import { CallbacksPreset } from "./presets/callbacks.preset";
import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { IPreset } from "./presets/preset";
import { PlayTimes } from "../playables/play-times";
import { InjectionToken } from "../static.injector/injection_token";

describe("Preset builder", () => {
    const Mock = new InjectionToken<IMock<unknown>>("mock");
    const Set = new InjectionToken<(preset: IPreset<unknown>) => void>("set");
    const Target = new InjectionToken<ExpectedExpressions<any>>("target");

    beforeEach(() => {
        const mock = <IMock<unknown>>{};
        const set = jasmine.createSpy("set");
        const target = <ExpectedExpressions<any>>{};

        createInjector([
            {provide: Mock, useValue: mock, deps: []},
            {provide: Set, useValue: set, deps: []},
            {provide: Target, useValue: target, deps: []},
            {provide: PresetBuilder, useFactory: (m, s, t) => new PresetBuilder(m, s, t), deps: [Mock, Set, Target]},
        ]);
    });

    it("Defines a mimics preset", () => {
        const origin = {};

        const builder = resolve(PresetBuilder);
        const actual = builder.mimics(origin);

        const expected = new MimicsPreset(PlayTimes.Always(), resolve(Target), origin);
        expect(resolve(Set)).toHaveBeenCalledWith(expected);
        expect(actual).toBe(resolve(Mock));
    });

    it("Defines a returns preset", () => {
        const value = "value";

        const builder = resolve(PresetBuilder);
        const actual = builder.returns(value);

        const expected = new ReturnsPreset(PlayTimes.Always(), resolve(Target), value);
        expect(resolve(Set)).toHaveBeenCalledWith(expected);
        expect(actual).toBe(resolve(Mock));
    });

    it("Defines a throws preset", () => {
        const exception = new Error();

        const builder = resolve(PresetBuilder);
        const actual = builder.throws(exception);

        const expected = new ThrowsPreset(PlayTimes.Always(), resolve(Target), exception);
        expect(resolve(Set)).toHaveBeenCalledWith(expected);
        expect(actual).toBe(resolve(Mock));
    });

    it("Defines a callbacks preset", () => {
        const callback = () => undefined;

        const builder = resolve(PresetBuilder);
        const actual = builder.callback(callback);

        const expected = new CallbacksPreset(PlayTimes.Always(), resolve(Target), callback);
        expect(resolve(Set)).toHaveBeenCalledWith(expected);
        expect(actual).toBe(resolve(Mock));
    });

    it("Sets playable", () => {
        const playable = <IPlayable>{};

        const builder = new PresetBuilder(resolve(Mock), resolve(Set), resolve(Target));
        const actual = builder.play(playable);
        builder.callback(undefined);
        builder.returns(undefined);
        builder.mimics(undefined);
        builder.throws(undefined);

        expect(resolve(Set)).toHaveBeenCalledWith(new CallbacksPreset(playable, resolve(Target), undefined));
        expect(resolve(Set)).toHaveBeenCalledWith(new ReturnsPreset(playable, resolve(Target), undefined));
        expect(resolve(Set)).toHaveBeenCalledWith(new MimicsPreset(playable, resolve(Target), undefined));
        expect(resolve(Set)).toHaveBeenCalledWith(new ThrowsPreset(playable, resolve(Target), undefined));
        expect(actual).toBe(builder);
    });
});
