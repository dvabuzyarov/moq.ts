import { ExpectedExpressionReflector } from "./expected-expressions/expected-expression-reflector";
import { Interceptor } from "./interceptor";
import { IInterceptorCallbacks, interceptorCallbacksFactory } from "./interceptor-callbacks/interceptor-callbacks";
import { IMock, ISetup } from "./moq";
import { Tracker } from "./tracker";
import { Verifier } from "./verifier";
import { Presets2 } from "./preset/presets2";
import { ExpectedExpressions } from "./expected-expressions/expected-expressions";
import { Setup2 } from "./preset/setup2";

/**
 * @hidden
 */
export interface IMockDependencies<T> {
    tracker: Tracker;
    expressionReflector: ExpectedExpressionReflector;
    interceptor: Interceptor<T>;
    setupFactory: (mock: IMock<T>, target: ExpectedExpressions<T>) => ISetup<T>;
    verifier: Verifier<T>;
    interceptedCallbacks: IInterceptorCallbacks;
}

/**
 * @hidden
 */
export function mockDependenciesFactory<T>(): IMockDependencies<T> {
    const expressionReflector = new ExpectedExpressionReflector();
    const presets = new Presets2<T>();
    const tracker = new Tracker();
    const interceptedCallbacks = interceptorCallbacksFactory<T>(tracker, presets);
    const interceptor = new Interceptor<T>(interceptedCallbacks);
    const setupFactory = (mock: IMock<T>, target: ExpectedExpressions<T>) => new Setup2<T>(mock, preset => presets.add(preset), target);
    const verifier = new Verifier<T>();
    return {
        expressionReflector,
        interceptor,
        setupFactory,
        tracker,
        verifier,
        interceptedCallbacks
    };
}
