import { Expressions } from "../reflector/expressions";
import { ExpressionFormatter } from "./expression-formatter";

/**
 * @hidden
 */
export class ExpectedExpressionFormatter {

    constructor(private expressionFormatter: ExpressionFormatter) {

    }

    public format(expected: Expressions<any>, timesMessage: string, haveBeenCalledTimes: number, mockName?: string): string {
        const expressionDescription = this.expressionFormatter.format(expected);
        const mockDescription = mockName !== undefined ? ` of ${mockName}` : "";
        return `${expressionDescription}${mockDescription} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`;
    }
}
