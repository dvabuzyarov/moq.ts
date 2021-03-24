import { ConstantEqualityComparer } from "./constant.equality-comparer";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";

describe("Constant equality comparer", () => {
    beforeEach(() => {
        createInjector2(ConstantEqualityComparer, []);
    });

    it("Returns true when both are undefined", () => {
        const left = undefined;
        const right = undefined;

        const comparer = resolve2(ConstantEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are null", () => {
        const left = null;
        const right = null;

        const comparer = resolve2(ConstantEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are the same value", () => {
        const left = 1;
        const right = 1;

        const comparer = resolve2(ConstantEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });


    it("Returns false when left and right are object", () => {
        const left = {};
        const right = {};

        const comparer = resolve2(ConstantEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });
});
