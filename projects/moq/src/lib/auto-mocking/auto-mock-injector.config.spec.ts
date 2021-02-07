import { MOCK } from "../injector/mock.injection-token";
import { Mock } from "moq.ts";
import { Optional } from "../static.injector/metadata";
import { ROOT_MOCK } from "../injector/root-mock.injection-token";
import { AutoMockInjectorConfig } from "./auto-mock-injector.config";
import { IInjectorConfig, IMockOptions } from "../moq";
import { createInjectorFromProviders, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";

describe("Auto mock injector config", () => {

    it("Returns providers with root mock provider", () => {
        createInjectorFromProviders([
            {
                provide: AutoMockInjectorConfig,
                useClass: AutoMockInjectorConfig,
                deps: [MOCK_OPTIONS, MOCK, [new Optional(), ROOT_MOCK]]
            },
            {provide: MOCK_OPTIONS, useValue: new Mock().object(), deps: []},
            {provide: MOCK, useValue: new Mock().object(), deps: []}
        ]);

        const options = {} as IMockOptions<unknown>;
        const additions = [];
        const expected = [];

        const injectorConfig = new Mock<IInjectorConfig>()
            .setup(instance => instance.get(options, additions))
            .returns(expected)
            .object();

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.injectorConfig)
            .returns(injectorConfig);

        const config = resolve2(AutoMockInjectorConfig);
        const actual = config.get(options, additions);

        expect(actual).toEqual([...expected, {provide: ROOT_MOCK, useValue: resolve2(MOCK), deps: []},]);
    });

    it("Returns providers", () => {
        createInjectorFromProviders([
            {
                provide: AutoMockInjectorConfig,
                useClass: AutoMockInjectorConfig,
                deps: [MOCK_OPTIONS, MOCK, [new Optional(), ROOT_MOCK]]
            },
            {provide: MOCK_OPTIONS, useValue: new Mock().object(), deps: []},
            {provide: MOCK, useValue: new Mock().object(), deps: []},
            {provide: ROOT_MOCK, useValue: new Mock().object(), deps: []},
        ]);

        const options = {} as IMockOptions<unknown>;
        const additions = [];
        const expected = [];

        const injectorConfig = new Mock<IInjectorConfig>()
            .setup(instance => instance.get(options, additions))
            .returns(expected)
            .object();

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.injectorConfig)
            .returns(injectorConfig);

        const config = resolve2(AutoMockInjectorConfig);
        const actual = config.get(options, additions);

        expect(actual).toBe(expected);
    });
});
