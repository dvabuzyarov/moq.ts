import { Verifier, VerifyError } from "./verifier";
import { ExpectedExpressionReflector } from "./expected-expressions/expected-expression-reflector";
import { Times } from "./times";
import { CallCounter } from "./call-counter";
import { ExpectedGetPropertyExpression } from "./expected-expressions/expected-expressions";
import { VerifyFormatter } from "./formatters/verify-formatter";
import { nameof } from "../tests.components/nameof";

describe("Verifier", () => {

    function reflectorFactory(): ExpectedExpressionReflector {
        return jasmine.createSpyObj("reflect", [nameof<ExpectedExpressionReflector>("reflect")]);
    }

    function callCounterFactory(): CallCounter {
        return jasmine.createSpyObj("count", [nameof<CallCounter>("count")]);
    }

    function verifyFormatterFactory(): VerifyFormatter {
        return jasmine.createSpyObj("formatter", [nameof<VerifyFormatter>("format")]);
    }

    it("Throws VerifyException when the expected expression has not been called expected times", () => {
        const mockName = "mock name";
        const message = "message";
        const timesMessage = "Should be called once";
        const haveBeenCalled = 0;
        const expressions = [];

        const expectedExpression = new ExpectedGetPropertyExpression("property");
        const expected = () => undefined;

        const reflector = reflectorFactory();
        (<jasmine.Spy>reflector.reflect).and.returnValue(expectedExpression);

        const callCounter = callCounterFactory();

        (<jasmine.Spy>callCounter.count).and.returnValue(haveBeenCalled);
        const verifyFormatter = verifyFormatterFactory();

        (<jasmine.Spy>verifyFormatter.format).and.returnValue(message);
        const evaluator = value => value === 1;

        const times = new Times(evaluator, timesMessage);
        const verify = new Verifier(reflector, callCounter, verifyFormatter);
        const action = () => verify.test(expected, times, expressions, mockName);

        expect(action).toThrow(new VerifyError(message));
        expect(reflector.reflect).toHaveBeenCalledWith(expected);
        expect(callCounter.count).toHaveBeenCalledWith(expectedExpression, expressions);
        expect(verifyFormatter.format).toHaveBeenCalledWith(expectedExpression, timesMessage, haveBeenCalled, expressions, mockName);
    });

    it("Does not throws VerifyException when the expected expression has been called expected times", () => {
        const message = "message";

        const expected = () => undefined;
        const reflector = reflectorFactory();
        const expectedExpression = new ExpectedGetPropertyExpression("property");
        (<jasmine.Spy>reflector.reflect).and.returnValue(expectedExpression);

        const callCounter = callCounterFactory();
        (<jasmine.Spy>callCounter.count).and.returnValue(1);

        const evaluator = value => value === 1;
        const times = new Times(evaluator, message);

        const verify = new Verifier(reflector, callCounter, undefined);
        const action = () => verify.test(expected, times, []);

        expect(action).not.toThrow(new VerifyError(message));
        expect(reflector.reflect).toHaveBeenCalledWith(expected);
        expect(callCounter.count).toHaveBeenCalledWith(expectedExpression, []);
    });
});
