/**
 * @hidden
 */
import { Verifier } from "./verifier";
import { CallCounter } from "./call-counter";
import { VerifyFormatter } from "../formatters/verify-formatter";
import { ExpectedExpressionReflector } from "../expected-expressions/expected-expression-reflector";
import { ExpressionMatcher } from "../expression-matchers/expression-matcher";

export const verificationProviders = [
    {provide: Verifier, useClass: Verifier, deps: [ExpectedExpressionReflector, CallCounter, VerifyFormatter]},
    {provide: CallCounter, useClass: CallCounter, deps: [ExpressionMatcher]},
];
