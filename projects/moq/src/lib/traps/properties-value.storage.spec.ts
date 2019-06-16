import { PropertiesValueStorage } from "./properties-value.storage";

describe("Properties value storage", () => {

    it("Returns the last set value", () => {
        const propertyName = "property name";

        const storage = new PropertiesValueStorage();
        const value1 = {};
        const value2 = {};
        storage.set(propertyName, value1);
        storage.set(propertyName, value2);
        const actual = storage.get(propertyName);

        expect(actual).toBe(value2);
    });

    it("Returns undefined for unset property", () => {
        const propertyName = "property name";

        const storage = new PropertiesValueStorage();
        const actual = storage.get(propertyName);

        expect(actual).toBe(undefined);
    });

    it("Returns true for set property", () => {
        const propertyName = "property name";

        const storage = new PropertiesValueStorage();
        storage.set(propertyName, undefined);
        const actual = storage.has(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns false for unset property", () => {
        const propertyName = "property name";

        const storage = new PropertiesValueStorage();
        const actual = storage.has(propertyName);

        expect(actual).toBe(false);
    });
});
