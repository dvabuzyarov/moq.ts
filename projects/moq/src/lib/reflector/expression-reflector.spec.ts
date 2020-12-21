import { ExpressionReflector } from "./expression-reflector";
import {
    NewOperatorExpression,
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NamedMethodExpression,
    SetPropertyExpression
} from "./expressions";
import { It } from "./expression-predicates";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";

describe("Expression Reflector", () => {

    beforeEach(() => {
        createInjector2(ExpressionReflector, []);
    });

    it("Resolves undefined expression", () => {
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(instance => undefined);

        expect(actual).toBeUndefined();
    });

    it("Resolves empty expression", () => {
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(instance => instance);

        expect(actual).toBeUndefined();
    });

    it("Resolves empty method call", () => {
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect<() => void>(instance => instance());

        const expected = new MethodExpression([]);
        expect(actual).toEqual(expected);
    });

    it("Resolves method call with argument", () => {
        const arg = "argument";
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect<any>(instance => instance(arg));

        const expected = new MethodExpression([arg]);
        expect(actual).toEqual(expected);
    });

    it("Resolves get property", () => {
        const name = "member_name";
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(instance => instance[name]);

        const expected = new GetPropertyExpression(name);
        expect(actual).toEqual(expected);
    });

    it("Resolves in operator", () => {
        const name = "member_name";
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(instance => name in (instance as any));

        const expected = new InOperatorExpression(name);
        expect(actual).toEqual(expected);
    });

    it("Resolves set property", () => {
        const name = "member_name";
        const arg = "argument";
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(instance => {
            instance[name] = arg;
        });

        const expected = new SetPropertyExpression(name, arg);
        expect(actual).toEqual(expected);
    });

    it("Resolves set property with it", () => {
        const name = "member_name";
        const arg = "argument";
        const reflector = resolve2(ExpressionReflector);
        const it = It.Is(value => value === arg);
        const actual = reflector.reflect(instance => {
            instance[name] = it;
        });

        const expected = new SetPropertyExpression(name, it);
        expect(actual).toEqual(expected);
    });

    it("Resolves set property with it without braces", () => {
        const name = "member_name";
        const reflector = resolve2(ExpressionReflector);
        const it = It.IsAny();
        const actual = reflector.reflect(instance => instance[name] = it);

        const expected = new SetPropertyExpression(name, it);
        expect(actual).toEqual(expected);
    });

    it("Resolves named method call", () => {
        const name = "member_name";
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(instance => instance[name]());

        const expected = new NamedMethodExpression(name, []);
        expect(actual).toEqual(expected);
    });

    it("Resolves named method call with argument", () => {
        const name = "member_name";
        const arg = "argument";
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(instance => instance[name](arg));

        const expected = new NamedMethodExpression(name, [arg]);
        expect(actual).toEqual(expected);
    });

    it("Resolves expression predicate", () => {
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(instance => It.Is(() => undefined));

        expect(actual).toEqual(jasmine.any(It));
    });

    it("Resolves construct operator", () => {
        const arg = "value";
        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect<(name: string) => void>(instance => new instance(arg));

        const expected = new NewOperatorExpression([arg]);
        expect(actual).toEqual(expected);
    });
});
