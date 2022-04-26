import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { ReflectingProxyFactory } from "../reflecting-proxy.factory";
import { ConstructReflectorTrap } from "./construct.reflector-trap";
import { EXPRESSIONS } from "../expression-reflector";
import { NewOperatorExpression } from "../expressions";

describe("Construct reflector-trap", () => {
    beforeEach(() => {
        createInjector(ConstructReflectorTrap, [ReflectingProxyFactory, EXPRESSIONS]);
    });

    beforeEach(() => {
        resolveMock(EXPRESSIONS)
            .prototypeof(Array.prototype);
    });

    it("Logs expression", () => {
        const args = [];
        const proxy = {};

        resolveMock(ReflectingProxyFactory)
            .setup(instance => instance.create())
            .returns(proxy);

        const trap = resolve2(ConstructReflectorTrap);
        const actual = trap(undefined, args);

        expect(actual).toBe(proxy);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new NewOperatorExpression(args)));
    });
});
