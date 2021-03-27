import { It } from "./expression-predicates";
import { Expressions } from "./expressions";
import { InjectionToken } from "../static.injector/injection_token";

/**
 * A function that accepts a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
 * and either plays expected interaction or returns a predicate function.
 * See {@link IMock.setup} function and {@link It} class for more details.
 */
export type IExpression<T> = (instance: T) => void | any | It<T>;

/**
 * This class reflects an expression to an expression tree representation.
 */
export interface ExpressionReflector {
    /**
     * Reflects the provided code as an expression tree.
     */
    reflect<T>(expression: IExpression<T>): Expressions<T>[];
}

/**
 * Injection token for an expression reflector
 */
export const EXPRESSION_REFLECTOR = new InjectionToken<ExpressionReflector>("Expression reflector");
