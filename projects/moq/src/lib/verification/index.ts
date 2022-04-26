import { Verifier } from "./verifier";
import { CallCounter } from "./call-counter";
import { VerifyFormatter } from "../formatters/verify.formatter";
import { Tracker } from "../tracker/tracker";
import { AutoMockProvider } from "../auto-mocking/auto-mock.provider";
import { VerificationTester } from "./verification-tester";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

/**
 * @hidden
 */
export default [
    {provide: Verifier, useClass: Verifier, deps: [CallCounter, VerificationTester, AutoMockProvider]},
    {provide: CallCounter, useClass: CallCounter, deps: [ExpressionEqualityComparer, Tracker]},
    {provide: VerificationTester, useClass: VerificationTester, deps: [VerifyFormatter]},
];
