import { VerifyFormatter } from "./verify.formatter";
import { ExpressionsFormatter } from "./expressions.formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions.formatter";
import { InteractionFormatter } from "./interaction.formatter";
import { SetPropertyFormatter } from "./set-property.formatter";
import { ConstantFormatter } from "./constant.formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { MethodFormatter } from "./method.formatter";
import { FunctionFormatter } from "./function.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { GetPropertyFormatter } from "./get-property.formatter";
import { NewOperatorFormatter } from "./new-operator.formatter";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { Tracker } from "../tracker/tracker";

/**
 * @hidden
 */
export default [
    {
        provide: VerifyFormatter,
        useClass: VerifyFormatter,
        deps: [ExpressionsFormatter, TrackedExpressionsFormatter, Tracker]
    },
    {provide: TrackedExpressionsFormatter, useClass: TrackedExpressionsFormatter, deps: [InteractionFormatter]},
    {provide: SetPropertyFormatter, useClass: SetPropertyFormatter, deps: [ConstantFormatter, PropertyKeyFormatter]},
    {provide: PropertyKeyFormatter, useClass: PropertyKeyFormatter, deps: []},
    {provide: MethodFormatter, useClass: MethodFormatter, deps: [ConstantFormatter, PropertyKeyFormatter]},
    {provide: FunctionFormatter, useClass: FunctionFormatter, deps: [ConstantFormatter]},
    {provide: InOperatorFormatter, useClass: InOperatorFormatter, deps: [PropertyKeyFormatter]},
    {provide: GetPropertyFormatter, useClass: GetPropertyFormatter, deps: [PropertyKeyFormatter]},
    {provide: ExpressionsFormatter, useClass: ExpressionsFormatter, deps: [InteractionFormatter, MOCK_OPTIONS]},
    {provide: ConstantFormatter, useClass: ConstantFormatter, deps: []},
    {provide: NewOperatorFormatter, useClass: NewOperatorFormatter, deps: [ConstantFormatter]},
    {
        provide: InteractionFormatter,
        useClass: InteractionFormatter,
        deps: [
            GetPropertyFormatter,
            SetPropertyFormatter,
            FunctionFormatter,
            MethodFormatter,
            ConstantFormatter,
            InOperatorFormatter,
            NewOperatorFormatter
        ]
    }
];
