import { SyncExpressionReflector } from "./sync-expression.reflector";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ReflectingProxyInjectorFactory } from "./reflecting-proxy.injector-factory";
import { It, Mock } from "moq.ts";
import * as local from "./expression-predicates";
import { Injector } from "../static.injector/injector";
import { ReflectingProxyFactory } from "./reflecting-proxy.factory";
import { EXPRESSIONS } from "./expression-reflector";
import { SetPropertyExpression } from "./expressions";

describe("Sync expression reflector", () => {

    beforeEach(() => {
        createInjector(SyncExpressionReflector, [ReflectingProxyInjectorFactory]);
    });

    it("Returns expressions", () => {
        const proxy = new Mock<typeof Proxy>()
            .object();
        const expressions = [];

        const reflectingProxyFactory = new Mock<ReflectingProxyFactory>()
            .setup(instance => instance.create())
            .returns(proxy)
            .object();
        const injector = new Mock<Injector>()
            .prototypeof(Injector.prototype)
            .setup(instance => instance.get(ReflectingProxyFactory))
            .returns(reflectingProxyFactory)
            .setup(instance => instance.get(EXPRESSIONS))
            .returns(expressions)
            .object();

        resolveMock(ReflectingProxyInjectorFactory)
            .setup(instance => instance.create())
            .returns(injector);

        const expressionMock = new Mock<(instance) => undefined>()
            .setup(instance => instance(proxy))
            .returns(undefined);

        const reflector = resolve2(SyncExpressionReflector);
        const actual = reflector.reflect(expressionMock.object());

        expect(actual).toBe(expressions);
        expressionMock.verify(instance => instance(proxy));
    });

    it("Returns expression predicate", () => {
        const proxy = new Mock<typeof Proxy>()
            .object();
        const expressions = [];

        const reflectingProxyFactory = new Mock<ReflectingProxyFactory>()
            .setup(instance => instance.create())
            .returns(proxy)
            .object();
        const injector = new Mock<Injector>()
            .prototypeof(Injector.prototype)
            .setup(instance => instance.get(ReflectingProxyFactory))
            .returns(reflectingProxyFactory)
            .setup(instance => instance.get(EXPRESSIONS))
            .returns(expressions)
            .object();

        resolveMock(ReflectingProxyInjectorFactory)
            .setup(instance => instance.create())
            .returns(injector);

        const expressionMock = new Mock<(instance) => undefined>()
            .setup(instance => instance(proxy))
            .returns(local.It.IsAny());

        const reflector = resolve2(SyncExpressionReflector);
        const actual = reflector.reflect(expressionMock.object());

        expect(actual).toEqual([jasmine.any(local.It)]);
        expressionMock.verify(instance => instance(proxy));
    });

    it("Returns expressions when It predicate is being returned at the end", () => {
        const interaction = new SetPropertyExpression(undefined, It.IsAny());
        const proxy = new Mock<typeof Proxy>()
            .object();
        const expressions = [interaction];

        const reflectingProxyFactory = new Mock<ReflectingProxyFactory>()
            .setup(instance => instance.create())
            .returns(proxy)
            .object();
        const injector = new Mock<Injector>()
            .prototypeof(Injector.prototype)
            .setup(instance => instance.get(ReflectingProxyFactory))
            .returns(reflectingProxyFactory)
            .setup(instance => instance.get(EXPRESSIONS))
            .returns(expressions)
            .object();

        resolveMock(ReflectingProxyInjectorFactory)
            .setup(instance => instance.create())
            .returns(injector);

        const expressionMock = new Mock<(instance) => undefined>()
            .setup(instance => instance(proxy))
            .returns(local.It.IsAny());

        const reflector = resolve2(SyncExpressionReflector);
        const actual = reflector.reflect(expressionMock.object());

        expect(actual).toEqual([interaction]);
        expressionMock.verify(instance => instance(proxy));
    });

    it("Returns It when expression is It", () => {
        const expression = local.It.IsAny();

        const reflector = resolve2(SyncExpressionReflector);
        const actual = reflector.reflect(expression);

        expect(actual).toEqual([expression]);
    });

});
