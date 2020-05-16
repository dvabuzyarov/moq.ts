/**
 * @hidden
 */
import { ExpectedExpressionReflector } from "./expected-expression-reflector";

export const reflectorProviders = [
    {provide: ExpectedExpressionReflector, useClass: ExpectedExpressionReflector, deps: []}
];
