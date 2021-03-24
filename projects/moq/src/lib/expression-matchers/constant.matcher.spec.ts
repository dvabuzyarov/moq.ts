import { ConstantMatcher } from "./constant.matcher";
import { It } from "../reflector/expression-predicates";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";

describe("Constant matcher", () => {
    beforeEach(() => {
        createInjector2(ConstantMatcher, []);
    });

    it("Returns true when both are undefined", () => {
        const left = undefined;
        const right = undefined;

        const matcher = resolve2(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are null", () => {
        const left = null;
        const right = null;

        const matcher = resolve2(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are the same value", () => {
        const left = 1;
        const right = 1;

        const matcher = resolve2(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });


    it("Returns true when right is a predicate that returns true", () => {
        const left = "left";
        const right = It.Is((instance) => {
            expect(instance).toBe(left);
            return true;
        });

        const matcher = resolve2(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });


    it("Returns false when left and right are object", () => {
        const left = {};
        const right = {};

        const matcher = resolve2(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });


    it("Returns false when right is a predicate that returns false", () => {
        const left = "left";
        const right = It.Is((instance) => {
            expect(instance).toBe(left);
            return false;
        });

        const matcher = resolve2(ConstantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
