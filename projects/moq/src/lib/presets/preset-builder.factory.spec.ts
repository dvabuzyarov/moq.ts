import { PresetBuilder } from "./preset-builder";
import { Expressions } from "../reflector/expressions";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";
import { Presets } from "./presets";
import { RootMockProvider } from "../auto-mocking/root-mock.provider";
import { PresetBuilderFactory } from "./preset-builder.factory";

describe("Preset builder factory", () => {

    beforeEach(() => {
        createInjector2(PresetBuilderFactory, [RootMockProvider, Presets]);
    });

    it("Returns a preset builder", () => {
        const target = {} as Expressions<undefined>;

        const factory = resolve2(PresetBuilderFactory);
        const actual = factory(target);

        expect(actual).toEqual(jasmine.any(PresetBuilder));
    });

});
