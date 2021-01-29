import { Times } from "../times";
import { CallCounter } from "./call-counter";
import { Expressions } from "../reflector/expressions";
import { AutoMockProvider } from "../auto-mocking/auto-mock.provider";
import { VerificationTester } from "./verification-tester";

/**
 * @hidden
 */
export class Verifier<T> {
    constructor(
        private readonly callCounter: CallCounter,
        private readonly verificationTester: VerificationTester,
        private readonly autoMockProvider: AutoMockProvider) {

    }

    public test([shallow, ...rest]: Expressions<T>[], times: Times): void {
        const callCount = this.callCounter.count(shallow);
        if (rest.length === 0) {
            this.verificationTester.test(shallow, callCount, times);
        } else {
            this.verificationTester.test(shallow, callCount, Times.AtLeastOnce());
            const autoMock = this.autoMockProvider.getOrCreate(shallow);
            const verifier = autoMock.resolve(Verifier);
            verifier.test(rest, times);
        }
    }
}
