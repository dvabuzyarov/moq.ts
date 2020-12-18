/*eslint @typescript-eslint/naming-convention: "off"*/
export type IPredicate<T> = (instance: T) => boolean;

/**
 * This class allows to express wide range of cases in an expression.
 * You can use it with setups or verifies methods.
 *
 * @example
 * ```typescript
 *
 *  const value = 'value';
 *  const object = new Mock<Function>()
 *  .setup(instance => instance(1))
 *  .returns(value)
 *  .setup(instance => instance(It.Is(param => param > 0 && param < 2))
 *  .returns(value)
 *  .setup(instance => instance(It.IsAny())
 *  .returns(value)
 *  .object();
 *
 *  const actual = object(1);
 *
 *  expect(actual).toBe(value);
 * ```
 *
 * This class could be used not only for args matching, but also for function names, property names and so on.
 *
 * @example
 * ```typescript
 *
 * const object = new Mock<ITestObject>()
 * // the expression dynamically checks the property name that is being read
 * .setup(instance => It.Is((expression: ExpectedGetPropertyExpression) => expression.name === 'property'))
 * .returns(value)
 * .object();
 *
 * const object = new Mock<ITestObject>()
 * //denis any write operation on the property
 * .setup(instance => { instance.property = It.IsAny()})
 * // true - allow, false - deny
 * .returns(false)
 * .object();
 *
 * const object = new Mock<ITestObject>()
 * .setup(instance => It.Is((expression: ExpectedNamedMethodExpression) => expression.name === 'methodName' && expression.args[0] === 1))
 * .returns(value)
 * .object();
 *
 * // how to use with verify
 * mock.verify(instance => instance.method(It.Is(a => a === 2)));
 * ```
 */
export class It<P> {
    constructor(public predicate: IPredicate<P>) {

    }

    /**
     * This factory method returns an expression that matches custom cases.
     *
     * @example
     * ```typescript
     *
     *  const value = 'value';
     *  const object = new Mock<Function>()
     *  .setup(instance => instance(It.Is(param => param > 0 && param < 2))
     *  .returns(value)
     *  .object();
     *
     *  const actual = object(only_values_between_0_and_2_will_trigger_the_setup);
     *
     *  expect(actual).toBe(value);
     * ```
     */
    public static Is<T>(predicate: IPredicate<T>): It<T> | any {
        return new It(predicate);
    }

    /**
     * This factory method returns a wildcat expression that matches any value.
     *
     * @example
     * ```typescript
     *
     *  const value = 'value';
     *  const object = new Mock<Function>()
     *  .setup(instance => instance(It.IsAny())
     *  .returns(value)
     *  .object();
     *
     *  const actual = object(any_value_will_trigger_the_setup);
     *
     *  expect(actual).toBe(value);
     * ```
     */
    public static IsAny<T>(): It<T> | any {
        return new It(() => true);
    }

    /**
     * @hidden
     */
    public test(instance?: P): boolean {
        try {
            const result = this.predicate(instance);
            return result === true || result === undefined;
        } catch (e) {
            return false;
        }
    }
}
