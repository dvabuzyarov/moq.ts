import { SequenceId } from "./sequence-id";
import { Tracker } from "./tracker";

/**
 * @hidden
 */
export const trackerProviders = [
    {provide: SequenceId, useClass: SequenceId, deps: []},
    {provide: Tracker, useClass: Tracker, deps: [SequenceId]}
];
