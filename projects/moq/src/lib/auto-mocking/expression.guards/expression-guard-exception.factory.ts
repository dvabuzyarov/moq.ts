import { Expressions } from "../../reflector/expressions";
import { ComplexExpressionErrorFormatter } from "./expression.formatters/complex-expression.error-formatter";

export class ExpressionGuardExceptionFactory {
    constructor(
        private readonly formatter: ComplexExpressionErrorFormatter) {
    }

    create(expressions: [Expressions<unknown>, boolean][]): Error {
        const message = `${this.formatter.format(expressions)} is not a safe expression for auto mocking. `
        + " It predicate could not be used, the only exception is the last part."
        + " Please see https://github.com/dvabuzyarov/moq.ts#auto-mocking for more details.";
        return new Error(message);
    }
}
