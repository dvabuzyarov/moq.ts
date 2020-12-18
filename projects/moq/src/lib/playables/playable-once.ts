import { IPlayable, PlayableUpdateReason } from "../moq";

/**
 * The configured setup will be applied only to the first invocation.
 */
export class PlayableOnce implements IPlayable {
    private played = false;

    readonly update = (reason: PlayableUpdateReason) => {
        if (reason === PlayableUpdateReason.OwnSetupWouldBePlayed) {
            this.played = true;
        }
    };

    readonly isPlayable = () => this.played === false;
}
