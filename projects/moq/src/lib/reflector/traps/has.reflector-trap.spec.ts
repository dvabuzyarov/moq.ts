import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { HasReflectorTrap } from "./has.reflector-trap";
import { EXPRESSIONS } from "../expression-reflector";
import { InOperatorExpression } from "../expressions";

describe("Has reflector-trap", () => {
    beforeEach(() => {
        createInjector(HasReflectorTrap, [EXPRESSIONS]);
    });

    beforeEach(() => {
        resolveMock(EXPRESSIONS)
            .prototypeof(Array.prototype);
    });

    it("Logs expression", () => {
        const name = "name";

        const trap = resolve2(HasReflectorTrap);
        const actual = trap(undefined, name);

        expect(actual).toBe(true);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new InOperatorExpression(name)));
    });
});
