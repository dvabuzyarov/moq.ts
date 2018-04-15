import { GetPropertyExpression, MethodExpression, SetPropertyExpression } from "./expressions";
import { SequenceId, sequenceIdFactory } from "./sequence-id";

export type TrackedAction = { id: number, expression: MethodExpression | GetPropertyExpression | SetPropertyExpression };

export class Tracker {
    private log: TrackedAction[] = [];

    constructor(private sequenceId: SequenceId) {

    }

    public add(action: MethodExpression | GetPropertyExpression | SetPropertyExpression): void {
        const record = {id: this.sequenceId.next(), expression: action};
        this.log.push(record);
    }

    public get(): TrackedAction[] {
        return this.log;
    }
}

export function trackerFactory(): Tracker {
    return new Tracker(sequenceIdFactory());
}
