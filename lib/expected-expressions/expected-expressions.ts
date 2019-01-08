import { It } from './expression-predicates';
import { GetPropertyExpression, MethodExpression, NamedMethodExpression, SetPropertyExpression } from '../expressions';

/**
 * See {@link NamedMethodExpression}
 */
export class ExpectedNamedMethodExpression extends NamedMethodExpression {

}

/**
 * See {@link MethodExpression}
 */
export class ExpectedMethodExpression extends MethodExpression {

}

/**
 * See {@link GetPropertyExpression}
 */
export class ExpectedGetPropertyExpression extends GetPropertyExpression {

}

/**
 * See {@link SetPropertyExpression}
 */
export class ExpectedSetPropertyExpression extends SetPropertyExpression {

}

/**
 * This types are special sub types of expressions that are used in an expectation context.
 */
export type ExpectedExpressions<T> =
    ExpectedMethodExpression
    | ExpectedGetPropertyExpression
    | ExpectedSetPropertyExpression
    | ExpectedNamedMethodExpression
    | It<T>;