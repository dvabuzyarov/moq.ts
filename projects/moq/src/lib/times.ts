/**
 * Sets the rules where bounds of a range are included or excluded from the range.
 * See {@link Times.Between}
 */
export enum Range {
    Exclusive,
    Inclusive
}

/**
 * This class expresses the expectation about amount of invocations.
 * @example
 * ```typescript
 *
 * const times = new Times(expected => expected === 1, `Should be called once`);
 * const actual = times.test(2);
 *
 * expect(actual).toBe(false);
 * expect(times.message).toBe(`Should be called once`);
 * ```
 *
 * ```typescript
 *
 * const mockName = 'mock name';
 *const mock = new Mock<ITestObject>(mockName);
 *const object = mock.object();
 *
 *object.property;
 *
 *const action = () => mock.verify(instance => instance.property, Times.AtLeast(2));
 *
 *expect(action).toThrow();
 * ```
 */
export class Times {
    private static _once: Times = new Times(expected => expected === 1, `Should be called once`);
    private static _never: Times = new Times(expected => expected === 0, `Should be called never`);
    private static _atMostOnce: Times = new Times(expected => expected <= 1, `Should be called at most once`);
    private static _atLeastOnce: Times = new Times(expected => expected >= 1, `Should be called at least once`);

    /**
     *
     * @param evaluator It takes actual value and decides if it is expected or not.
     * Returns true or false accordingly.
     * @param message A message that describes the expectation.
     */
    constructor(private evaluator: (callCount: number) => boolean,
                public message: string) {

    }

    /**
     * It expects that the actual would be equal or bigger then the expected value.
     * @param callCount The expected value.
     */
    public static AtLeast(callCount: number): Times {
        return new Times(expected => expected >= callCount, `Should be called at least ${callCount} time(s)`);
    }

    /**
     * It expects that the actual would be equal or bigger then 1.
     */
    public static AtLeastOnce(): Times {
        return Times._atLeastOnce;
    }

    /**
     * It expects that the actual would be equal or smaller then the expected value.
     * @param callCount The expected value.
     */
    public static AtMost(callCount: number): Times {
        return new Times(expected => expected <= callCount, `Should be called at most ${callCount} time(s)`);
    }

    /**
     * It expects that the actual would be equal or less then 1.
     */
    public static AtMostOnce(): Times {
        return Times._atMostOnce;
    }

    /**
     * It expects that the actual would be in the expected range of values.
     * @param callCountFrom The lowest bound of the range.
     * @param callCountTo The highest bound of the range.
     * @param range  Sets the rules where bounds of a range are included or excluded from the range.
     */
    public static Between(callCountFrom: number, callCountTo: number, range: Range): Times {
        if (range === Range.Exclusive) {
            return new Times(
                expected => expected > callCountFrom && expected < callCountTo,
                `Should be called exclusively between ${callCountFrom} and ${callCountTo}`);
        }

        return new Times(
            expected => expected >= callCountFrom && expected <= callCountTo,
            `Should be called inclusively between ${callCountFrom} and ${callCountTo}`);
    }

    /**
     * It expects that the actual is equal to the expected value.
     * @param callCount The expected value.
     */
    public static Exactly(callCount: number): Times {
        return new Times(
            expected => expected === callCount,
            `Should be called exactly ${callCount} time(s)`);
    }

    /**
     * It expects that the actual is equal 0.
     */
    public static Never(): Times {
        return Times._never;
    }

    /**
     * It expects that the actual is equal 1.
     */
    public static Once(): Times {
        return Times._once;
    }

    /**
     * Evaluates the expectation against the actual value.
     * @param callCount The actual value.
     */
    public test(callCount: number): boolean {
        return this.evaluator(callCount);
    }
}
