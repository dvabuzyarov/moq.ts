import { IMock, ISetup, ISetupInvoke } from "./moq";

export class Setup<T> implements ISetupInvoke<T> {

    private action: Function;
    private playPredicate: () => boolean;

    constructor(private mock: IMock<T>) {

    }

    public invoke<TResult>(args?: any[]): TResult {
        return this.action(args);
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
        this.action = (args?: any[]) => callback.apply(undefined, args);
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
