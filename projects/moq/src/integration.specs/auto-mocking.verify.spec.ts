/*eslint-disable max-classes-per-file*/
import { Mock } from "../lib/mock";
import { EqualMatchingInjectorConfig } from "../lib/injector/equal-matching-injector.config";
import { EXPRESSION_REFLECTOR } from "../lib/reflector/expression-reflector";
import { FullExpressionReflector } from "../lib/reflector/full.expression-reflector";
import { It } from "../lib/reflector/expression-predicates";
import { PlayTimes } from "../lib/playables/play-times";

describe("Auto mocking verify", () => {
    const injectorConfig = new EqualMatchingInjectorConfig([], [
        {
            provide: EXPRESSION_REFLECTOR,
            useExisting: FullExpressionReflector,
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

    xit("Verifies a deep expression within several setups", () => {
        const mock = new Mock<{ shallow(param: string): { deep: string } }>({injectorConfig})
            .setup(instance => instance.shallow(It.IsAny()).deep)
            .returns(undefined)
            .setup(instance => instance.shallow("hello").deep)
            .play(PlayTimes.Once())
            .returns(undefined);

        const actual = mock.object().shallow("some").deep;
        expect(actual).toBe(undefined);
        mock.verify(instance => instance.shallow(It.IsAny()).deep);
    });
});
