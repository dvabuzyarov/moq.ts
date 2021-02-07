import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { EXPRESSIONS } from "../expressions.injection-token";
import { GetPropertyExpression, MethodExpression, NamedMethodExpression } from "../expressions";
import { ReflectorProxy } from "../reflector-proxy";
import { ApplyReflectorTrap } from "./apply.reflector-trap";
import { It } from "moq.ts";
import { Interaction } from "../../interactions";

describe("Apply reflector-trap", () => {
    beforeEach(() => {
        createInjector2(ApplyReflectorTrap, [ReflectorProxy, EXPRESSIONS]);
    });

    it("Logs method expression", () => {
        const args = [];
        const proxy = {};
        const expressions = [];

        resolveMock(ReflectorProxy)
            .setup(instance => instance.factory())
            .returns(proxy);

        resolveMock(EXPRESSIONS)
            .setup(() => It.IsAny())
            .mimics(expressions);

        const trap = resolve2(ApplyReflectorTrap);
        const actual = trap(undefined, undefined, args);

        expect(actual).toBe(proxy);
        expect(expressions).toEqual([new MethodExpression(args)]);
    });

    it("Adds method expression to the log", () => {
        const args = [];
        const proxy = {};
        const expressions = [{} as Interaction];

        resolveMock(ReflectorProxy)
            .setup(instance => instance.factory())
            .returns(proxy);

        resolveMock(EXPRESSIONS)
            .setup(() => It.IsAny())
            .mimics(expressions);

        const trap = resolve2(ApplyReflectorTrap);
        const actual = trap(undefined, undefined, args);

        expect(actual).toBe(proxy);
        expect(expressions).toEqual([{} as Interaction, new MethodExpression(args)]);
    });

    it("Replaces the last get property expression with named method expression inside the log", () => {
        const args = [];
        const proxy = {};
        const name = "name";

        const expressions = [new GetPropertyExpression(name)];

        resolveMock(ReflectorProxy)
            .setup(instance => instance.factory())
            .returns(proxy);

        resolveMock(EXPRESSIONS)
            .setup(() => It.IsAny())
            .mimics(expressions);

        const trap = resolve2(ApplyReflectorTrap);
        const actual = trap(undefined, undefined, args);

        expect(actual).toBe(proxy);
        expect(expressions).toEqual([new NamedMethodExpression(name, args)]);
    });
});
