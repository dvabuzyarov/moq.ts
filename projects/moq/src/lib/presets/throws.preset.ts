import { IPreset } from "./preset";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";

export class ThrowsPreset<T, TException> implements IPreset<T> {
    constructor(
        public readonly invocable: () => boolean,
        public readonly target: ExpectedExpressions<T>,
        public readonly exception: TException) {

    }
}
