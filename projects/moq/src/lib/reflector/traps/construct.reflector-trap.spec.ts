import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { EXPRESSIONS } from "../expressions.injection-token";
import { NewOperatorExpression } from "../expressions";
import { ReflectorProxy } from "../reflector-proxy";
import { ConstructReflectorTrap } from "./construct.reflector-trap";

describe("Construct reflector-trap", () => {
    beforeEach(() => {
        createInjector2(ConstructReflectorTrap, [ReflectorProxy, EXPRESSIONS]);
    });

    beforeEach(() => {
        resolveMock(EXPRESSIONS)
            .prototypeof(Array.prototype);
    });

    it("Logs expression", () => {
        const args = [];
        const proxy = {};

        resolveMock(ReflectorProxy)
            .setup(instance => instance.factory())
            .returns(proxy);

        const trap = resolve2(ConstructReflectorTrap);
        const actual = trap(undefined, args);

        expect(actual).toBe(proxy);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new NewOperatorExpression(args)));
    });
});
