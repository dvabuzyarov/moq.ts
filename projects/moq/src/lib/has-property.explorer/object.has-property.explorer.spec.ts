import { ObjectHasPropertyExplorer } from "./object-has-property.explorer";
import { nameof } from "../nameof";

describe("Object has property explorer", () => {

    it("Returns true when object has property", () => {
        const name = () => undefined;
        const target = {name};

        const explorer = new ObjectHasPropertyExplorer();
        const actual = explorer.has(nameof<typeof target>("name"), target);

        expect(actual).toBe(true);
    });

    it("Returns true when prototype of object has property", () => {
        const name = undefined;
        const prototype = {name};
        const target = {};
        Object.setPrototypeOf(target, prototype);

        const explorer = new ObjectHasPropertyExplorer();
        const actual = explorer.has(nameof<typeof prototype>("name"), target);

        expect(actual).toBe(true);
    });

    it("Returns false when object does not have property", () => {
        const target = {};

        const explorer = new ObjectHasPropertyExplorer();
        const actual = explorer.has("name", target);

        expect(actual).toBe(false);
    });
});
