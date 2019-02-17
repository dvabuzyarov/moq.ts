import { Mock } from "../lib/mock";
import { PlayTimes } from "../lib/preset/play-times";

type ITestFunction = (value: number) => number;

describe("Play setup", () => {
    it("Plays once", () => {
        const mock = new Mock<ITestFunction>();
        const mockedFunction = mock
            .setup(instance => instance(2))
            .play(PlayTimes.Once())
            .returns(1)
            .object();

        const actual = mockedFunction(2);
        expect(actual).toBe(1);

        const actual2 = mockedFunction(2);
        expect(actual2).toBeUndefined();
    });

    it("Plays a sequence", () => {
        const mock = new Mock<ITestFunction>();
        const mockedFunction = mock
            .setup(instance => instance(2))
            .play(PlayTimes.Sequence([false, true, false]))
            .returns(1)
            .object();

        const actual = mockedFunction(2);
        expect(actual).toBeUndefined();

        const actual2 = mockedFunction(2);
        expect(actual2).toBe(1);

        const actual3 = mockedFunction(2);
        expect(actual3).toBeUndefined();
    });
});
