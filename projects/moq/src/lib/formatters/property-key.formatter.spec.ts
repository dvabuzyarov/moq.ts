import { PropertyKeyFormatter } from "./property-key.formatter";

describe("Property key formatter", () => {

    it("Returns description when name is string", () => {
        const name = "name";
        const formatter = new PropertyKeyFormatter();
        const actual = formatter.format(name);

        expect(actual).toBe(`name`);
    });

    it("Returns description when name is Symbol", () => {
        const name = Symbol("name");
        const formatter = new PropertyKeyFormatter();
        const actual = formatter.format(name);

        expect(actual).toBe(`Symbol(name)`);
    });

    it("Returns description when name is number", () => {
        const name = 0;
        const formatter = new PropertyKeyFormatter();
        const actual = formatter.format(name);

        expect(actual).toBe(`0`);
    });

});
