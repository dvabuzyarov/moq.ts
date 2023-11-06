import {
    Expression,
    FunctionExpression,
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";
import { It } from "../reflector/expression-predicates";
import { GetPropertyFormatter } from "./get-property.formatter";
import { SetPropertyFormatter } from "./set-property.formatter";
import { FunctionExpressionFormatter } from "./function-expression.formatter";
import { MethodExpressionFormatter } from "./method-expression.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { NewOperatorFormatter } from "./new-operator.formatter";
import { ObjectFormatter } from "../object-formatters/object.formatter";

/**
 * @hidden
 */
export class ExpressionFormatter {

    constructor(private readonly getPropertyFormatter: GetPropertyFormatter,
                private readonly setPropertyFormatter: SetPropertyFormatter,
                private readonly methodFormatter: FunctionExpressionFormatter,
                private readonly namedMethodFormatter: MethodExpressionFormatter,
                private readonly objectFormatter: ObjectFormatter,
                private readonly inOperatorFormatter: InOperatorFormatter,
                private readonly newOperatorFormatter: NewOperatorFormatter) {

    }

    public format(interaction: Expression | It<any>): string {
        if (interaction instanceof GetPropertyExpression) return this.getPropertyFormatter.format(interaction);
        if (interaction instanceof SetPropertyExpression) return this.setPropertyFormatter.format(interaction);
        if (interaction instanceof InOperatorExpression) return this.inOperatorFormatter.format(interaction);
        if (interaction instanceof FunctionExpression) return this.methodFormatter.format(interaction);
        if (interaction instanceof MethodExpression) return this.namedMethodFormatter.format(interaction);
        if (interaction instanceof NewOperatorExpression) return this.newOperatorFormatter.format(interaction);
        if (interaction instanceof It) return this.objectFormatter.format(interaction);

        return undefined;
    }
}
