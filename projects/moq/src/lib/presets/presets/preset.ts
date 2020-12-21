import { Expressions } from "../../reflector/expressions";
import { IPlayable } from "../../moq";

export interface IPreset<T> {
    readonly target: Expressions<T>;
    readonly playable: IPlayable;
}
