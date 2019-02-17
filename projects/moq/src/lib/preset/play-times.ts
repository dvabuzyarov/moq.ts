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
export class PlayTimes {

    /**
     * The configured setup will be applied to invocations exactly n-times. After that it will be ignored.
     */
    public static Exactly(count: number): () => boolean {
        let invoked = 0;
        return () => {
            if (invoked >= count) return false;
            invoked++;
            return true;
        };
    }

    /**
     * The configured setup will be never applied to invocations.
     */
    public static Never(): () => boolean {
        return () => false;
    }

    /**
     * The configured setup will be applied only to the first invocation.
     */
    public static Once(): () => boolean {
        let played = false;
        return () => {
            if (played) return false;
            played = true;
            return true;
        };
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
    public static Sequence(sequence: boolean[]): () => boolean {
        let index = 0;
        return () => {
            if (index >= sequence.length) return false;
            const value = sequence[index];
            index++;
            return value;
        };
    }
}
