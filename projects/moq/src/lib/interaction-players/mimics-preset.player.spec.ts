import {
    GetPropertyInteraction,
    InOperatorInteraction,
    MethodInteraction,
    NamedMethodInteraction,
    SetPropertyInteraction
} from "../interactions";
import { MimicsPresetPlayer } from "./mimics-preset.player";
import { nameof } from "../../tests.components/nameof";
import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { REFLECT_APPLY } from "./reflect-apply.injection-token";

describe("Mimics preset player", () => {
    beforeEach(() => {
        const apply = jasmine.createSpy<typeof Reflect.apply>();
        createInjector([
            {provide: MimicsPresetPlayer, useClass: MimicsPresetPlayer, deps: [REFLECT_APPLY]},
            {provide: REFLECT_APPLY, useValue: apply, deps: []},
        ]);
    });

    it("Plays property read interaction", () => {
        const propertyName = "property_name";
        const value = "value";

        const target = {};
        target[propertyName] = value;

        const player = resolve(MimicsPresetPlayer);
        const actual = player.play(target, new GetPropertyInteraction(propertyName));

        expect(actual).toBe(value);
    });

    it("Plays property write interaction", () => {
        const propertyName = "property_name";
        const value = "value";

        const target = {};

        const player = resolve(MimicsPresetPlayer);
        const actual = player.play(target, new SetPropertyInteraction(propertyName, value));

        expect(actual).toBe(true);
        expect(target[propertyName]).toBe(value);
    });

    it("Plays instance method invoke", () => {
        const propertyName = "property_name";
        const arg = "value";
        const result = "result";

        const target = jasmine.createSpy();
        const method = jasmine.createSpy();
        target[propertyName] = method;

        resolve(REFLECT_APPLY).withArgs(method, target, [arg]).and.returnValue(result);

        const player = resolve(MimicsPresetPlayer);
        const actual = player.play(target, new NamedMethodInteraction(propertyName, [arg]));

        expect(actual).toBe(result);
    });

    it("Plays method invoke", () => {
        const arg = "value";
        const result = "result";
        const target = jasmine.createSpy();

        resolve(REFLECT_APPLY).withArgs(target, undefined, [arg]).and.returnValue(result);

        const player = resolve(MimicsPresetPlayer);
        const actual = player.play(target, new MethodInteraction([arg]));

        expect(actual).toBe(result);
    });

    it("Plays in operator", () => {
        const name = "value";
        const target = {name};

        const player = resolve(MimicsPresetPlayer);
        const actual = player.play(target, new InOperatorInteraction(nameof<typeof target>("name")));

        expect(actual).toBe(true);
    });
});
