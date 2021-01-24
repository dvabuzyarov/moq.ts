import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { EXPRESSIONS } from "../expressions.injection-token";
import { GetPropertyExpression } from "../expressions";
import { GetTrap } from "./get.trap";
import { ReflectorProxy } from "../reflector-proxy";

describe("Get trap", () => {
    beforeEach(() => {
        createInjector2(GetTrap, [ReflectorProxy, EXPRESSIONS]);
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

        const trap = resolve2(GetTrap);
        const actual = trap(undefined, name);

        expect(actual).toBe(proxy);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new GetPropertyExpression(name)));
    });
});
