import { EXPRESSION_REFLECTOR } from "../../lib/reflector/expression-reflector";
import reflectorProviders from "../../lib/reflector/index";
import { createInjectorFromProviders, resolve2 } from "../../tests.components/resolve.builder";
import { nameof } from "../../tests.components/nameof";
import { It } from "../../lib/reflector/expression-predicates";
import { GetPropertyExpression, MethodExpression } from "../../lib/reflector/expressions";

describe("Async expression reflector", () => {

    beforeEach(() => {
        createInjectorFromProviders(reflectorProviders);
    });

    it("Returns expressions for async instance => instance.getAsync(name)", () => {
        interface T { getAsync(name: string): Promise<number> }
        const name = "some name";

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => instance.getAsync(name));

        const expected = [new MethodExpression(nameof<T>("getAsync"), [name])];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions for async instance => await instance.getAsync(name)", () => {
        interface T { getAsync(name: string): Promise<number> }
        const name = "some name";

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => await instance.getAsync(name));

        const expected = [new MethodExpression(nameof<T>("getAsync"), [name])];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions for async () => await It.IsAny()", () => {
        interface T { getAsync(name: string): Promise<number> }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async () => await It.IsAny());

        const expected = [];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions for async () => It.IsAny()", () => {
        interface T { getAsync(name: string): Promise<number> }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async () => It.IsAny());

        const expected = [];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions for async instance => instance.promise", () => {
        interface T { promise: Promise<number> }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => instance.promise);

        const expected = [new GetPropertyExpression(nameof<T>("promise"))];
        expect(actual).toEqual(expected);
    });

    it("Returns expressions for async instance => await instance.promise", () => {
        interface T { promise: Promise<number> }

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(async instance => await instance.promise);

        const expected = [new GetPropertyExpression(nameof<T>("promise"))];
        expect(actual).toEqual(expected);
    });

});
