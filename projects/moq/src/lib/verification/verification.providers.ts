/**
 * @hidden
 */
import { Verifier } from "./verifier";
import { CallCounter } from "./call-counter";
import { VerifyFormatter } from "../formatters/verify.formatter";
import { ExpressionReflector } from "../reflector/expression-reflector";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";

export const verificationProviders = [
    {provide: Verifier, useClass: Verifier, deps: [ExpressionReflector, CallCounter, VerifyFormatter]},
    {provide: CallCounter, useClass: CallCounter, deps: [ExpressionMatcher]},
];
