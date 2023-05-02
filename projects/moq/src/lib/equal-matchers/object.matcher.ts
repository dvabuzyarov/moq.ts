import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { OBJECT_MATCHERS } from "./object-matchers.injection-token";

/**
 * @hidden
 */
export class ObjectMatcher {

    constructor(
        private readonly matchers: TypeofInjectionToken<typeof OBJECT_MATCHERS>) {
    }

    public matched<T extends Record<string, unknown>>(left: T, right: T): boolean {
        if (left === right) return true;
        if (left == null || right == null) return false;
        for (const matcher of this.matchers) {
            const matched = matcher.matched(left, right);
            if (matched === undefined) {
                continue;
            }
            return matched;
        }

        return false;
    }
}

