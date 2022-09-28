import { EXPRESSION_REFLECTOR } from "../../lib/reflector/expression-reflector";
import reflectorProviders from "../../lib/reflector/index";
import { createInjectorFromProviders, resolve2 } from "../../tests.components/resolve.builder";
import { FunctionExpression } from "../../lib/reflector/expressions";
import { It } from "../../lib/reflector/expression-predicates";

describe("Function expression reflector", () => {

    beforeEach(() => {
        createInjectorFromProviders(reflectorProviders);
    });

    it("Returns expressions with args", () => {
        type T = (arg: number) => number;
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance(value));

        const expected = [new FunctionExpression([value])];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions with It", () => {
        type T = (arg: number) => number;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance(It.IsAny()));

        const expected = [new FunctionExpression([It.IsAny()])];
        expect(actual).toEqual(expected);
    });

    it("Returns async expressions with args", () => {
        type T = (arg: number) => Promise<number>;
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => await instance(value));

        const expected = [new FunctionExpression([value])];
        expect(actual).toEqual(expected);
    });

    it("Returns async expressions with It", () => {
        type T = (arg: number) => Promise<number>;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => await instance(It.IsAny()));

        const expected = [new FunctionExpression([It.IsAny()])];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions with rest parameters", () => {
        type T = (...arg: number[]) => number;
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance(value));

        const expected = [new FunctionExpression([value])];
        expect(actual).toEqual(expected);
    });
});
