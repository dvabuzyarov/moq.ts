import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Preset } from "./preset";
import { ExpressionExplorerFactory } from "./expression-explorer.factory";
import { Expressions } from "../expressions";
import { callbackInvocationAdapter } from "./callback-invocation.adapter";

export class CallbacksPresetFactory {
    constructor(
        private expressionExplorerFactory: ExpressionExplorerFactory = new ExpressionExplorerFactory(),
        private invocationAdapter: typeof callbackInvocationAdapter = callbackInvocationAdapter) {

    }

    public get<T, TValue>(target: ExpectedExpressions<T>, invocable: () => boolean, callback: (args: any[]) => TValue): Preset<T> {
        const explorer = this.expressionExplorerFactory.get(target);
        const invocationAdapter = this.invocationAdapter;
        return new Preset<T>(
            target,
            invocable,
            function (expression: Expressions) {
                return <any>invocationAdapter(expression, callback);
            },
            function () {
                return [explorer];
            }
        );
    }
}
