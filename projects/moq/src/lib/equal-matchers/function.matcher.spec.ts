import { resolveBuilder } from "../../tests.components/resolve.builder";
import { FunctionMatcher } from "./function.matcher";

describe("Function matcher", () => {

    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        resolve = resolveBuilder([
            [FunctionMatcher, new FunctionMatcher()]
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
