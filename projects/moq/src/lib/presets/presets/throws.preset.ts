import { IPreset } from "./preset";
import { Expressions } from "../../reflector/expressions";
import { IPlayable } from "../../moq";

export class ThrowsPreset<T, TException> implements IPreset<T> {
    constructor(
        public readonly playable: IPlayable,
        public readonly target: Expressions<T>,
        public readonly exception: TException) {

    }
}
