import { IPlayable } from "../moq";

/**
 * The configured setup will be applied or not accordingly to the value in the sequence.
 * @example
 * ```typescript
 *
 * const value = 'value';
 * const object = new Mock<Function>()
 * .setup(instance => instance(1))
 * .play(PlayTimes.Sequence([false, true]))
 * .returns(value)
 * .object();
 *
 * expect(object(1).toBe(undefined);
 * expect(object(1).toBe(value);
 * expect(object(1).toBe(undefined);
 * ```
 */
export class PlayableSequence implements IPlayable {
    private index = 0;

    constructor(private sequence: boolean[]) {
    }

    readonly update = () => {
        this.index++;
    }

    readonly isPlayable = () => {
        if (this.index >= this.sequence.length) return false;
        return this.sequence[this.index];
    }
}
