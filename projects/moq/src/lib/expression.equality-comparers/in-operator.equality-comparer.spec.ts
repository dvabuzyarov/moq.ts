import { InOperatorExpression } from "../reflector/expressions";
import { InOperatorEqualityComparer } from "./in-operator.equality-comparer";
import { createInjector, resolve2 } from "../../tests.components/resolve.builder";

describe("In operator expression equality comparer", () => {

    beforeEach(() => {
        createInjector(InOperatorEqualityComparer, []);
    });

    it("Returns true when they are equal", () => {
        const name = "name";
        const left = new InOperatorExpression(name);
        const right = new InOperatorExpression(name);

        const comparer = resolve2(InOperatorEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const left = new InOperatorExpression("left name");
        const right = new InOperatorExpression("right name");

        const comparer = resolve2(InOperatorEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });
});
