import { EqualMatcher } from "../../lib/equal-matchers/equal.matcher";
import { resolve } from "../../tests.components/resolve.builder";
import { createInjectorForEqualMatcher } from "./create-injector.for-equal-matcher";

describe("Equal matcher for dates", () => {

    beforeEach(() => {
        createInjectorForEqualMatcher();
    });

    it("Returns false for different dates", () => {
        const left = new Date(2020, 4, 2);
        const right = new Date(2019, 4, 2);

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns true for the same dates", () => {
        const left = new Date(2020, 4, 2);
        const right = new Date(2020, 4, 2);

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });
});
