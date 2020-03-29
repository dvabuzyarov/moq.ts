import { It } from "./expression-predicates";
import {
    ExpectedExpressions,
    ExpectedGetPropertyExpression,
    ExpectedInOperatorExpression,
    ExpectedMethodExpression,
    ExpectedNamedMethodExpression,
    ExpectedSetPropertyExpression
} from "./expected-expressions";

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
 * const reflector = new ExpectedExpressionReflector();
 * const actual = reflector.reflect<any>(instance => instance(arg));
 *
 * const expected = new ExpectedMethodExpression([arg]);
 * expect(actual).toEqual(expected);
 * ```
 *
 * For more examples check
 * [unit tests for this class]
 * (https://github.com/dvabuzyarov/moq.ts/blob/master/tests.unit/expected-expressions/expected-expression-reflector.UnitTests.ts)
 */
export class ExpectedExpressionReflector {

    private reflectedInfo;

    /**
     * Reflects the provided code as an expression tree.
     */
    public reflect<T>(expression: IExpectedExpression<T>): ExpectedExpressions<T> {
        this.reflectedInfo = undefined;

        const proxy = this.expressionProxy();
        const predicate = expression(proxy);

        return predicate instanceof It && (this.reflectedInfo instanceof ExpectedSetPropertyExpression) === false
            ? predicate : this.reflectedInfo;
    }

    private expressionProxy(): any {

        const options = {
            get: (target, name) => {
                this.reflectedInfo = new ExpectedGetPropertyExpression(name);
                return (...args) => {
                    this.reflectedInfo = new ExpectedNamedMethodExpression(name, args);
                };
            },

            set: (target, name, value) => {
                this.reflectedInfo = new ExpectedSetPropertyExpression(name, value);
                return true;
            },

            apply: (target, thisArg, args) => {
                this.reflectedInfo = new ExpectedMethodExpression(args);
            },

            has: (target, name) => {
                this.reflectedInfo = new ExpectedInOperatorExpression(name);
                return true;
            }
        };

        return new Proxy(() => undefined, options);
    }
}

