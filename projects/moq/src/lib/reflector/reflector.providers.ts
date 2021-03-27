import { EXPRESSION_REFLECTOR } from "./expression-reflector";
import { ReflectorProxyFactory } from "./reflector-proxy.factory";
import { SingleExpressionReflector } from "./single.expression-reflector";
import { FullExpressionReflector } from "./full.expression-reflector";

/**
 * @hidden
 */
export const reflectorProviders = [
    {provide: EXPRESSION_REFLECTOR, useExisting: SingleExpressionReflector, deps: []},
    {provide: SingleExpressionReflector, useClass: SingleExpressionReflector, deps: [FullExpressionReflector]},
    {provide: FullExpressionReflector, useClass: FullExpressionReflector, deps: [ReflectorProxyFactory]},
    {provide: ReflectorProxyFactory, useClass: ReflectorProxyFactory, deps: []},
];
