import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { MethodExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class InstanceMethodEqualityComparer {

    constructor(
        private readonly argumentsMatcher: ArgumentsEqualityComparer) {

    }

    public equals(left: MethodExpression, right: MethodExpression): boolean {
        return left.name === right.name && this.argumentsMatcher.equals(left.args, right.args);
    }
}
