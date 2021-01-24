import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { SetTrap } from "./set.trap";
import { EXPRESSIONS } from "../expressions.injection-token";
import { SetPropertyExpression } from "../expressions";

describe("Set trap", () => {
    beforeEach(() => {
        createInjector2(SetTrap, [EXPRESSIONS]);
    });

    beforeEach(() => {
        resolveMock(EXPRESSIONS)
            .prototypeof(Array.prototype);
    });

    it("Logs expression", () => {
        const value = {};
        const name = "name";

        const trap = resolve2(SetTrap);
        const actual = trap(undefined, name, value);

        expect(actual).toBe(true);
        resolveMock(EXPRESSIONS)
            .verify(instance => instance.push(new SetPropertyExpression(name, value)));
    });
});
