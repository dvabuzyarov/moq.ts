import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { BooleanFormatter } from "./boolean.formatter";

describe("Boolean formatter", () => {

    beforeEach(() => {
        createInjector(BooleanFormatter, []);
    });

    it("Returns formatted true", () => {
        const provider = resolve2(BooleanFormatter);
        const actual = provider.format(true);

        expect(actual).toEqual("true");
    });

    it("Returns formatted false", () => {
        const provider = resolve2(BooleanFormatter);
        const actual = provider.format(false);

        expect(actual).toEqual("false");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(BooleanFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
