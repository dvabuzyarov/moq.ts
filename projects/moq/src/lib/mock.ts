import { ExpressionReflector, IExpression } from "./reflector/expression-reflector";
import { ProxyFactory } from "./interceptors/proxy.factory";
import { IMock, IMockOptions, IPresetBuilder, ISequenceVerifier } from "./moq";
import { Times } from "./times";
import { Tracker } from "./tracker/tracker";
import { Verifier } from "./verification/verifier";
import { Expressions } from "./reflector/expressions";
import { PrototypeStorage } from "./interceptors/prototype.storage";
import { injectorFactory } from "./injector/injector.factory";
import { MOCK } from "./injector/moq.injection-token";
import { MOCK_OPTIONS } from "./mock-options/mock-options.injection-token";
import { PRESET_BUILDER_FACTORY } from "./presets/preset-builder-factory.injection-token";
import { DefaultInjectorConfig } from "./injector/default-injector.config";

/**
 * The default implementation of {@link IMock} interface.
 */
export class Mock<T> implements IMock<T> {
    private static Options: IMockOptions<unknown> = undefined;
    public readonly tracker: Tracker;
    private expressionReflector: ExpressionReflector;
    private interceptor: ProxyFactory<T>;
    private readonly setupFactory: (target: Expressions<T>) => IPresetBuilder<T>;
    private verifier: Verifier<T>;
    private prototypeStorage: PrototypeStorage;

    constructor(public readonly options: IMockOptions<T> = {}) {

        const preOptions = {...Mock.options, ...options} as IMockOptions<T>;
        const provider = {provide: MOCK, useValue: this, deps: []};

        const injector = injectorFactory(preOptions, provider);

        this.options = injector.get(MOCK_OPTIONS);
        this.tracker = injector.get(Tracker);
        this.expressionReflector = injector.get(ExpressionReflector);
        this.interceptor = injector.get(ProxyFactory);
        this.setupFactory = injector.get(PRESET_BUILDER_FACTORY);
        this.verifier = injector.get(Verifier);
        this.prototypeStorage = injector.get(PrototypeStorage);
    }

    /**
     * The default mock options that would applied to all instantiating Mock objects.
     * By default it sets {@link IMockOptions.target} as a function, {@link IMockOptions.injectorConfig} as
     * instance of {@link DefaultInjectorConfig} and {@link IMockOptions.name} as undefined.
     * If an options are passed as constructor parameter {@link Mock.constructor} they will override the default options.
     */
    static get options() {
        if (Mock.Options === undefined) {
            Mock.Options = {
                target: () => undefined,
                injectorConfig: new DefaultInjectorConfig()
            };
        }
        return Mock.Options;
    }

    /**
     * The default mock options that would applied to all instantiating Mock objects.
     * If an options are passed as constructor parameter they will override the default options.
     */
    static set options(options: IMockOptions<unknown>) {
        Mock.Options = options;
    }

    public get name() {
        return this.options.name;
    }

    public setup<
        E extends IExpression<T>,
        R = E extends (...args: any[]) => infer M ? M : any>(expression: E): IPresetBuilder<T, R> {
        const expectedExpression = this.expressionReflector.reflect(expression);
        return this.setupFactory(expectedExpression);
    }

    public verify(expression: IExpression<T>, times?: Times): IMock<T> {
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
    public insequence(sequence: ISequenceVerifier, expression: IExpression<T>): IMock<T> {
        sequence.add(this, expression);
        return this;
    }
}
