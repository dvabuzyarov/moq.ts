import { ExpectedExpressionReflector, IExpectedExpression } from "./expected-expressions/expected-expression-reflector";
import { Interceptor } from "./interceptor";
import {
    IInterceptorCallbacks,
    interceptorCallbacksFactory,
    MockBehavior
} from "./interceptor-callbacks/interceptor-callbacks";
import { IMock, ISequenceVerifier, ISetup } from "./moq";
import { Times } from "./times";
import { Tracker } from "./tracker";
import { Verifier } from "./verifier";
import { Presets2 } from "./preset/presets2";
import { ExpectedExpressions } from "./expected-expressions/expected-expressions";
import { Setup2 } from "./preset/setup2";

/**
 * @hidden
 */
export class MockCore<T> implements IMock<T> {
    private interceptor: Interceptor<T>;

    constructor(
        private expressionReflector: ExpectedExpressionReflector,
        private interceptorFactory: (callbacks: IInterceptorCallbacks) => Interceptor<T>,
        private setupFactory: (mock: IMock<T>, target: ExpectedExpressions<T>) => ISetup<T>,
        private presets: Presets2<T>,
        public tracker: Tracker,
        private verifier: Verifier<T>,
        private interceptedCallbacks: IInterceptorCallbacks,
        public name?: string) {

        this.interceptor = interceptorFactory(interceptedCallbacks);
    }

    public setup(expression: IExpectedExpression<T>): ISetup<T> {
        const expectedExpression = this.expressionReflector.reflect(expression);
        return this.setupFactory(this, expectedExpression);
    }

    public verify(expression: IExpectedExpression<T>, times?: Times): IMock<T> {
        times = times === undefined ? Times.Once() : times;
        const expressions = this.tracker.get().map(record => record.expression);
        this.verifier.test(expression, times, expressions, this.name);
        return this;
    }

    public object(): T {
        return this.interceptor.object();
    }

    public prototypeof(prototype?: any): IMock<T> {
        this.interceptor.prototypeof(prototype);
        return this;
    }

    public setBehaviorStrategy(behaviorStrategy: MockBehavior): IMock<T> {
        this.interceptedCallbacks.setBehaviorStrategy(behaviorStrategy);
        return this;
    }

    /**
     * @experimental
     */
    public insequence(sequence: ISequenceVerifier, expression: IExpectedExpression<T>): IMock<T> {
        sequence.add(this, expression);
        return this;
    }
}

/**
 * The default implementation of {@link IMock} interface.
 */
export class Mock<T> extends MockCore<T> {
    constructor(name?: string) {
        const presets = new Presets2<T>();
        const tracker = new Tracker();
        const callbacks = interceptorCallbacksFactory<T>(tracker, presets);

        super(
            new ExpectedExpressionReflector(),
            (callback: IInterceptorCallbacks) => new Interceptor<T>(callback),
            (mock: IMock<T>, target: ExpectedExpressions<T>) => new Setup2<T>(mock, preset => presets.add(preset), target),
            presets,
            tracker,
            new Verifier<T>(),
            callbacks,
            name);
    }
}
