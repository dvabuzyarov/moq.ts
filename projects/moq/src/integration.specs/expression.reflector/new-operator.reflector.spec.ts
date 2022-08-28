import { EXPRESSION_REFLECTOR } from "../../lib/reflector/expression-reflector";
import reflectorProviders from "../../lib/reflector/index";
import { createInjectorFromProviders, resolve2 } from "../../tests.components/resolve.builder";
import { NewOperatorExpression } from "../../lib/reflector/expressions";
import { It } from "../../lib/reflector/expression-predicates";

describe("New operator expression reflector", () => {


    beforeEach(() => {
        createInjectorFromProviders(reflectorProviders);
    });

    it("Returns expressions with args", () => {
        interface T { new(arg: number) }
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => new instance(value));

        const expected = [new NewOperatorExpression([value])];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions with It", () => {
        interface T { new(arg: number) }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => new instance(It.IsAny()));

        const expected = [new NewOperatorExpression([It.IsAny()])];
        expect(actual).toEqual(expected);
    });

    it("Returns async expressions with args", () => {
        type T = new(arg: number) => Promise<number>;
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => await new instance(value));

        const expected = [new NewOperatorExpression([value])];
        expect(actual).toEqual(expected);
    });

    it("Returns async expressions with It", () => {
        type T = new(arg: number) => Promise<number>;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => await new instance(It.IsAny()));

        const expected = [new NewOperatorExpression([It.IsAny()])];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions with rest parameters", () => {
        interface T { new(...args: number[]) }
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => new instance(value));

        const expected = [new NewOperatorExpression([value])];
        expect(actual).toEqual(expected);
    });
});
