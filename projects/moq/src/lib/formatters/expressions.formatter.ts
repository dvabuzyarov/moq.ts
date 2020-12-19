import { Expressions } from "../reflector/expressions";
import { InteractionFormatter } from "./interaction.formatter";

/**
 * @hidden
 */
export class ExpressionsFormatter {

    constructor(private interactionFormatter: InteractionFormatter) {

    }

    public format(expression: Expressions<any>, timesMessage: string, haveBeenCalledTimes: number, mockName?: string): string {
        const expressionDescription = this.interactionFormatter.format(expression);
        const mockDescription = mockName !== undefined ? ` of ${mockName}` : "";
        return `${expressionDescription}${mockDescription} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`;
    }
}
