import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { NewOperatorExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class NewOperatorEqualityComparer {

    constructor(private readonly argumentsMatcher: ArgumentsEqualityComparer) {

    }

    public equals(left: NewOperatorExpression, right: NewOperatorExpression): boolean {
        return this.argumentsMatcher.equals(left.args, right.args);
    }
}
