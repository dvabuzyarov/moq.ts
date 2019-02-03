import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Preset } from "./preset";
import { ExpressionExplorerFactory } from "../type-explorers/expression-explorer.factory";

export class ThrowsPresetFactory {
    constructor(private expressionExplorerFactory: ExpressionExplorerFactory = new ExpressionExplorerFactory()) {

    }

    public get<T, TException>(target: ExpectedExpressions<T>, invocable: () => boolean, exception: TException): Preset<T> {
        const explorer = this.expressionExplorerFactory.get(target);
        return new Preset<T>(
            target,
            invocable,
            function () {
                throw exception;
            },
            function () {
                return [explorer];
            }
        );
    }
}
