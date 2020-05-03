import { It } from "../expected-expressions/expression-predicates";
import { ConstantMatcher } from "./constant-matcher";

/**
 * @hidden
 */
export class ArgumentsMatcher {
    constructor(private constantMatcher = new ConstantMatcher()) {

    }

    public matched(left: any[], right: (any | It<any>)[]): boolean {
        if (left === right) return true;
        if (left.length !== right.length) return false;

        for (let i = 0; i < left.length; i++) {
            const lvalue = left[i];
            const rvalue = right[i];
            if (this.constantMatcher.matched(lvalue, rvalue) === false) {
                return false;
            }
        }

        return true;
    }
}
