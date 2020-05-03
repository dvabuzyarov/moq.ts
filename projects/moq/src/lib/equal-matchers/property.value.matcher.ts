import { ConstantMatcherFactory } from "../expression-matchers/constant.matcher.factory";
import { PropertyValue } from "./property.value";

/**
 * @hidden
 */
export class PropertyValueMatcher {
    constructor(private constantMatcherFactory = new ConstantMatcherFactory()) {
    }

    public matched<T extends Object>(left: T, right: T): boolean {
        if (left instanceof PropertyValue && right instanceof PropertyValue) {
            if (left.key !== right.key) return false;
            const constantMatcher = this.constantMatcherFactory.create();
            return constantMatcher.matched(left.value, right.value);
        }

        return false;
    }
}
