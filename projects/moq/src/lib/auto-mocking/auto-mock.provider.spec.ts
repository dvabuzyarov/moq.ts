import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { AutoMockedStorage } from "./auto-mock.storage";
import { Expressions } from "../reflector/expressions";
import { It } from "moq.ts";
import { IMock } from "../moq";
import { AutoMockFactory } from "./auto-mock.factory";
import { AutoMockProvider } from "./auto-mock.provider";
import { Mock } from "../mock";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

describe("Auto mock provider", () => {

    beforeEach(() => {
        createInjector(AutoMockProvider, [AutoMockedStorage, ExpressionEqualityComparer, AutoMockFactory]);
    });

    beforeEach(() => {
        resolveMock(ExpressionEqualityComparer).prototypeof(ExpressionEqualityComparer.prototype);
        resolveMock(AutoMockFactory).prototypeof(AutoMockFactory.prototype);
    });

    it("Returns an existing mock", () => {
        const expression = {} as Expressions<undefined>;
        const key = {} as Expressions<undefined>;
        const mock = {} as IMock<undefined>;

        resolveMock(AutoMockedStorage)
            .setup(() => It.IsAny())
            .mimics(new Map([[key, mock]]));

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, key))
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

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, It.IsAny()))
            .returns(false);

        const provider = resolve2(AutoMockProvider);
        const actual = provider.getOrCreate(expression);

        expect(actual).toBe(mock);
        resolveMock(AutoMockedStorage)
            .verify(instance => instance.set(expression, mock));
    });
});
