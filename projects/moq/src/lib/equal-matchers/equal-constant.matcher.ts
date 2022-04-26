import { EqualMatcher } from "./equal.matcher";
import { ConstantEqualityComparer } from "../expression.equality-comparers/constant.equality-comparer";
import { ItEqualityComparer } from "../expression.equality-comparers/it.equality-comparer";

/**
 * @hidden
 */
// @ts-ignore TS2720
export class EqualConstantMatcher implements ConstantEqualityComparer {
    constructor(
        private readonly itEqualityComparer: ItEqualityComparer,
        private readonly equalMatcher: EqualMatcher) {
    }

    equals(left: any, right: any): boolean {
        const actual = this.itEqualityComparer.equals(left, right);
        return actual === undefined ? this.equalMatcher.matched(left, right) : actual;
    }
}

