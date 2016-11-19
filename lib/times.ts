export enum Range{
    Exclusive,
    Inclusive
}

export class Times {
    constructor(private evaluator: (callCount: number)=>boolean,
                public message: string) {

    }

    public static AtLeast(callCount: number): Times {
        return new Times(expected => expected >= callCount, `Should be called at least ${callCount} time(s)`);
    }

    public static AtLeastOnce(): Times {
        return new Times(expected => expected >= 1, `Should be called at least once`);
    }

    public static AtMost(callCount: number): Times {
        return new Times(expected => expected <= callCount, `Should be called at most ${callCount} time(s)`);
    }

    public static AtMostOnce(): Times {
        return new Times(expected => expected <= 1, `Should be called at most once`);
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
        return new Times(expected => expected === 0, `Should be called never`);
    }

    public static Once(): Times {
        return new Times(expected => expected === 1, `Should be called once`);
    }

    public test(callCount: number): boolean {
        return this.evaluator(callCount);
    }
}
