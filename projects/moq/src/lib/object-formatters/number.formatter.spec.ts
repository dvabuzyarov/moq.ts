import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { NumberFormatter } from "./number.formatter";

describe("Number formatter", () => {

    beforeEach(() => {
        createInjector(NumberFormatter, []);
    });

    it("Returns formatted value", () => {
        const provider = resolve2(NumberFormatter);
        const actual = provider.format(0XA);

        expect(actual).toEqual("10");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(NumberFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
