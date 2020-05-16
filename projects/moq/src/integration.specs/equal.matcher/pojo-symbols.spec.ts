import { EqualMatcher } from "../../lib/equal-matchers/equal.matcher";
import { resolve } from "../../tests.components/resolve.builder";
import { createInjectorForEqualMatcher } from "./create-injector.for-equal-matcher";

describe("Equal matcher for POJO with symbols properties", () => {

    beforeEach(() => {
        createInjectorForEqualMatcher();
    });

    it("Returns true when values are equal", () => {

        const prop = Symbol();
        const left = {[prop]: 1};
        const right = {[prop]: 1};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when properties in different order", () => {

        const prop1 = Symbol();
        const prop2 = Symbol();
        const left = {[prop1]: 1, [prop2]: 2};
        const right = {[prop2]: 2, [prop1]: 1};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when values are different", () => {
        const prop1 = Symbol();
        const prop2 = Symbol();
        const left = {[prop1]: 1};
        const right = {[prop2]: 1};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
