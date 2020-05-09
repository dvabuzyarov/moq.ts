import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { PropertyIterator } from "./property.iterator";
import { PropertyValue } from "./property.value";

describe("Property iterator", () => {
    beforeEach(() => {
        createInjector([
            {provide: PropertyIterator, useClass: PropertyIterator, deps: []},
        ]);
    });

    it("Returns property", () => {
        const prop = 1;
        const object = {prop};

        const provider = resolve(PropertyIterator);
        const actual = [...provider.iterate(object)];

        expect(actual).toContain(new PropertyValue("prop", 1));
    });

    it("Returns symbol property", () => {
        const name = Symbol("a");
        const object = {[name]: 1};

        const provider = resolve(PropertyIterator);
        const actual = [...provider.iterate(object)];

        expect(actual).toContain(new PropertyValue(name, 1));
    });
});
