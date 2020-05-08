import { VerifyFormatter } from "./verify-formatter";
import { ExpectedExpressionFormatter } from "./expected-expression-formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions-formatter";
import { ExpressionFormatter } from "./expression-formatter";
import { SetPropertyExpressionFormatter } from "./set.property-formatter";
import { ConstantFormatter } from "./constant-formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { NamedMethodExpressionFormatter } from "./named.method-formatter";
import { MethodExpressionFormatter } from "./method-formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { GetPropertyExpressionFormatter } from "./get.property-formatter";

/**
 * @hidden
 */
export const formattersProviders = [
    {
        provide: VerifyFormatter,
        useClass: VerifyFormatter,
        deps: [ExpectedExpressionFormatter, TrackedExpressionsFormatter]
    },
    {provide: TrackedExpressionsFormatter, useClass: TrackedExpressionsFormatter, deps: [ExpressionFormatter]},
    {
        provide: SetPropertyExpressionFormatter,
        useClass: SetPropertyExpressionFormatter,
        deps: [ConstantFormatter, PropertyKeyFormatter]
    },
    {provide: PropertyKeyFormatter, useClass: PropertyKeyFormatter, deps: []},
    {
        provide: NamedMethodExpressionFormatter,
        useClass: NamedMethodExpressionFormatter,
        deps: [ConstantFormatter, PropertyKeyFormatter]
    },
    {provide: MethodExpressionFormatter, useClass: MethodExpressionFormatter, deps: [ConstantFormatter]},
    {provide: InOperatorFormatter, useClass: InOperatorFormatter, deps: [PropertyKeyFormatter]},
    {provide: GetPropertyExpressionFormatter, useClass: GetPropertyExpressionFormatter, deps: [PropertyKeyFormatter]},
    {
        provide: ExpressionFormatter,
        useClass: ExpressionFormatter,
        deps: [
            GetPropertyExpressionFormatter,
            SetPropertyExpressionFormatter,
            MethodExpressionFormatter,
            NamedMethodExpressionFormatter,
            ConstantFormatter,
            InOperatorFormatter
        ]
    },
    {provide: ExpectedExpressionFormatter, useClass: ExpectedExpressionFormatter, deps: [ExpressionFormatter]},
    {provide: ConstantFormatter, useClass: ConstantFormatter, deps: []},
];
