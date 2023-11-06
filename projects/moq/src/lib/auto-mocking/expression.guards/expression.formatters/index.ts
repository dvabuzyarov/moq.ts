import { ComplexExpressionErrorFormatter } from "./complex-expression.error-formatter";
import { MOCK_OPTIONS } from "../../../mock-options/mock-options.injection-token";
import { NamePrefixProvider } from "../../name-formatters/name-prefix.provider";
import { GuardedExpressionFormatter } from "./guarded-expression.formatter";
import { FunctionExpressionFormatter } from "../../../formatters/function-expression.formatter";
import { PropertyKeyFormatter } from "../../../formatters/property-key.formatter";
import { MethodExpressionFormatter } from "../../../formatters/method-expression.formatter";
import { StringErrorStyler } from "./string.error-styler";
import { ObjectFormatter } from "../../../object-formatters/object.formatter";

export default [
    {
        provide: ComplexExpressionErrorFormatter, useClass: ComplexExpressionErrorFormatter, deps: [
            MOCK_OPTIONS,
            NamePrefixProvider,
            GuardedExpressionFormatter,
            StringErrorStyler
        ]
    },
    {
        provide: GuardedExpressionFormatter,
        useClass: GuardedExpressionFormatter,
        deps: [FunctionExpressionFormatter, PropertyKeyFormatter, MethodExpressionFormatter, ObjectFormatter]
    },
    {provide: StringErrorStyler, useClass: StringErrorStyler, deps: []},
];
