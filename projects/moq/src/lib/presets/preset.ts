import { ExpectedExpressions } from "../expected-expressions/expected-expressions";

export interface IPreset<T> {
    readonly target: ExpectedExpressions<T>,
    readonly invocable: () => boolean,
}
