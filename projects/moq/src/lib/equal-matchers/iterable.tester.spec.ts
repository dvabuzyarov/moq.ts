import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { IterableTester } from "./iterable.tester";
import { ItEqualityComparer } from "../expression.equality-comparers/it.equality-comparer";

describe("Iterable tester", () => {

    beforeEach(() => {
        createInjector(IterableTester, [ItEqualityComparer]);
    });

    it("Returns true", () => {
        const left = [2];
        const right = [1];

        const provider = resolve2(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not have iterable property", () => {
        const left = {};
        const right = [1];

        const provider = resolve2(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when left has iterable property different type then function", () => {
        const left = {[Symbol.iterator]: 1};
        const right = [1];

        const provider = resolve2(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right does not have iterable property", () => {
        const left = [1];
        const right = {};

        const provider = resolve2(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right has iterable property different type then function", () => {
        const left = [1];
        const right = {[Symbol.iterator]: 1};

        const provider = resolve2(IterableTester);
        const actual = provider.verify(left, right);

        expect(actual).toBe(false);
    });
});
