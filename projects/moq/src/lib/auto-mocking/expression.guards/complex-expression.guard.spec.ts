import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { ComplexExpressionValidator } from "./complex-expression.validator";
import { ExpressionGuardExceptionFactory } from "./expression-guard-exception.factory";
import { ComplexExpressionGuard } from "./complex-expression.guard";
import { Mock } from "moq.ts";
import { Expressions } from "../../reflector/expressions";

describe("Complex expression guard", () => {

    beforeEach(() => {
        createInjector(ComplexExpressionGuard, [ComplexExpressionValidator, ExpressionGuardExceptionFactory]);
    });

    it("Does not throw exception when a complex expression is valid", () => {
        const expressions = new Mock<Expressions<unknown>[]>().object();

        resolveMock(ComplexExpressionValidator)
            .setup(instance => instance.validate(expressions))
            .returns({valid: true, errors: []});

        const guard = resolve2(ComplexExpressionGuard);

        expect(() => guard.verify(expressions)).not.toThrow();
    });

    it("Throws exception when a complex expression is invalid", () => {
        const expressions = new Mock<Expressions<unknown>[]>().object();
        const errors = new Mock<[Expressions<unknown>, boolean][]>().object();
        const error = new Error("Error");

        resolveMock(ComplexExpressionValidator)
            .setup(instance => instance.validate(expressions))
            .returns({valid: false, errors});
        resolveMock(ExpressionGuardExceptionFactory)
            .setup(instance => instance.create(errors))
            .returns(error);

        const guard = resolve2(ComplexExpressionGuard);

        expect(() => guard.verify(expressions)).toThrow(error);
    });

});
