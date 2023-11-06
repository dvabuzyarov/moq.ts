import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { StringFormatter } from "./string.formatter";

describe("String formatter", () => {

    beforeEach(() => {
        createInjector(StringFormatter, []);
    });

    it("Returns formatted value", () => {
        const provider = resolve2(StringFormatter);
        const actual = provider.format("true");

        expect(actual).toEqual("true");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(StringFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
