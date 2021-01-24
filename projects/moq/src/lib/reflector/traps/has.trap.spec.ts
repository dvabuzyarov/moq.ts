import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { EXPRESSIONS } from "../expressions.injection-token";
import { InOperatorExpression } from "../expressions";
import { HasTrap } from "./has.trap";

describe("Has trap", () => {
    beforeEach(() => {
        createInjector2(HasTrap, [EXPRESSIONS]);
    });

    beforeEach(() => {
        resolveMock(EXPRESSIONS)
            .prototypeof(Array.prototype);
    });

    it("Logs expression", () => {
        const name = "name";

        const trap = resolve2(HasTrap);
        const actual = trap(undefined, name);

        expect(actual).toBe(true);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new InOperatorExpression(name)));
    });
});
