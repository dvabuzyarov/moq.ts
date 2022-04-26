import { Times } from "../times";
import { Expressions } from "../reflector/expressions";
import { VerifyFormatter } from "../formatters/verify.formatter";
import { VerifyError } from "./verify-error";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { It } from "moq.ts";
import { VerificationTester } from "./verification-tester";

describe("Verification tester", () => {

    beforeEach(() => {
        createInjector(VerificationTester, [VerifyFormatter]);
    });

    it("Throws VerifyException when the expected expression has not been called expected times", () => {
        const message = "message";
        const timesMessage = "Should be called once";
        const haveBeenCalled = 0;
        const expression = {} as Expressions<unknown>;

        const evaluator = value => value === 1;
        const times = new Times(evaluator, timesMessage);

        resolveMock(VerifyFormatter)
            .setup(instance => instance.format(expression, timesMessage, haveBeenCalled))
            .returns(message);

        const verify = resolve2(VerificationTester);
        const action = () => verify.test(expression, haveBeenCalled, times);

        expect(action).toThrow(new VerifyError(message));
    });

    it("Does not throws VerifyException when the expected expression has been called expected times", () => {
        const message = "message";
        const timesMessage = "Should be called once";
        const haveBeenCalled = 1;
        const expression = {} as Expressions<unknown>;

        const evaluator = value => value === 1;
        const times = new Times(evaluator, timesMessage);

        resolveMock(VerifyFormatter)
            .setup(instance => instance.format(expression, It.IsAny(), haveBeenCalled))
            .returns(message);

        const verify = resolve2(VerificationTester);
        const action = () => verify.test(expression, haveBeenCalled, times);

        expect(action).not.toThrow(new VerifyError(message));
    });
});
