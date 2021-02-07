import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { EXPRESSIONS } from "../expressions.injection-token";
import { GetPropertyExpression } from "../expressions";
import { GetReflectorTrap } from "./get.reflector-trap";
import { ReflectorProxy } from "../reflector-proxy";

describe("Get reflector-trap", () => {
    beforeEach(() => {
        createInjector2(GetReflectorTrap, [ReflectorProxy, EXPRESSIONS]);
    });

    beforeEach(() => {
        resolveMock(EXPRESSIONS)
            .prototypeof(Array.prototype);
    });

    it("Logs expression", () => {
        const name = "name";
        const proxy = {};

        resolveMock(ReflectorProxy)
            .setup(instance => instance.factory())
            .returns(proxy);

        const trap = resolve2(GetReflectorTrap);
        const actual = trap(undefined, name);

        expect(actual).toBe(proxy);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new GetPropertyExpression(name)));
    });
});
