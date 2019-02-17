import { ExpectedExpressions, ExpectedNamedMethodExpression } from "../expected-expressions/expected-expressions";
import { ExpressionMatcher } from "../expression-matchers/expression-matcher";
import { Expressions } from "../expressions";
import { ISetupInvocation } from "../moq";

/**
 * @hidden
 */
export class Presets<T> {
    private setups: [ExpectedExpressions<T>, ISetupInvocation<T>][] = [];

    constructor(private expressionMatcher: ExpressionMatcher = new ExpressionMatcher()) {

    }

    public add(key: ExpectedExpressions<T>, setup: ISetupInvocation<T>): void {
        this.setups.unshift([key, setup]);
    }

    public get(expression: Expressions): ISetupInvocation<T> {
        for (const [key, value] of this.setups) {
            if (this.expressionMatcher.matched(expression, key) === true && value.playable()) {
                return value;
            }
        }

        return undefined;
    }

    public hasNamedMethod(name: string): boolean {
        for (const [key] of this.setups) {
            if (key instanceof ExpectedNamedMethodExpression && (key as ExpectedNamedMethodExpression).name === name) {
                return true;
            }
        }

        return false;
    }
}
