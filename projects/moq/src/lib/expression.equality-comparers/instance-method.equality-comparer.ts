import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { NamedMethodExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class InstanceMethodEqualityComparer {

    constructor(private readonly argumentsMatcher: ArgumentsEqualityComparer) {

    }

    public equals(left: NamedMethodExpression, right: NamedMethodExpression): boolean {
        if (left.name === right.name) {
            return this.argumentsMatcher.equals(left.args, right.args);
        }

        return false;
    }
}
