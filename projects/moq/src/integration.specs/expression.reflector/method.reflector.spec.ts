import { EXPRESSION_REFLECTOR } from "../../lib/reflector/expression-reflector";
import reflectorProviders from "../../lib/reflector";
import { createInjectorFromProviders, resolve2 } from "../../tests.components/resolve.builder";
import { MethodExpression } from "../../lib/reflector/expressions";
import { It } from "../../lib/reflector/expression-predicates";
import { nameof } from "../../tests.components/nameof";

describe("Method expression reflector", () => {

    beforeEach(() => {
        createInjectorFromProviders(reflectorProviders);
    });

    it("Returns expressions with args", () => {
        interface T { get: (arg: number) => number }
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance.get(value));

        const expected = [new MethodExpression(nameof<T>("get"), [value])];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions with It", () => {
        interface T { get: (arg: number) => number }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance.get(It.IsAny()));

        const expected = [new MethodExpression(nameof<T>("get"), [It.IsAny()])];
        expect(actual).toEqual(expected);
    });

    it("Returns async expressions with args", () => {
        interface T { get: (arg: number) => Promise<number> }
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => await instance.get(value));

        const expected = [new MethodExpression(nameof<T>("get"), [value])];
        expect(actual).toEqual(expected);
    });

    it("Returns async expressions with It", () => {
        interface T { get: (arg: number) => Promise<number> }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => await instance.get(It.IsAny()));

        const expected = [new MethodExpression(nameof<T>("get"), [It.IsAny()])];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions with rest parameters", () => {
        interface T { get: (...arg: number[]) => number }
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance.get(value));

        const expected = [new MethodExpression(nameof<T>("get"), [value])];
        expect(actual).toEqual(expected);
    });
});
