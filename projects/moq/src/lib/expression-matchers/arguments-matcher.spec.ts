import { ArgumentsMatcher } from "./arguments-matcher";
import { ConstantMatcher } from "./constant-matcher";
import { resolveBuilder } from "../../tests.components/resolve.builder";

describe("Arguments matcher", () => {

    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const constantMatcher = jasmine.createSpyObj<ConstantMatcher>("", ["matched"]);
        resolve = resolveBuilder([
            [ConstantMatcher, constantMatcher],
            [ArgumentsMatcher, new ArgumentsMatcher(constantMatcher)]
        ]);
    });

    it("Returns true when both are undefined", () => {
        const left = undefined;
        const right = undefined;

        const matcher = resolve(ArgumentsMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are null", () => {
        const left = null;
        const right = null;

        const matcher = resolve(ArgumentsMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are same object", () => {
        const value = [];

        const matcher = resolve(ArgumentsMatcher);
        const actual = matcher.matched(value, value);

        expect(actual).toBe(true);
    });

    it("Returns true when constant matcher returns true for every each item", () => {
        const left = "left value";
        const right = "right value";

        resolve(ConstantMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const matcher = resolve(ArgumentsMatcher);
        const actual = matcher.matched([left], [right]);

        expect(actual).toBe(true);
    });


    it("Returns false when left and right have different length", () => {
        const left = [];
        const right = [1];

        const matcher = resolve(ArgumentsMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });


    it("Returns false when constant matcher returns false for any item", () => {
        const value = "same value";
        const left = "left value";
        const right = "right value";

        resolve(ConstantMatcher)
            .matched.and.returnValue(false);

        const matcher = resolve(ArgumentsMatcher);
        const actual = matcher.matched([value, left], [value, right]);

        expect(actual).toBe(false);
    });
});
