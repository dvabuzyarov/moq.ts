import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { AutoMockFactory } from "./auto-mock.factory";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { RootMockProvider } from "./root-mock.provider";

describe("Auto mock factory", () => {

    beforeEach(() => {
        createInjector2(AutoMockFactory, [MOCK_OPTIONS, RootMockProvider]);
    });

    beforeEach(() => {
        resolveMock(RootMockProvider).prototypeof(RootMockProvider.prototype);
    });

    it("Returns a preset builder for a shallow expression", () => {
        // const expression = {} as Expressions<undefined>;
        // const presetBuilder = {} as PresetBuilder<undefined>;
        //
        // resolveMock(PresetBuilderFactory)
        //     .setup(instance => instance(expression))
        //     .returns(presetBuilder);
        //
        // const factory = resolve2(SetupFactory);
        // const actual = factory.create([expression]);
        //
        // expect(actual).toBe(presetBuilder);
    });

});
