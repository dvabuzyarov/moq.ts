import {IMock, ISetupInvoke, ISetup} from './moq';
import {Interceptor} from './interceptor';
import {ExpectedExpressionReflector, IExpectedExpression} from './expected-expressions/expected-expression-reflector';
import {Tracker} from './tracker';
import {DefinedSetups} from './defined-setups';
import {Setup} from './setup';
import {expressionMatcherFactory} from './expression-matchers/factories';
import {Times} from './times';
import {Verifier, verifierFactory} from './verifier';
import {
    IInterceptorCallbacks, interceptorCallbacksFactory,
    MockBehavior
} from './interceptor-callbacks/interceptor-callbacks';


export class MockCore<T> implements IMock<T> {
    private interceptor: Interceptor<T>;

    constructor(
                private expressionReflector: ExpectedExpressionReflector,
                private interceptorFactory: (callbacks: IInterceptorCallbacks)=> Interceptor<T>,
                private setupFactory: (mock: IMock<T>)=> ISetupInvoke<T>,
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

    public verify(expression: IExpectedExpression<T>, times?: Times): void {
        times = times === undefined ? Times.Once() : times;
        this.verifier.test(expression, times, this.tracker.get(), this.name);
    }

    public object(): T {
        return this.interceptor.object();
    }

    public setBehaviorStrategy(behaviorStrategy: MockBehavior): IMock<T> {
        this.interceptedCallbacks.setBehaviorStrategy(behaviorStrategy);
        return this;
    }
}

export class Mock<T> extends MockCore<T> {
    constructor(name?: string) {
        const definedSetups = new DefinedSetups<T>(expressionMatcherFactory());
        const tracker = new Tracker();
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
