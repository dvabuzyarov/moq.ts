import { resolveBuilder } from "../../tests.components/resolve.builder";
import { IterableTester } from "./iterable.tester";

describe("Iterable tester", () => {

    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        resolve = resolveBuilder([
            [IterableTester, new IterableTester()]
        ]);
    });

    it("Returns true", () => {
        const left = [2];
        const right = [1];

        const provider = resolve(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not have iterable property", () => {
        const left = {};
        const right = [1];

        const provider = resolve(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when left has iterable property different type then function", () => {
        const left = {[Symbol.iterator]: 1};
        const right = [1];

        const provider = resolve(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right does not have iterable property", () => {
        const left = [1];
        const right = {};

        const provider = resolve(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right has iterable property different type then function", () => {
        const left = [1];
        const right = {[Symbol.iterator]: 1};

        const provider = resolve(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(false);
    });
});
