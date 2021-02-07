import {
    Expressions,
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NamedMethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "./expressions";
import { It } from "./expression-predicates";
import { ReflectorProxyFactory } from "./reflector-proxy.factory";

describe("Reflector proxy", () => {
    let reflector;
    let expressions: Expressions<unknown>[] = [];
    beforeEach(() => {
        expressions = [];
        reflector = new ReflectorProxyFactory().create(expressions);
    });

    it("Resolves undefined expression", () => {
        const expression = instance => undefined;
        expression(reflector);

        expect(expressions).toEqual([]);
    });

    it("Resolves empty expression", () => {
        const expression = instance => instance;
        expression(reflector);

        expect(expressions).toEqual([]);
    });

    it("Resolves empty method call", () => {
        const expression = instance => instance();
        expression(reflector);

        const expected = [new MethodExpression([])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves method call with argument", () => {
        const arg = "argument";
        const expression = instance => instance(arg);
        expression(reflector);

        const expected = [new MethodExpression([arg])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves get property", () => {
        const name = "member_name";
        const expression = instance => instance[name];
        expression(reflector);

        const expected = [new GetPropertyExpression(name)];
        expect(expressions).toEqual(expected);
    });

    it("Resolves in operator", () => {
        const name = "member_name";
        const expression = instance => name in (instance as any);
        expression(reflector);

        const expected = [new InOperatorExpression(name)];
        expect(expressions).toEqual(expected);
    });

    it("Resolves set property", () => {
        const name = "member_name";
        const arg = "argument";
        const expression = instance => {
            instance[name] = arg;
        };
        expression(reflector);

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
        expression(reflector);

        const expected = [new SetPropertyExpression(name, it)];
        expect(expressions).toEqual(expected);
    });

    it("Resolves set property with it without braces", () => {
        const name = "member_name";
        const it = It.IsAny();
        const expression = instance => instance[name] = it;
        expression(reflector);

        const expected = [new SetPropertyExpression(name, it)];
        expect(expressions).toEqual(expected);
    });

    it("Resolves named method call", () => {
        const name = "member_name";
        const expression = instance => instance[name]();
        expression(reflector);

        const expected = [new NamedMethodExpression(name, [])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves named method call with argument", () => {
        const name = "member_name";
        const arg = "argument";
        const expression = instance => instance[name](arg);
        expression(reflector);

        const expected = [new NamedMethodExpression(name, [arg])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves construct operator", () => {
        const arg = "value";
        const expression = instance => new instance(arg);
        expression(reflector);

        const expected = [new NewOperatorExpression([arg])];
        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.property.property", () => {
        const expression = instance => instance.member1.member2;
        expression(reflector);

        const expected = [
            new GetPropertyExpression("member1"),
            new GetPropertyExpression("member2"),
        ];
        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.property.method()", () => {
        const arg = "argument";

        const expression = instance => instance.member1.member2(arg);
        expression(reflector);

        const expected = [
            new GetPropertyExpression("member1"),
            new NamedMethodExpression("member2", [arg]),
        ];
        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.method().property", () => {
        const arg1 = "argument 1";

        const expression = instance => instance.member1(arg1).member2;
        expression(reflector);

        const expected = [
            new NamedMethodExpression("member1", [arg1]),
            new GetPropertyExpression("member2"),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.method().method()", () => {
        const arg1 = "argument 1";
        const arg2 = "argument 2";

        const expression = instance => instance.member1(arg1).member2(arg2);
        expression(reflector);

        const expected = [
            new NamedMethodExpression("member1", [arg1]),
            new NamedMethodExpression("member2", [arg2]),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of method().property", () => {
        const arg1 = "argument 1";

        const expression = instance => instance(arg1).member;
        expression(reflector);

        const expected = [
            new MethodExpression([arg1]),
            new GetPropertyExpression("member"),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of method().method()", () => {
        const arg1 = "argument 1";
        const arg2 = "argument 2";

        const expression = instance => instance(arg1).member(arg2);
        expression(reflector);

        const expected = [
            new MethodExpression([arg1]),
            new NamedMethodExpression("member", [arg2]),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of new instance().property", () => {
        const expression = instance => new instance().member1;
        expression(reflector);

        const expected = [
            new NewOperatorExpression([]),
            new GetPropertyExpression("member1"),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of new instance().method()", () => {
        const arg1 = "argument 1";

        const expression = instance => new instance().member1(arg1);
        expression(reflector);

        const expected = [
            new NewOperatorExpression([]),
            new NamedMethodExpression("member1", [arg1]),
        ];

        expect(expressions).toEqual(expected);
    });

    it("Resolves deep expression of instance.method()method().method()", () => {
        const arg1 = "argument 1";
        const arg2 = "argument 2";
        const arg3 = "argument 3";

        const expression = instance => instance.member1(arg1)(arg2).member3(arg3);
        expression(reflector);

        const expected = [
            new NamedMethodExpression("member1", [arg1]),
            new MethodExpression([arg2]),
            new NamedMethodExpression("member3", [arg3]),
        ];

        expect(expressions).toEqual(expected);
    });
});
