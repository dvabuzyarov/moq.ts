import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { EXPRESSIONS } from "../expressions.injection-token";
import { NewOperatorExpression } from "../expressions";
import { ReflectorProxy } from "../reflector-proxy";
import { ConstructTrap } from "./construct.trap";

describe("Construct trap", () => {
    beforeEach(() => {
        createInjector2(ConstructTrap, [ReflectorProxy, EXPRESSIONS]);
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

        const trap = resolve2(ConstructTrap);
        const actual = trap(undefined, args);

        expect(actual).toBe(proxy);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new NewOperatorExpression(args)));
    });
});
