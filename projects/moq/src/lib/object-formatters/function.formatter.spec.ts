import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { FunctionFormatter } from "./function.formatter";

describe("Function formatter", () => {

    beforeEach(() => {
        createInjector(FunctionFormatter, []);
    });

    it("Returns formatted value for an arrow function", () => {
        const provider = resolve2(FunctionFormatter);
        const actual = provider.format(() => 1);

        expect(actual).toEqual("() => 1");
    });

    it("Returns formatted value for a function", () => {
        const value = function name() {
            return 1;
        };

        const provider = resolve2(FunctionFormatter);
        const actual = provider.format(value);

        const expected = `${value}`;
        expect(actual).toEqual(expected);
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(FunctionFormatter);
        const actual = provider.format(null);

        expect(actual).toBe(undefined);
    });
});
