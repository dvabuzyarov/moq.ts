import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { FunctionMatcher } from "./function.matcher";

describe("Function matcher", () => {
    beforeEach(() => {
        createInjector([
            {provide: FunctionMatcher, useClass: FunctionMatcher, deps: []},
        ]);
    });

    it("Returns true when the compared values is the same function", () => {
        const left = () => undefined;
        const right = left;

        const matcher = resolve(FunctionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when the compared values are different functions", () => {
        const left = () => undefined;
        const right = () => undefined;

        const matcher = resolve(FunctionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
