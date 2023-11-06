import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { UndefinedFormatter } from "./undefined.formatter";

describe("Undefined formatter", () => {

    beforeEach(() => {
        createInjector(UndefinedFormatter, []);
    });

    it("Returns formatted value", () => {
        const provider = resolve2(UndefinedFormatter);
        const actual = provider.format(undefined);

        expect(actual).toEqual("undefined");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(UndefinedFormatter);
        const actual = provider.format(null);

        expect(actual).toBe(undefined);
    });
});
