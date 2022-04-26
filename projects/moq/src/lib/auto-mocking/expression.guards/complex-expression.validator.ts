import { Expressions } from "../../reflector/expressions";
import { ExpressionValidator } from "./expression.validator";

export class ComplexExpressionValidator {

    constructor(private readonly validator: ExpressionValidator) {
    }

    validate(expressions: Expressions<unknown>[]): { valid: boolean; errors: [Expressions<unknown>, boolean][] } {
        const errors: [Expressions<unknown>, boolean][] = [];
        const clone = [...expressions];
        const last = clone.pop();
        for (const expression of clone) {
            errors.push([expression, this.validator.validate(expression)]);
        }
        errors.push([last, true]);
        const isValid = errors.filter(([, valid]) => valid === false).length === 0;
        return {
            valid: isValid,
            errors :  isValid ? [] : errors
        };
    }
}
