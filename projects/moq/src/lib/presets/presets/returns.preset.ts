import { IPreset } from "./preset";
import { Expressions } from "../../reflector/expressions";
import { IPlayable } from "../../moq";

export class ReturnsPreset<T, TValue> implements IPreset<T> {
    private valuesIndex = 0;

    constructor(
        public readonly playable: IPlayable,
        public readonly target: Expressions<T>,
        private readonly values: TValue[]) {

    }

    public nextValue(): TValue {
        const value = this.values[this.valuesIndex];
        if (this.valuesIndex < this.values.length - 1) {
            this.valuesIndex++;
        }
        return value;
    }
}

