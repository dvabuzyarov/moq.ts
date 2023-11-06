import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { NullFormatter } from "./null.formatter";

describe("Null formatter", () => {

    beforeEach(() => {
        createInjector(NullFormatter, []);
    });

    it("Returns formatted value", () => {
        const provider = resolve2(NullFormatter);
        const actual = provider.format(null);

        expect(actual).toEqual("null");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(NullFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
