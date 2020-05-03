import { EqualMatcher } from "../lib/equal-matchers/equal.matcher";

xdescribe("Equal matcher", () => {


    it("Returns true for equal arrays", () => {
        const symbol = Symbol("a");
        const left = [1, "string", symbol, new Date(2020, 4, 2)];
        const right = [1, "string", symbol, new Date(2020, 4, 2)];
        const actual = new EqualMatcher().matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false for different arrays", () => {
        const left = [];
        const right = [1];
        const actual = new EqualMatcher().matched(left, right);

        expect(actual).toBe(false);
    });

    xit("Returns false for different dates", () => {
        const left = new Date(2020, 4, 2);
        const right = new Date(2020, 4, 2);
        const actual = new EqualMatcher().matched(left, right);

        expect(actual).toBe(false);
    });
});
