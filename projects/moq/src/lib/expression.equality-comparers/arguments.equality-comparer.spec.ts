import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { ConstantEqualityComparer } from "./constant.equality-comparer";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Arguments equality comparer", () => {

    beforeEach(() => {
        createInjector2(ArgumentsEqualityComparer, [ConstantEqualityComparer]);
    });

    it("Returns true when both are undefined", () => {
        const left = undefined;
        const right = undefined;

        const comparer = resolve2(ArgumentsEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are null", () => {
        const left = null;
        const right = null;

        const comparer = resolve2(ArgumentsEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are same object", () => {
        const value = [];

        const comparer = resolve2(ArgumentsEqualityComparer);
        const actual = comparer.equals(value, value);

        expect(actual).toBe(true);
    });

    it("Returns true when constant matcher returns true for every each item", () => {
        const left = "left value";
        const right = "right value";

        resolveMock(ConstantEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(true);

        const comparer = resolve2(ArgumentsEqualityComparer);
        const actual = comparer.equals([left], [right]);

        expect(actual).toBe(true);
    });


    it("Returns false when left and right have different length", () => {
        const left = [];
        const right = [1];

        const comparer = resolve2(ArgumentsEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });


    it("Returns false when constant matcher returns false for any item", () => {
        const value = "same value";
        const left = "left value";
        const right = "right value";

        resolveMock(ConstantEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(false);

        const comparer = resolve2(ArgumentsEqualityComparer);
        const actual = comparer.equals([value, left], [value, right]);

        expect(actual).toBe(false);
    });
});
