import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { ObjectMapProvider } from "./object-map.provider";
import { nameof } from "../../tests.components/nameof";

describe("Object map provider", () => {
    beforeEach(() => {
        createInjector([
            {provide: ObjectMapProvider, useClass: ObjectMapProvider, deps: []},
        ]);
    });

    it("Returns property", () => {
        const prop = 1;
        const object = {prop};

        const provider = resolve(ObjectMapProvider);
        const actual = provider.get(object);

        expect([...actual.entries()]).toEqual([[nameof<typeof object>("prop"), prop]]);
    });

    it("Returns symbol property", () => {
        const name = Symbol("a");
        const object = {[name]: 1};

        const provider = resolve(ObjectMapProvider);
        const actual = provider.get(object);

        expect([...actual.entries()]).toEqual([[name, 1]]);
    });
});
