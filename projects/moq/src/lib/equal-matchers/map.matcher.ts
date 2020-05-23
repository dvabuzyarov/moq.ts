import { IObjectMatcher } from "./object-matcher.type";
import { ConstantMatcher } from "../expression-matchers/constant.matcher";
import { Injector } from "../static.injector";

/**
 * Matches Map objects
 */
export class MapMatcher implements IObjectMatcher {
    constructor(private injector: Injector) {
    }

    public matched<T = Map<unknown, unknown>>(left: T, right: T): boolean {
        if (left instanceof Map && right instanceof Map) {
            if (left.size !== right.size) return false;
            const constantMatcher = this.injector.get(ConstantMatcher);
            for (const [key, value] of left) {
                if (right.has(key) === false) return false;
                if (constantMatcher.matched(value, right.get(key)) === false) return false;
            }
            return true;
        }
        return undefined;
    }
}

