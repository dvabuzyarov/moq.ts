import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { ExpressionsMatcher } from "./expressions.matcher";
import { It } from "../reflector/expression-predicates";
import { Expressions, GetPropertyExpression } from "../reflector/expressions";

describe("Expressions matcher", () => {

    beforeEach(() => {
        createInjector2(ExpressionsMatcher, [ExpressionMatcher]);
    });

    beforeEach(() => {
        resolveMock(ExpressionMatcher).prototypeof(ExpressionMatcher.prototype);
    });

    it("Returns false when left is It", () => {
        const left = new It(() => false);
        const right = {} as Expressions<undefined>;

        const factory = resolve2(ExpressionsMatcher);
        const actual = factory.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right is It", () => {
        const left = {} as Expressions<undefined>;
        const right = new It(() => false);

        const factory = resolve2(ExpressionsMatcher);
        const actual = factory.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns matching result", () => {
        const expected = {} as boolean;
        const left = {} as GetPropertyExpression;
        const right = {} as GetPropertyExpression;

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const factory = resolve2(ExpressionsMatcher);
        const actual = factory.matched(left, right);

        expect(actual).toBe(expected);
    });
});
