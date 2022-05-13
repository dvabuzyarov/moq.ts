import { EqualConstantMatcher } from "./equal-constant.matcher";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { EqualMatcher } from "./equal.matcher";
import { ItEqualityComparer } from "../expression.equality-comparers/it.equality-comparer";

describe("Constant matcher", () => {

    beforeEach(() => {
        createInjector(EqualConstantMatcher, [ItEqualityComparer, EqualMatcher]);
    });

    it("Returns value of ItEqualityComparer", () => {
        const left = undefined;
        const right = undefined;

        const expected = true;
        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const matcher = resolve2(EqualConstantMatcher);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value of EqualMatcher when ItEqualityComparer returns undefined", () => {
        const left = undefined;
        const right = undefined;

        const expected = true;
        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(undefined);
        resolveMock(EqualMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(expected);

        const matcher = resolve2(EqualConstantMatcher);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(expected);
    });
});
