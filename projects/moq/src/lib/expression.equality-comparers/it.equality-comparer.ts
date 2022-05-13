import { It } from "../reflector/expression-predicates";

/**
 * @hidden
 */
export class ItEqualityComparer {

    public equals<T>(left: any | It<T>, right: any | It<T>): boolean {
        if (left instanceof It && right instanceof It) {
            return left === right || left.predicate === right.predicate;
        }
        if (left instanceof It) {
            return left.test(right);
        }

        if (right instanceof It) {
            return right.test(left);
        }

        return undefined;
    }
}
