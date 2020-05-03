import { It } from "../expected-expressions/expression-predicates";
import { EqualMatcher } from "../equal-matchers/equal.matcher";

/**
 * @hidden
 */
export class ConstantMatcher {
    constructor(private equalMatcher = new EqualMatcher()) {
    }

    public matched(left: any, right: any | It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }
        return this.equalMatcher.matched(left, right);
    }
}

