import { It } from "../expected-expressions/expression-predicates";
import { ExpressionMatcher } from "./expression.matcher";
import { GetPropertyExpressionMatcher } from "./get-property.matcher";
import { SetPropertyExpressionMatcher } from "./set-property.matcher";
import { MethodExpressionMatcher } from "./method.matcher";
import { NamedMethodExpressionMatcher } from "./instance-method.matcher";
import { InOperatorMatcher } from "./in-operator.matcher";
import {
    GetPropertyInteraction,
    InOperatorInteraction,
    MethodInteraction,
    NamedMethodInteraction,
    SetPropertyInteraction
} from "../interactions";
import {
    ExpectedGetPropertyExpression,
    ExpectedInOperatorExpression,
    ExpectedMethodExpression,
    ExpectedNamedMethodExpression,
    ExpectedSetPropertyExpression
} from "../expected-expressions/expected-expressions";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Expression matcher", () => {
    beforeEach(() => {
        createInjector2(ExpressionMatcher, [
            GetPropertyExpressionMatcher,
            SetPropertyExpressionMatcher,
            MethodExpressionMatcher,
            NamedMethodExpressionMatcher,
            InOperatorMatcher
        ]);
    });

    it("Returns true when both are undefined", () => {
        const left = undefined;
        const right = undefined;

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are null", () => {
        const left = null;
        const right = null;

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });


    it("Returns true when right is undefined", () => {
        const left = new GetPropertyInteraction("name");
        const right = undefined;

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns value from GetPropertyExpressionMatcher when left and right are GetProperty expressions", () => {
        const left = new GetPropertyInteraction("left name");
        const right = new ExpectedGetPropertyExpression("right name");
        const expected = true;

        resolveMock(GetPropertyExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from GetPropertyExpressionMatcher when left is GetProperty and right is It", () => {
        const left = new GetPropertyInteraction("name");
        const right = It.Is(() => undefined);
        const expected = true;

        resolveMock(GetPropertyExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from SetPropertyExpressionMatcher when left and right are SetProperty expressions", () => {
        const left = new SetPropertyInteraction("left name", "left value");
        const right = new ExpectedSetPropertyExpression("right name", "right value");
        const expected = true;

        resolveMock(SetPropertyExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from SetPropertyExpressionMatcher when left is SetProperty and right is It", () => {
        const left = new SetPropertyInteraction("name", "value");
        const right = It.Is(() => undefined);
        const expected = true;

        resolveMock(SetPropertyExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from InOperatorExpressionMatcher when left and right are InOperator expressions", () => {
        const left = new InOperatorInteraction("left name");
        const right = new ExpectedInOperatorExpression("right name");
        const expected = true;

        resolveMock(InOperatorMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from InOperatorExpressionMatcher when left is InOperator and right is It", () => {
        const left = new InOperatorInteraction("name");
        const right = It.Is(() => undefined);
        const expected = true;

        resolveMock(InOperatorMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from MethodExpressionMatcher when left and right are Method expressions", () => {
        const left = new MethodInteraction([]);
        const right = new ExpectedMethodExpression([]);
        const expected = true;

        resolveMock(MethodExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from MethodExpressionMatcher when left is Method expression and right is It", () => {
        const left = new MethodInteraction([]);
        const right = It.Is(() => undefined);
        const expected = true;

        resolveMock(MethodExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from NamedMethodExpressionMatcher when left and right are NamedMethod expressions", () => {
        const left = new NamedMethodInteraction("name", []);
        const right = new ExpectedNamedMethodExpression("name", []);
        const expected = true;

        resolveMock(NamedMethodExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from NamedMethodExpressionMatcher when left is NamedMethod expression and right is It", () => {
        const left = new NamedMethodInteraction("name", []);
        const right = It.Is(() => undefined);
        const expected = true;

        resolveMock(NamedMethodExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns false when left and right represent different expressions", () => {
        const left = new NamedMethodInteraction("name", []);
        const right = new ExpectedGetPropertyExpression("name");

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
