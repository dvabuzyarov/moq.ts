/**
 * This class sets rules when a configured setup should be applied to the target invocation or not.
 *
 * @example
 * ```typescript
 *
 * const value = 'value';
 * const object = new Mock<Function>()
 * .setup(instance => instance(1))
 * .play(PlayTimes.Once())
 * .returns(value)
 * .object();
 *
 * expect(object(1).toBe(value);
 * expect(object(1).toBe(undefined);
 * ```
 */
import { IPlayable } from "../moq";
import { PlayableExactly } from "./playable-exactly";
import { PlayableNever } from "./playable-never";
import { PlayableOnce } from "./playable-once";
import { PlayableSequence } from "./playable-sequence";
import { PlayableAlways } from "./playable-always";

export class PlayTimes {
    private static readonly always = new PlayableAlways();
    private static readonly never = new PlayableNever();

    /**
     * The configured setup will be applied to invocations exactly n-times. After that it will be ignored.
     */
    public static Exactly(count: number): IPlayable {
        return new PlayableExactly(count);
    }

    /**
     * The configured setup will be always applied to invocations.
     */
    public static Always(): IPlayable {
        return PlayTimes.always;
    }

    /**
     * The configured setup will be never applied to invocations.
     */
    public static Never(): IPlayable {
        return PlayTimes.never;
    }

    /**
     * The configured setup will be applied only to the first invocation.
     */
    public static Once(): IPlayable {
        return new PlayableOnce();
    }

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
    public static Sequence(sequence: boolean[]): IPlayable {
        return new PlayableSequence(sequence);
    }
}
