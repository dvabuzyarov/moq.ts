import { IterableTester } from "./iterable.tester";
import { Injector } from "@angular/core";
import { ConstantMatcher } from "../expression-matchers/constant.matcher";

/**
 * @hidden
 */
export class IteratorMatcher {

    constructor(
        private injector: Injector,
        private iterableTester: IterableTester) {
    }

    public matched<T extends Object>(left: T, right: T): boolean {
        if (this.iterableTester.verify(left, right) === true) {
            const leftIterator = [...left[Symbol.iterator]()];
            const rightIterator = [...right[Symbol.iterator]()];
            if (leftIterator.length !== rightIterator.length) return false;

            const constantMatcher = this.injector.get(ConstantMatcher);
            for (let i = 0; i < leftIterator.length; i++) {
                const leftValue = leftIterator[i];
                const rightValue = rightIterator[i];
                if (constantMatcher.matched(leftValue, rightValue) === false) {
                    return false;
                }
            }

            return true;
        }

        return undefined;
    }
}

