import { Expressions } from "../../../reflector/expressions";
import { TypeofInjectionToken } from "../../../injector/typeof-injection-token";
import { MOCK_OPTIONS } from "../../../mock-options/mock-options.injection-token";
import { NamePrefixProvider } from "../../name-formatters/name-prefix.provider";
import { GuardedExpressionFormatter } from "./guarded-expression.formatter";
import { StringErrorStyler } from "./string.error-styler";

export class ComplexExpressionErrorFormatter {
    constructor(
        private readonly options: TypeofInjectionToken<typeof MOCK_OPTIONS>,
        private readonly namePrefixProvider: NamePrefixProvider,
        private readonly expressionFormatter: GuardedExpressionFormatter,
        private readonly errorStyler: StringErrorStyler) {
    }

    public format(expressions: [Expressions<unknown>, boolean][]) {
        const instance = this.namePrefixProvider.get(this.options.name);
        let message = instance;
        for (const [expression, valid] of expressions) {
            const value = this.expressionFormatter.format(expression, instance);
            message += valid ? value : this.errorStyler.style(value);
        }

        return message;
    }
}
