import {
    Expressions, GetPropertyExpression, SetPropertyExpression, NamedMethodExpression,
    MethodExpression
} from "../expressions";
import {It} from "../expected-expressions/expression-predicates";
import {GetPropertyExpressionFormatter} from "./get.property-formatter";
import {SetPropertyExpressionFormatter} from "./set.property-formatter";
import {MethodExpressionFormatter} from "./method-formatter";
import {NamedMethodExpressionFormatter} from "./named.method-formatter";
import {ConstantFormatter} from "./constant-formatter";

/**
 * @hidden
 */
export class ExpressionFormatter {

    constructor(private getPropertyFormatter: GetPropertyExpressionFormatter,
                private setPropertyFormatter: SetPropertyExpressionFormatter,
                private methodFormatter: MethodExpressionFormatter,
                private namedMethodFormatter: NamedMethodExpressionFormatter,
                private constantFormatter: ConstantFormatter) {

    }

    public format(expression: Expressions|It<any>): string {
        if (expression instanceof GetPropertyExpression) return this.getPropertyFormatter.format(expression);
        if (expression instanceof SetPropertyExpression) return this.setPropertyFormatter.format(expression);
        if (expression instanceof MethodExpression) return this.methodFormatter.format(expression);
        if (expression instanceof NamedMethodExpression) return this.namedMethodFormatter.format(expression);
        if (expression instanceof It) return this.constantFormatter.format(expression);

        return undefined;
    }
}
