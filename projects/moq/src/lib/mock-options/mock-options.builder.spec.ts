import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { MockOptionsBuilder } from "./mock-options.builder";

describe("Build mock options function", () => {
    beforeEach(() => {
        createInjector([
            {provide: MockOptionsBuilder, useClass: MockOptionsBuilder, deps: []},
        ]);
    });

    it("Returns options with default target", () => {
        const builder = resolve(MockOptionsBuilder);
        const actual = builder.build({});

        expect(actual.target).toBeDefined();
    });

    it("Returns options with preserved values", () => {
        class Target {
        }

        const name = "name";

        const target = new Target();

        const builder = resolve(MockOptionsBuilder);
        const actual = builder.build({target, name});

        expect(actual).toEqual({target, name});
    });
});
