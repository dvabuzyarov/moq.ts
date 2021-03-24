import { InOperatorInteraction } from "../interactions";
import { InOperatorExpression } from "../reflector/expressions";
import { InOperatorEqualityComparer } from "./in-operator.equality-comparer";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";

describe("In operator expression equality comparer", () => {

    beforeEach(() => {
        createInjector2(InOperatorEqualityComparer, []);
    });

    it("Returns true when they are equal", () => {
        const name = "name";
        const left = new InOperatorInteraction(name);
        const right = new InOperatorExpression(name);

        const comparer = resolve2(InOperatorEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const left = new InOperatorInteraction("left name");
        const right = new InOperatorExpression("right name");

        const comparer = resolve2(InOperatorEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });
});
