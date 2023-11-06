import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { ItFormatter } from "./it.formatter";
import { It } from "../reflector/expression-predicates";

describe("It formatter", () => {

    beforeEach(() => {
        createInjector(ItFormatter, []);
    });

    it("Returns formatted value", () => {
        const predicate = () => undefined;
        const value = new It(predicate);

        const provider = resolve2(ItFormatter);
        const actual = provider.format(value);

        expect(actual).toBe("It.Is(() => undefined)");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(ItFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
