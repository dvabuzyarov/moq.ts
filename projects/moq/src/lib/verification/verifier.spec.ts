import { Verifier } from "./verifier";
import { ExpressionReflector } from "../reflector/expression-reflector";
import { Times } from "../times";
import { CallCounter } from "./call-counter";
import { GetPropertyExpression } from "../reflector/expressions";
import { VerifyFormatter } from "../formatters/verify.formatter";
import { VerifyError } from "./verify-error";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { It } from "moq.ts";

describe("Verifier", () => {

    beforeEach(() => {
        createInjector2(Verifier, [ExpressionReflector, CallCounter, VerifyFormatter]);
    });

    it("Throws VerifyException when the expected expression has not been called expected times", () => {
        const mockName = "mock name";
        const message = "message";
        const timesMessage = "Should be called once";
        const haveBeenCalled = 0;
        const expressions = [];

        const expectedExpression = new GetPropertyExpression("property");
        const expected = () => undefined;

        resolveMock(ExpressionReflector)
            .setup(instance => instance.reflect(expected))
            .returns(expectedExpression);

        resolveMock(CallCounter)
            .setup(instance => instance.count(expectedExpression, expressions))
            .returns(haveBeenCalled);

        resolveMock(VerifyFormatter)
            .setup(instance => instance.format(expectedExpression, timesMessage, haveBeenCalled, expressions, mockName))
            .returns(message);

        const evaluator = value => value === 1;

        const times = new Times(evaluator, timesMessage);
        const verify = resolve2(Verifier);
        const action = () => verify.test(expected, times, expressions, mockName);

        expect(action).toThrow(new VerifyError(message));
    });

    it("Does not throws VerifyException when the expected expression has been called expected times", () => {
        const message = "message";

        const expected = () => undefined;
        const expectedExpression = new GetPropertyExpression("property");

        resolveMock(ExpressionReflector)
            .setup(instance => instance.reflect(expected))
            .returns(expectedExpression);

        resolveMock(CallCounter)
            .setup(instance => instance.count(expectedExpression, []))
            .returns(1);

        resolveMock(VerifyFormatter)
            .setup(instance => instance.format(expectedExpression, It.IsAny(), 1, [], It.IsAny()))
            .returns(message);

        const evaluator = value => value === 1;
        const times = new Times(evaluator, message);

        const verify = resolve2(Verifier);
        const action = () => verify.test(expected, times, []);

        expect(action).not.toThrow(new VerifyError(message));
    });
});
