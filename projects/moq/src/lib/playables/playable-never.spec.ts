import { PlayableNever } from "./playable-never";

describe("Playable never", () => {

    it("Returns false in the first transaction", () => {
        const {isPlayable} = new PlayableNever();
        const actual = isPlayable();

        expect(actual).toBe(false);
    });

    it("Returns false in the second transaction", () => {
        const {isPlayable, update} = new PlayableNever();

        update();
        const actual = isPlayable();

        expect(actual).toBe(false);
    });
});
