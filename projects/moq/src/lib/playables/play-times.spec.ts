import { PlayTimes } from "./play-times";
import { PlayableNever } from "./playable-never";
import { PlayableOnce } from "./playable-once";
import { PlayableExactly } from "./playable-exactly";
import { PlayableSequence } from "./playable-sequence";
import { PlayableAlways } from "./playable-always";

describe("Play times", () => {

    it("Returns always predicate", () => {
        const actual = PlayTimes.Always();
        expect(actual).toBeInstanceOf(PlayableAlways);
    });

    it("Returns never predicate", () => {
        const actual = PlayTimes.Never();
        expect(actual).toBeInstanceOf(PlayableNever);
    });

    it("Returns once predicate", () => {
        const actual = PlayTimes.Once();
        expect(actual).toBeInstanceOf(PlayableOnce);
    });

    it("Returns exactly predicate", () => {
        const actual = PlayTimes.Exactly(2);
        expect(actual).toBeInstanceOf(PlayableExactly);
    });

    it("Returns sequence predicate", () => {
        const actual = PlayTimes.Sequence([true, false, true]);
        expect(actual).toBeInstanceOf(PlayableSequence);
    });
});
