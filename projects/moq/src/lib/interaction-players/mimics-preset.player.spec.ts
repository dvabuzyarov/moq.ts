import {
    GetPropertyExpression,
    InOperatorExpression,
    FunctionExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";
import { MimicsPresetPlayer } from "./mimics-preset.player";
import { nameof } from "../../tests.components/nameof";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { REFLECT_APPLY } from "./reflect-apply.injection-token";

describe("Mimics preset player", () => {
    beforeEach(() => {
        createInjector(MimicsPresetPlayer, [REFLECT_APPLY]);
    });

    it("Plays property read interaction", () => {
        const propertyName = "property_name";
        const value = "value";

        const target = {};
        target[propertyName] = value;

        const player = resolve2(MimicsPresetPlayer);
        const actual = player.play(target, new GetPropertyExpression(propertyName));

        expect(actual).toBe(value);
    });

    it("Plays property write interaction", () => {
        const propertyName = "property_name";
        const value = "value";

        const target = {};

        const player = resolve2(MimicsPresetPlayer);
        const actual = player.play(target, new SetPropertyExpression(propertyName, value));

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

        resolveMock(REFLECT_APPLY)
            .setup(instance => instance(method, target, [arg]))
            .returns(result);

        const player = resolve2(MimicsPresetPlayer);
        const actual = player.play(target, new MethodExpression(propertyName, [arg]));

        expect(actual).toBe(result);
    });

    it("Plays method invoke", () => {
        const arg = "value";
        const result = "result";
        const target = jasmine.createSpy();

        resolveMock(REFLECT_APPLY)
            .setup(instance => instance(target, undefined, [arg]))
            .returns(result);

        const player = resolve2(MimicsPresetPlayer);
        const actual = player.play(target, new FunctionExpression([arg]));

        expect(actual).toBe(result);
    });

    it("Plays in operator", () => {
        const name = "value";
        const target = {name};

        const player = resolve2(MimicsPresetPlayer);
        const actual = player.play(target, new InOperatorExpression(nameof<typeof target>("name")));

        expect(actual).toBe(true);
    });

    it("Plays new operator", () => {

        class TestClass {
            constructor(public readonly name: string) {
            }
        }

        const name = "value";

        const player = resolve2(MimicsPresetPlayer);
        const actual = player.play(TestClass, new NewOperatorExpression([name]));

        expect(actual).toEqual(new TestClass(name));
    });
});
