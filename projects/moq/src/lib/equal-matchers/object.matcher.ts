import { IMatcher } from "../moq";

/**
 * @hidden
 */
export class ObjectMatcher {

    // constructor(private matchers: IMatcher<any>[]) {
    // }

    public matched<T extends Object>(left: T, right: T): boolean {
        if (left === null && right === null) return true;
        if (left === right) return true;
        // for (const matcher of this.matchers) {
        //     if (matcher.canMatch(left, right) === true) {
        //         return matcher.matched(left, right);
        //     }
        // }

        return false;
    }
}

