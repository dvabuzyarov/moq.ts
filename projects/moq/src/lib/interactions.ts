export abstract class Interaction {
    protected constructor(
        public readonly name: PropertyKey,
        public readonly args: any[]) {

    }
}

/**
 * This class represents an invocation of a named function.
 * It provides access to the name of function and list of parameters.
 */
export class NamedMethodInteraction extends Interaction {
    constructor(name: PropertyKey,
                args: any[]) {
        super(name, args);
    }
}

/**
 * This class represents an invocation of a function.
 * It provides access to the list of parameters.
 */
export class MethodInteraction extends Interaction {
    constructor(args: any[]) {
        super(undefined, args);
    }
}

/**
 * This class represents a property accessing.
 * It provides access to the name of property.
 */
export class GetPropertyInteraction extends Interaction {
    constructor(name: PropertyKey) {
        super(name, undefined);
    }
}

/**
 * This class represents applying of [in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in).
 * It provides access to the name of property.
 */
export class InOperatorInteraction extends Interaction {
    constructor(name: PropertyKey) {
        super(name, undefined);
    }
}

/**
 * This class represents a property write interaction.
 * It provides access to the name of property and the value.
 */
export class SetPropertyInteraction extends Interaction {
    constructor(name: PropertyKey,
                public readonly value: any) {
        super(name, [value]);
    }
}

export type Interactions = MethodInteraction | GetPropertyInteraction | SetPropertyInteraction | NamedMethodInteraction;
