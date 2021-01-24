import { It } from "./expression-predicates";
import { Expressions } from "./expressions";
import { ReflectorProxyFactory } from "./reflector-proxy.factory";

/**
 * A function that accepts a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
 * and either plays expected interaction or returns a predicate function.
 * See {@link IMock.setup} function and {@link It} class for more details.
 */
export type IExpression<T> = (instance: T) => void | any | It<T>;

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
 * (https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/lib/reflector/expression-reflector.spec.ts)
 */
export class ExpressionReflector {
    constructor(private readonly reflectorProxyFactory: ReflectorProxyFactory) {
    }

    /**
     * Reflects the provided code as an expression tree.
     */
    public reflect<T>(expression: IExpression<T>): Expressions<T>[] {
        const expressions: Expressions<T>[] = [];

        const proxy = this.reflectorProxyFactory.create<T>(expressions);
        const predicate = expression(proxy);

        return predicate instanceof It && expressions.length === 0
            ? [predicate] : expressions;
    }
}
