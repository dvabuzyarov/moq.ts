import {
    Expressions,
    GetPropertyExpression,
    MethodExpression,
    NamedMethodExpression,
    SetPropertyExpression
} from "../expressions";

export class InteractionPlayer {
    constructor(private apply: typeof Reflect.apply = Reflect.apply) {

    }

    public play(expression: Expressions, target: any): any {
        if (expression instanceof GetPropertyExpression) {
            return target[expression.name];
        }
        if (expression instanceof SetPropertyExpression) {
            return target[expression.name] = expression.value;
        }
        if (expression instanceof NamedMethodExpression) {
            const method = target[expression.name];
            return this.apply(method, target, expression.args);
        }
        if (expression instanceof MethodExpression) {
            return this.apply(target, undefined, expression.args);
        }
    }
}
