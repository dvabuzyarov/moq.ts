import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { CallCounter } from "./call-counter";
import { GetPropertyExpression } from "../reflector/expressions";
import { GetPropertyInteraction } from "../interactions";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Tracker } from "../tracker/tracker";

describe("Call counter", () => {

    beforeEach(() => {
        createInjector2(CallCounter, [ExpressionMatcher, Tracker]);
    });

    it("Returns one as count of called expressions", () => {
        const expectedExpression = new GetPropertyExpression("property");
        const expression = new GetPropertyInteraction("property");

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, expectedExpression))
            .returns(true);

        resolveMock(Tracker)
            .setup(instance => instance.interactions())
            .returns([expression]);

        const counter = resolve2(CallCounter);
        const actual = counter.count(expectedExpression);

        expect(actual).toBe(1);
    });

    it("Returns 0  as count of called expressions", () => {
        const expectedExpression = new GetPropertyExpression("property");
        const expression = new GetPropertyInteraction("property");

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, expectedExpression))
            .returns(false);

        resolveMock(Tracker)
            .setup(instance => instance.interactions())
            .returns([expression]);

        const counter = resolve2(CallCounter);
        const actual = counter.count(expectedExpression);

        expect(actual).toBe(0);
    });
});
