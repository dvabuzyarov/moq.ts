import { CallCounter } from "./call-counter";
import { GetPropertyExpression } from "../reflector/expressions";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Tracker } from "../tracker/tracker";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

describe("Call counter", () => {

    beforeEach(() => {
        createInjector(CallCounter, [ExpressionEqualityComparer, Tracker]);
    });

    it("Returns one as count of called expressions", () => {
        const expectedExpression = new GetPropertyExpression("property");
        const expression = new GetPropertyExpression("property");

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, expectedExpression))
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
        const expression = new GetPropertyExpression("property");

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, expectedExpression))
            .returns(false);

        resolveMock(Tracker)
            .setup(instance => instance.interactions())
            .returns([expression]);

        const counter = resolve2(CallCounter);
        const actual = counter.count(expectedExpression);

        expect(actual).toBe(0);
    });
});
