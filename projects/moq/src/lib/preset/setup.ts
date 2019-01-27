import { IMock, ISetup, ISetupInvocation } from "../moq";
import { Expressions, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "../expressions";

/**
 * The default implementation of {@link ISetup} interface.
 * Is it not intended to be used outside of the moq library.
 * @hidden
 */
export class Setup<T> implements ISetupInvocation<T> {

    private action: Function;
    private playPredicate: () => boolean;

    constructor(private mock: IMock<T>) {

    }

    public invoke<TResult>(expression: Expressions): TResult {
        return this.action(expression);
    }

    execute<TResult>(callback: (this: void, expression: Expressions) => TResult): IMock<T> {
        this.action = (expression: Expressions) => callback.apply(undefined, [expression]);
        return this.mock;
    }

    public returns<TValue>(value: TValue): IMock<T> {
        this.action = () => value;
        return this.mock;
    }

    public throws<TException>(exception: TException): IMock<T> {
        this.action = () => {
            throw exception;
        };
        return this.mock;
    }

    public callback<TValue>(callback: (args: any[]) => TValue): IMock<T> {
        this.action = (expression: Expressions) => {
            if (expression instanceof SetPropertyExpression) {
                return callback.apply(undefined, [(<SetPropertyExpression>expression).value]);
            }
            if (expression instanceof MethodExpression) {
                return callback.apply(undefined, (<MethodExpression>expression).args);
            }
            if (expression instanceof NamedMethodExpression) {
                return callback.apply(undefined, (<NamedMethodExpression>expression).args);
            }
            return callback.apply(undefined, []);
        };
        return this.mock;
    }

    public play(predicate: () => boolean): ISetup<T> {
        this.playPredicate = predicate;
        return this;
    }

    public playable(): boolean {
        if (this.playPredicate === undefined) return true;
        return this.playPredicate();
    }
}
