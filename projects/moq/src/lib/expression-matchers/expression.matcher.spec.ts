import { It } from "../reflector/expression-predicates";
import { ExpressionMatcher } from "./expression.matcher";
import { GetPropertyExpressionMatcher } from "./get-property.matcher";
import { SetPropertyExpressionMatcher } from "./set-property.matcher";
import { MethodExpressionMatcher } from "./method.matcher";
import { NamedMethodExpressionMatcher } from "./instance-method.matcher";
import { InOperatorExpressionMatcher } from "./in-operator.matcher";
import {
    GetPropertyInteraction,
    InOperatorInteraction,
    MethodInteraction,
    NamedMethodInteraction,
    NewOperatorInteraction,
    SetPropertyInteraction
} from "../interactions";
import {
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NamedMethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { NewOperatorExpressionMatcher } from "./new-operator.matcher";
import { ItMatcher } from "./it.matcher";

describe("Expression matcher", () => {
    beforeEach(() => {
        createInjector2(ExpressionMatcher, [
            GetPropertyExpressionMatcher,
            SetPropertyExpressionMatcher,
            MethodExpressionMatcher,
            NamedMethodExpressionMatcher,
            InOperatorExpressionMatcher,
            NewOperatorExpressionMatcher,
            ItMatcher
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

    it("Returns value from ItMatcher when right is It expressions", () => {
        const left = new GetPropertyInteraction("left name");
        const right = It.IsAny();
        const expected = true;

        resolveMock(ItMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from GetPropertyExpressionMatcher when left and right are GetProperty expressions", () => {
        const left = new GetPropertyInteraction("left name");
        const right = new GetPropertyExpression("right name");
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
        const right = new SetPropertyExpression("right name", "right value");
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
        const right = new InOperatorExpression("right name");
        const expected = true;

        resolveMock(InOperatorExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from MethodExpressionMatcher when left and right are Method expressions", () => {
        const left = new MethodInteraction([]);
        const right = new MethodExpression([]);
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
        const right = new NamedMethodExpression("name", []);
        const expected = true;

        resolveMock(NamedMethodExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from NewOperatorExpressionMatcher when left and right are NewOperator expressions", () => {
        const left = new NewOperatorInteraction(["left name"]);
        const right = new NewOperatorExpression(["right name"]);
        const expected = true;

        resolveMock(NewOperatorExpressionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns false when left and right represent different expressions", () => {
        const left = new NamedMethodInteraction("name", []);
        const right = new GetPropertyExpression("name");

        const matcher = resolve2(ExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
