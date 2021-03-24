import { It } from "../reflector/expression-predicates";
import { ArgumentsMatcher } from "./arguments.matcher";
import { NewOperatorInteraction } from "../interactions";
import { NewOperatorExpression } from "../reflector/expressions";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Mock } from "moq.ts";
import { NewOperatorExpressionMatcher } from "./new-operator.matcher";

describe("new operator expression matcher", () => {

    beforeEach(() => {
        createInjector2(NewOperatorExpressionMatcher, [ArgumentsMatcher]);
    });

    it("Returns true when they are equal", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new NewOperatorInteraction(arguments1);
        const right = new NewOperatorExpression(arguments2);

        resolveMock(ArgumentsMatcher)
            .setup(instance => instance.matched(arguments1, arguments2))
            .returns(true);

        const matcher = resolve2(NewOperatorExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when right is predicate that returns true", () => {
        const left = new NewOperatorInteraction([]);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(true)
            .object();

        const matcher = resolve2(NewOperatorExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new NewOperatorInteraction(arguments1);
        const right = new NewOperatorExpression(arguments2);

        resolveMock(ArgumentsMatcher)
            .setup(instance => instance.matched(arguments1, arguments2))
            .returns(false);

        const matcher = resolve2(NewOperatorExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right is predicate that returns false", () => {
        const left = new NewOperatorInteraction([]);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(false)
            .object();

        const matcher = resolve2(NewOperatorExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
