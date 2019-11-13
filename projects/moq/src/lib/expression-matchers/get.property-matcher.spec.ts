import {GetPropertyInteraction} from "../interactions";
import {GetPropertyExpressionMatcher} from "./get.property-matcher";
import {It} from "../expected-expressions/expression-predicates";
import {ExpectedGetPropertyExpression} from "../expected-expressions/expected-expressions";

describe("Get property expression matcher", () => {

    it("Returns true when they are equal", () => {
        const name = "name";
        const left = new GetPropertyInteraction(name);
        const right = new ExpectedGetPropertyExpression(name);

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when right is predicate that returns true", () => {
        const name = "name";
        const left = new GetPropertyInteraction(name);

        const right = It.Is((value) => {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const left = new GetPropertyInteraction("left name");
        const right = new ExpectedGetPropertyExpression("right name");

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right is predicate that returns false", () => {
        const name = "name";
        const left = new GetPropertyInteraction(name);
        const right = It.Is((value) => {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
