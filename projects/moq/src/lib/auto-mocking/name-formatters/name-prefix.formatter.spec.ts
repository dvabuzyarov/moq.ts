import { NamePrefixProvider } from "./name-prefix.provider";
import { createInjector, resolve2 } from "../../../tests.components/resolve.builder";

describe("Name prefix provider", () => {

    beforeEach(() => {
        createInjector(NamePrefixProvider, []);
    });

    it("Returns name", () => {
        const name = "mock name";

        const provider = resolve2(NamePrefixProvider);
        const actual = provider.get(name);

        expect(actual).toBe(name);
    });

    it("Returns instance", () => {
        const provider = resolve2(NamePrefixProvider);
        const actual = provider.get(undefined);

        expect(actual).toEqual("instance");
    });
});
