import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import {
    FunctionExpression,
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../../reflector/expressions";
import { FunctionExpressionValidator } from "./function-expression.validator";
import { It } from "../../reflector/expression-predicates";
import { GetPropertyExpressionValidator } from "./get-property-expression.validator";
import { SetPropertyExpressionValidator } from "./set-property-expression.validator";
import { InOperatorExpressionValidator } from "./in-operator-expression.validator";
import { InstanceMethodExpressionValidator } from "./instance-method-expression.validator";
import { NewOperatorExpressionValidator } from "./new-operator-expression.validator";
import { ExpressionGuardExceptionFactory } from "./expression-guard-exception.factory";
import { ExpressionValidator } from "./expression.validator";

describe("Expression validator", () => {

    beforeEach(() => {
        createInjector(ExpressionValidator, [
            FunctionExpressionValidator,
            GetPropertyExpressionValidator,
            SetPropertyExpressionValidator,
            InOperatorExpressionValidator,
            InstanceMethodExpressionValidator,
            NewOperatorExpressionValidator,
            ExpressionGuardExceptionFactory
        ]);
    });

    it("Returns validation result of FunctionExpression", () => {
        const expression = new FunctionExpression([]);
        const expected = true;

        resolveMock(FunctionExpressionValidator)
            .setup(instance => instance.validate(expression))
            .returns(expected);

        const guard = resolve2(ExpressionValidator);
        const actual = guard.validate(expression);
        expect(actual).toBe(expected);
    });

    it("Returns validation result of GetPropertyExpression", () => {
        const expression = new GetPropertyExpression("property name");
        const expected = true;

        resolveMock(GetPropertyExpressionValidator)
            .setup(instance => instance.validate(expression))
            .returns(expected);

        const guard = resolve2(ExpressionValidator);
        const actual = guard.validate(expression);
        expect(actual).toBe(expected);
    });

    it("Returns validation result of SetPropertyExpression", () => {
        const expression = new SetPropertyExpression("property name", 1);
        const expected = true;

        resolveMock(SetPropertyExpressionValidator)
            .setup(instance => instance.validate(expression))
            .returns(expected);

        const guard = resolve2(ExpressionValidator);
        const actual = guard.validate(expression);
        expect(actual).toBe(expected);
    });

    it("Returns validation result of InOperatorExpression", () => {
        const expression = new InOperatorExpression("property name");
        const expected = true;

        resolveMock(InOperatorExpressionValidator)
            .setup(instance => instance.validate(expression))
            .returns(expected);

        const guard = resolve2(ExpressionValidator);
        const actual = guard.validate(expression);
        expect(actual).toBe(expected);
    });

    it("Returns validation result of InstanceMethodExpression", () => {
        const expression = new MethodExpression("property name", []);
        const expected = true;

        resolveMock(InstanceMethodExpressionValidator)
            .setup(instance => instance.validate(expression))
            .returns(expected);

        const guard = resolve2(ExpressionValidator);
        const actual = guard.validate(expression);
        expect(actual).toBe(expected);
    });

    it("Returns validation result of NewOperatorExpression", () => {
        const expression = new NewOperatorExpression([]);
        const expected = true;

        resolveMock(NewOperatorExpressionValidator)
            .setup(instance => instance.validate(expression))
            .returns(expected);

        const guard = resolve2(ExpressionValidator);
        const actual = guard.validate(expression);
        expect(actual).toBe(expected);
    });

    it("Returns false result of It predicate", () => {
        const expression = It.IsAny();

        const guard = resolve2(ExpressionValidator);
        const actual = guard.validate(expression);

        expect(actual).toBe(false);
    });

});
