import { IExpectedExpression } from "./expected-expressions/expected-expression-reflector";
import { Tracker } from "./tracker";
import { Times } from "./times";
import { Interactions } from "./interactions";

/**
 * Mock creation options
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
}

/**
 * Sets a behaviour rule for a particular use case
 * @param T The type of mocked object.
 */
export interface IPresetBuilder<T> {
    /**
     * Returns the provided value as a result of interaction in case of
     * - get property value
     * - invocation a function
     *
     * Controls write operation in case of
     * - property assignment (true - the assignment is allowed, false - the assignment is not allowed)
     * @param value The value
     */
    returns<TValue>(value: TValue): IMock<T>;

    /**
     * Throws the provided exception.
     */
    throws<TException>(exception: TException): IMock<T>;

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
    callback<TValue>(callback: (interaction: Interactions) => TValue): IMock<T>;

    /**
     * Plays the setup on target invocation when predicate returns true otherwise the setup will be ignored.
     * As predicate {@link PlayTimes} could be used.
     */
    play(predicate: () => boolean): IPresetBuilder<T>;

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
     * Returns instance of mocked object
     */
    object(): T;

    /**
     * Defines a configuration for particular interaction with the mocked object.
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
     * .setup(instance => It.Is((expression: ExpectedNamedMethodExpression) => {
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
    setup(expression: IExpectedExpression<T>): IPresetBuilder<T>;

    /**
     * Asserts expected interactions with the mocked object.
     * @param expression Expected expression
     * @param times The default value is {@link Times.Once}
     */
    verify(expression: IExpectedExpression<T>, times?: Times): IMock<T>;

    /**
     * Set the prototype of the mocked object.
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
    insequence(sequence: ISequenceVerifier, expression: IExpectedExpression<T>): IMock<T>;
}

/**
 * @hidden
 * @experimental
 */
export interface ISequenceVerifier {
    add<T>(mock: IMock<T>, expression: IExpectedExpression<T>): ISequenceVerifier;

    verify(times?: Times): void;
}
