import { PlayTimes } from "./play-times";

describe("Play times", () => {

    it("Returns never predicate", () => {
        const predicate = PlayTimes.Never();
        const actual = predicate();

        expect(actual).toBe(false);
    });

    it("Returns once predicate", () => {
        const predicate = PlayTimes.Once();
        const actual1 = predicate();
        const actual2 = predicate();

        expect(actual1).toBe(true);
        expect(actual2).toBe(false);
    });

    it("Returns exactly predicate", () => {
        const predicate = PlayTimes.Exactly(2);
        const actual1 = predicate();
        const actual2 = predicate();
        const actual3 = predicate();

        expect(actual1).toBe(true);
        expect(actual2).toBe(true);
        expect(actual3).toBe(false);
    });

    it("Returns sequence predicate", () => {
        const predicate = PlayTimes.Sequence([true, false, true]);
        const actual1 = predicate();
        const actual2 = predicate();
        const actual3 = predicate();
        const actual4 = predicate();

        expect(actual1).toBe(true);
        expect(actual2).toBe(false);
        expect(actual3).toBe(true);
        expect(actual4).toBe(false);
    });
});
