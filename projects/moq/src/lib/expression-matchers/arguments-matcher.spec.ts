import {ArgumentsMatcher} from "./arguments-matcher";
import {ConstantMatcher} from "./constant-matcher";

describe("Arguments matcher", () => {

    function constantMatcherFactory(matched?: (left, right) => boolean): ConstantMatcher {
        return {
            matched: matched
        };
    }

    it("Returns true when both are undefined", () => {
        const left = undefined;
        const right = undefined;

        const matcher = new ArgumentsMatcher(constantMatcherFactory());
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are null", () => {
        const left = null;
        const right = null;

        const matcher = new ArgumentsMatcher(constantMatcherFactory());
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are same object", () => {
        const value = [];

        const matcher = new ArgumentsMatcher(constantMatcherFactory());
        const actual = matcher.matched(value, value);

        expect(actual).toBe(true);
    });

    it("Returns true when constant matcher returns true for every each item", () => {
        const left = "left value";
        const right = "right value";

        const matched = (lvalue, rvalue): boolean => {
            expect(lvalue).toBe(left);
            expect(rvalue).toBe(right);
            return true;
        };

        const matcher = new ArgumentsMatcher(constantMatcherFactory(matched));
        const actual = matcher.matched([left], [right]);

        expect(actual).toBe(true);
    });


    it("Returns false when left and right have different length", () => {
        const left = [];
        const right = [1];

        const matcher = new ArgumentsMatcher(constantMatcherFactory());
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });


    it("Returns false when constant matcher returns false for any item", () => {
        const value = "same value";
        const left = "left value";
        const right = "right value";

        const matched = (lvalue, rvalue): boolean => {
            return  lvalue === rvalue;
        };

        const matcher = new ArgumentsMatcher(constantMatcherFactory(matched));
        const actual = matcher.matched([value, left], [value, right]);

        expect(actual).toBe(false);
    });
});
