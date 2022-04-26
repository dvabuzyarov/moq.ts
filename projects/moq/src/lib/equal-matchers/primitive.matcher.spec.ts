import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { PrimitiveMatcher } from "./primitive.matcher";

describe("Primitive matcher", () => {

    beforeEach(() => {
        createInjector(PrimitiveMatcher, []);
    });

    it("Returns true when the compared values are equal", () => {
        const left = 1;
        const right = 1;

        const matcher = resolve2(PrimitiveMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when the compared values are different", () => {
        const left = 1;
        const right = 2;

        const matcher = resolve2(PrimitiveMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
