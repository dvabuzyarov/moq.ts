import { EqualMatcher } from "./equal.matcher";
import { ConstantEqualityComparer } from "../expression.equality-comparers/constant.equality-comparer";
import { ItEqualityComparer } from "../expression.equality-comparers/it.equality-comparer";

/**
 * @hidden
 */
export class EqualConstantMatcher implements Readonly<ConstantEqualityComparer> {
    constructor(
        private readonly itEqualityComparer: ItEqualityComparer,
        private readonly equalMatcher: EqualMatcher) {
    }

    equals(left: any, right: any): boolean {
        const actual = this.itEqualityComparer.equals(left, right);
        return actual === undefined ? this.equalMatcher.matched(left, right) : actual;
    }
}

