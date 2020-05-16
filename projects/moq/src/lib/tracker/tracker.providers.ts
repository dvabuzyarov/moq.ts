import { SequenceId, sequenceIdFactory } from "./sequence-id";
import { Tracker } from "./tracker";

/**
 * @hidden
 */
export const trackerProviders = [
    {provide: SequenceId, useFactory: sequenceIdFactory, deps: []},
    {provide: Tracker, useClass: Tracker, deps: [SequenceId]}
];
