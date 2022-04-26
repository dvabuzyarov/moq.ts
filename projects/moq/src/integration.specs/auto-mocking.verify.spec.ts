import { Mock } from "../lib/mock";
import { EqualMatchingInjectorConfig } from "../lib/injector/equal-matching-injector.config";
import { EXPRESSION_REFLECTOR } from "../lib/reflector/expression-reflector";
import { SyncExpressionReflector } from "../lib/reflector/sync-expression.reflector";
import { It } from "../lib/reflector/expression-predicates";
import { PlayTimes } from "../lib/playables/play-times";

describe("Auto mocking verify", () => {
    const injectorConfig = new EqualMatchingInjectorConfig([], [
        {
            provide: EXPRESSION_REFLECTOR,
            useExisting: SyncExpressionReflector,
            deps: []
        },
    ]);

    it("Verifies a deep expression", () => {
        const mock = new Mock<{ shallow: { deep: string } }>({injectorConfig})
            .setup(instance => instance.shallow.deep)
            .returns(undefined);

        const actual = mock.object().shallow.deep;
        expect(actual).toBe(undefined);
        mock.verify(instance => instance.shallow.deep);
    });

    it("Throws when deep member is not interacted", () => {
        const mock = new Mock<{ shallow: { deep: string } }>({injectorConfig})
            .setup(instance => instance.shallow.deep)
            .returns(undefined);

        const actual = mock.object().shallow;
        expect(() => mock.verify(instance => instance.shallow.deep)).toThrow();
    });

    it("Throws when shallow member is not interacted", () => {
        const mock = new Mock<{ shallow: { deep: string } }>({injectorConfig})
            .setup(instance => instance.shallow.deep)
            .returns(undefined);

        expect(() => mock.verify(instance => instance.shallow.deep)).toThrow();
    });

    it("Verifies a deep expression within several setups", () => {
        const mock = new Mock<{ shallow(param: string): { deep: string } }>({injectorConfig})
            .setup(instance => instance.shallow("some").deep)
            .returns(undefined)
            .setup(instance => instance.shallow("hello").deep)
            .play(PlayTimes.Once())
            .returns("hello");

        const actual = mock.object().shallow("some").deep;
        expect(actual).toBe(undefined);

        mock.verify(instance => instance.shallow("some").deep);
        mock.verify(instance => instance.shallow(It.IsAny()).deep);
    });

    it("Verifies invocation with async", async () => {
        interface IUserManager {
            getUser(name: string): Promise<string>;
        }

        const value = "user";
        const name = "some-example@example.com";

        const managerMock = new Mock<IUserManager>()
            .setup(async instance => instance.getUser(It.IsAny()))
            .returnsAsync(null)
            .setup(async instance => instance.getUser(name))
            .returnsAsync(value);

        const actual = await managerMock.object().getUser(name);

        expect(actual).toBe(value);
        managerMock.verify(async instance => instance.getUser(name));
    });
});
