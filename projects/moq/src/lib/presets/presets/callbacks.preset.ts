import { IPreset } from "./preset";
import { ExpectedExpressions } from "../../expected-expressions/expected-expressions";
import { Interaction } from "../../interactions";
import { IPlayable } from "../../moq";

export class CallbacksPreset<T> implements IPreset<T> {
    constructor(
        public readonly playable: IPlayable,
        public readonly target: ExpectedExpressions<T>,
        public readonly callback: (interaction: Interaction) => unknown) {

    }
}
