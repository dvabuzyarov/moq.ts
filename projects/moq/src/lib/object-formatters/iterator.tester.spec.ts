import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { IteratorTester } from "./iterator.tester";

describe("Iterator tester", () => {

    beforeEach(() => {
        createInjector(IteratorTester, []);
    });

    it("Returns true", () => {
        const value = [2];

        const provider = resolve2(IteratorTester);
        const actual = provider.verify(value);

        expect(actual).toBe(true);
    });

    it("Returns false when value does not have iterable property", () => {
        const value = {};

        const provider = resolve2(IteratorTester);
        const actual = provider.verify(value);

        expect(actual).toBe(false);
    });

    it("Returns false when value has iterable property different type then function", () => {
        const value = {[Symbol.iterator]: 1};

        const provider = resolve2(IteratorTester);
        const actual = provider.verify(value);

        expect(actual).toBe(false);
    });
});
