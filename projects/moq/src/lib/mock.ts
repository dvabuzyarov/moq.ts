import { IMock, IMockOptions, IPresetBuilder, ISequenceVerifier } from "./moq";
import { Times } from "./times";
import { injectorFactory } from "./injector/injector.factory";
import { MOCK } from "./injector/mock.injection-token";
import { DefaultInjectorConfig } from "./injector/default-injector.config";
import { MockCore } from "./core/mock-core";
import { InjectionFactory, TypeOfInjectionFactory } from "./injector/injection-factory";
import { Type } from "./static.injector/type";
import { InjectionToken } from "./static.injector/injection_token";
import { MOCK_CONSTRUCTOR } from "./injector/mock-constructor.injection-token";
import { IExpression } from "./reflector/expression-reflector";

/**
 * The default implementation of {@link IMock} interface.
 */
export class Mock<T> implements IMock<T> {
    private static Options: IMockOptions<unknown> = undefined;
    private static InjectorFactory: typeof injectorFactory = injectorFactory;
    private readonly core: MockCore<T>;

    constructor(options: IMockOptions<T> = {}) {
        const preOptions = {...Mock.options, ...options} as IMockOptions<T>;
        const providers = [
            {provide: MOCK, useValue: this, deps: []},
            {provide: MOCK_CONSTRUCTOR, useValue: (opts: IMockOptions<unknown>) => new Mock(opts), deps: []},
        ];
        const injector = Mock.InjectorFactory(preOptions, ...providers);
        this.core = injector.get(MockCore);
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

    /**
     * @hidden
     * Returns a method that is internally used for creating of an angular based injector
     */
    static get injectionFactory() {
        return Mock.InjectorFactory;
    }

    /**
     * @hidden
     * Sets a method that is internally used for creating of an angular based injector
     */
    static set injectionFactory(value: typeof injectorFactory){
        Mock.InjectorFactory = value;
    }

    public get options() {
        return this.core.options;
    }

    public get tracker() {
        return this.core.tracker;
    }

    public get name() {
        return this.core.name;
    }

    public setup<E extends IExpression<T>,
        R = E extends (...args: any[]) => infer M ? M : any>(expression: E): IPresetBuilder<T, R> {
        return this.core.setup(expression);
    }

    public verify(expression: IExpression<T>, times = Times.Once()): IMock<T> {
        return this.core.verify(expression, times);
    }

    public object(): T {
        return this.core.object();
    }

    public prototypeof(prototype?: any): IMock<T> {
        return this.core.prototypeof(prototype);
    }

    /**
     * @experimental
     */
    public insequence(sequence: ISequenceVerifier, expression: IExpression<T>): IMock<T> {
        return this.core.insequence(sequence, expression);
    }

    public resolve<S, R = S extends InjectionFactory ? TypeOfInjectionFactory<S> : S>(token: Type<S> | InjectionToken<S>): R {
        return this.core.resolve(token);
    }
}
