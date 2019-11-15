export abstract class PropertyInteraction {
    protected constructor(public name: PropertyKey) {

    }
}

/**
 * This class represents an invocation of a named function.
 * It provides access to the name of function and list of parameters.
 */
export class NamedMethodInteraction extends PropertyInteraction {
    constructor(name: PropertyKey,
                public args: any[]) {
        super(name);
    }
}

/**
 * This class represents an invocation of a function.
 * It provides access to the list of parameters.
 */
export class MethodInteraction {
    constructor(public args: any[]) {
    }
}

/**
 * This class represents a property accessing.
 * It provides access to the name of property.
 */
export class GetPropertyInteraction extends PropertyInteraction {
    constructor(name: PropertyKey) {
        super(name);
    }
}

/**
 * This class represents a property write interaction.
 * It provides access to the name of property and the value.
 */
export class SetPropertyInteraction extends PropertyInteraction {
    constructor(name: PropertyKey,
                public value: any) {
        super(name);
    }
}

export type Interactions = MethodInteraction | GetPropertyInteraction | SetPropertyInteraction | NamedMethodInteraction;
