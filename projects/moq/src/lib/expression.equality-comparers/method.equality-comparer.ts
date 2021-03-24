import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { MethodExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class MethodEqualityComparer {

    constructor(private readonly argumentsMatcher: ArgumentsEqualityComparer) {

    }

    public equals(left: MethodExpression, right: MethodExpression): boolean {
        return this.argumentsMatcher.equals(left.args, right.args);
    }
}
