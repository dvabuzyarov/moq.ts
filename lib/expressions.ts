export class NamedMethodExpression {
    public arguments: any[];

    constructor(public name: string,
                args: any[]) {
        this.arguments = args;
    }
}

export class MethodExpression {
    public arguments: any[];

    constructor(args: any[]) {
        this.arguments = args;
    }
}

export class GetPropertyExpression {
    constructor(public name: string) {

    }
}

export class SetPropertyExpression {
    constructor(public name: string,
                public value: any) {

    }
}

export type Expressions = MethodExpression | GetPropertyExpression | SetPropertyExpression | NamedMethodExpression;