import { InOperatorExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class InOperatorEqualityComparer {
    public equals(left: InOperatorExpression, right: InOperatorExpression): boolean {
        return left.name === right.name;
    }
}
