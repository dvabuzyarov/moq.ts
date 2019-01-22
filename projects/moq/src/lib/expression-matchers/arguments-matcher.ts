import {It} from "../expected-expressions/expression-predicates";
import {ConstantMatcher} from "./constant-matcher";

/**
 * @hidden
 */
export class ArgumentsMatcher  {
    constructor(private constantMatcher: ConstantMatcher = new ConstantMatcher()) {

    }

    public matched(left: any[], right: (any|It<any>)[]): boolean {
        if (left === right) return true;
        if (left.length !== right.length) return false;

        let matched = true;
        left.forEach((lvalue, index) => {
            const rvalue = right[index];
            matched = this.constantMatcher.matched(lvalue, rvalue) === true ? matched : false;
        });

        return matched;
    }
}
