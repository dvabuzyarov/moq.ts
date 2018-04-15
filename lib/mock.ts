import { DefinedSetups } from "./defined-setups";
import { ExpectedExpressionReflector, IExpectedExpression } from "./expected-expressions/expected-expression-reflector";
import { expressionMatcherFactory } from "./expression-matchers/factories";
import { Interceptor } from "./interceptor";
import {
    IInterceptorCallbacks,
    interceptorCallbacksFactory,
    MockBehavior
} from "./interceptor-callbacks/interceptor-callbacks";
import { IMock, ISequenceVerifier, ISetup, ISetupInvoke } from "./moq";
import { Setup } from "./setup";
import { Times } from "./times";
import { Tracker, trackerFactory } from "./tracker";
import { Verifier, verifierFactory } from "./verifier";

/**
 * @internal
 * @hidden
 * @private
 */
export class MockCore<T> implements IMock<T> {
    private interceptor: Interceptor<T>;

    constructor(
        private expressionReflector: ExpectedExpressionReflector,
        private interceptorFactory: (callbacks: IInterceptorCallbacks) => Interceptor<T>,
        private setupFactory: (mock: IMock<T>) => ISetupInvoke<T>,
        private definedSetups: DefinedSetups<T>,
        public tracker: Tracker,
        private verifier: Verifier<T>,
        private interceptedCallbacks: IInterceptorCallbacks,
        public name?: string) {

        this.interceptor = interceptorFactory(interceptedCallbacks);
    }

    public setup(expression: IExpectedExpression<T>): ISetup<T> {
        const setup = this.setupFactory(this);
        const expectedExpression = this.expressionReflector.reflect(expression);
        this.definedSetups.add(expectedExpression, setup);
        return setup;
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

    public insequence(sequence: ISequenceVerifier, expression: IExpectedExpression<T>): IMock<T>{
        sequence.add(this, expression);
        return this;
    }
}

export class Mock<T> extends MockCore<T> {
    constructor(name?: string) {
        const definedSetups = new DefinedSetups<T>(expressionMatcherFactory());
        const tracker = trackerFactory();
        const callbacks = interceptorCallbacksFactory<T>(definedSetups, tracker);

        super(
            new ExpectedExpressionReflector(),
            (callback: IInterceptorCallbacks) => new Interceptor<T>(callback),
            (mock: IMock<T>) => new Setup<T>(mock),
            definedSetups,
            tracker,
            verifierFactory<T>(),
            callbacks,
            name)
    }
}
