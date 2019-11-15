import { ObjectHasMethodExplorer } from "./object.has-method.explorer";
import { nameof } from "../../../tests.components/nameof";

describe("Object has instance method explorer", () => {

    it("Returns true when object has instance method", () => {
        const name = () => undefined;
        const target = {name};

        const explorer = new ObjectHasMethodExplorer();
        const actual = explorer.has(nameof<typeof target>("name"), target);

        expect(actual).toBe(true);
    });

    it("Returns false when object has property with the same name", () => {
        const name = "value";
        const target = {name};

        const explorer = new ObjectHasMethodExplorer();
        const actual = explorer.has(nameof<typeof target>("name"), target);

        expect(actual).toBe(false);
    });

    it("Returns false when object does not have instance method", () => {
        const target = {};

        const explorer = new ObjectHasMethodExplorer();
        const actual = explorer.has("name", target);

        expect(actual).toBe(false);
    });
});
