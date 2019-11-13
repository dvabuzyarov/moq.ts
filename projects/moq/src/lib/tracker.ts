import { GetPropertyInteraction, MethodInteraction, SetPropertyInteraction } from "./interactions";
import { SequenceId, sequenceIdFactory } from "./sequence-id";

/**
 * This class represents a recorded interaction with the a mocked object.
 */
export interface TrackedAction {
    id: number;
    expression: MethodInteraction | GetPropertyInteraction | SetPropertyInteraction;
}

/**
 * This class records all interactions with a mocked object.
 */
export class Tracker {
    private log: TrackedAction[] = [];

    constructor(private sequenceId: SequenceId = sequenceIdFactory()) {

    }

    /**
     * @hidden
     */
    public add(action: MethodInteraction | GetPropertyInteraction | SetPropertyInteraction): void {
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
