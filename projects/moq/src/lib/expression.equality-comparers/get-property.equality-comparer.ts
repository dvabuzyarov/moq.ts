import { GetPropertyExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class GetPropertyEqualityComparer {

    public equals(left: GetPropertyExpression, right: GetPropertyExpression): boolean {
        return left.name === right.name;
    }
}
