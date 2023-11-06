import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { DateFormatter } from "./date.formatter";

describe("Date formatter", () => {

    beforeEach(() => {
        createInjector(DateFormatter, []);
    });

    it("Returns formatted value", () => {
        const value = new Date(2024, 10, 3, 5, 9, 16, 493);
        const provider = resolve2(DateFormatter);
        const actual = provider.format(value);

        expect(actual).toEqual(value.toString());
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(DateFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
