import { IPlayable } from "../moq";

/**
 * The configured setup will be always applied to invocations.
 */
export class PlayableAlways implements IPlayable {
    readonly isPlayable = () => true;
    readonly update = () => undefined;
}
