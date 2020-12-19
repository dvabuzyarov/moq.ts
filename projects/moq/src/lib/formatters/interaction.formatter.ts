import {
    GetPropertyInteraction,
    InOperatorInteraction,
    Interaction,
    MethodInteraction,
    NamedMethodInteraction, NewOperatorInteraction,
    SetPropertyInteraction
} from "../interactions";
import { It } from "../reflector/expression-predicates";
import { GetPropertyFormatter } from "./get-property.formatter";
import { SetPropertyFormatter } from "./set-property.formatter";
import { MethodFormatter } from "./method.formatter";
import { NamedMethodFormatter } from "./named-method.formatter";
import { ConstantFormatter } from "./constant.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { NewOperatorFormatter } from "./new-operator.formatter";

/**
 * @hidden
 */
export class InteractionFormatter {

    constructor(private readonly getPropertyFormatter: GetPropertyFormatter,
                private readonly setPropertyFormatter: SetPropertyFormatter,
                private readonly methodFormatter: MethodFormatter,
                private readonly namedMethodFormatter: NamedMethodFormatter,
                private readonly constantFormatter: ConstantFormatter,
                private readonly inOperatorFormatter: InOperatorFormatter,
                private readonly newOperatorFormatter: NewOperatorFormatter) {

    }

    public format(interaction: Interaction | It<any>): string {
        if (interaction instanceof GetPropertyInteraction) return this.getPropertyFormatter.format(interaction);
        if (interaction instanceof SetPropertyInteraction) return this.setPropertyFormatter.format(interaction);
        if (interaction instanceof InOperatorInteraction) return this.inOperatorFormatter.format(interaction);
        if (interaction instanceof MethodInteraction) return this.methodFormatter.format(interaction);
        if (interaction instanceof NamedMethodInteraction) return this.namedMethodFormatter.format(interaction);
        if (interaction instanceof NewOperatorInteraction) return this.newOperatorFormatter.format(interaction);
        if (interaction instanceof It) return this.constantFormatter.format(interaction);

        return undefined;
    }
}
