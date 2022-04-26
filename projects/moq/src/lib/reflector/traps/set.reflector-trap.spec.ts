import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { SetReflectorTrap } from "./set.reflector-trap";
import { EXPRESSIONS } from "../expression-reflector";
import { SetPropertyExpression } from "../expressions";

describe("Set reflector-trap", () => {
    beforeEach(() => {
        createInjector(SetReflectorTrap, [EXPRESSIONS]);
    });

    beforeEach(() => {
        resolveMock(EXPRESSIONS)
            .prototypeof(Array.prototype);
    });

    it("Logs expression", () => {
        const value = {};
        const name = "name";

        const trap = resolve2(SetReflectorTrap);
        const actual = trap(undefined, name, value);

        expect(actual).toBe(true);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new SetPropertyExpression(name, value)));
    });
});
