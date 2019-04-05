import { ExpectedExpressionReflector } from "./expected-expressions/expected-expression-reflector";
import { Interceptor } from "./interceptor";
import { IInterceptorCallbacks, interceptorCallbacksFactory } from "./interceptor-callbacks/interceptor-callbacks";
import { IMock, IMockOptions, IPresetBuilder } from "./moq";
import { Tracker } from "./tracker";
import { Verifier } from "./verifier";
import { Presets } from "./preset/presets";
import { ExpectedExpressions } from "./expected-expressions/expected-expressions";
import { PresetBuilder } from "./preset/preset-builder";

/**
 * @hidden
 */
export interface IMockDependencies<T> {
    tracker: Tracker;
    expressionReflector: ExpectedExpressionReflector;
    interceptor: Interceptor<T>;
    presetBuilderFactory: (mock: IMock<T>, target: ExpectedExpressions<T>) => IPresetBuilder<T>;
    verifier: Verifier<T>;
    interceptedCallbacks: IInterceptorCallbacks;
}

/**
 * @hidden
 */
export function mockDependenciesFactory<T>(options: IMockOptions): IMockDependencies<T> {
    const expressionReflector = new ExpectedExpressionReflector();
    const presets = new Presets<T>();
    const tracker = new Tracker();
    const interceptedCallbacks = interceptorCallbacksFactory<T>(tracker, presets);
    const interceptor = new Interceptor<T>(interceptedCallbacks);
    const presetBuilderFactory = (mock: IMock<T>, target: ExpectedExpressions<T>) => {
        return new PresetBuilder<T>(mock, preset => presets.add(preset), target);
    };
    const verifier = new Verifier<T>();
    return {
        expressionReflector,
        interceptor,
        presetBuilderFactory,
        tracker,
        verifier,
        interceptedCallbacks
    };
}
