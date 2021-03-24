import { It } from "../reflector/expression-predicates";

/**
 * @hidden
 */
export class ItEqualityComparer {

    public equals<T>(left: It<T>, right: It<T>): boolean {
        return left === right;
    }
}
