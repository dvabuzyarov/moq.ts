import {
    GetPropertyInteraction,
    InOperatorInteraction,
    Interaction,
    MethodInteraction,
    NamedMethodInteraction,
    SetPropertyInteraction
} from "../interactions";
import { It } from "../expected-expressions/expression-predicates";
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

    constructor(private getPropertyFormatter = new GetPropertyExpressionFormatter(),
                private setPropertyFormatter = new SetPropertyExpressionFormatter(),
                private methodFormatter = new MethodExpressionFormatter(),
                private namedMethodFormatter = new NamedMethodExpressionFormatter(),
                private constantFormatter = new ConstantFormatter(),
                private inOperatorFormatter = new InOperatorFormatter()) {

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
