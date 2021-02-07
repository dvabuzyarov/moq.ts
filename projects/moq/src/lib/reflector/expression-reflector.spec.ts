import { ExpressionReflector } from "./expression-reflector";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ReflectorProxyFactory } from "./reflector-proxy.factory";
import { It, Mock } from "moq.ts";
import * as local from "./expression-predicates";
import { SetPropertyExpression } from "./expressions";

describe("Expression Reflector", () => {

    beforeEach(() => {
        createInjector2(ExpressionReflector, [ReflectorProxyFactory]);
    });

    it("Returns expressions", () => {
        const proxy = new Mock<typeof Proxy>()
            .object();

        let expressions;
        resolveMock(ReflectorProxyFactory)
            .setup(instance => instance.create(It.IsAny()))
            .callback(({args: [first]}) => {
                expressions = first;
                return proxy;
            });

        const expression = new Mock<(instance) => undefined>()
            .setup(instance => instance(proxy))
            .returns(undefined)
            .object();

        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(expression);

        expect(actual).toBe(expressions);
    });

    it("Returns expression predicate", () => {
        const proxy = new Mock<typeof Proxy>()
            .object();

        resolveMock(ReflectorProxyFactory)
            .setup(instance => instance.create(It.IsAny()))
            .returns(proxy);

        const expression = new Mock<(instance) => undefined>()
            .setup(instance => instance(proxy))
            .returns(local.It.IsAny())
            .object();

        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(expression);

        expect(actual).toEqual([jasmine.any(local.It)]);
    });

    it("Returns expressions when It predicate is being returned at the end", () => {
        const interaction = new SetPropertyExpression(undefined, It.IsAny());
        const proxy = new Mock<typeof Proxy>()
            .object();

        resolveMock(ReflectorProxyFactory)
            .setup(instance => instance.create(It.IsAny()))
            .callback(({args: [expressions]}) => {
                expressions.push(interaction);
                return proxy;
            });

        const expression = new Mock<(instance) => undefined>()
            .setup(instance => instance(proxy))
            .returns(local.It.IsAny())
            .object();

        const reflector = resolve2(ExpressionReflector);
        const actual = reflector.reflect(expression);

        expect(actual).toEqual([interaction]);
    });

});
