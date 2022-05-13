import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { It } from "moq.ts";
import { GetPropertyExpression, Expression, MethodExpression } from "../expressions";
import { EXPRESSIONS } from "../expression-reflector";
import { MethodReflectorTrap } from "./method.reflector-trap";

describe("Method reflector-trap", () => {
    beforeEach(() => {
        createInjector(MethodReflectorTrap, [EXPRESSIONS]);
    });

    it("Adds method expression to the log", () => {
        const args = [];
        const expressions = [{} as Expression];

        resolveMock(EXPRESSIONS)
            .setup(() => It.IsAny())
            .mimics(expressions);

        const trap = resolve2(MethodReflectorTrap);
        const actual = trap(undefined, undefined, args);

        expect(actual).toBe(undefined);
        expect(expressions).toEqual([{} as Expression]);
    });

    it("Replaces the last get property expression with named method expression inside the log", () => {
        const args = [];
        const name = "name";

        const expressions = [new GetPropertyExpression(name)];

        resolveMock(EXPRESSIONS)
            .setup(() => It.IsAny())
            .mimics(expressions);

        const trap = resolve2(MethodReflectorTrap);
        const actual = trap(undefined, undefined, args);

        expect(actual).toBe(undefined);
        expect(expressions).toEqual([new MethodExpression(name, args)]);
    });
});
