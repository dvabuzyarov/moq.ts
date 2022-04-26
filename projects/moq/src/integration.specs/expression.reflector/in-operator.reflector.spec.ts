import { EXPRESSION_REFLECTOR } from "../../lib/reflector/expression-reflector";
import reflectorProviders from "../../lib/reflector";
import { createInjectorFromProviders, resolve2 } from "../../tests.components/resolve.builder";
import { nameof } from "../../tests.components/nameof";
import { InOperatorExpression } from "../../lib/reflector/expressions";
import { It } from "../../lib/reflector/expression-predicates";

describe("In operator expression reflector", () => {

    beforeEach(() => {
        createInjectorFromProviders(reflectorProviders);
    });

    it("Returns expressions", () => {
        interface T { prop: number }
        const propertyName = nameof<T>("prop");

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => propertyName in instance);
        const async = reflector.reflect<T>(async instance => propertyName in instance);

        const expected = [new InOperatorExpression(nameof<T>("prop"))];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });

    it("Returns expressions when access property with [] notation for symbol", () => {
        const property: unique symbol = Symbol("");
        interface T { [property]: number }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => property in instance);
        const async = reflector.reflect<T>(instance => property in instance);

        const expected = [new InOperatorExpression(nameof<T>(property))];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });

    it("Returns expressions for notation for It", () => {
        interface T { prop: number }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => It.IsAny() in instance);
        const async = reflector.reflect<T>(instance => It.IsAny() in instance);

        const expected = [new InOperatorExpression("[object Object]")];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });
});
