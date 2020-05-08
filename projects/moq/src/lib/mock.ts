import { ExpectedExpressionReflector, IExpectedExpression } from "./expected-expressions/expected-expression-reflector";
import { ProxyFactory } from "./interceptors/proxy.factory";
import { IMock, IMockOptions, IPresetBuilder, ISequenceVerifier } from "./moq";
import { Times } from "./times";
import { Tracker } from "./tracker/tracker";
import { Verifier } from "./verification/verifier";
import { ExpectedExpressions } from "./expected-expressions/expected-expressions";
import { PrototypeStorage } from "./interceptors/prototype.storage";
import { injectorFactory } from "./injector.factory";
import { MOCK } from "./moq.injection-token";
import { MOCK_OPTIONS } from "./mock-options/mock-options.injection-token";
import { PRESET_BUILDER_FACTORY } from "./presets/preset-builder-factory.injection-token";

/**
 * The default implementation of {@link IMock} interface.
 */
export class Mock<T> implements IMock<T> {
    public readonly tracker: Tracker;
    private expressionReflector: ExpectedExpressionReflector;
    private interceptor: ProxyFactory<T>;
    private readonly setupFactory: (target: ExpectedExpressions<T>) => IPresetBuilder<T>;
    private verifier: Verifier<T>;
    private prototypeStorage: PrototypeStorage;

    constructor(private readonly options: IMockOptions<T> = {}) {
        const injector = injectorFactory({provide: MOCK, useValue: this, deps: []}, options);
        this.options = injector.get(MOCK_OPTIONS);
        this.tracker = injector.get(Tracker);
        this.expressionReflector = injector.get(ExpectedExpressionReflector);
        this.interceptor = injector.get(ProxyFactory);
        this.setupFactory = injector.get(PRESET_BUILDER_FACTORY);
        this.verifier = injector.get(Verifier);
        this.prototypeStorage = injector.get(PrototypeStorage);
    }

    public get name() {
        return this.options.name;
    }

    public setup(expression: IExpectedExpression<T>): IPresetBuilder<T> {
        const expectedExpression = this.expressionReflector.reflect(expression);
        return this.setupFactory(expectedExpression);
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
        this.prototypeStorage.set(prototype);
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
