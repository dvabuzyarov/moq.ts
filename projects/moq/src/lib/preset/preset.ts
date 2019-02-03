import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Expressions } from "../expressions";

export interface ITypeExplorer {
    hasInstanceMethod(): boolean;
}

export class Preset<T> {
    constructor(
        public readonly target: ExpectedExpressions<T>,
        public readonly invocable: () => boolean,
        public readonly invoke: <TResult>(expression: Expressions) => TResult,
        public explorable: () => ITypeExplorer[]) {
    }
}
