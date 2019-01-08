/**
 * This class represents an expression tree node for invocation of a named function.
 * It provides access to the name of function and list of parameters.
 * @example
 * ```typescript
 *
 * const name = 'member_name';
 * const arg = 'argument';
 * const reflector = new ExpectedExpressionReflector();
 * const actual = reflector.reflect(instance => instance[name](arg));
 *
 * const expected = new ExpectedNamedMethodExpression(name, [arg]);
 * expect(actual).toEqual(expected);
 * ```
 */
export class NamedMethodExpression {
    public arguments: any[];

    constructor(public name: string,
                args: any[]) {
        this.arguments = args;
    }
}

/**
 * This class represents an expression tree node for invocation of a function.
 * It provides access to the list of parameters.
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
 */
export class MethodExpression {
    public arguments: any[];

    constructor(args: any[]) {
        this.arguments = args;
    }
}

/**
 * This class represents an expression tree node for property accessing.
 * It provides access to the name of property.
 * @example
 * ```typescript
 *
 * const name = 'member_name';
 * const reflector = new ExpectedExpressionReflector();
 * const actual = reflector.reflect(instance => instance[name]);

 * const expected = new ExpectedGetPropertyExpression(name);
 * expect(actual).toEqual(expected);
 * ```
 */
export class GetPropertyExpression {
    constructor(public name: string) {

    }
}

/**
 * This class represents an expression tree node for property write.
 * It provides access to the name of property and the value.
 * @example
 * ```typescript
 *
 * const name = 'member_name';
 * const arg = 'argument';
 * const reflector = new ExpectedExpressionReflector();
 * const actual = reflector.reflect(instance => {instance[name] = arg});
 *
 * const expected = new ExpectedSetPropertyExpression(name, arg);
 * expect(actual).toEqual(expected);
 * ```
 */
export class SetPropertyExpression {
    constructor(public name: string,
                public value: any) {

    }
}

export type Expressions = MethodExpression | GetPropertyExpression | SetPropertyExpression | NamedMethodExpression;