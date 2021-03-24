import { ConstantEqualityComparer } from "./constant.equality-comparer";

/**
 * @hidden
 */
export class ArgumentsEqualityComparer {
    constructor(private readonly constantMatcher: ConstantEqualityComparer) {

    }

    public equals(left: any[], right: any[]): boolean {
        if (left === right) return true;
        if (left.length !== right.length) return false;

        for (let i = 0; i < left.length; i++) {
            const lvalue = left[i];
            const rvalue = right[i];
            if (this.constantMatcher.equals(lvalue, rvalue) === false) {
                return false;
            }
        }

        return true;
    }
}
