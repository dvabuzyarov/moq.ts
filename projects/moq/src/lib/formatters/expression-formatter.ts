import {
    Interactions,
    GetPropertyInteraction,
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

/**
 * @hidden
 */
export class ExpressionFormatter {

    constructor(private getPropertyFormatter: GetPropertyExpressionFormatter = new GetPropertyExpressionFormatter(),
                private setPropertyFormatter: SetPropertyExpressionFormatter = new SetPropertyExpressionFormatter(),
                private methodFormatter: MethodExpressionFormatter = new MethodExpressionFormatter(),
                private namedMethodFormatter: NamedMethodExpressionFormatter = new NamedMethodExpressionFormatter(),
                private constantFormatter: ConstantFormatter = new ConstantFormatter()) {

    }

    public format(expression: Interactions | It<any>): string {
        if (expression instanceof GetPropertyInteraction) return this.getPropertyFormatter.format(expression);
        if (expression instanceof SetPropertyInteraction) return this.setPropertyFormatter.format(expression);
        if (expression instanceof MethodInteraction) return this.methodFormatter.format(expression);
        if (expression instanceof NamedMethodInteraction) return this.namedMethodFormatter.format(expression);
        if (expression instanceof It) return this.constantFormatter.format(expression);

        return undefined;
    }
}
