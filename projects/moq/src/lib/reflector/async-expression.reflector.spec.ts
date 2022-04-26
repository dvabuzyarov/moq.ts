import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Mock } from "moq.ts";
import { Injector } from "../static.injector/injector";
import { ReflectingProxyFactory } from "./reflecting-proxy.factory";
import { EXPRESSIONS } from "./expression-reflector";
import { AsyncExpressionReflector } from "./async-expression.reflector";
import { AsyncReflectingProxyInjectorFactory } from "./async-reflecting-proxy.injector-factory";

describe("Async expression reflector", () => {

    beforeEach(() => {
        createInjector(AsyncExpressionReflector, [AsyncReflectingProxyInjectorFactory]);
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

        resolveMock(AsyncReflectingProxyInjectorFactory)
            .setup(instance => instance.create())
            .returns(injector);

        const expressionMock = new Mock<(instance) => undefined>()
            .setup(instance => instance(proxy))
            .returns(undefined);

        const reflector = resolve2(AsyncExpressionReflector);
        const actual = reflector.reflect(expressionMock.object());

        expect(actual).toBe(expressions);
        expressionMock.verify(instance => instance(proxy));
    });
});
