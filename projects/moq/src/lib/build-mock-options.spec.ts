import { buildMockOptions } from "./build-mock-options";

describe("Build mock options function", () => {
    it("Returns options with default target", () => {
        const actual = buildMockOptions({});

        expect(actual.target).toBeDefined();
    });

    it("Returns options with preserved values", () => {
        class Target {
        }
        const name = "name";

        const target = new Target();
        const actual = buildMockOptions({target, name});

        expect(actual).toEqual({target, name, members: []});
    });
});
