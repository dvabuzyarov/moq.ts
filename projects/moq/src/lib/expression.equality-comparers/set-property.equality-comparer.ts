import { ConstantEqualityComparer } from "./constant.equality-comparer";
import { SetPropertyExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class SetPropertyEqualityComparer {

    constructor(private readonly constantMatcher: ConstantEqualityComparer) {

    }

    public equals(left: SetPropertyExpression, right: SetPropertyExpression): boolean {
        return left.name === right.name && this.constantMatcher.equals(left.value, right.value);
    }
}
