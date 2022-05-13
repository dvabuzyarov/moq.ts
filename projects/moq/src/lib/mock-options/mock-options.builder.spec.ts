import { createInjectorFromProviders, resolve } from "../../tests.components/resolve.builder";
import { MockOptionsBuilder } from "./mock-options.builder";
import { IInjectorConfig } from "../moq";

describe("Build mock options function", () => {
    beforeEach(() => {
        createInjectorFromProviders([
            {provide: MockOptionsBuilder, useClass: MockOptionsBuilder, deps: []},
        ]);
    });

    it("Returns options with default values of required options", function () {
        const builder = resolve(MockOptionsBuilder);
        const {injectorConfig, name, target} = builder.build({});

        expect(injectorConfig).toBe(undefined);
        expect(typeof target === "function").toBe(true);
        expect(name).toBe(undefined);
    });

    it("Returns options with preserved values", function () {
        const name = "name";
        const target = () => undefined;
        const injectorConfig = jasmine.createSpyObj<IInjectorConfig>(["get"]);

        const builder = resolve(MockOptionsBuilder);
        const actual = builder.build({name, target, injectorConfig});

        expect(actual.target).toBe(target);
        expect(actual.name).toBe(name);
    });
});
