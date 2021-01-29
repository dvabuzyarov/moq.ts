import { Times } from "../times";
import { VerifyFormatter } from "../formatters/verify.formatter";
import { VerifyError } from "./verify-error";
import { Expressions } from "../reflector/expressions";

/**
 * @hidden
 */
export class VerificationTester {
    constructor(private readonly verifyFormatter: VerifyFormatter) {
    }

    public test(expression: Expressions<any>, callCount: number, times: Times): void {
        const passed = times.test(callCount);
        if (passed === false) {
            const message = this.verifyFormatter.format(expression, times.message, callCount);
            throw new VerifyError(message);
        }
    }
}
