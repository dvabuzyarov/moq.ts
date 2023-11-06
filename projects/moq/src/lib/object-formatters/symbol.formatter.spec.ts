import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { SymbolFormatter } from "./symbol.formatter";

describe("Symbol formatter", () => {

    beforeEach(() => {
        createInjector(SymbolFormatter, []);
    });

    it("Returns formatted value", () => {
        const provider = resolve2(SymbolFormatter);
        const actual = provider.format(Symbol("description"));

        expect(actual).toEqual("Symbol(description)");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(SymbolFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
