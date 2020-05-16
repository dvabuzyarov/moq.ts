import { IObjectMatcher } from "./object-matcher.type";

/**
 * Matches Date objects
 */
export class DateMatcher implements IObjectMatcher {
    public matched<T = Date>(left: T, right: T): boolean {
        if (left instanceof Date && right instanceof Date) {
            return left.valueOf() === right.valueOf();
        }
        return undefined;
    }
}

