import { PlayableOnce } from "./playable-once";
import { PlayableUpdateReason } from "../moq";

describe("Playable once", () => {

    it("Returns true at the first transaction", () => {
        const {isPlayable} = new PlayableOnce();
        const actual = isPlayable();

        expect(actual).toBe(true);
    });

    it("Returns true at the second transaction when update is for other", () => {
        const {isPlayable, update} = new PlayableOnce();

        update(PlayableUpdateReason.OtherSetupWouldBePlayed);
        const actual = isPlayable();

        expect(actual).toBe(true);
    });

    it("Returns false at the second transaction", () => {
        const {isPlayable, update} = new PlayableOnce();

        update(PlayableUpdateReason.OwnSetupWouldBePlayed);
        const actual = isPlayable();

        expect(actual).toBe(false);
    });
});
