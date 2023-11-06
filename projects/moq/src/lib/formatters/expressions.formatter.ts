import { Expressions } from "../reflector/expressions";
import { ExpressionFormatter } from "./expression.formatter";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";

/**
 * @hidden
 */
export class ExpressionsFormatter {

    constructor(private readonly interactionFormatter: ExpressionFormatter,
                private readonly options: TypeofInjectionToken<typeof MOCK_OPTIONS>) {

    }

    public format(expression: Expressions<any>, timesMessage: string, haveBeenCalledTimes: number): string {
        const expressionDescription = this.interactionFormatter.format(expression);
        const mockName = this.options.name;
        const mockDescription = mockName !== undefined ? ` of ${mockName}` : "";
        return `${expressionDescription}${mockDescription} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`;
    }
}
