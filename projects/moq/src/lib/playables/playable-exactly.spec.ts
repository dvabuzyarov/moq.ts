import { PlayableExactly } from "./playable-exactly";
import { PlayableUpdateReason } from "../moq";

describe("Playable exactly", () => {

    it("Returns true when the limit is not reached", () => {
        const {isPlayable} = new PlayableExactly(1);
        const actual = isPlayable();

        expect(actual).toBe(true);
    });

    it("Returns true when the limit is not affected", () => {
        const {isPlayable, update} = new PlayableExactly(1);

        update(PlayableUpdateReason.OtherSetupWouldBePlayed);
        const actual = isPlayable();

        expect(actual).toBe(true);
    });

    it("Returns false when the limit is reached", () => {
        const {isPlayable, update} = new PlayableExactly(1);

        update(PlayableUpdateReason.OwnSetupWouldBePlayed);
        const actual = isPlayable();

        expect(actual).toBe(false);
    });

    it("Returns false for 0 by default", () => {
        const {isPlayable} = new PlayableExactly(0);
        const actual = isPlayable();

        expect(actual).toBe(false);
    });

    it("Returns false for 0 after an interaction", () => {
        const {isPlayable, update} = new PlayableExactly(0);

        update(PlayableUpdateReason.OwnSetupWouldBePlayed);
        const actual = isPlayable();

        expect(actual).toBe(false);
    });
});
