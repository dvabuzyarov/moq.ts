import { ExpressionReflector } from "./expression-reflector";
import { ReflectorProxyFactory } from "./reflector-proxy.factory";

/**
 * @hidden
 */
export const reflectorProviders = [
    {provide: ExpressionReflector, useClass: ExpressionReflector, deps: [ReflectorProxyFactory]},
    {provide: ReflectorProxyFactory, useClass: ReflectorProxyFactory, deps: []},
];
