import { ObjectExplorer } from "./object-explorer";

describe("Object explorer", () => {

    it("Returns true when object has property", () => {
        const propertyName = "propertyName";
        const target = {propertyName: undefined};

        const explorer = new ObjectExplorer(target);
        const actual = explorer.hasProperty(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns true when prototype of object has property", () => {
        const propertyName = "propertyName";
        const prototype = {propertyName: undefined};
        const target = {};
        Object.setPrototypeOf(target, prototype);

        const explorer = new ObjectExplorer(target);
        const actual = explorer.hasProperty(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns false when object does not have property", () => {
        const propertyName = "propertyName";
        const target = {};

        const explorer = new ObjectExplorer(target);
        const actual = explorer.hasProperty(propertyName);

        expect(actual).toBe(false);
    });

    it("Returns true when object has method", () => {
        const propertyName = "propertyName";
        const target = {propertyName: () => undefined};

        const explorer = new ObjectExplorer(target);
        const actual = explorer.hasMethod(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns true when prototype of object has method", () => {
        const propertyName = "propertyName";
        const prototype = {propertyName: () => undefined};
        const target = {};
        Object.setPrototypeOf(target, prototype);

        const explorer = new ObjectExplorer(target);
        const actual = explorer.hasMethod(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns false when object does not have method", () => {
        const propertyName = "propertyName";
        const target = {};

        const explorer = new ObjectExplorer(target);
        const actual = explorer.hasMethod(propertyName);

        expect(actual).toBe(false);
    });

    it("Returns false when object has property but not a method", () => {
        const propertyName = "propertyName";
        const target = {propertyName: "value"};

        const explorer = new ObjectExplorer(target);
        const actual = explorer.hasMethod(propertyName);

        expect(actual).toBe(false);
    });
});
