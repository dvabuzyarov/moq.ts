import { ExpectedExpressions } from "../../expected-expressions/expected-expressions";
import { IPlayable } from "../../moq";

export interface IPreset<T> {
    readonly target: ExpectedExpressions<T>;
    readonly playable: IPlayable;
}
