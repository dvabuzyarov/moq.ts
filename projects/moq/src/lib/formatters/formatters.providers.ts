import { VerifyFormatter } from "./verify.formatter";
import { ExpressionsFormatter } from "./expressions.formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions.formatter";
import { InteractionFormatter } from "./interaction.formatter";
import { SetPropertyFormatter } from "./set-property.formatter";
import { ConstantFormatter } from "./constant.formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { NamedMethodFormatter } from "./named-method.formatter";
import { MethodFormatter } from "./method.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { GetPropertyFormatter } from "./get-property.formatter";
import { NewOperatorFormatter } from "./new-operator.formatter";

/**
 * @hidden
 */
export const formattersProviders = [
    {provide: VerifyFormatter, useClass: VerifyFormatter, deps: [ExpressionsFormatter, TrackedExpressionsFormatter]},
    {provide: TrackedExpressionsFormatter, useClass: TrackedExpressionsFormatter, deps: [InteractionFormatter]},
    {provide: SetPropertyFormatter, useClass: SetPropertyFormatter, deps: [ConstantFormatter, PropertyKeyFormatter]},
    {provide: PropertyKeyFormatter, useClass: PropertyKeyFormatter, deps: []},
    {provide: NamedMethodFormatter, useClass: NamedMethodFormatter, deps: [ConstantFormatter, PropertyKeyFormatter]},
    {provide: MethodFormatter, useClass: MethodFormatter, deps: [ConstantFormatter]},
    {provide: InOperatorFormatter, useClass: InOperatorFormatter, deps: [PropertyKeyFormatter]},
    {provide: GetPropertyFormatter, useClass: GetPropertyFormatter, deps: [PropertyKeyFormatter]},
    {provide: ExpressionsFormatter, useClass: ExpressionsFormatter, deps: [InteractionFormatter]},
    {provide: ConstantFormatter, useClass: ConstantFormatter, deps: []},
    {provide: NewOperatorFormatter, useClass: NewOperatorFormatter, deps: [ConstantFormatter]},
    {
        provide: InteractionFormatter,
        useClass: InteractionFormatter,
        deps: [
            GetPropertyFormatter,
            SetPropertyFormatter,
            MethodFormatter,
            NamedMethodFormatter,
            ConstantFormatter,
            InOperatorFormatter,
            NewOperatorFormatter
        ]
    }
];
