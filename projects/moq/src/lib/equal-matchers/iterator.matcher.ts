import { IterableTester } from "./iterable.tester";
import { ConstantMatcher } from "../expression-matchers/constant.matcher";
import { IObjectMatcher } from "./object-matcher.type";
import { Injector } from "../static.injector/injector";

/**
 * Matches objects that support Iterable protocol
 */
export class IteratorMatcher implements IObjectMatcher {

    constructor(
        private injector: Injector,
        private iterableTester: IterableTester) {
    }

    /*eslint-disable-next-line @typescript-eslint/ban-types*/
    public matched<T extends object>(left: T, right: T): boolean {
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

