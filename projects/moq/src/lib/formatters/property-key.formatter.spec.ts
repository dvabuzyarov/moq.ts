import { PropertyKeyFormatter } from "./property-key.formatter";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";

describe("Property key formatter", () => {

    beforeEach(() => {
        createInjector2(PropertyKeyFormatter, []);
    });

    it("Returns description when name is string", () => {
        const name = "name";
        const formatter = resolve2(PropertyKeyFormatter);
        const actual = formatter.format(name);

        expect(actual).toBe("name");
    });

    it("Returns description when name is Symbol", () => {
        const name = Symbol("name");
        const formatter = resolve2(PropertyKeyFormatter);
        const actual = formatter.format(name);

        expect(actual).toBe("Symbol(name)");
    });

    it("Returns description when name is number", () => {
        const name = 0;
        const formatter = resolve2(PropertyKeyFormatter);
        const actual = formatter.format(name);

        expect(actual).toBe("0");
    });

});
