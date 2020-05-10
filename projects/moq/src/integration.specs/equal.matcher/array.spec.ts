import { EqualMatcher } from "../../lib/equal-matchers/equal.matcher";
import { resolve } from "../../tests.components/resolve.builder";
import { createInjectorForEqualMatcher } from "./create-injector.for-equal-matcher";
import { It } from "../../lib/expected-expressions/expression-predicates";

describe("Equal matcher for arrays", () => {

    beforeEach(() => {
        createInjectorForEqualMatcher();
    });

    it("Returns true for equal arrays", () => {
        const symbol = Symbol("a");
        const left = [1, "string", symbol, new Date(2020, 4, 2)];
        const right = [1, "string", symbol, new Date(2020, 4, 2)];

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false for different arrays", () => {
        const left = [1, 2];
        const right = [2, 1];

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns true for equal arrays with It", () => {
        const left = [1];
        const right = [It.IsAny()];

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false for different arrays with It", () => {
        const left = [1, 2];
        const right = [1, It.Is(() => false)];

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
