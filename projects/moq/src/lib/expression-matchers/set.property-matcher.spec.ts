import { SetPropertyInteraction } from "../interactions";
import { SetPropertyExpressionMatcher } from "./set.property-matcher";
import { ExpectedSetPropertyExpression } from "../expected-expressions/expected-expressions";
import { ConstantMatcher } from "./constant-matcher";
import { It } from "../expected-expressions/expression-predicates";
import { resolveBuilder } from "../../tests.components/resolve.builder";

describe("Set property expression matcher", () => {

    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const constantMatcher = jasmine.createSpyObj<ConstantMatcher>("", ["matched"]);
        resolve = resolveBuilder([
            [ConstantMatcher, constantMatcher],
            [SetPropertyExpressionMatcher, new SetPropertyExpressionMatcher(constantMatcher)]
        ]);
    });

    it("Returns true when they are equal", () => {
        const name = "name";
        const value = "value";
        const left = new SetPropertyInteraction(name, value);
        const right = new ExpectedSetPropertyExpression(name, value);

        resolve(ConstantMatcher)
            .matched.withArgs(value, value).and.returnValue(true);

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when right is predicate that returns true", () => {
        const left = new SetPropertyInteraction("name", "value");

        const right = It.Is((value) => {
            expect(value).toBe(left);
            return true;
        });

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right by name", () => {
        const value = "value";
        const left = new SetPropertyInteraction("left name", value);
        const right = new ExpectedSetPropertyExpression("right name", value);

        resolve(ConstantMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when left does not equal to right by value", () => {
        const name = "name";
        const leftValue = "left value";
        const rightValue = "right value";

        const left = new SetPropertyInteraction(name, leftValue);
        const right = new ExpectedSetPropertyExpression(name, rightValue);

        resolve(ConstantMatcher)
            .matched.withArgs(leftValue, rightValue).and.returnValue(false);

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right is predicate that returns false", () => {
        const left = new SetPropertyInteraction("name", "value");
        const right = It.Is((value) => {
            expect(value).toBe(left);
            return false;
        });

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
