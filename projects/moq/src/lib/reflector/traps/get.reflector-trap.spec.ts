import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { GetReflectorTrap } from "./get.reflector-trap";
import { ReflectingProxyFactory } from "../reflecting-proxy.factory";
import { EXPRESSIONS } from "../expression-reflector";
import { GetPropertyExpression } from "../expressions";

describe("Get reflector-trap", () => {
    beforeEach(() => {
        createInjector(GetReflectorTrap, [ReflectingProxyFactory, EXPRESSIONS]);
    });

    beforeEach(() => {
        resolveMock(EXPRESSIONS)
            .prototypeof(Array.prototype);
    });

    it("Logs expression", () => {
        const name = "name";
        const proxy = {};

        resolveMock(ReflectingProxyFactory)
            .setup(instance => instance.create())
            .returns(proxy);

        const trap = resolve2(GetReflectorTrap);
        const actual = trap(undefined, name);

        expect(actual).toBe(proxy);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new GetPropertyExpression(name)));
    });
});
