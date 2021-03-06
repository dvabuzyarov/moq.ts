import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { PrimitiveMatcher } from "./primitive.matcher";

describe("Primitive matcher", () => {
    beforeEach(() => {
        createInjector([
            {provide: PrimitiveMatcher, useClass: PrimitiveMatcher, deps: []},
        ]);
    });

    it("Returns true when the compared values are equal", () => {
        const left = 1;
        const right = 1;

        const matcher = resolve(PrimitiveMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when the compared values are different", () => {
        const left = 1;
        const right = 2;

        const matcher = resolve(PrimitiveMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
