import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Expressions } from "../reflector/expressions";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { AutoMockOptionsBuilder } from "./auto-mock-options.builder";
import { AutoMockNameFormatter } from "./name-formatters/auto-mock-name.formatter";
import { AutoMockInjectorConfig } from "./auto-mock-injector.config";
import { IMockOptions } from "../moq";

describe("Auto mock options builder", () => {

    beforeEach(() => {
        createInjector(AutoMockOptionsBuilder, [MOCK_OPTIONS, AutoMockNameFormatter, AutoMockInjectorConfig]);
    });

    beforeEach(() => {
        resolveMock(AutoMockNameFormatter).prototypeof(AutoMockNameFormatter.prototype);
    });

    it("Returns auto mock options", () => {
        const name = "auto mock name";
        const mockName = "mock name";
        const target = {};
        const expression = {} as Expressions<undefined>;

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.name)
            .returns(mockName)
            .setup(instance => instance.target)
            .returns(target);

        resolveMock(AutoMockNameFormatter)
            .setup(instance => instance.format(mockName, expression))
            .returns(name);

        const builder = resolve2(AutoMockOptionsBuilder);
        const actual = builder.create(expression);

        const expected: IMockOptions<any> = {
            name,
            target,
            injectorConfig: resolve2(AutoMockInjectorConfig)
        };
        expect(actual).toEqual(expected);
    });
});
