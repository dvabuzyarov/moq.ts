import { IterableTester } from "./iterable.tester";
import { PropertyValueMatcher } from "./property.value.matcher";
import { ConstantMatcher } from "../expression-matchers/constant-matcher";

/**
 * @hidden
 */
export class IteratorMatcher {

    constructor(
        private constantMatcher: ConstantMatcher,
        private iterableTester: IterableTester,
        private propertyValueMatcher: PropertyValueMatcher) {
    }

    public matched<T extends Object>(left: T, right: T): boolean {
        if (this.iterableTester.verify(left, right) === true) {
            const leftIterator = [...left[Symbol.iterator]()];
            const rightIterator = [...right[Symbol.iterator]()];
            if (leftIterator.length !== rightIterator.length) return false;

            for (let i = 0; i < leftIterator.length; i++) {
                const leftValue = leftIterator[i];
                const rightValue = rightIterator[i];
                if (this.propertyValueMatcher.matched(leftValue, rightValue) === false) {
                    if (this.constantMatcher.matched(leftValue, rightValue) === false) return false;
                }
            }

            return true;
        }

        return false;
    }
}

