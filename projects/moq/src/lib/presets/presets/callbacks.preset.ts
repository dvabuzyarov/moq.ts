import { IPreset } from "./preset";
import { Expressions } from "../../reflector/expressions";
import { Expression } from "../../reflector/expressions";
import { IPlayable } from "../../moq";

export class CallbacksPreset<T> implements IPreset<T> {
    constructor(
        public readonly playable: IPlayable,
        public readonly target: Expressions<T>,
        public readonly callback: (interaction: Expression) => unknown) {

    }
}
