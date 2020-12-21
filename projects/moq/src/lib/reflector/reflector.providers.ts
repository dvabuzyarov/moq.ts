import { ExpressionReflector } from "./expression-reflector";

/**
 * @hidden
 */
export const reflectorProviders = [
    {provide: ExpressionReflector, useClass: ExpressionReflector, deps: []}
];
