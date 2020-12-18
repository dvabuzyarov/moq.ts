import { ArgumentsMatcher } from "./arguments.matcher";
import { It } from "../expected-expressions/expression-predicates";
import { NamedMethodInteraction } from "../interactions";
import { NamedMethodExpressionMatcher } from "./instance-method.matcher";
import { ExpectedNamedMethodExpression } from "../expected-expressions/expected-expressions";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Mock, Times } from "moq.ts";

describe("Named method expression matcher", () => {

    beforeEach(() => {
        createInjector2(NamedMethodExpressionMatcher, [ArgumentsMatcher]);
    });

    it("Returns true when they are equal", () => {
        const arguments1 = [];
        const arguments2 = [];

        const name = "name";
        const left = new NamedMethodInteraction(name, arguments1);
        const right = new ExpectedNamedMethodExpression(name, arguments2);

        resolveMock(ArgumentsMatcher)
            .setup(instance => instance.matched(arguments1, arguments2))
            .returns(true);

        const matcher = resolve2(NamedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when right is predicate that returns true", () => {
        const left = new NamedMethodInteraction("name", []);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(true)
            .object();

        const matcher = resolve2(NamedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right by args", () => {
        const arguments1 = [];
        const arguments2 = [];

        const name = "name";
        const left = new NamedMethodInteraction(name, arguments1);
        const right = new ExpectedNamedMethodExpression(name, arguments2);

        resolveMock(ArgumentsMatcher)
            .setup(instance => instance.matched(arguments1, arguments2))
            .returns(false);

        const matcher = resolve2(NamedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when left does not equal to right by name", () => {
        const args = [];

        const left = new NamedMethodInteraction("left name", args);
        const right = new ExpectedNamedMethodExpression("right name", args);

        resolveMock(ArgumentsMatcher)
            .setup(instance => instance.matched(args, args))
            .returns(true);

        const matcher = resolve2(NamedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right is predicate that returns false", () => {
        const left = new NamedMethodInteraction("name", []);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(false)
            .object();

        const matcher = resolve2(NamedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Does not call args matcher when names are not equal", () => {
        const args = [];

        const left = new NamedMethodInteraction("left name", args);
        const right = new ExpectedNamedMethodExpression("right name", args);

        const matcher = resolve2(NamedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
        resolveMock(ArgumentsMatcher)
            .verify(instance => instance.matched(It.IsAny(), It.IsAny()), Times.Never());
    });

});
