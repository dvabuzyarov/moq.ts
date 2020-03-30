import { PlayableExactly } from "./playable-exactly";
import { PlayableUpdateReason } from "../moq";

describe("Playable exactly", () => {

    it("Returns true at the first transaction", () => {
        const {isPlayable} = new PlayableExactly(2);
        const actual = isPlayable();

        expect(actual).toBe(true);
    });

    it("Returns true at the first transaction", () => {
        const {isPlayable} = new PlayableExactly(0);
        const actual = isPlayable();

        expect(actual).toBe(true);
    });

    it("Returns true at the first transaction", () => {
        const {isPlayable, update} = new PlayableExactly(0);

        update(PlayableUpdateReason.OtherSetupWouldBePlayed);
        const actual = isPlayable();

        expect(actual).toBe(true);
    });

    it("Returns true at the second transaction", () => {
        const {isPlayable, update} = new PlayableExactly(2);

        update(PlayableUpdateReason.OwnSetupWouldBePlayed);
        const actual = isPlayable();

        expect(actual).toBe(true);
    });

    it("Returns false at the second transaction", () => {
        const {isPlayable, update} = new PlayableExactly(1);

        update(PlayableUpdateReason.OwnSetupWouldBePlayed);
        const actual = isPlayable();

        expect(actual).toBe(true);
    });
});
