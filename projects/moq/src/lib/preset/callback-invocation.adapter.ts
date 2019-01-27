/**
 * @hidden
 */
import { Expressions, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "../expressions";

export function callbackInvocationAdapter<TValue>(expression: Expressions, callback: (args: any[]) => TValue): TValue {
    if (expression instanceof SetPropertyExpression) {
        return callback.apply(undefined, [(<SetPropertyExpression>expression).value]);
    }
    if (expression instanceof MethodExpression) {
        return callback.apply(undefined, (<MethodExpression>expression).args);
    }
    if (expression instanceof NamedMethodExpression) {
        return callback.apply(undefined, (<NamedMethodExpression>expression).args);
    }
    return callback.apply(undefined, []);
}
