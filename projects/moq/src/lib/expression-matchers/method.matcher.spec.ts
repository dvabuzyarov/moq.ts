import { It } from "../reflector/expression-predicates";
import { ArgumentsMatcher } from "./arguments.matcher";
import { MethodInteraction } from "../interactions";
import { MethodExpression } from "../reflector/expressions";
import { MethodExpressionMatcher } from "./method.matcher";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Mock } from "moq.ts";

describe("Method expression matcher", () => {

    beforeEach(() => {
        createInjector2(MethodExpressionMatcher, [ArgumentsMatcher]);
    });

    it("Returns true when they are equal", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodInteraction(arguments1);
        const right = new MethodExpression(arguments2);

        resolveMock(ArgumentsMatcher)
            .setup(instance => instance.matched(arguments1, arguments2))
            .returns(true);

        const matcher = resolve2(MethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when right is predicate that returns true", () => {
        const left = new MethodInteraction([]);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(true)
            .object();

        const matcher = resolve2(MethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodInteraction(arguments1);
        const right = new MethodExpression(arguments2);

        resolveMock(ArgumentsMatcher)
            .setup(instance => instance.matched(arguments1, arguments2))
            .returns(false);

        const matcher = resolve2(MethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right is predicate that returns false", () => {
        const left = new MethodInteraction([]);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(false)
            .object();

        const matcher = resolve2(MethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
