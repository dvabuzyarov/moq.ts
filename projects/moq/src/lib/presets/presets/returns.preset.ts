import { IPreset } from "./preset";
import { Expressions } from "../../reflector/expressions";
import { IPlayable } from "../../moq";

export class ReturnsPreset<T, TValue> implements IPreset<T> {
    constructor(
        public readonly playable: IPlayable,
        public readonly target: Expressions<T>,
        public readonly value: TValue) {

    }
}

