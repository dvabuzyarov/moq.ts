import { ComplexExpressionErrorFormatter } from "./complex-expression.error-formatter";
import { MOCK_OPTIONS } from "../../../mock-options/mock-options.injection-token";
import { NamePrefixProvider } from "../../name-formatters/name-prefix.provider";
import { ExpressionFormatter } from "./expression.formatter";
import { FunctionFormatter } from "../../../formatters/function.formatter";
import { PropertyKeyFormatter } from "../../../formatters/property-key.formatter";
import { MethodFormatter } from "../../../formatters/method.formatter";
import { ConstantFormatter } from "../../../formatters/constant.formatter";
import { StringErrorStyler } from "./string.error-styler";

export default [
    {
        provide: ComplexExpressionErrorFormatter, useClass: ComplexExpressionErrorFormatter, deps: [
            MOCK_OPTIONS,
            NamePrefixProvider,
            ExpressionFormatter,
            StringErrorStyler
        ]
    },
    {
        provide: ExpressionFormatter,
        useClass: ExpressionFormatter,
        deps: [FunctionFormatter, PropertyKeyFormatter, MethodFormatter, ConstantFormatter]
    },
    {provide: StringErrorStyler, useClass: StringErrorStyler, deps: []},
];
