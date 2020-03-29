import { IPlayable } from "../moq";

/**
 * The configured setup will be never applied to invocations.
 */
export class PlayableNever implements IPlayable {
    readonly update = () => undefined;
    readonly isPlayable = () => false;
}
