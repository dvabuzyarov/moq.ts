import { PropertyValue } from "./property.value";
import { ConstantMatcher } from "../expression-matchers/constant-matcher";

/**
 * @hidden
 */
export class PropertyValueMatcher {
    constructor(private constantMatcher: ConstantMatcher) {
    }

    public matched<T extends Object>(left: T, right: T): boolean {
        if (left instanceof PropertyValue && right instanceof PropertyValue) {
            if (left.key !== right.key) return false;
            return this.constantMatcher.matched(left.value, right.value);
        }

        return false;
    }
}
