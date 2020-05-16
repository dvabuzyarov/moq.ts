import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { TypesMatcher } from "./types.matcher";

describe("Types matcher", () => {

    beforeEach(() => {
        createInjector([
            {provide: TypesMatcher, useClass: TypesMatcher, deps: []},
        ]);
    });

    it("Returns true when the compared values have the same type", () => {
        const left = {};
        const right = {};

        const matcher = resolve(TypesMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when the compared values have different type", () => {
        const left = {};
        const right = 1;

        const matcher = resolve(TypesMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
