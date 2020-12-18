import { ExpectedExpressionReflector } from "./expected-expression-reflector";
import {
    ExpectedGetPropertyExpression,
    ExpectedInOperatorExpression,
    ExpectedMethodExpression,
    ExpectedNamedMethodExpression,
    ExpectedSetPropertyExpression
} from "./expected-expressions";
import { It } from "./expression-predicates";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";

describe("Expected Expression Reflector", () => {

    beforeEach(() => {
        createInjector2(ExpectedExpressionReflector, []);
    });

    it("Resolves undefined expression", () => {
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect(instance => undefined);

        expect(actual).toBeUndefined();
    });

    it("Resolves empty expression", () => {
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect(instance => instance);

        expect(actual).toBeUndefined();
    });

    it("Resolves empty method call", () => {
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect<() => void>(instance => instance());

        const expected = new ExpectedMethodExpression([]);
        expect(actual).toEqual(expected);
    });

    it("Resolves method call with argument", () => {
        const arg = "argument";
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect<any>(instance => instance(arg));

        const expected = new ExpectedMethodExpression([arg]);
        expect(actual).toEqual(expected);
    });

    it("Resolves get property", () => {
        const name = "member_name";
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect(instance => instance[name]);

        const expected = new ExpectedGetPropertyExpression(name);
        expect(actual).toEqual(expected);
    });

    it("Resolves in operator", () => {
        const name = "member_name";
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect(instance => name in (instance as any));

        const expected = new ExpectedInOperatorExpression(name);
        expect(actual).toEqual(expected);
    });

    it("Resolves set property", () => {
        const name = "member_name";
        const arg = "argument";
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect(instance => {
            instance[name] = arg;
        });

        const expected = new ExpectedSetPropertyExpression(name, arg);
        expect(actual).toEqual(expected);
    });

    it("Resolves set property with it", () => {
        const name = "member_name";
        const arg = "argument";
        const reflector = resolve2(ExpectedExpressionReflector);
        const it = It.Is(value => value === arg);
        const actual = reflector.reflect(instance => {
            instance[name] = it;
        });

        const expected = new ExpectedSetPropertyExpression(name, it);
        expect(actual).toEqual(expected);
    });

    it("Resolves set property with it without braces", () => {
        const name = "member_name";
        const reflector = resolve2(ExpectedExpressionReflector);
        const it = It.IsAny();
        const actual = reflector.reflect(instance => instance[name] = it);

        const expected = new ExpectedSetPropertyExpression(name, it);
        expect(actual).toEqual(expected);
    });

    it("Resolves named method call", () => {
        const name = "member_name";
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect(instance => instance[name]());

        const expected = new ExpectedNamedMethodExpression(name, []);
        expect(actual).toEqual(expected);
    });

    it("Resolves named method call with argument", () => {
        const name = "member_name";
        const arg = "argument";
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect(instance => instance[name](arg));

        const expected = new ExpectedNamedMethodExpression(name, [arg]);
        expect(actual).toEqual(expected);
    });

    it("Resolves expression predicate", () => {
        const reflector = resolve2(ExpectedExpressionReflector);
        const actual = reflector.reflect(instance => It.Is(() => undefined));

        expect(actual).toEqual(jasmine.any(It));
    });

});
