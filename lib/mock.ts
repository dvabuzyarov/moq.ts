import {IMock, ISetupInvoke, ISetup} from './moq';
import {Interceptor, IInterceptorCallbacks} from './interceptor';
import {ExpectedExpressionReflector, IExpectedExpression} from './expected-expressions/expected-expression-reflector';
import {Tracker} from './tracker';
import {DefinedSetups} from './defined-setups';
import {MethodExpression, GetPropertyExpression, SetPropertyExpression, NamedMethodExpression} from './expressions';
import {Setup} from './setup';
import {expressionMatcherFactory} from './expression-matchers/factories';
import {Times} from './times';


export class MockCore<T> implements IMock<T> {

    private interceptor: Interceptor<T>;

    constructor(private expressionReflector: ExpectedExpressionReflector,
                private interceptorFactory: (callbacks: IInterceptorCallbacks)=> Interceptor<T>,
                private setupFactory: (mock: IMock<T>)=> ISetupInvoke<T>,
                private definedSetups: DefinedSetups<T>,
                public tracker: Tracker) {

        const callbacks: IInterceptorCallbacks = {
            intercepted: (expression: MethodExpression | GetPropertyExpression | SetPropertyExpression): any => {
                this.tracker.add(expression);
                const setup = this.definedSetups.get(expression);
                return setup !== undefined ? setup.invoke() : undefined;
            },
            interceptedNamedMethod: (expression: NamedMethodExpression, getPropertyExpression: GetPropertyExpression): any => {
                this.tracker.addNamedMethod(expression, getPropertyExpression);
                const setup = this.definedSetups.get(expression);
                return setup !== undefined ? setup.invoke(expression.arguments) : undefined;
            },
            hasNamedMethod: (methodName: string): boolean => definedSetups.hasNamedMethod(methodName)
        };

        this.interceptor = interceptorFactory(callbacks);
    }

    public setup(expression: IExpectedExpression<T>): ISetup<T> {
        const setup = this.setupFactory(this);
        const expectedExpression = this.expressionReflector.reflect(expression);
        this.definedSetups.add(expectedExpression, setup);
        return setup;
    }

    public verify(expression: IExpectedExpression<T>, times: Times): boolean {
        throw new Error('not implemented');
    }

    public get object(): T {
        return this.interceptor.object;
    }
}

export class Mock<T> extends MockCore<T> {
    constructor() {
        super(
            new ExpectedExpressionReflector(),
            (callback: IInterceptorCallbacks) => new Interceptor<T>(callback),
            (mock: IMock<T>) => new Setup<T>(mock),
            new DefinedSetups<T>(expressionMatcherFactory()),
            new Tracker())
    }
}
