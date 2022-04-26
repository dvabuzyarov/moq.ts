import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { FunctionExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class MethodEqualityComparer {

    constructor(private readonly argumentsMatcher: ArgumentsEqualityComparer) {

    }

    public equals(left: FunctionExpression, right: FunctionExpression): boolean {
        return this.argumentsMatcher.equals(left.args, right.args);
    }
}
