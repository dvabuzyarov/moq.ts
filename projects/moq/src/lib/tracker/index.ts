import { SequenceId } from "./sequence-id";
import { Tracker } from "./tracker";

/**
 * @hidden
 */
export default [
    {provide: SequenceId, useClass: SequenceId, deps: []},
    {provide: Tracker, useClass: Tracker, deps: [SequenceId]}
];
