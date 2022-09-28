import { EXPRESSION_REFLECTOR } from "../../lib/reflector/expression-reflector";
import reflectorProviders from "../../lib/reflector/index";
import { createInjectorFromProviders, resolve2 } from "../../tests.components/resolve.builder";
import { nameof } from "../../tests.components/nameof";
import { GetPropertyExpression, SetPropertyExpression } from "../../lib/reflector/expressions";
import { It } from "../../lib/reflector/expression-predicates";

describe("Set property expression reflector", () => {

    beforeEach(() => {
        createInjectorFromProviders(reflectorProviders);
    });

    it("Returns expressions when access property with dot notation", () => {
        interface T { prop: number }
        const value = 1;

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance.prop = value);
        const async = reflector.reflect<T>(async instance => instance.prop = value);

        const expected = [new SetPropertyExpression(nameof<T>("prop"), value)];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });

    it("Returns expressions when access property with [] notation", () => {
        interface T { prop: number }
        const value = 1;
        const propertyName = nameof<T>("prop");

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance[propertyName] = value);
        const async = reflector.reflect<T>(async instance => instance[propertyName] = value);

        const expected = [new SetPropertyExpression(propertyName, value)];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });

    it("Returns expressions when access property with [] notation for symbol", () => {
        const property: unique symbol = Symbol("");
        const value = 1;
        interface T { [property]: number }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance[property] = value);
        const async = reflector.reflect<T>(instance => instance[property] = value);

        const expected = [new SetPropertyExpression(nameof<T>(property), value)];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });

    it("Returns expressions when access property with [] notation for It", () => {
        interface T { prop: number }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance[It.IsAny()] = It.IsAny());
        const async = reflector.reflect<T>(instance => instance[It.IsAny()] = It.IsAny());

        const expected = [new SetPropertyExpression("[object Object]", It.IsAny())];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });
});
