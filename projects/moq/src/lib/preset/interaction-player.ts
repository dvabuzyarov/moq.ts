import {
    Expressions,
    GetPropertyExpression,
    MethodExpression,
    NamedMethodExpression,
    SetPropertyExpression
} from "../expressions";
import { MethodInvoker } from "./method-invoker";

export class InteractionPlayer {
    constructor(private methodInvoker: MethodInvoker = new MethodInvoker()) {

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
            return this.methodInvoker.apply(method, target, expression.args);
        }
        if (expression instanceof MethodExpression) {
            return this.methodInvoker.apply(target, undefined, expression.args);
        }
    }
}
