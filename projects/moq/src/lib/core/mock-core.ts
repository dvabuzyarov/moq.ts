import { ProxyFactory } from "../interceptors/proxy.factory";
import { IMock, IPresetBuilder, ISequenceVerifier } from "../moq";
import { Times } from "../times";
import { Tracker } from "../tracker/tracker";
import { Verifier } from "../verification/verifier";
import { PrototypeStorage } from "../interceptors/prototype.storage";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { Mock } from "../mock";
import { MOCK } from "../injector/mock.injection-token";
import { SetupFactory } from "../presets/setup.factory";
import { InjectionFactory } from "../injector/injection-factory";
import { InjectionToken } from "../static.injector/injection_token";
import { Type } from "../static.injector/type";
import { Injector } from "../static.injector/injector";
import { EXPRESSION_REFLECTOR, IExpression } from "../reflector/expression-reflector";


/**
 * The internal core of {@link Mock} class.
 */
export class MockCore<T> implements IMock<T> {
    constructor(
        public readonly options: TypeofInjectionToken<typeof MOCK_OPTIONS>,
        public readonly tracker: Tracker,
        private readonly injector: Injector,
        private readonly reflector: TypeofInjectionToken<typeof EXPRESSION_REFLECTOR>,
        private readonly interceptor: ProxyFactory<T>,
        private readonly verifier: Verifier<T>,
        private readonly prototypeStorage: PrototypeStorage,
        private readonly mock: TypeofInjectionToken<typeof MOCK>,
        private readonly setupFactory: SetupFactory<T>) {

    }

    public get name() {
        return this.options.name;
    }

    public resolve<S, R = S extends InjectionFactory ? ReturnType<S["factory"]> : S>(token: Type<S> | InjectionToken<S>): R {
        return this.injector.get(token, null) as unknown as R;
    }

    public setup<E extends IExpression<T>,
        R = E extends (...args: any[]) => infer M ? M : any>(expression: E): IPresetBuilder<T, R> {
        const expressions = this.reflector.reflect(expression);
        return this.setupFactory.create<R>(expressions);
    }

    public verify(expression: IExpression<T>, times: Times): IMock<T> {
        const expressions = this.reflector.reflect(expression);
        this.verifier.test(expressions, times);
        return this.mock as IMock<T>;
    }

    public object(): T {
        return this.interceptor.object();
    }

    public prototypeof(prototype?: any): IMock<T> {
        this.prototypeStorage.set(prototype);
        return this.mock as IMock<T>;
    }

    /**
     * @experimental
     */
    public insequence(sequence: ISequenceVerifier, expression: IExpression<T>): IMock<T> {
        sequence.add(this, expression);
        return this.mock as IMock<T>;
    }
}
