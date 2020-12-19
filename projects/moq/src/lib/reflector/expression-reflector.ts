import { It } from "./expression-predicates";
import {
    Expressions,
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NamedMethodExpression,
    SetPropertyExpression
} from "./expressions";

/**
 * A function that accepts a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
 * and either plays expected interaction or returns a predicate function.
 * See {@link IMock.setup} function and {@link It} class for more details.
 */
export type IExpectedExpression<T> = (instance: T) => void | any | It<T>;

/**
 * This class reflects an expression to an expression tree representation.
 *
 * @example
 * ```typescript
 *
 * const arg = 'argument';
 * const reflector = new ExpressionReflector();
 * const actual = reflector.reflect<any>(instance => instance(arg));
 *
 * const expected = new MethodExpression([arg]);
 * expect(actual).toEqual(expected);
 * ```
 *
 * For more examples check
 * [unit tests for this class]
 * (https://github.com/dvabuzyarov/moq.ts/blob/master/tests.unit/expected-expressions/expected-expression-reflector.UnitTests.ts)
 */
export class ExpressionReflector {

    private reflectedInfo;

    /**
     * Reflects the provided code as an expression tree.
     */
    public reflect<T>(expression: IExpectedExpression<T>): Expressions<T> {
        this.reflectedInfo = undefined;

        const proxy = this.expressionProxy();
        const predicate = expression(proxy);

        return predicate instanceof It && (this.reflectedInfo instanceof SetPropertyExpression) === false
            ? predicate : this.reflectedInfo;
    }

    private expressionProxy(): any {

        const options = {
            get: (target, name) => {
                this.reflectedInfo = new GetPropertyExpression(name);
                return (...args) => {
                    this.reflectedInfo = new NamedMethodExpression(name, args);
                };
            },

            set: (target, name, value) => {
                this.reflectedInfo = new SetPropertyExpression(name, value);
                return true;
            },

            apply: (target, thisArg, args) => {
                this.reflectedInfo = new MethodExpression(args);
            },

            has: (target, name) => {
                this.reflectedInfo = new InOperatorExpression(name);
                return true;
            }
        };

        return new Proxy(() => undefined, options);
    }
}
