import { Times } from "./times";
import { Expression } from "./reflector/expressions";
import { Tracker } from "./tracker/tracker";
import { StaticProvider } from "./static.injector/interface/provider";
import { InjectionFactory, TypeOfInjectionFactory } from "./injector/injection-factory";
import { Type } from "./static.injector/type";
import { InjectionToken } from "./static.injector/injection_token";
import { IExpression } from "./reflector/expression-reflector";

export type PromisedType<T> = T extends Promise<infer P> ? P : never;

export const enum PlayableUpdateReason {
    /**
     * The playable is update because it's setup is about to be played
     */
    OwnSetupWouldBePlayed,
    /**
     * The playable is update because another setup is about to be played
     */
    OtherSetupWouldBePlayed
}

/**
 * Provides playable logic for a setup
 */
export interface IPlayable {
    /**
     * Tests if setup is playable
     */
    isPlayable(): boolean;

    /**
     * Invokes as the setup is about to be played, so the playable logic can change it's state.
     *
     * @param reason The reason why this update is called {@link PlayableUpdateReason}
     * @example
     * ```typescript
     *
     *     const playable1 = new PlayableOnce();
     *     const playable2 = new PlayableOnce();
     *
     *     const mock = new Mock<(val: number) => void)>()
     *     // setup A
     *     .setup(instance => instance(1))
     *     .play(playable1)
     *     .returns(1)
     *     // setup B
     *     .setup(instance => instance(2))
     *     .play(playable2)
     *     .returns(2);
     *
     *     const actual = mock.object()(1);
     *     // at this point the update of playable1 should be called with OwnSetupWouldBePlayed
     *     // because setup A would be played
     *     // and the update of playable2 should be called with OtherSetupWouldBePlayed
     * ```
     */
    update(reason: PlayableUpdateReason): void;
}

/**
 * Sets a behaviour rule for a particular use case
 *
 * @param T The type of mocked object.
 */
export interface IPresetBuilder<T, TValue = any> {
    /**
     * Returns the provided value as a result of interaction in case of
     * - get property value
     * - invocation a function
     *
     * Controls write operation in case of
     * - property assignment (true - the assignment is allowed, false - the assignment is not allowed)
     *
     * @param value The value
     */
    returns(value: TValue): IMock<T>;

    /**
     * Returns the provided value with a resolved Promise as a result of invocation an asynchronous function
     *
     * @param value The value
     */
    returnsAsync(value: PromisedType<TValue>): IMock<T>;

    /**
     * Throws the provided exception.
     */
    throws<TException>(exception: TException): IMock<T>;

    /**
     * Returns the provided value with a rejected Promise as a result of interaction with an asynchronous function.
     */
    throwsAsync<TException>(exception: TException): IMock<T>;

    /**
     * @param callback A callback function that will intercept the interaction.
     * The function may returns a value that will be provided as result (see {@link IPresetBuilder.returns})
     * @example
     * ```typescript
     *
     *     const ipcRendererMock = new StrictMock<typeof ipcRenderer>()
     *     .setup(instance => instance.on(ipcRendererChannelName, It.IsAny()))
     *     .callback(({args: [channel, listener]}) => listener(undefined, response));
     * ```
     */
    callback(callback: (interaction: Expression) => TValue): IMock<T>;

    /**
     * Plays the setup on target invocation when predicate returns true otherwise the setup will be ignored.
     * As predicate {@link PlayTimes} could be used.
     */
    play(predicate: IPlayable): IPresetBuilder<T, TValue>;

    /**
     * Replicates interactions with original object.
     * The mock object keeps tracking all interactions and reflects them on the original object.
     *
     * @example
     * ```typescript
     *
     * const value = 2;
     *
     * class Origin {
     *   public property = value;
     *}
     *
     * const origin = new Origin();
     * const mock = new Mock<Origin>()
     * .setup(() => It.IsAny())
     * .mimics(origin);
     *
     * const actual = mock.object().property;
     * expect(actual).toBe(2);
     * ```
     */
    mimics(origin: T): IMock<T>;
}

/**
 * The main API of the framework.
 *
 * @example
 * ```typescript
 *
 *  const value = 'value';
 *  const object = new Mock<Function>()
 *  .setup(instance => instance(1))
 *  .returns(value)
 *  .object();
 *
 *  const actual = object(1);
 *
 *  expect(actual).toBe(value);
 * ```
 * ---
 * #### Latest setups have more precedence over earlier setups.
 * @example
 * ```typescript
 *
 *  const object = new Mock<Function>()
 *  .setup(instance => instance(1))
 *  .returns(1)
 *  .setup(instance => instance(1))
 *  .returns(2)
 *  .object();
 *
 *  const actual = object(1);
 *
 *  expect(actual).toBe(2);
 * ```
 *
 * @param T The type of mocked object. Could be any type including:
 * - Function,
 * - arrow function,
 * - interface,
 * - class,
 * - object and etc.
 */
export interface IMock<T> {
    /**
     * You can name the mock. The name will be displayed with any relative output, so you can easily distinct
     * output of several mocks. On the mocked object you can find this name at 'mockName' property of the [[Handler]].
     */
    readonly name?: string;

    /**
     * Returns the tracker object that responsible for storing history of interactions with the mocked object.
     */
    readonly tracker: Tracker;

    /**
     * Returns options object
     */
    readonly options: IMockOptions<T>;

    /**
     * Returns instance of mocked object
     */
    object(): T;

    /**
     * Defines a configuration for particular interaction with the mocked object.
     *
     * @example
     * ```typescript
     *
     * // a function invoke with 1 as parameter
     * .setup(instance => instance(1))
     *
     * // apply function invoke on a function with null as the first parameter and a placeholder for the second parameter
     * .setup(instance => instance.apply(null, It.IsAny()))
     *
     * // accessing to a property
     * .setup(instance => instance.property)
     *
     * //accessing to a named function with name 'test' of an object and the first parameter is 1
     * .setup(instance => It.Is((expression: NamedMethodExpression) => {
     *      return expression.name === 'test' && expression.args[0] === 1
     * }))
     *
     * //setting propertyA to value of 'a'
     * .setup(instance => {instance.propertyA = 'a'})
     * ```
     * @param expression A function that accepts a
     * [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
     * and either plays expected interaction or returns a predicate function.
     * Refer {@link It} class for parameter placeholders or predicate functions.
     * Refer the integration tests for more examples.
     * @returns PresetBuilder config interface for the provided expression.
     */
    setup<E extends IExpression<T>,
        R = E extends (...args: any[]) => infer M ? M : any>(expression: E): IPresetBuilder<T, R>;

    /**
     * Asserts expected interactions with the mocked object.
     *
     * @param expression Expected expression
     * @param times The default value is {@link Times.Once()}
     */
    verify(expression: IExpression<T>, times?: Times): IMock<T>;

    /**
     * Set the prototype of the mocked object.
     *
     * @example
     * ```typescript
     *
     *  class PrototypeClass {}
     *
     *  const mock = new Mock<{}>();
     *  const object = mock.object();
     *
     *  Object.setPrototypeOf(object, PrototypeClass.prototype);
     *
     *  expect(object instanceof PrototypeClass).toBe(true);
     * ```
     */
    prototypeof(prototype?: any): IMock<T>;

    /**
     * @experimental
     * @hidden
     */
    insequence(sequence: ISequenceVerifier, expression: IExpression<T>): IMock<T>;

    /**
     * Retrieves an instance from the injector based on the provided token.
     *
     * @returns The instance from the injector if defined, otherwise null.
     */
    resolve<S, R = S extends InjectionFactory ? TypeOfInjectionFactory<S> : S>(token: Type<S> | InjectionToken<S>): R;
}

/**
 * @hidden
 * @experimental
 */
export interface ISequenceVerifier {
    add<T>(mock: IMock<T>, expression: IExpression<T>): ISequenceVerifier;

    verify(times?: Times): void;
}

/**
 * A mock object exposes a symbol property to access to its Moq API.
 * This property is read only and trackable.
 * Since this property makes sense only in context of the moq library
 * and is not specific for mocked types it is not possible to define an interaction behaviour with Setup API.
 *
 * @example
 * ```typescript
 *
 *  const mock = new Mock<() => void>()
 *  .object();
 *
 *  mock[MoqAPI]
 *  .setup(instance => instance())
 *  .returns(12);
 *
 *  const actual = mock();
 *
 *  expect(actual).toBe(12);
 * ```
 */
export const MoqAPI = Symbol("MoqAPI");


/**
 * The Mock internally depends on angular based injector to construct its dependencies.
 */
export interface IInjectorConfig {
    /**
     * Returns array of StaticProviders to construct an angular based injector.
     *
     * @param options The final version of mock options. Options that passed to Mock constructor are merged with
     * the global mock options ({@link Mock.options}). Some components depend on the options and the injector
     * should be able to resolve it. To configure the injector property the implementation could do the following:
     * ``` typescript
     * return [
     *  {provide: MOCK_OPTIONS, useValue: options, deps: []},
     * ];
     * ```
     * @param providers An array of additional providers that could be added to the final configuration.
     */
    get(options: IMockOptions<unknown>, ...providers: StaticProvider[]): StaticProvider[];
}

/**
 * Mock instance options.
 * Could be passed as parameter on mock instantiating or could be set globally on {@link Mock.options}.
 */
export interface IMockOptions<T> {
    /**
     * You can name the mock. The name will be displayed with any relative output, so you can easily distinct
     * output of several mocks. On the mocked object you can find this name at 'mockName' property of the [[Handler]].
     */
    name?: string;
    /**
     * The target object for Proxy that is used under the hood.
     * typeof operation is applied to this target.
     * The default value is a function.
     */
    target?: T;
    /**
     * The Mock internally based on angular injector to construct its dependencies.
     * An instance of {@link IInjectorConfig} implementation could be passed as parameter in order to
     * change the mock behaviour. The default value is an instance of {@link DefaultInjectorConfig}.
     * There is also {@link EqualMatchingInjectorConfig} that would set up Mock to use equal logic for comparing values.
     */
    injectorConfig?: IInjectorConfig;
}
