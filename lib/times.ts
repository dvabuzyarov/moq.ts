export const enum Range{
    Exclusive,
    Inclusive
}

export class Times {
    private static _once: Times =  new Times(expected => expected === 1, `Should be called once`);
    private static _never: Times =  new Times(expected => expected === 0, `Should be called never`);
    private static _atMostOnce: Times =  new Times(expected => expected <= 1, `Should be called at most once`);
    private static _atLeastOnce: Times =  new Times(expected => expected >= 1, `Should be called at least once`);

    constructor(private evaluator: (callCount: number)=>boolean,
                public message: string) {

    }

    public static AtLeast(callCount: number): Times {
        return new Times(expected => expected >= callCount, `Should be called at least ${callCount} time(s)`);
    }

    public static AtLeastOnce(): Times {
        return Times._atLeastOnce;
    }

    public static AtMost(callCount: number): Times {
        return new Times(expected => expected <= callCount, `Should be called at most ${callCount} time(s)`);
    }

    public static AtMostOnce(): Times {
        return Times._atMostOnce;
    }

    public static Between(callCountFrom: number, callCountTo: number, range: Range): Times {
        if (range === Range.Exclusive)
            return new Times(expected => expected > callCountFrom && expected < callCountTo, `Should be called exclusively between ${callCountFrom} and ${callCountTo}`)

        return new Times(expected => expected >= callCountFrom && expected <= callCountTo, `Should be called inclusively between ${callCountFrom} and ${callCountTo}`)
    }

    public static Exactly(callCount: number): Times {
        return new Times(expected => expected === callCount, `Should be called exactly ${callCount} time(s)`);
    }

    public static Never(): Times {
        return Times._never;
    }

    public static Once(): Times {
        return Times._once;
    }

    public test(callCount: number): boolean {
        return this.evaluator(callCount);
    }
}
