import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { DateMatcher } from "./date.matcher";

describe("Date matcher", () => {
    beforeEach(() => {
        createInjector([
            {provide: DateMatcher, useClass: DateMatcher, deps: []},
        ]);
    });

    it("Returns true when the compared values are equal", () => {
        const left = new Date(2020, 4, 10);
        const right = new Date(2020, 4, 10);

        const matcher = resolve(DateMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when the compared values are different", () => {
        const left = new Date(2020, 4, 10);
        const right = new Date(2019, 4, 10);

        const matcher = resolve(DateMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns undefined when the left is not instance of Date", () => {
        const left = null;
        const right = new Date(2019, 4, 10);

        const matcher = resolve(DateMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(undefined);
    });

    it("Returns undefined when the right is not instance of Date", () => {
        const left = new Date(2019, 4, 10);
        const right = null;

        const matcher = resolve(DateMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(undefined);
    });

    it("Returns undefined when the both are not instance of Date", () => {
        const left = null;
        const right = null;

        const matcher = resolve(DateMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(undefined);
    });
});
