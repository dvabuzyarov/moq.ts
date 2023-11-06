import { VerifyFormatter } from "./verify.formatter";
import { ExpressionsFormatter } from "./expressions.formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions.formatter";
import { ExpressionFormatter } from "./expression.formatter";
import { SetPropertyFormatter } from "./set-property.formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { MethodExpressionFormatter } from "./method-expression.formatter";
import { FunctionExpressionFormatter } from "./function-expression.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { GetPropertyFormatter } from "./get-property.formatter";
import { NewOperatorFormatter } from "./new-operator.formatter";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { Tracker } from "../tracker/tracker";
import { ObjectFormatter } from "../object-formatters/object.formatter";

/**
 * @hidden
 */
export default [
    {
        provide: VerifyFormatter,
        useClass: VerifyFormatter,
        deps: [ExpressionsFormatter, TrackedExpressionsFormatter, Tracker]
    },
    {provide: TrackedExpressionsFormatter, useClass: TrackedExpressionsFormatter, deps: [ExpressionFormatter]},
    {provide: SetPropertyFormatter, useClass: SetPropertyFormatter, deps: [ObjectFormatter, PropertyKeyFormatter]},
    {provide: PropertyKeyFormatter, useClass: PropertyKeyFormatter, deps: []},
    {provide: MethodExpressionFormatter, useClass: MethodExpressionFormatter, deps: [ObjectFormatter, PropertyKeyFormatter]},
    {provide: FunctionExpressionFormatter, useClass: FunctionExpressionFormatter, deps: [ObjectFormatter]},
    {provide: InOperatorFormatter, useClass: InOperatorFormatter, deps: [PropertyKeyFormatter]},
    {provide: GetPropertyFormatter, useClass: GetPropertyFormatter, deps: [PropertyKeyFormatter]},
    {provide: ExpressionsFormatter, useClass: ExpressionsFormatter, deps: [ExpressionFormatter, MOCK_OPTIONS]},
    {provide: NewOperatorFormatter, useClass: NewOperatorFormatter, deps: [ObjectFormatter]},
    {
        provide: ExpressionFormatter,
        useClass: ExpressionFormatter,
        deps: [
            GetPropertyFormatter,
            SetPropertyFormatter,
            FunctionExpressionFormatter,
            MethodExpressionFormatter,
            ObjectFormatter,
            InOperatorFormatter,
            NewOperatorFormatter
        ]
    }
];
