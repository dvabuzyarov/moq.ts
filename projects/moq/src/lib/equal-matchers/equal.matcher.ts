import { PrimitiveMatcher } from "./primitive.matcher";
import { TypesMatcher } from "./types.matcher";
import { CommonTypeProvider } from "./common-type.provider";
import { ObjectMatcher } from "./object.matcher";
import { FunctionMatcher } from "./function.matcher";

/**
 * @hidden
 */
export class EqualMatcher {

    constructor(
        private typesMatcher: TypesMatcher,
        private commonTypeProvider: CommonTypeProvider,
        private primitiveMatcher: PrimitiveMatcher,
        private objectMatcher: ObjectMatcher,
        private functionMatcher: FunctionMatcher) {
    }

    public matched(left: any, right: any): boolean {
        if (this.typesMatcher.matched(left, right) === false) {
            return false;
        }

        switch (this.commonTypeProvider.ofType(left, right)) {
            case "undefined":
                return this.primitiveMatcher.matched(left, right);
            case "object":
                return this.objectMatcher.matched(left, right);
            case "boolean":
                return this.primitiveMatcher.matched(left, right);
            case "number":
                return this.primitiveMatcher.matched(left, right);
            case "string":
                return this.primitiveMatcher.matched(left, right);
            case "function":
                return this.functionMatcher.matched(left, right);
            case "symbol":
                return this.primitiveMatcher.matched(left, right);
            case "bigint":
                return this.primitiveMatcher.matched(left, right);
        }
    }
}

