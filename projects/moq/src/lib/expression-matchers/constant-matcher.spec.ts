import { ConstantMatcher } from "./constant-matcher";
import { It } from "../expected-expressions/expression-predicates";
import { resolveBuilder } from "../../tests.components/resolve.builder";
import { EqualMatcher } from "../equal-matchers/equal.matcher";

describe("Constant matcher", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const equalMatcher = jasmine.createSpyObj<EqualMatcher>("", ["matched"]);
        resolve = resolveBuilder([
            [EqualMatcher, equalMatcher],
            [ConstantMatcher, new ConstantMatcher(equalMatcher)]
        ]);
    });

    it("Returns true when equal matcher returns true", () => {
        const left = {};
        const right = {};
        resolve(EqualMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const matcher = resolve(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when equal matcher returns false", () => {
        const left = {};
        const right = {};
        resolve(EqualMatcher)
            .matched.withArgs(left, right).and.returnValue(false);

        const matcher = resolve(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns true when right is a predicate that returns true", () => {
        const left = "left";
        const right = It.Is((instance) => {
            expect(instance).toBe(left);
            return true;
        });

        const matcher = resolve(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when right is a predicate that returns false", () => {
        const left = "left";
        const right = It.Is((instance) => {
            expect(instance).toBe(left);
            return false;
        });

        const matcher = resolve(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
