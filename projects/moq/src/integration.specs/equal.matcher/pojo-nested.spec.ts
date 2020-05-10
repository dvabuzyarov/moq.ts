import { EqualMatcher } from "../../lib/equal-matchers/equal.matcher";
import { resolve } from "../../tests.components/resolve.builder";
import { It } from "../../lib/expected-expressions/expression-predicates";
import { createInjectorForEqualMatcher } from "./create-injector.for-equal-matcher";

describe("Equal matcher for POJO with nested object", () => {

    beforeEach(() => {
        createInjectorForEqualMatcher();
    });

    it("Returns true when values are equal", () => {

        const left = {a: {b: {c: 1}}};
        const right = {a: {b: {c: 1}}};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when values with It", () => {

        const left = {a: {b: {c: 1}}};
        const right = {a: {b: {c: It.IsAny()}}};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when values are different", () => {
        const left = {a: {b: {c: 1}}};
        const right = {a: {b: {c: 2}}};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when values with It", () => {

        const left = {a: {b: {c: 1}}};
        const right = {a: It.Is(() => false)};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
