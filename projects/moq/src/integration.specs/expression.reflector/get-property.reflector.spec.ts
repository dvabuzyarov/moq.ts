import { EXPRESSION_REFLECTOR } from "../../lib/reflector/expression-reflector";
import reflectorProviders from "../../lib/reflector/index";
import { createInjectorFromProviders, resolve2 } from "../../tests.components/resolve.builder";
import { nameof } from "../../tests.components/nameof";
import { GetPropertyExpression } from "../../lib/reflector/expressions";
import { It } from "../../lib/reflector/expression-predicates";

describe("Get property expression reflector", () => {

    beforeEach(() => {
        createInjectorFromProviders(reflectorProviders);
    });

    it("Returns expressions when access property with dot notation", () => {
        interface T { prop: number }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance.prop);
        const async = reflector.reflect<T>(async instance => instance.prop);

        const expected = [new GetPropertyExpression(nameof<T>("prop"))];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });

    it("Returns expressions when access property with [] notation", () => {
        interface T { prop: number }
        const propertyName = nameof<T>("prop");

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance[propertyName]);
        const async = reflector.reflect<T>(async instance => instance[propertyName]);

        const expected = [new GetPropertyExpression(propertyName)];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });

    it("Returns expressions when access property with [] notation for symbol", () => {
        const property: unique symbol = Symbol("");
        interface T { [property]: number }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance[property]);
        const async = reflector.reflect<T>(instance => instance[property]);

        const expected = [new GetPropertyExpression(nameof<T>(property))];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });

    it("Returns expressions when access property with [] notation for It", () => {
        interface T { prop: number }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance[It.IsAny()]);
        const async = reflector.reflect<T>(instance => instance[It.IsAny()]);

        const expected = [new GetPropertyExpression("[object Object]")];
        expect(actual).toEqual(expected);
        expect(async).toEqual(expected);
    });
});
