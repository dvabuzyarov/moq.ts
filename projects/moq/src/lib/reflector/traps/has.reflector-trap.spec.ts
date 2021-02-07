import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { EXPRESSIONS } from "../expressions.injection-token";
import { InOperatorExpression } from "../expressions";
import { HasReflectorTrap } from "./has.reflector-trap";

describe("Has reflector-trap", () => {
    beforeEach(() => {
        createInjector2(HasReflectorTrap, [EXPRESSIONS]);
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
