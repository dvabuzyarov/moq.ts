import { EqualMatcher } from "../../lib/equal-matchers/equal.matcher";
import { resolve } from "../../tests.components/resolve.builder";
import { It } from "../../lib/expected-expressions/expression-predicates";
import { createInjectorForEqualMatcher } from "./create-injector.for-equal-matcher";

describe("Equal matcher for POJO with func", () => {

    beforeEach(() => {
        createInjectorForEqualMatcher();
    });

    it("Returns true when values are same", () => {
        const func = () => undefined;

        const left = {func};
        const right = {func};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when values with It", () => {
        const func = () => undefined;

        const left = {func};
        const right = {func: It.IsAny()};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when values are different", () => {
        const left = {func: () => undefined};
        const right = {func: () => undefined};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when values with It", () => {
        const func = () => undefined;

        const left = {func};
        const right = {func: It.Is(() => false)};

        const matcher = resolve(EqualMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
