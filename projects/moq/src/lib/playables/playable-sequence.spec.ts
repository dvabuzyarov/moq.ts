import { PlayableSequence } from "./playable-sequence";

describe("Playable sequence", () => {
    it("Returns sequence predicate", () => {
        const {isPlayable, update} = new PlayableSequence([true, false, true]);

        const actual1 = isPlayable();

        update();
        const actual2 = isPlayable();

        update();
        const actual3 = isPlayable();

        update();
        const actual4 = isPlayable();

        expect(actual1).toBe(true);
        expect(actual2).toBe(false);
        expect(actual3).toBe(true);
        expect(actual4).toBe(false);
    });
});
