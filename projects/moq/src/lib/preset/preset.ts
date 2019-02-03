import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Expressions } from "../expressions";
import { ITypeExplorer } from "../type-explorers/type-explorer";

export class Preset<T> {
    constructor(
        public readonly target: ExpectedExpressions<T>,
        public readonly invocable: () => boolean,
        public readonly invoke: <TResult>(expression: Expressions) => TResult,
        public explorable: () => ITypeExplorer[]) {
    }
}
