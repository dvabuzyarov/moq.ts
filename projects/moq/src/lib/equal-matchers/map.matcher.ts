import { IObjectMatcher } from "./object-matcher.type";
import { Injector } from "../static.injector/injector";
import { ConstantEqualityComparer } from "../expression.equality-comparers/constant.equality-comparer";

/**
 * Matches Map objects
 */
export class MapMatcher implements IObjectMatcher {
    constructor(private readonly injector: Injector) {
    }

    public matched<T = Map<unknown, unknown>>(left: T, right: T): boolean {
        if (left instanceof Map && right instanceof Map) {
            if (left.size !== right.size) return false;
            const constantMatcher = this.injector.get(ConstantEqualityComparer);
            for (const [key, value] of left) {
                if (right.has(key) === false) return false;
                if (constantMatcher.equals(value, right.get(key)) === false) return false;
            }
            return true;
        }
        return undefined;
    }
}

