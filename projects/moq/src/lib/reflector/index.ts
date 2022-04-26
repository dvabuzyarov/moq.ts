import { EXPRESSION_REFLECTOR } from "./expression-reflector";
import { ReflectingProxyInjectorFactory } from "./reflecting-proxy.injector-factory";
import { SyncExpressionReflector } from "./sync-expression.reflector";
import { CompositeExpressionReflector } from "./composite-expression.reflector";
import { AsyncExpressionDetector } from "./async-expression.detector";
import { AsyncExpressionReflector } from "./async-expression.reflector";
import { AsyncReflectingProxyInjectorFactory } from "./async-reflecting-proxy.injector-factory";

/**
 * @hidden
 */
export default [
    {provide: EXPRESSION_REFLECTOR, useExisting: CompositeExpressionReflector, deps: []},
    {
        provide: CompositeExpressionReflector,
        useClass: CompositeExpressionReflector,
        deps: [AsyncExpressionDetector, SyncExpressionReflector, AsyncExpressionReflector]
    },
    {provide: AsyncExpressionDetector, useClass: AsyncExpressionDetector, deps: []},
    {provide: ReflectingProxyInjectorFactory, useClass: ReflectingProxyInjectorFactory, deps: []},
    {provide: SyncExpressionReflector, useClass: SyncExpressionReflector, deps: [ReflectingProxyInjectorFactory]},
    {
        provide: AsyncReflectingProxyInjectorFactory,
        useClass: AsyncReflectingProxyInjectorFactory,
        deps: [ReflectingProxyInjectorFactory]
    },
    {
        provide: AsyncExpressionReflector,
        useClass: AsyncExpressionReflector,
        deps: [AsyncReflectingProxyInjectorFactory]
    },
];
