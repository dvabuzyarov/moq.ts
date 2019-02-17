import { IMock, ISetup, ISetupInvocation } from "../moq";
import { Expressions } from "../expressions";
import { callbackInvocationAdapter } from "./callback-invocation.adapter";

/**
 * The default implementation of {@link ISetup} interface.
 * Is it not intended to be used outside of the moq library.
 * @hidden
 */
export class Setup<T> implements ISetupInvocation<T> {

    private action: (expression: Expressions) => any;
    private playPredicate: () => boolean;

    constructor(private mock: IMock<T>,
                private _callbackInvocationAdapter: typeof callbackInvocationAdapter = callbackInvocationAdapter) {

    }

    public invoke<TResult>(expression: Expressions): TResult {
        return this.action(expression);
    }

    replicates(origin: T): IMock<T> {
        this.action = (ex) => (<any>origin)(ex);
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
        this.action = (expression: Expressions) => this._callbackInvocationAdapter(expression, callback);
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
