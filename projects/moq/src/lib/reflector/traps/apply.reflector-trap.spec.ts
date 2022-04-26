import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { ReflectingProxyFactory } from "../reflecting-proxy.factory";
import { ApplyReflectorTrap } from "./apply.reflector-trap";
import { It } from "moq.ts";
import { GetPropertyExpression, Expression, FunctionExpression, MethodExpression } from "../expressions";
import { EXPRESSIONS } from "../expression-reflector";

describe("Apply reflector-trap", () => {
    beforeEach(() => {
        createInjector(ApplyReflectorTrap, [ReflectingProxyFactory, EXPRESSIONS]);
    });

    it("Logs method expression", () => {
        const args = [];
        const proxy = {};
        const expressions = [];

        resolveMock(ReflectingProxyFactory)
            .setup(instance => instance.create())
            .returns(proxy);

        resolveMock(EXPRESSIONS)
            .setup(() => It.IsAny())
            .mimics(expressions);

        const trap = resolve2(ApplyReflectorTrap);
        const actual = trap(undefined, undefined, args);

        expect(actual).toBe(proxy);
        expect(expressions).toEqual([new FunctionExpression(args)]);
    });

    it("Adds method expression to the log", () => {
        const args = [];
        const proxy = {};
        const expressions = [{} as Expression];

        resolveMock(ReflectingProxyFactory)
            .setup(instance => instance.create())
            .returns(proxy);

        resolveMock(EXPRESSIONS)
            .setup(() => It.IsAny())
            .mimics(expressions);

        const trap = resolve2(ApplyReflectorTrap);
        const actual = trap(undefined, undefined, args);

        expect(actual).toBe(proxy);
        expect(expressions).toEqual([{} as Expression, new FunctionExpression(args)]);
    });

    it("Replaces the last get property expression with named method expression inside the log", () => {
        const args = [];
        const proxy = {};
        const name = "name";

        const expressions = [new GetPropertyExpression(name)];

        resolveMock(ReflectingProxyFactory)
            .setup(instance => instance.create())
            .returns(proxy);

        resolveMock(EXPRESSIONS)
            .setup(() => It.IsAny())
            .mimics(expressions);

        const trap = resolve2(ApplyReflectorTrap);
        const actual = trap(undefined, undefined, args);

        expect(actual).toBe(proxy);
        expect(expressions).toEqual([new MethodExpression(name, args)]);
    });
});
