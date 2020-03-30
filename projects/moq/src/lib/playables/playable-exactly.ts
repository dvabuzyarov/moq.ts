import { IPlayable, PlayableUpdateReason } from "../moq";

/**
 * The configured setup will be applied to invocations exactly n-times. After that it will be ignored.
 */
export class PlayableExactly implements IPlayable {
    private invoked = 0;

    constructor(private count: number) {
    }

    readonly update = (reason: PlayableUpdateReason) => {
        if (reason === PlayableUpdateReason.OwnSetupWouldBePlayed) {
            this.invoked++;
        }
    }

    readonly isPlayable = () => this.invoked <= this.count;
}
