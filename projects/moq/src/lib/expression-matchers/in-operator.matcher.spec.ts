import { InOperatorInteraction } from "../interactions";
import { It } from "../reflector/expression-predicates";
import { InOperatorExpression } from "../reflector/expressions";
import { InOperatorExpressionMatcher } from "./in-operator.matcher";

describe("In operator expression matcher", () => {

    it("Returns true when they are equal", () => {
        const name = "name";
        const left = new InOperatorInteraction(name);
        const right = new InOperatorExpression(name);

        const matcher = new InOperatorExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when right is predicate that returns true", () => {
        const name = "name";
        const left = new InOperatorInteraction(name);

        const right = It.Is((value) => {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new InOperatorExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const left = new InOperatorInteraction("left name");
        const right = new InOperatorExpression("right name");

        const matcher = new InOperatorExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right is predicate that returns false", () => {
        const name = "name";
        const left = new InOperatorInteraction(name);
        const right = It.Is((value) => {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new InOperatorExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
