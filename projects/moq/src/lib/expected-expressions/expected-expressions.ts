import { It } from "./expression-predicates";
import {
    GetPropertyInteraction,
    InOperatorInteraction,
    MethodInteraction,
    NamedMethodInteraction,
    SetPropertyInteraction
} from "../interactions";

/**
 * See {@link NamedMethodInteraction}
 */
export class ExpectedNamedMethodExpression extends NamedMethodInteraction {

}

/**
 * See {@link MethodInteraction}
 */
export class ExpectedMethodExpression extends MethodInteraction {

}

/**
 * See {@link GetPropertyInteraction}
 */
export class ExpectedGetPropertyExpression extends GetPropertyInteraction {

}

/**
 * See {@link SetPropertyInteraction}
 */
export class ExpectedSetPropertyExpression extends SetPropertyInteraction {

}

/**
 * See {@link InOperatorInteraction}
 */
export class ExpectedInOperatorExpression extends InOperatorInteraction {

}

/**
 * This types are special sub types of expressions that are used in an expectation context.
 */
export type ExpectedExpressions<T> =
    ExpectedMethodExpression
    | ExpectedGetPropertyExpression
    | ExpectedSetPropertyExpression
    | ExpectedInOperatorExpression
    | ExpectedNamedMethodExpression
    | It<T>;
