import {
    GetPropertyExpression,
    InOperatorExpression,
    Expression,
    FunctionExpression,
    MethodExpression, NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";
import { It } from "../reflector/expression-predicates";
import { GetPropertyFormatter } from "./get-property.formatter";
import { SetPropertyFormatter } from "./set-property.formatter";
import { FunctionFormatter } from "./function.formatter";
import { MethodFormatter } from "./method.formatter";
import { ConstantFormatter } from "./constant.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { NewOperatorFormatter } from "./new-operator.formatter";

/**
 * @hidden
 */
export class InteractionFormatter {

    constructor(private readonly getPropertyFormatter: GetPropertyFormatter,
                private readonly setPropertyFormatter: SetPropertyFormatter,
                private readonly methodFormatter: FunctionFormatter,
                private readonly namedMethodFormatter: MethodFormatter,
                private readonly constantFormatter: ConstantFormatter,
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
        if (interaction instanceof It) return this.constantFormatter.format(interaction);

        return undefined;
    }
}
