import { IPreset } from "./preset";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";

export class ReplicatesPreset<T> implements IPreset<T> {
    constructor(
        public readonly invocable: () => boolean,
        public readonly target: ExpectedExpressions<T>,
        public readonly origin: unknown) {

    }
}
