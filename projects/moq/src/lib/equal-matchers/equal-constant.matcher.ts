import { It } from "../expected-expressions/expression-predicates";
import { EqualMatcher } from "./equal.matcher";

/**
 * @hidden
 */
export class EqualConstantMatcher {
    constructor(private equalMatcher: EqualMatcher) {
    }

    public matched(left: any, right: any | It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }
        return this.equalMatcher.matched(left, right);
    }
}

