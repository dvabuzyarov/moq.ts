import { ExpectedExpressionReflector, IExpectedExpression } from "./expected-expressions/expected-expression-reflector";
import { Interceptor } from "./interceptor";
import { IMock, IMockOptions, IPresetBuilder, ISequenceVerifier } from "./moq";
import { Times } from "./times";
import { Tracker } from "./tracker";
import { Verifier } from "./verifier";
import { ExpectedExpressions } from "./expected-expressions/expected-expressions";
import { mockDependenciesFactory } from "./mock-dependencies.factory";
import { buildMockOptions } from "./build-mock-options";
import { PrototypeStorage } from "./traps/prototype.storage";

/**
 * The default implementation of {@link IMock} interface.
 */
export class Mock<T> implements IMock<T> {
    public readonly tracker: Tracker;
    private expressionReflector: ExpectedExpressionReflector;
    private interceptor: Interceptor<T>;
    private readonly setupFactory: (mock: IMock<T>, target: ExpectedExpressions<T>) => IPresetBuilder<T>;
    private verifier: Verifier<T>;
    private prototypeStorage: PrototypeStorage;

    constructor(private readonly options: IMockOptions = {}) {
        this.options = buildMockOptions(options);
        const dependencies = mockDependenciesFactory<T>(this.options);
        this.tracker = dependencies.tracker;
        this.expressionReflector = dependencies.expressionReflector;
        this.interceptor = dependencies.interceptor;
        this.setupFactory = dependencies.presetBuilderFactory;
        this.verifier = dependencies.verifier;
        this.prototypeStorage = dependencies.prototypeStorage;
    }

    public get name() {
        return this.options.name;
    }

    public setup(expression: IExpectedExpression<T>): IPresetBuilder<T> {
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

