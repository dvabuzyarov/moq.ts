import { IPreset } from "./preset";
import { ExpectedExpressions } from "../../expected-expressions/expected-expressions";
import { IPlayable } from "../../moq";

export class MimicsPreset<T> implements IPreset<T> {
    constructor(
        public readonly playable: IPlayable,
        public readonly target: ExpectedExpressions<T>,
        public readonly origin: unknown) {

    }
}
