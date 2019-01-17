import { GetPropertyExpression, MethodExpression, SetPropertyExpression } from "./expressions";
import { SequenceId, sequenceIdFactory } from "./sequence-id";

/**
 * This class represents a recorded interaction with the a mocked object.
 */
export interface TrackedAction { id: number; expression: MethodExpression | GetPropertyExpression | SetPropertyExpression; }

/**
 * This class records all interactions with a mocked object.
 */
export class Tracker {
    private log: TrackedAction[] = [];

    constructor(private sequenceId: SequenceId) {

    }

    /**
     * @hidden
     */
    public add(action: MethodExpression | GetPropertyExpression | SetPropertyExpression): void {
        const record = {id: this.sequenceId.next(), expression: action};
        this.log.push(record);
    }

    /**
     * Returns recorded interactions.
     */
    public get(): TrackedAction[] {
        return [...this.log];
    }
}

/**
 * @hidden
 */
export function trackerFactory(): Tracker {
    return new Tracker(sequenceIdFactory());
}
