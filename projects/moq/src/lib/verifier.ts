import { Times } from "./times";
import { Interactions } from "./interactions";
import { ExpectedExpressionReflector, IExpectedExpression } from "./expected-expressions/expected-expression-reflector";
import { CallCounter } from "./call-counter";
import { VerifyFormatter } from "./formatters/verify-formatter";

export class VerifyError extends Error {
    constructor(message: string) {
        super(message);
    }
}

/**
 * @hidden
 */
export class Verifier<T> {

    constructor(
        private reflector: ExpectedExpressionReflector = new ExpectedExpressionReflector(),
        private callCounter: CallCounter = new CallCounter(),
        private verifyFormatter: VerifyFormatter = new VerifyFormatter()) {

    }

    public test(expected: IExpectedExpression<T>, times: Times, expressions: Interactions[], mockName?: string): void {
        const expression = this.reflector.reflect(expected);
        const callCount = this.callCounter.count(expression, expressions);
        const passed = times.test(callCount);
        if (passed === false) {
            const message = this.verifyFormatter.format(expression, times.message, callCount, expressions, mockName);
            throw new VerifyError(message);
        }
    }
}
