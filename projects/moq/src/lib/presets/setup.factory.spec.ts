import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { SetupFactory } from "./setup.factory";
import { PresetBuilderFactory } from "./preset-builder.factory";
import { Expressions } from "../reflector/expressions";
import { PresetBuilder } from "./preset-builder";
import { Mock } from "moq.ts";
import { IMock } from "../moq";
import { AutoMockProvider } from "../auto-mocking/auto-mock.provider";

describe("Setup factory", () => {

    beforeEach(() => {
        createInjector2(SetupFactory, [PresetBuilderFactory, AutoMockProvider]);
    });

    beforeEach(() => {
        resolveMock(AutoMockProvider).prototypeof(AutoMockProvider.prototype);
    });

    it("Returns a preset builder for a shallow expression", () => {
        const expression = {} as Expressions<undefined>;
        const presetBuilder = {} as PresetBuilder<undefined>;

        resolveMock(PresetBuilderFactory)
            .setup(instance => instance(expression))
            .returns(presetBuilder);

        const factory = resolve2(SetupFactory);
        const actual = factory.create([expression]);

        expect(actual).toBe(presetBuilder);
    });

    it("Returns an auto mocking preset builder for a deep expression", () => {
        const shallow = {} as Expressions<undefined>;
        const rest = {} as Expressions<undefined>;
        const autoMockedObject = {};
        const autoMockedPresetBuilder = {} as PresetBuilder<undefined>;
        const presetBuilderMock = new Mock<PresetBuilder<undefined>>().prototypeof(PresetBuilder.prototype);

        const autoMockedSetupFactory = new Mock<SetupFactory<unknown>>()
            .setup(instance => instance.create([rest]))
            .returns(autoMockedPresetBuilder)
            .object();

        const autoMocked = new Mock<IMock<unknown>>()
            .setup(instance => instance.resolve(SetupFactory))
            .returns(autoMockedSetupFactory)
            .setup(instance => instance.object())
            .returns(autoMockedObject)
            .object();

        resolveMock(PresetBuilderFactory)
            .setup(instance => instance(shallow))
            .returns(presetBuilderMock.object());

        resolveMock(AutoMockProvider)
            .setup(instance => instance.getOrCreate(shallow))
            .returns(autoMocked);

        const factory = resolve2(SetupFactory);
        const actual = factory.create([shallow, rest]);

        presetBuilderMock.verify(instance => instance.returns(autoMockedObject));
        expect(actual).toBe(autoMockedPresetBuilder);
    });

});
