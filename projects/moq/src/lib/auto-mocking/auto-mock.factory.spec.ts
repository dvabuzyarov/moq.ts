import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { AutoMockFactory } from "./auto-mock.factory";
import { MOCK_CONSTRUCTOR } from "../injector/mock-constructor.injection-token";
import { AutoMockOptionsBuilder } from "./auto-mock-options.builder";
import { Expressions } from "../reflector/expressions";
import { IMock, IMockOptions } from "../moq";

describe("Auto mock factory", () => {

    beforeEach(() => {
        createInjector2(AutoMockFactory, [MOCK_CONSTRUCTOR, AutoMockOptionsBuilder]);
    });

    it("Returns a new instance of mock", () => {
        const expression = {} as Expressions<undefined>;
        const options = {} as IMockOptions<undefined>;
        const expected = {} as IMock<undefined>;

        resolveMock(AutoMockOptionsBuilder)
            .setup(instance => instance.create(expression))
            .returns(options);

        resolveMock(MOCK_CONSTRUCTOR)
            .setup(instance => instance(options))
            .returns(expected);

        const factory = resolve2(AutoMockFactory);
        const actual = factory.create(expression);

        expect(actual).toBe(expected);
    });

});
