import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { AutoMockedStorage } from "./auto-mock.storage";
import { Expressions } from "../reflector/expressions";
import { It } from "moq.ts";
import { IMock } from "../moq";
import { ExpressionsMatcher } from "./expressions.matcher";
import { AutoMockFactory } from "./auto-mock.factory";
import { AutoMockProvider } from "./auto-mock.provider";
import { Mock } from "../mock";

describe("Auto mock provider", () => {

    beforeEach(() => {
        createInjector2(AutoMockProvider, [AutoMockedStorage, ExpressionsMatcher, AutoMockFactory]);
    });

    beforeEach(() => {
        resolveMock(ExpressionsMatcher).prototypeof(ExpressionsMatcher.prototype);
        resolveMock(AutoMockFactory).prototypeof(AutoMockFactory.prototype);
    });

    it("Returns an existing mock", () => {
        const expression = {} as Expressions<undefined>;
        const key = {} as Expressions<undefined>;
        const mock = {} as IMock<undefined>;

        resolveMock(AutoMockedStorage)
            .setup(() => It.IsAny())
            .mimics(new Map([[key, mock]]));

        resolveMock(ExpressionsMatcher)
            .setup(instance => instance.matched(expression, key))
            .returns(true);

        const provider = resolve2(AutoMockProvider);
        const actual = provider.getOrCreate(expression);

        expect(actual).toBe(mock);
    });

    it("Returns a new mock", () => {
        const expression = {} as Expressions<undefined>;
        const key = {} as Expressions<undefined>;
        const mock = {} as Mock<unknown>;
        const anotherMock = {} as IMock<unknown>;

        resolveMock(AutoMockedStorage)
            .setup(() => It.IsAny())
            .mimics(new Map([[key, anotherMock]]));

        resolveMock(AutoMockFactory)
            .setup(instance => instance.create(expression))
            .returns(mock);

        resolveMock(ExpressionsMatcher)
            .setup(instance => instance.matched(expression, It.IsAny()))
            .returns(false);

        const provider = resolve2(AutoMockProvider);
        const actual = provider.getOrCreate(expression);

        expect(actual).toBe(mock);
        resolveMock(AutoMockedStorage)
            .verify(instance => instance.set(expression, mock));
    });
});
