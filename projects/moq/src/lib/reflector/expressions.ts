/*eslint-disable max-classes-per-file*/
import { It } from "./expression-predicates";

export abstract class Expression {
    protected constructor(
        public readonly name: PropertyKey,
        public readonly args: any[]) {

    }
}

/**
 * This class represents an invocation of an instance method.
 * It provides access to the name of it and the parameters.
 */
export class MethodExpression extends Expression {
    constructor(name: PropertyKey,
                args: any[]) {
        super(name, args);
    }
}

/**
 * This class represents an invocation of a function.
 * It provides access to the parameters.
 */
export class FunctionExpression extends Expression {
    constructor(args: any[]) {
        super(undefined, args);
    }
}

/**
 * This class represents a property accessing.
 * It provides access to the name of property.
 */
export class GetPropertyExpression extends Expression {
    constructor(name: PropertyKey) {
        super(name, undefined);
    }
}

/**
 * This class represents a property write interaction.
 * It provides access to the name of property and the value.
 */
export class SetPropertyExpression extends Expression {
    constructor(name: PropertyKey,
                public readonly value: any) {
        super(name, [value]);
    }
}

/**
 * This class represents applying of [in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in).
 * It provides access to the name of property.
 */
export class InOperatorExpression extends Expression {
    constructor(name: PropertyKey) {
        super(name, undefined);
    }
}

/**
 * This class represents applying of [new operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new).
 * It provides access to the arguments of the constructor.
 */
export class NewOperatorExpression extends Expression {
    constructor(args: any[]) {
        super(undefined, args);
    }
}

/**
 * Union of the expressions and It type.
 */
export type Expressions<T> =
    FunctionExpression
    | GetPropertyExpression
    | SetPropertyExpression
    | InOperatorExpression
    | MethodExpression
    | NewOperatorExpression
    | It<T>;
