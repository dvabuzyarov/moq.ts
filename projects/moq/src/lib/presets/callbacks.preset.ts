import { IPreset } from "./preset";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Interactions } from "../interactions";

export class CallbacksPreset<T> implements IPreset<T> {
    constructor(
        public readonly invocable: () => boolean,
        public readonly target: ExpectedExpressions<T>,
        public readonly callback: (interaction: Interactions) => unknown) {

    }
}
