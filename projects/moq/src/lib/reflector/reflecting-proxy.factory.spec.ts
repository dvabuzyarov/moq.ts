import { Expressions } from "./expressions";
import { It } from "./expression-predicates";
import { ReflectingProxyInjectorFactory } from "./reflecting-proxy.injector-factory";
import { ReflectingProxyFactory } from "./reflecting-proxy.factory";
import { EXPRESSIONS } from "./expression-reflector";
import {
    GetPropertyExpression,
    InOperatorExpression,
    FunctionExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "./expressions";

describe("Reflecting proxy", () => {
    let proxy;
    let expressions: Expressions<unknown>[] = [];
    beforeEach(() => {
        const injector = new ReflectingProxyInjectorFactory().create();
        expressions = injector.get(EXPRESSIONS);
        proxy = injector.get(ReflectingProxyFactory).create();
    });

    it("Resolves undefined expression", () => {
        const expression = instance => undefined;
        expression(proxy);

        expect(expressions).toEqual([]);
    });

    it("Resolves empty expression", () => {
        const expression = instance => instance;
        expression(proxy);

        expect(expressions).toEqual([]);
    });

    it("Resolves empty method call", () => {
        const expression = instance => instance();
        expression(proxy);

        const expected = [new FunctionExpression([])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves method call with argument", () => {
        const arg = "argument";
        const expression = instance => instance(arg);
        expression(proxy);

        const expected = [new FunctionExpression([arg])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves get property", () => {
        const name = "member_name";
        const expression = instance => instance[name];
        expression(proxy);

        const expected = [new GetPropertyExpression(name)];
        expect(expressions).toEqual(expected);
    });

    it("Resolves in operator", () => {
        const name = "member_name";
        const expression = instance => name in (instance as any);
        expression(proxy);

        const expected = [new InOperatorExpression(name)];
        expect(expressions).toEqual(expected);
    });

    it("Resolves set property", () => {
        const name = "member_name";
        const arg = "argument";
        const expression = instance => {
            instance[name] = arg;
        };
        expression(proxy);

        const expected = [new SetPropertyExpression(name, arg)];
        expect(expressions).toEqual(expected);
    });

    it("Resolves set property with it", () => {
        const name = "member_name";
        const arg = "argument";
        const it = It.Is(value => value === arg);

        const expression = instance => {
            instance[name] = it;
        };
        expression(proxy);

        const expected = [new SetPropertyExpression(name, it)];
        expect(expressions).toEqual(expected);
    });

    it("Resolves set property with it without braces", () => {
        const name = "member_name";
        const it = It.IsAny();
        const expression = instance => instance[name] = it;
        expression(proxy);

        const expected = [new SetPropertyExpression(name, it)];
        expect(expressions).toEqual(expected);
    });

    it("Resolves named method call", () => {
        const name = "member_name";
        const expression = instance => instance[name]();
        expression(proxy);

        const expected = [new MethodExpression(name, [])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves named method call with argument", () => {
        const name = "member_name";
        const arg = "argument";
        const expression = instance => instance[name](arg);
        expression(proxy);

        const expected = [new MethodExpression(name, [arg])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves construct operator", () => {
        const arg = "value";
        const expression = instance => new instance(arg);
        expression(proxy);

        const expected = [new NewOperatorExpression([arg])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.property.property", () => {
        const expression = instance => instance.member1.member2;
        expression(proxy);

        const expected = [
            new GetPropertyExpression("member1"),
            new GetPropertyExpression("member2"),
        ];
        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.property.method()", () => {
        const arg = "argument";

        const expression = instance => instance.member1.member2(arg);
        expression(proxy);

        const expected = [
            new GetPropertyExpression("member1"),
            new MethodExpression("member2", [arg]),
        ];
        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.method().property", () => {
        const arg1 = "argument 1";

        const expression = instance => instance.member1(arg1).member2;
        expression(proxy);

        const expected = [
            new MethodExpression("member1", [arg1]),
            new GetPropertyExpression("member2"),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.method().method()", () => {
        const arg1 = "argument 1";
        const arg2 = "argument 2";

        const expression = instance => instance.member1(arg1).member2(arg2);
        expression(proxy);

        const expected = [
            new MethodExpression("member1", [arg1]),
            new MethodExpression("member2", [arg2]),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of method().property", () => {
        const arg1 = "argument 1";

        const expression = instance => instance(arg1).member;
        expression(proxy);

        const expected = [
            new FunctionExpression([arg1]),
            new GetPropertyExpression("member"),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of method().method()", () => {
        const arg1 = "argument 1";
        const arg2 = "argument 2";

        const expression = instance => instance(arg1).member(arg2);
        expression(proxy);

        const expected = [
            new FunctionExpression([arg1]),
            new MethodExpression("member", [arg2]),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of new instance().property", () => {
        const expression = instance => new instance().member1;
        expression(proxy);

        const expected = [
            new NewOperatorExpression([]),
            new GetPropertyExpression("member1"),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of new instance().method()", () => {
        const arg1 = "argument 1";

        const expression = instance => new instance().member1(arg1);
        expression(proxy);

        const expected = [
            new NewOperatorExpression([]),
            new MethodExpression("member1", [arg1]),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.method()method().method()", () => {
        const arg1 = "argument 1";
        const arg2 = "argument 2";
        const arg3 = "argument 3";

        const expression = instance => instance.member1(arg1)(arg2).member3(arg3);
        expression(proxy);

        const expected = [
            new MethodExpression("member1", [arg1]),
            new FunctionExpression([arg2]),
            new MethodExpression("member3", [arg3]),
        ];

        expect(expressions).toEqual(expected);
    });
});
