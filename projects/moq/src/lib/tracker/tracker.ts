import { Interaction } from "../interactions";
import { SequenceId } from "./sequence-id";

/**
 * This class represents a recorded interaction with the a mocked object.
 */
export interface TrackedAction {
    id: number;
    expression: Interaction;
}

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
    public add(action: Interaction): void {
        const record = {id: this.sequenceId.next(), expression: action};
        this.log.push(record);
    }

    /**
     * Returns recorded interactions.
     */
    public get(): TrackedAction[] {
        return [...this.log];
    }

    public interactions(): Interaction[] {
        return this.get().map(record => record.expression);
    }
}
