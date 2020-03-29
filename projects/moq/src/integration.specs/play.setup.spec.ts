import { Mock } from "../lib/mock";
import { PlayTimes } from "../lib/playables/play-times";
import { It } from "../lib/expected-expressions/expression-predicates";

type ITestFunction = (value: number) => number;

describe("Play setup", () => {
    it("Plays once", () => {
        const object = new Mock<ITestFunction>()
            .setup(instance => instance(2))
            .play(PlayTimes.Once())
            .returns(1)
            .object();

        const actual = object(2);
        expect(actual).toBe(1);

        const actual2 = object(2);
        expect(actual2).toBeUndefined();
    });

    it("Plays a sequence on a method", () => {
        const object = new Mock<ITestFunction>()
            .setup(instance => instance(2))
            .play(PlayTimes.Sequence([false, true, false]))
            .returns(1)
            .object();

        const actual = object(2);
        expect(actual).toBeUndefined();

        const actual2 = object(2);
        expect(actual2).toBe(1);

        const actual3 = object(2);
        expect(actual3).toBeUndefined();
    });

    it("Plays a sequence on a property", () => {
        const object = new Mock<{ prop: number }>()
            .setup(() => It.IsAny())
            .play(PlayTimes.Sequence([false, true, false]))
            .returns(1)
            .object();

        const actual = object.prop;
        expect(actual).toBeUndefined();

        const actual2 = object.prop;
        expect(actual2).toBe(1);

        const actual3 = object.prop;
        expect(actual3).toBeUndefined();
    });
});
