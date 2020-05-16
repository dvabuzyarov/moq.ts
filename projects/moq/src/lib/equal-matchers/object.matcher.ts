import { Inject } from "@angular/core";
import { typeofInjectionToken } from "../typeof-injection-token";
import { OBJECT_MATCHERS } from "./object-matchers.injection-token";

/**
 * @hidden
 */
export class ObjectMatcher {

    constructor(
        @Inject(OBJECT_MATCHERS)
        private matchers: typeofInjectionToken<typeof OBJECT_MATCHERS>) {
    }

    public matched<T extends Object>(left: T, right: T): boolean {
        if (left === null && right === null) return true;
        if (left === right) return true;
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

