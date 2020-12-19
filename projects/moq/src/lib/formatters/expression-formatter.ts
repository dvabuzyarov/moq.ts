import {
    GetPropertyInteraction,
    InOperatorInteraction,
    Interaction,
    MethodInteraction,
    NamedMethodInteraction,
    SetPropertyInteraction
} from "../interactions";
import { It } from "../reflector/expression-predicates";
import { GetPropertyExpressionFormatter } from "./get.property-formatter";
import { SetPropertyExpressionFormatter } from "./set.property-formatter";
import { MethodExpressionFormatter } from "./method-formatter";
import { NamedMethodExpressionFormatter } from "./named.method-formatter";
import { ConstantFormatter } from "./constant-formatter";
import { InOperatorFormatter } from "./in-operator.formatter";

/**
 * @hidden
 */
export class ExpressionFormatter {

    constructor(private getPropertyFormatter: GetPropertyExpressionFormatter,
                private setPropertyFormatter: SetPropertyExpressionFormatter,
                private methodFormatter: MethodExpressionFormatter,
                private namedMethodFormatter: NamedMethodExpressionFormatter,
                private constantFormatter: ConstantFormatter,
                private inOperatorFormatter: InOperatorFormatter) {

    }

    public format(expression: Interaction | It<any>): string {
        if (expression instanceof GetPropertyInteraction) return this.getPropertyFormatter.format(expression);
        if (expression instanceof SetPropertyInteraction) return this.setPropertyFormatter.format(expression);
        if (expression instanceof InOperatorInteraction) return this.inOperatorFormatter.format(expression);
        if (expression instanceof MethodInteraction) return this.methodFormatter.format(expression);
        if (expression instanceof NamedMethodInteraction) return this.namedMethodFormatter.format(expression);
        if (expression instanceof It) return this.constantFormatter.format(expression);

        return undefined;
    }
}
