import { Verifier } from "./verifier";
import { CallCounter } from "./call-counter";
import { VerifyFormatter } from "../formatters/verify.formatter";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { Tracker } from "../tracker/tracker";
import { AutoMockProvider } from "../auto-mocking/auto-mock.provider";
import { VerificationTester } from "./verification-tester";

/**
 * @hidden
 */
export const verificationProviders = [
    {provide: Verifier, useClass: Verifier, deps: [CallCounter, VerificationTester, AutoMockProvider]},
    {provide: CallCounter, useClass: CallCounter, deps: [ExpressionMatcher, Tracker]},
    {provide: VerificationTester, useClass: VerificationTester, deps: [VerifyFormatter]},
];
