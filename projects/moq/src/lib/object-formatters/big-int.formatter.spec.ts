import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { BigIntFormatter } from "./big-int.formatter";

describe("BigInt formatter", () => {

    beforeEach(() => {
        createInjector(BigIntFormatter, []);
    });

    it("Returns formatted value", () => {
        const provider = resolve2(BigIntFormatter);
        const actual = provider.format(0o755n);

        expect(actual).toEqual("493");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(BigIntFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
