/**
 * @hidden
 */
import { IterableTester } from "./iterable.tester";
import { ConstantMatcherFactory } from "../expression-matchers/constant.matcher.factory";
import { PropertyValueMatcher } from "./property.value.matcher";

/**
 * @hidden
 */
export class IteratorMatcher {

    constructor(
        private constantMatcherFactory = new ConstantMatcherFactory(),
        private iterableTester = new IterableTester(),
        private propertyValueMatcher = new PropertyValueMatcher()) {
    }

    public matched<T extends Object>(left: T, right: T): boolean {
        if (this.iterableTester.verify(left, right) === true) {
            const leftIterator = [...left[Symbol.iterator]()];
            const rightIterator = [...right[Symbol.iterator]()];
            if (leftIterator.length !== rightIterator.length) return false;

            const constantMatcher = this.constantMatcherFactory.create();
            for (let i = 0; i < leftIterator.length; i++) {
                const leftValue = leftIterator[i];
                const rightValue = rightIterator[i];
                if (this.propertyValueMatcher.matched(leftValue, rightValue) === false) {
                    if (constantMatcher.matched(leftValue, rightValue) === false) return false;
                }
            }

            return true;
        }

        return false;
    }
}

