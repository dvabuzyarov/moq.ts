import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Preset } from "./preset";
import { ExpressionExplorerFactory } from "./expression-explorer.factory";

export class ReturnsPresetFactory {
    constructor(private expressionExplorerFactory: ExpressionExplorerFactory = new ExpressionExplorerFactory()) {

    }

    public get<T, TValue>(target: ExpectedExpressions<T>, invocable: () => boolean, value: TValue): Preset<T> {
        const explorer = this.expressionExplorerFactory.get(target);
        return new Preset<T>(
            target,
            invocable,
            function () {
                return <any>value;
            },
            function () {
                return [explorer];
            }
        );
    }
}
