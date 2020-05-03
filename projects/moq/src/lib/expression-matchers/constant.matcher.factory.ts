import { ConstantMatcher } from "./constant-matcher";

export class ConstantMatcherFactory {
    private static instance: ConstantMatcher = undefined;

    create() {
        if (ConstantMatcherFactory.instance === undefined) {
            ConstantMatcherFactory.instance = new ConstantMatcher();
        }
        return ConstantMatcherFactory.instance;
    }
}
